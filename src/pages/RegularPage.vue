<template>
  <div class="sp-page">
    <div v-if="loading" class="loading">    
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <h1>Meta</h1>
      <component 
        v-for="(component, name) in Page.metaComponents" 
        :key="name"
        :is="component.vueComp"
        :name="name"
        :props="component.props"
        v-model="MetaData[name]" />

      <h1>Content</h1>
      <component 
        v-for="(component, name) in Page.bodyComponents" 
        :key="name"
        :is="component.vueComp"
        :name="name"
        :props="component.props"
        v-model="PageData[name]" />
    </div>
  </div>
</template>

<script>
import database from '@/firebase/firestore.js'
import { RegularPages } from '@/pages/index.js'

export default {
  name: 'RegularPage',
  data() {
    return {
      RegularPages,
      MetaData: {},
      PageData: {},
      loading: true
    }
  },
  computed: {
    Page() {
      return RegularPages[this.$route.params.index];
    },
    metaRef() {
      let path = ((this.Page.dbPath[0] == '/')? '' : '/') + this.Page.dbPath + '/' + this.$route.params.id;
      let docRef = database.doc(path);
      return docRef;
    },
    docRef() {
      let path = `${((this.Page.dbPath[0] == '/')? '' : '/')}${this.Page.dbPath}/${this.$route.params.id}/deep/content`;
      let docRef = database.doc(path);
      return docRef;
    }
  },
  async created() {
    this.$store.commit('setCanSave', true);
    this.PageData = (await this.docRef.get()).data() || {};
    this.MetaData = (await this.metaRef.get()).data() || {};
    this.loading = false;
  },
  updated() {
    this.$store.commit('setPageTitle', this.Page.name);
  },
  methods: {
    save(callback, err = e => { alert(`An error occurred: ${e}`) }) {
      this.docRef.set(this.PageData).then(callback).catch(err);
      this.metaRef.set(this.MetaData).then(callback).catch(err);
    }
  }
}
</script>

<style lang="scss">

.sp-page {
  .loading {
    text-align: center;
    padding: 50px;
  }
}

</style>