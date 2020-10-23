<template>
  <v-app id="app">
    <v-navigation-drawer v-if="showNav" v-model="drawer" app>
      <v-list dense nav>
        <v-list-item-group color="secondary">
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

          <v-list-item to="/theme">
            <v-list-item-content>
              <v-list-item-title>Theme</v-list-item-title>
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

    <v-app-bar app color="primary" class="pritext--text">
      <v-app-bar-nav-icon
        v-if="showNav"
        color="pritext"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="showSave"
        color="secondary"
        class="ma-2 sectext--text"
        @click="save"
      >
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
      <v-container>
        <router-view ref="currentPage" :key="$route.fullPath" />
      </v-container>
    </v-main>

    <v-snackbar v-model="hasSaved">
      The new content has been saved.
      <template #action>
        <v-btn color="pink" text @click="hasSaved = false">Dismiss</v-btn>
      </template>
    </v-snackbar>

    <v-footer class="mt-10">
      <span class="mr-4 cardtext--text">&copy; 2020 Hotplate CMS</span>
      <v-spacer />
      <v-switch
        v-model="$vuetify.theme.dark"
        label="Dark Mode"
        @click="setMode"
      />
    </v-footer>
  </v-app>
</template>

<script>
import { RegularPages, SpecialPages } from '@/pages/index';
import auth from '@/firebase/auth';
import firestore from '@/firebase/firestore';

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
  async created() {
    this.$store.commit('enableAuthListener');
    const theme = localStorage.getItem('darkMode');
    if (theme) {
      this.$vuetify.theme.dark = theme === 'true';
    }
    const storedThemes = await localStorage.getItem('hotplateTheme');
    if (storedThemes) {
      this.$vuetify.theme.themes.light = JSON.parse(storedThemes).light;
      this.$vuetify.theme.themes.dark = JSON.parse(storedThemes).dark;
    }
    const doc = await firestore.doc('hotplate-cms/theme').get();
    if (doc.exists) {
      const data = doc.data();
      this.$vuetify.theme.themes.light = data.light;
      this.$vuetify.theme.themes.dark = data.dark;
    }
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      if (this.$store.state.canSave && event.ctrlKey && event.keyCode === 83) {
        event.preventDefault();
        this.save();
      } else if (event.ctrlKey && event.keyCode === 83) {
        event.preventDefault();
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener('keydown', (event) => {
      if (this.$store.state.canSave && event.ctrlKey && event.keyCode === 83) {
        event.preventDefault();
        this.save();
      } else if (event.ctrlKey && event.keyCode === 83) {
        event.preventDefault();
      }
    });
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
    },
    setMode() {
      localStorage.setItem('darkMode', this.$vuetify.theme.dark);
    }
  }
};
</script>

<style lang="scss"></style>
