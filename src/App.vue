<template>
  <v-app id="app">

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>

        <v-list-item link v-for="(page, index) in RegularPages" :key="page.name" @click="navigate(`/reg/${index}`, page.name)">
          <!-- <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action> -->
          <v-list-item-content>
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-for="(page, index) in SpecialPages" :key="page.name" @click="navigate(`/spec/${index}`, page.name)">
          <!-- <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action> -->
          <v-list-item-content>
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo darken-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import { RegularPages, SpecialPages } from '@/pages/index.js'

export default {
  data() {
    return {
      RegularPages,
      SpecialPages,
      drawer: false
    };
  },
  methods: {
    navigate(path, pageTitle) {
      this.$router.push(path);
    }
  },
  computed: {
    pageTitle() {
      return this.$store.state.pageTitle;
    }
  }
};
</script>

<style lang="scss">
</style>
