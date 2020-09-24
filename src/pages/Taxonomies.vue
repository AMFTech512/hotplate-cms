<template>
  <div id="taxonomies-page">
    <div v-if="isLoading" class="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card v-else class="tax-card">
      <v-card-title>Taxonomies</v-card-title>
      <v-card-subtitle>
        Add taxonomies to help categorize your regular pages.
      </v-card-subtitle>
      <v-card-text>
        <v-list>
          <TaxonomyComp
            v-for="(tax, index) in taxonomies"
            :key="tax.id"
            v-model="taxonomies[index]"
            @delete="delTax(index)"
          />
          <br />
        </v-list>
        <v-btn
          absolute
          fab
          bottom
          left
          color="secondary"
          class="sectext--text"
          @click="newTax()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import database from '@/firebase/firestore.js';
import TaxonomyComp from '@/components/ui/Tax.vue';

export default {
  name: 'TaxonomiesPage',
  components: {
    TaxonomyComp
  },
  data() {
    return {
      isLoading: true,
      taxonomies: []
    };
  },
  async created() {
    this.$store.commit('setCanSave', true);

    const taxObj = (
      await database.doc('/hotplate-cms/taxonomies').get()
    ).data();
    this.taxonomies = Object.values(taxObj);
    this.taxonomies.sort((a, b) => a.id - b.id);
    this.isLoading = false;
  },
  methods: {
    newTax() {
      this.taxonomies.push({
        id: Date.now(),
        values: []
      });
    },
    delTax(index) {
      this.taxonomies.splice(index, 1);
    },
    save(
      callback,
      err = (e) => {
        alert(`An error occurred: ${e}`);
      }
    ) {
      const taxObj = {};

      for (const tax of this.taxonomies) {
        taxObj[tax.slug] = tax;
      }

      database
        .doc('/hotplate-cms/taxonomies')
        .set(taxObj)
        .then(callback)
        .catch(err);
    }
  }
};
</script>

<style lang="scss">
#taxonomies-page {
  padding: 10px;

  .tax-card {
    max-width: 500px;
    margin: auto;
  }

  .loading {
    text-align: center;
  }

  .border {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
    margin: 5px 0;
  }
}
</style>
