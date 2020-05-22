<template>
  <div id="login-page">
      <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text align="center">
            <v-btn dark color="red" @click="signin">
                <v-icon left>mdi-google</v-icon>Sign in with Google
            </v-btn>

          </v-card-text>
      </v-card>
  </div>
</template>

<script>
import auth from '@/firebase/auth.js'
import firebase from '@/firebase/index.js'

export default {
    created() {
        this.$store.commit('setPageTitle', 'Login');
    },
    methods: {
        signin() {

            let thisRef = this;

            var provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).then( result => {
                // thisRef.$store.commit('setUser', result.user);
                thisRef.$router.push('/');
            }).catch( error => console.log(error) );
        }
    }
}
</script>

<style lang="scss">

    #login-page {
        > div {
            max-width: 400px;
            margin: 20px auto;
        }
    }

</style>