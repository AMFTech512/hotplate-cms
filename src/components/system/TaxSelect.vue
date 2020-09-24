<template>
  <div class="text-comp">
    <v-card class="card">
      <v-card-title>
        <h2 v-if="isLoading">Loading taxonomy...</h2>
        <h2 v-else>{{ headerTxt }}</h2>
      </v-card-title>
      <v-card-text v-if="!isLoading">
        <v-select
          v-model="retVal.content"
          :items="options"
          filled
          label="Select"
        ></v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firestore from '@/firebase/firestore';

export default {
  name: 'TaxSelectComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {
          tax: ''
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          content: ''
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value,
      options: [],
      headerTxt: '',
      isLoading: true,
      taxonomy: null
    };
  },
  async created() {
    this.taxonomy = (
      await firestore.doc('/hotplate-cms/taxonomies').get()
    ).data()[this.props.tax];
    this.options = this.taxonomy.values;
    this.headerTxt = this.taxonomy.singular;
    this.isLoading = false;
    this.updateData();
  },
  methods: {
    updateData() {
      this.$emit('input', this.retVal);
    }
  }
};
</script>

<style lang="scss">
.text-comp {
  margin: 40px 0;

  .card {
    // min-width: 400px;
    margin: 0 auto;
  }

  h1 {
    line-height: 2.5rem;
  }
}
</style>
