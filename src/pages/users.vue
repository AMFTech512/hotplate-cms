<template>
  <div id="users">
    <v-card>
      <v-card-title>Manage Users</v-card-title>
      <v-card-subtitle>Select users from the table and manage them here.</v-card-subtitle>
      <v-card-text>
        <v-select
        label="User Permissions..."
        :items="['User','Admin']"
        v-model="role"
        :disabled="!inputSelected"
        />
        <v-btn @click="setPermissions" :disabled="!inputSelected">Set Permissions</v-btn>
        <v-spacer />
        <v-switch label="Disabled" v-model="disabled" :disabled="!inputSelected" />
        <v-btn @click="toggleDisabled" :disabled="!inputSelected">Update Disabled State</v-btn>
        <v-spacer />
        <v-btn color="red" class="white--text" @click="deleteUser" :disabled="!inputSelected">Delete User</v-btn>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Select Users</v-card-title>
      <v-card-text align="center">
        <v-data-table
        show-select
        single-select
        :headers="headers"
        :items="items"
        v-model="input">
          <template #item.disabled="{ item }">
            <v-simple-checkbox v-model="item.disabled" disabled />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import auth from '@/firebase/auth.js'
import firestore from '@/firebase/firestore.js'
import functions from '@/firebase/functions.js'
export default {
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
      items: [],
      input: [],
      role: '',
      disabled: false
    }
  },
  computed: {
    inputSelected() {
      if (this.input.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  async created() {
    this.$store.commit('setPageTitle', 'User Management');
    const users = firestore.collection('users');
    const thisRef = this;
    users.onSnapshot((docs) => {
      thisRef.items = [];
      docs.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        if (auth.currentUser.uid === data.id) {
          data.isSelectable = false;
        } else {
          data.isSelectable = true;
        }
        const userp = firestore.doc(`${doc.ref.path}/private/private`);
        userp.onSnapshot(doc => {
          let priv = doc.data();
          data.email = priv.email;
          data.disabled = priv.disabled;
          data.permissions = priv.permissions;
          thisRef.items.push(data);
        })
      })
    })
  },
  methods: {
    deleteUser() {
      if (this.inputSelected) {
        if (auth.currentUser.uid !== this.input[0].id) {
          if (confirm('CONFIRM: You are about to delete a user.  Do you wish to proceed?')) {
            const remove = functions.httpsCallable('removeUser');
            remove({ uid: this.input[0].id }).then((result) => {
              console.log(result);
            });
          }
        } else {
          alert('Please delete your own account from your profile page in the main application.');
        }
      } else {
        alert('Please select a user.');
      }
    },
    async toggleDisabled() {
      const user = this.input[0];
      let isDisabled = false;
      await firestore.doc(`users/${user.id}/private/private`).get().then((doc) => {
        if (doc.data().disabled) {
          isDisabled = true;
        } else {
          isDisabled = false
        }
      })
      if (this.inputSelected) {
        if (auth.currentUser.uid !== user.id) {
          if (this.disabled) {
            if (!isDisabled) {
              const toggle = functions.httpsCallable('disableUser');
              toggle({ uid: user.id, disable: true }).then((result) => {
                console.log(result);
              }).catch((error) => {
                console.log(error);
              })
            } else {
              alert('This user is already disabled.');
            }
          } else if (!this.disabled) {
            if (isDisabled) {
              const toggle = functions.httpsCallable('disableUser');
              toggle({ uid: user.id, disable: false }).then((result) => {
                console.log(result);
              }).catch((error) => {
                console.log(error);
              })
            } else {
              alert('User is not disabled.');
            }
          }
        }
      }
    },
    async setPermissions() {
      const user = this.input[0];
      if (user !== undefined) {
        let isAdmin = false;
        await firestore.doc(`webmasters/${user.id}`).get().then((doc) => {
          if (doc.exists) {
            isAdmin = true;
          } else {
            isAdmin = false;
          }
        })
        if(auth.currentUser.uid !== this.input[0].id) {
          if (this.role === 'User') {
            if (isAdmin) {
              const removeAdmin = functions.httpsCallable('removeAdmin');
              removeAdmin({ uid: user.id }).then((result) => {
                console.log(result);
              })
            } else {
              alert('User is already a basic user.');
            }
          } else if (this.role === 'Admin') {
            firestore.doc(`webmasters/${user.id}`).set({ name: user.username }).then(() => {
              console.log('Added user to admin database.');
              const addAdmin = functions.httpsCallable('addAdmin');
              addAdmin({ uid: user.id }).then((result) => {
                console.log(result);
              })
            }).catch((error) => {
              alert(error);
            });
          } else {
            alert('Invalid user permissions.  Please select "User" or "Admin" to set permissions.');
          }
        } else {
          alert('You cannot set permissions on your own account.');
        }
      } else {
        alert('Please select a user.');
      }
    }
  }
}
</script>

<style lang="scss">
#users {
  > div {
    margin: 20px;
  }

  .spacer {
    height: 20px;
  }

  .v-btn {
    width: 100%;
  }
}
</style>