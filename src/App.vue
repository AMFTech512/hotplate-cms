<template>
  <v-app id="app">
    <v-navigation-drawer v-if="showNav" v-model="drawer" app>
      <v-list dense nav>
        <v-list-item-group color="primary">
          <v-subheader>Global</v-subheader>

          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/users">
            <v-list-item-content>
              <v-list-item-title>User Management</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/taxonomies">
            <v-list-item-content>
              <v-list-item-title>Taxonomies</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <v-subheader v-if="SpecialPages.length > 0">
            Special Pages
          </v-subheader>
          <v-list-item
            v-for="(page, index) in SpecialPages"
            :key="page.name"
            :to="`/spec/${index}`"
          >
            <v-list-item-content>
              <v-list-item-title>{{ page.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <v-subheader v-if="RegularPages.length > 0">
            Regular Pages
          </v-subheader>
          <v-list-item
            v-for="(page, index) in RegularPages"
            :key="page.name"
            :to="`/reg/${index}`"
          >
            <v-list-item-content>
              <v-list-item-title>{{ page.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo darken-2" dark>
      <v-app-bar-nav-icon
        v-if="showNav"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="showSave" color="blue" class="ma-2" @click="save">
        Save
      </v-btn>
      <v-menu v-if="user" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon large class="ma-2" v-on="on">
            <v-avatar size="32px" item>
              <v-img
                v-if="user.photoURL"
                :src="user.photoURL"
                alt="User Avatar" />
              <v-img v-else src="@/assets/profile.png" alt="User Avatar"
            /></v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view ref="currentPage" :key="$route.fullPath" />
    </v-main>

    <v-snackbar v-model="hasSaved">
      The new content has been saved.
      <v-btn color="pink" text @click="hasSaved = false">
        Dismiss
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { RegularPages, SpecialPages } from '@/pages/index.js';
import auth from '@/firebase/auth.js';

export default {
  data() {
    return {
      RegularPages,
      SpecialPages,
      drawer: false,
      hasSaved: false
    };
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
  },
  created() {
    this.$store.commit('enableAuthListener');
  },
  methods: {
    save() {
      const thisRef = this;
      this.$refs.currentPage.save(() => {
        thisRef.hasSaved = true;
      });
    },
    logout() {
      auth.signOut().then(() => this.$router.push('/login'));
    }
  }
};
</script>

<style lang="scss"></style>
