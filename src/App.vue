<template>
  <v-app id="app">

    <v-navigation-drawer
      v-if="showNav"
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-subheader v-if="SpecialPages.length > 0">
          Special Pages
        </v-subheader>
        <v-list-item link v-for="(page, index) in SpecialPages" :key="page.name" @click="navigate(`/spec/${index}`, page.name)">
          <!-- <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action> -->
          <v-list-item-content>
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-subheader v-if="RegularPages.length > 0">
          Regular Pages
        </v-subheader>
        <v-list-item link v-for="(page, index) in RegularPages" :key="page.name" @click="navigate(`/reg/${index}`, page.name)">
          <!-- <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action> -->
          <v-list-item-content>
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo darken-2" dark>
      <v-app-bar-nav-icon v-if="showNav" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="showSave" @click="save" color="blue" class="ma-2">
        Save
      </v-btn>
      <v-menu v-if="user" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            class="ma-2"
            v-on="on"
          >
            <v-avatar
              size="32px"
              item
            >
              <v-img
                :src="user.photoURL"
                alt="User Avatar"
              ></v-img></v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <router-view ref="currentPage" :key="$route.fullPath"/>
    </v-content>

    <v-snackbar
      v-model="hasSaved">
      The new content has been saved.
      <v-btn
        color="pink"
        text
        @click="hasSaved = false">
        Dismiss
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import { RegularPages, SpecialPages } from '@/pages/index.js'
import auth from '@/firebase/auth.js'

export default {
  data() {
    return {
      RegularPages,
      SpecialPages,
      drawer: false,
      hasSaved: false
    };
  },
  created() {
    this.$store.commit('enableAuthListener');
  },
  methods: {
    navigate(path, pageTitle) {
      this.$router.push(path);
    },
    save() {
      let thisRef = this;
      this.$refs.currentPage.save(() => {
        thisRef.hasSaved = true;
      });
    },
    logout() {
      auth.signOut().then(result => this.$router.push('/login') );
    }
  },
  computed: {
    pageTitle() {
      return this.$store.state.pageTitle;
    },
    user() {
      return this.$store.state.user;
    },
    showSave() {
      return this.$store.state.isWebmaster && this.$store.state.canSave;
    },
    showNav() {
      return this.$store.state.isWebmaster;
    }
  }
};
</script>

<style lang="scss">
</style>
