<template>
  <div id="users">
    <v-row>
      <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Manage Users</v-card-title>
          <v-card-subtitle
            >Select users from the table and manage them here.</v-card-subtitle
          >
          <v-card-text>
            <v-row>
              <v-col cols="6" lg="12">
                <v-select
                  v-model="role"
                  label="User Permissions..."
                  :items="['User', 'Admin']"
                  :disabled="!inputSelected"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="6" lg="12">
                <v-btn
                  color="secondary"
                  class="sectext--text"
                  :disabled="!inputSelected"
                  block
                  @click="setPermissions"
                  >Set Permissions</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" lg="12">
                <v-switch
                  v-model="disabled"
                  label="Disabled"
                  color="secondary"
                  :disabled="!inputSelected"
                />
              </v-col>
              <v-col cols="6" lg="12">
                <v-btn
                  color="secondary"
                  class="sectext--text"
                  :disabled="!inputSelected"
                  block
                  @click="toggleDisabled"
                  >Update Disabled State</v-btn
                >
              </v-col>
            </v-row>
            <v-spacer style="height: 10px" />
            <v-btn
              color="error"
              class="black--text"
              :disabled="!inputSelected"
              block
              @click="deleteUser"
              >Delete User</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="7">
        <v-card>
          <v-card-title>Select Users</v-card-title>
          <v-card-text align="center">
            <v-data-table
              v-model="input"
              show-select
              single-select
              :headers="headers"
              :items="items"
            >
              <template #item.disabled="{ item }">
                <v-simple-checkbox v-model="item.disabled" disabled />
              </template>
              <div v-for="item in items" :key="item.id">
                {{ item.id }}
              </div>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import auth from '@/firebase/auth';
import firestore from '@/firebase/firestore';
import functions from '@/firebase/functions';
import storage from '@/firebase/storage';
export default {
  name: 'UsersPage',
  data() {
    return {
      headers: [
        {
          text: 'Email Address',
          value: 'email'
        },
        {
          text: 'Username',
          value: 'username'
        },
        {
          text: 'Score',
          value: 'score'
        },
        {
          text: 'Permissions',
          value: 'permissions'
        },
        {
          text: 'Disabled',
          value: 'disabled'
        }
      ],
      users: {},
      input: [],
      role: '',
      disabled: false,
      updateIndex: 0
    };
  },
  computed: {
    inputSelected() {
      if (this.input.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    items() {
      // small hack to force this to update when there is updated user info
      this.updateIndex;

      return Object.keys(this.users).map((key) => this.users[key]);
    }
  },
  created() {
    this.$store.commit('setPageTitle', 'User Management');

    this.subscribeUserUpdates();
  },
  methods: {
    async subscribeUserUpdates() {
      const users = firestore.collection('users');
      (await users.get()).forEach((userDoc) => {
        this.users[userDoc.id] = {
          ...userDoc.data(),
          id: userDoc.id,
          isSelectable: auth.currentUser.uid !== userDoc.id
        };

        const userp = firestore.doc(`${userDoc.ref.path}/private/private`);
        userp.onSnapshot((doc) => {
          const priv = doc.data();
          this.users[userDoc.id] = { ...this.users[userDoc.id], ...priv };
          this.updateIndex++;
        });

        const user = firestore.doc(`${userDoc.ref.path}`);
        user.onSnapshot((doc) => {
          const data = doc.data();
          this.users[userDoc.id] = { ...this.users[userDoc.id], ...data };
          this.updateIndex++;
        });
      });
    },
    async deleteUser() {
      if (!this.inputSelected) {
        alert('Please select a user.');
      }
      if (auth.currentUser.uid === this.input[0].id) {
        alert(
          'Please delete your own account from your profile page in the main application.'
        );
      }
      if (
        confirm(
          'CONFIRM: You are about to delete a user.  Do you wish to proceed?'
        )
      ) {
        try {
          if (this.input[0].photoURL.length > 0) {
            const ref = storage.refFromURL(this.input[0].photoURL);
            await ref.delete();
          }
          const remove = functions.httpsCallable('removeUser');
          await remove({ uid: this.input[0].id });
        } catch (error) {
          alert(error);
        }
      }
    },
    async toggleDisabled() {
      try {
        const user = this.input[0];
        const toggle = functions.httpsCallable('disableUser');
        await toggle({ uid: user.id, disable: this.disabled });
      } catch (error) {
        alert(error);
      }
    },
    async setPermissions() {
      try {
        const user = this.input[0];

        if (!user) {
          alert('Please select a user.');
          return;
        }

        let isAdmin = false;
        const doc = await firestore.doc(`webmasters/${user.id}`).get();
        if (doc.exists) {
          isAdmin = true;
        } else {
          isAdmin = false;
        }

        if (auth.currentUser.uid === this.input[0].id) {
          alert('You cannot set permissions on your own account.');
          return;
        }

        if (this.role === 'User') {
          if (isAdmin) {
            const removeAdmin = functions.httpsCallable('removeAdmin');
            await removeAdmin({ uid: user.id });
          } else {
            alert('User is already a basic user.');
          }
        } else if (this.role === 'Admin') {
          await firestore
            .doc(`webmasters/${user.id}`)
            .set({ name: user.username });
          const addAdmin = functions.httpsCallable('addAdmin');
          await addAdmin({ uid: user.id });
        } else {
          alert(
            'Invalid user permissions.  Please select "User" or "Admin" to set permissions.'
          );
        }
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>

<style lang="scss">
#users {
  .spacer {
    height: 20px;
  }
}
</style>
