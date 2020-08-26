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
    <div v-else class="card-container">
      <v-card v-for="page in Pages" :key="page.id" class="card">
        <v-card-title class="title">
          <router-link :to="`/reg/${$route.params.index}/${page.id}`">{{
            getTitle(page)
          }}</router-link>
          <v-btn
            class="align-right"
            icon
            @click="delPage(page.id, getTitle(page))"
          >
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </div>
    <div class="add-btn-div">
      <v-btn fab color="primary" @click="addPage"
        ><v-icon dark>mdi-plus</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import database from '@/firebase/firestore.js';
import { RegularPages } from '@/pages/index.js';
import { getProp } from '@/lib/nested-obj.js';

export default {
  name: 'RegularPage',
  data() {
    return {
      RegularPages,
      Pages: [],
      loading: true
    };
  },
  computed: {
    Page() {
      return RegularPages[this.$route.params.index];
    },
    collectionRef() {
      const path = (this.Page.dbPath[0] === '/' ? '' : '/') + this.Page.dbPath;
      const docRef = database.collection(path);
      return docRef;
    }
  },
  async created() {
    (await this.collectionRef.get()).forEach((doc) => this.Pages.push(doc));
    this.loading = false;
  },
  updated() {
    this.$store.commit('setPageTitle', this.Page.name);
  },
  methods: {
    getTitle(doc) {
      if (!this.Page.listItem) {
        return doc.id;
      }

      return getProp(doc.data(), this.Page.listItem.title) || doc.id;
    },
    addPage() {
      this.$router.push(`${this.$route.path}/$new`);
    },
    async delPage(id, name) {
      if (confirm(`Are you sure you want to delete ${name}?`)) {
        try {
          await this.collectionRef.doc(id).delete();
          this.Pages = this.Pages.filter((page) => page.id !== id);
        } catch (e) {
          console.error(e);
          alert('Oops! An error has occurred.');
        }
      }
    }
  }
};
</script>

<style lang="scss">
.reg-index-page {

  .loading {
    text-align: center;
    padding: 50px;
  }

  .add-btn-div {
    text-align: center;
    margin: 10px;
  }

  .card {
    // min-width: 400px;
    margin: 10px auto;

    > .title {
      justify-content: space-between;
    }
  }

  .card-container {
    padding: 10px;
  }

}
</style>
