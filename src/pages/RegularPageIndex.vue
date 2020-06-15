<template>
  <div class="reg-index-page">
    <div v-if="loading" class="loading">    
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </div>
    <div class="card-container" v-else>
      <v-card class="card" v-for="page in Pages" :key="page.id">
        <v-card-title>
          <router-link :to="`/reg/${$route.params.index}/${page.id}`">{{ getTitle(page) }}</router-link>
        </v-card-title>
      </v-card>
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
      Pages: [],
      loading: true
    }
  },
  computed: {
    Page() {
      return RegularPages[this.$route.params.index];
    },
    collectionRef() {
      let path = ((this.Page.dbPath[0] == '/')? '' : '/') + this.Page.dbPath;
      let docRef = database.collection(path);
      return docRef;
    }
  },
  methods: {
    getTitle(doc) {
      if(!this.Page.listItem)
        return doc.id;

      return doc.data()[this.Page.listItem.title] || doc.id;
    }
  },
  async created() {
    (await this.collectionRef.get()).forEach(doc => this.Pages.push(doc));
    this.loading = false;
  },
  updated() {
    this.$store.commit('setPageTitle', this.Page.name);
  }
}
</script>

<style lang="scss">

.reg-index-page {
  .loading {
    text-align: center;
    padding: 50px;
  }

  .card {
    // min-width: 400px;
    margin: 10px auto;
  }

  .card-container {
    padding: 10px;
  }
}

</style>