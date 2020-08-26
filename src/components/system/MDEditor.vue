<template>
  <div class="md-editor-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <VueSimplemde v-model="retVal.content" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';

export default {
  name: 'MarkdownEditorComponent',
  components: {
    VueSimplemde
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'Markdown Editor',
          defaultTxt: ''
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          content: this.props.defaultTxt || ''
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value
    };
  },
  computed: {},
  created() {
    this.$emit('input', this.retVal);
  },
  methods: {}
};
</script>

<style lang="scss">
@import '~simplemde/dist/simplemde.min.css';

.md-editor-comp {
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
