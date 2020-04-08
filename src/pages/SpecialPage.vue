<template>
  <div class="sp-page">    
      <component 
        v-for="component in Page.components" 
        :key="component.index"
        :is="component" />
  </div>
</template>

<script>
import { SpecialPages } from '@/pages/index.js'

export default {
  data() {
    return {
      SpecialPages
    }
  },
  computed: {
    Page() {
      return SpecialPages[this.$route.params.index]
    }
  },
  updated() {
    this.$store.commit('setPageTitle', this.Page.name);
  }
}
</script>

<style>

</style>