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
      <component
        :is="component.vueComp"
        v-for="(component, name) in Page.components"
        :key="name"
        v-model="PageData[name]"
        :name="name"
        :props="component.props"
      />
    </div>
  </div>
</template>

<script>
import database from '@/firebase/firestore.js';
import { SpecialPages } from '@/pages/index.js';

export default {
  name: 'SpecialPage',
  data() {
    return {
      SpecialPages,
      PageData: {},
      loading: true
    };
  },
  computed: {
    Page() {
      return SpecialPages[this.$route.params.index];
    },
    docRef() {
      const path = (this.Page.dbPath[0] === '/' ? '' : '/') + this.Page.dbPath;
      const docRef = database.doc(`/hotplate-spec-pages${path}`);
      return docRef;
    }
  },
  async created() {
    this.$store.commit('setCanSave', true);
    this.PageData = (await this.docRef.get()).data() || {};
    this.loading = false;
  },
  updated() {
    this.$store.commit('setPageTitle', this.Page.name);
  },
  methods: {
    save(
      callback,
      err = (e) => {
        alert(`An error occurred: ${e}`);
      }
    ) {
      this.docRef.set(this.PageData).then(callback).catch(err);
    }
  }
};
</script>

<style lang="scss">
.sp-page {
  .loading {
    text-align: center;
    padding: 50px;
  }
}
</style>
