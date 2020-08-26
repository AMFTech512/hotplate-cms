<template>
  <div class="quote-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="retVal.author"
          label="Author"
          @input="updateData()"
        ></v-text-field>
        <v-textarea v-model="retVal.quote" filled label="Quote"></v-textarea>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'QuoteComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'Quote',
          defaultTxt: ''
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          quote: this.props.defaultTxt,
          author: ''
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value
    };
  },
  created() {
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
.quote-comp {
  margin: 10px;

  .card {
    // min-width: 400px;
    margin: 0 auto;
  }

  h1 {
    line-height: 2.5rem;
  }
}
</style>
