<template>
  <div id="users">
    <v-card>
      <v-card-title>Manage Users</v-card-title>
      <v-card-subtitle
        >Select users from the table and manage them here.</v-card-subtitle
      >
      <v-card-text>
        <v-select
          v-model="role"
          label="User Permissions..."
          :items="['User', 'Admin']"
          :disabled="!inputSelected"
        />
        <v-btn :disabled="!inputSelected" @click="setPermissions"
          >Set Permissions</v-btn
        >
        <v-spacer />
        <v-switch
          v-model="disabled"
          label="Disabled"
          :disabled="!inputSelected"
        />
        <v-btn :disabled="!inputSelected" @click="toggleDisabled"
          >Update Disabled State</v-btn
        >
        <v-spacer />
        <v-btn
          color="red"
          class="white--text"
          :disabled="!inputSelected"
          @click="deleteUser"
          >Delete User</v-btn
        >
      </v-card-text>
    </v-card>
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
  </div>
</template>

<script>
import auth from "@/firebase/auth.js";
import firestore from "@/firebase/firestore.js";
import functions from "@/firebase/functions.js";
export default {
  name: "UsersPage",
  data() {
    return {
      headers: [
        {
          text: "Email Address",
          value: "email"
        },
        {
          text: "Username",
          value: "username"
        },
        {
          text: "Score",
          value: "score"
        },
        {
          text: "Permissions",
          value: "permissions"
        },
        {
          text: "Disabled",
          value: "disabled"
        }
      ],
      users: {},
      input: [],
      role: "",
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

      return Object.keys(this.users).map(key => this.users[key]);
    }
  },
  created() {
    this.$store.commit("setPageTitle", "User Management");

    this.subscribeUserUpdates();
  },
  methods: {
    async subscribeUserUpdates() {
      let thisRef = this;

      const users = firestore.collection("users");
      (await users.get()).forEach(userDoc => {
        console.log("User: ", userDoc.id);

        thisRef.users[userDoc.id] = {
          ...userDoc.data(),
          id: userDoc.id,
          isSelectable: auth.currentUser.uid !== userDoc.id
        };

        console.log(Object.keys(thisRef.users).map(key => thisRef.users[key]));

        const userp = firestore.doc(`${userDoc.ref.path}/private/private`);
        userp.onSnapshot(doc => {
          let priv = doc.data();
          thisRef.users[userDoc.id] = { ...thisRef.users[userDoc.id], ...priv };
          thisRef.updateIndex++;
        });

        const user = firestore.doc(`${userDoc.ref.path}`);
        user.onSnapshot(doc => {
          let data = doc.data();
          thisRef.users[userDoc.id] = { ...thisRef.users[userDoc.id], ...data };
          thisRef.updateIndex++;
        });
      });
    },
    deleteUser() {
      if (this.inputSelected) {
        if (auth.currentUser.uid !== this.input[0].id) {
          if (
            confirm(
              "CONFIRM: You are about to delete a user.  Do you wish to proceed?"
            )
          ) {
            const remove = functions.httpsCallable("removeUser");
            remove({ uid: this.input[0].id }).then(result => {
              console.log(result);
            });
          }
        } else {
          alert(
            "Please delete your own account from your profile page in the main application."
          );
        }
      } else {
        alert("Please select a user.");
      }
    },
    async toggleDisabled() {
      const user = this.input[0];
      const toggle = functions.httpsCallable("disableUser");
      toggle({ uid: user.id, disable: this.disabled })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async setPermissions() {
      const user = this.input[0];
      if (user !== undefined) {
        let isAdmin = false;
        await firestore
          .doc(`webmasters/${user.id}`)
          .get()
          .then(doc => {
            if (doc.exists) {
              isAdmin = true;
            } else {
              isAdmin = false;
            }
          });
        if (auth.currentUser.uid !== this.input[0].id) {
          if (this.role === "User") {
            if (isAdmin) {
              const removeAdmin = functions.httpsCallable("removeAdmin");
              removeAdmin({ uid: user.id }).then(result => {
                console.log(result);
              });
            } else {
              alert("User is already a basic user.");
            }
          } else if (this.role === "Admin") {
            firestore
              .doc(`webmasters/${user.id}`)
              .set({ name: user.username })
              .then(() => {
                console.log("Added user to admin database.");
                const addAdmin = functions.httpsCallable("addAdmin");
                addAdmin({ uid: user.id }).then(result => {
                  console.log(result);
                });
              })
              .catch(error => {
                alert(error);
              });
          } else {
            alert(
              'Invalid user permissions.  Please select "User" or "Admin" to set permissions.'
            );
          }
        } else {
          alert("You cannot set permissions on your own account.");
        }
      } else {
        alert("Please select a user.");
      }
    }
  }
};
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
