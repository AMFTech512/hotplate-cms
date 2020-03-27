<template>
  <v-app id="app">
    <div id="nav">
      <router-link v-for="(page, index) in RegularPages" :key="page.name" :to="`/reg/${index}`">{{ ` ${page.name} |` }}</router-link>
      <router-link v-for="(page, index) in SpecialPages" :key="page.name" :to="`/spec/${index}`">{{ ` ${page.name} |` }}</router-link>
    </div>
    <router-view/>
  </v-app>
</template>

<script>
import { RegularPages, SpecialPages } from '@/pages/index.js'

export default {
  data() {
    return {
      RegularPages,
      SpecialPages
    };
  }
};
</script>

<style lang="scss">
</style>
