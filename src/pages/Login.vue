<template>
  <div id="login-page">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text align="center">
        <v-form ref="form" @submit.prevent="signin">
          <v-text-field
            v-model="email"
            outlined
            label="Email Address"
            type="email"
            dense
            hide-details="auto"
            :rules="[rules.required, rules.email]"
          />
          <v-spacer />
          <v-text-field
            v-model="password"
            outlined
            label="Password"
            type="password"
            dense
            hide-details="auto"
            :rules="[rules.required, rules.min]"
          />
          <v-spacer />
          <v-btn color="secondary" class="sectext--text" type="submit"
            >Sign In</v-btn
          >
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
import auth from '@/firebase/auth';
import functions from '@/firebase/functions';
import firebase from '@/firebase/index';
export default {
  data() {
    return {
      email: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (value) => (value && value.length >= 8) || 'Min 8 characters',
        email: (value) => /.+@.+/.test(value) || 'E-mail must be valid'
      }
    };
  },
  created() {
    this.$store.commit('setPageTitle', 'Login');
  },
  methods: {
    async signin() {
      try {
        const isValid = this.$refs.form.validate();
        if (isValid) {
          await auth.signInWithEmailAndPassword(this.email, this.password);
          this.$router.push('/');
        } else {
          return;
        }
      } catch (error) {
        alert(error);
      }
    },
    async signinG() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        this.$router.push('/');
      } catch(error) {
        alert(error);
      }
    }
  }
};
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
