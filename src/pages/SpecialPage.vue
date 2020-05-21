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
import database from '@/firebase/firestore.js'
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
    },
    save(callback, err = e => { alert(`An error occurred: ${e}`) }) {
      let path = ((this.Page.dbPath[0] == '/')? '' : '/') + this.Page.dbPath;
      let docRef = database.doc(`/hotplate-spec-pages${path}`);
      docRef.set(this.PageData).then(callback).catch(err);
    }
  }
}
</script>

<style>

</style>