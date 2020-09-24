<template>
  <div class="text-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="retVal.content"
          filled
          label="Text"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TextComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'Text',
          defaultTxt: ''
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          content: this.props.defaultTxt
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
