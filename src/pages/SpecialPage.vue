<template>
  <div class="sp-page">
      Hello, I am a Special Page.
      <component 
        v-for="component in SpecialPages[0].components" 
        :key="component.index"
        :is="component.name" />
  </div>
</template>

<script>
import { SpecialPages } from '@/pages/index.js'

export default {
  components: {
    ...SpecialPages[0].components
  },
  data: () => ({
    SpecialPages
  })
}
</script>

<style>

</style>