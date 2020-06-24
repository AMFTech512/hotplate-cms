<template>
  <div id="login-page">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text align="center">
        <v-form @submit.prevent="signin" ref="form">
          <v-text-field
          outlined
          label="Email Address"
          type="email"
          dense
          hide-details="auto"
          :rules="[rules.required, rules.email]"
          v-model="email"
          />
          <v-spacer />
          <v-text-field
          outlined
          label="Password"
          type="password"
          dense
          hide-details="auto"
          :rules="[rules.required, rules.min]"
          v-model="password"
          />
          <v-spacer />
          <v-btn type="submit">Sign In</v-btn>
        </v-form>
        <v-spacer />
        <h3>OR</h3>
        <v-spacer />
        <v-btn dark color="red" @click="signinG">
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
  data() {
    return {
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: value => (value && value.length >= 8) || 'Min 8 characters',
        email: value => /.+@.+/.test(value) || 'E-mail must be valid'
      }
    }
  },
  created() {
      this.$store.commit('setPageTitle', 'Login');
  },
  methods: {
    signin() {
      const isValid = this.$refs.form.validate();
      if (isValid === true) {
        const thisRef = this;
        auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
          thisRef.$router.push('/');
        }).catch((error) => {
          alert(error);
        })
      } else {
        return false;
      }
    },
    signinG() {
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

  .spacer {
    height: 20px;
  }

  .v-btn {
    width: 100%;
  }
}
</style>