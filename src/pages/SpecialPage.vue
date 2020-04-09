<template>
  <div class="sp-page">    
      <component 
        v-for="(component, name) in Page.components" 
        :key="name"
        :is="component.vueComp"
        :name="name"
        :props="component.props"
        @dataChanged="updateData(name, $event)" />
  </div>
</template>

<script>
import { SpecialPages } from '@/pages/index.js'

export default {
  name: 'SpecialPage',
  data() {
    return {
      SpecialPages,
      PageData: {}
    }
  },
  computed: {
    Page() {
      return SpecialPages[this.$route.params.index]
    }
  },
  updated() {
    this.$store.commit('setPageTitle', this.Page.name);
  },
  methods: {
    updateData(name, newData) {
      this.PageData[name] = newData;
    }
  }
}
</script>

<style>

</style>