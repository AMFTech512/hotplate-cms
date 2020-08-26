<template>
  <div class="reg-page">
    <div v-if="loading" class="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else class="card-container">
      <h1>Meta</h1>
      <component
        :is="component.vueComp"
        v-for="(component, name) in Page.metaComponents"
        :key="name"
        v-model="MetaData[name]"
        :name="name"
        :props="component.props"
      />

      <h1>Content</h1>
      <component
        :is="component.vueComp"
        v-for="(component, name) in Page.bodyComponents"
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
import { RegularPages } from '@/pages/index.js';

export default {
  name: 'RegularPage',
  data() {
    return {
      RegularPages,
      MetaData: {},
      PageData: {},
      loading: true
    };
  },
  computed: {
    Page() {
      return RegularPages[this.$route.params.index];
    },
    metaRef() {
      const path = `${
        (this.Page.dbPath[0] === '/' ? '' : '/') + this.Page.dbPath
      }/${this.$route.params.id}`;
      const docRef = database.doc(path);
      return docRef;
    },
    docRef() {
      const path = `${this.Page.dbPath[0] === '/' ? '' : '/'}${
        this.Page.dbPath
      }/${this.$route.params.id}/deep/content`;
      const docRef = database.doc(path);
      return docRef;
    }
  },
  async created() {
    if (this.$route.params.id === '$new') {
      const path = (this.Page.dbPath[0] === '/' ? '' : '/') + this.Page.dbPath;
      const newDoc = await database.collection(path).add({});
      this.$router.push(`/reg/${this.$route.params.index}/${newDoc.id}`);
    }
    this.$store.commit('setCanSave', true);
    this.PageData = (await this.docRef.get()).data() || {};
    this.MetaData = (await this.metaRef.get()).data() || {};
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
      this.metaRef.set(this.MetaData).then(callback).catch(err);
    }
  }
};
</script>

<style lang="scss">
.reg-page {
  .loading {
    text-align: center;
    padding: 50px;
  }

  .card-container {
    padding: 10px;
  }
}
</style>
