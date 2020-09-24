<template>
  <div class="header-txt-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ retVal.header }}</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="retVal.header"
          filled
          label="Header"
        ></v-text-field>
        <v-textarea v-model="retVal.text" filled label="Text"></v-textarea>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'HeaderNTextComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {
          headerTxt: "Header 'N Text",
          defaultTxt: ''
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          text: this.props.defaultTxt,
          header: this.props.headerTxt
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
    this.$emit('input', this.retVal);
  }
};
</script>

<style lang="scss">
.header-txt-comp {
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
