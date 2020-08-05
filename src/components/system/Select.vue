<template>
  <div class="text-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="retVal.content"
          :items="props.options"
          item-text="text"
          item-value="value"
          filled
          label="Select"
        ></v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SelectComponent',
  props: {
    name: String,
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'Select',
          options: {}
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
.text-comp {
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
