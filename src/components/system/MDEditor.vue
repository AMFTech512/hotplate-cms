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
  margin: 40px 0;

  .card {
    margin: 0 auto;
  }

  h1 {
    line-height: 2.5rem;
  }

  .CodeMirror {
    background-color: #1e1e1e;
    color: white;
  }

  .CodeMirror-cursor {
    border-color: white;
  }

  .CodeMirror-line::selection,
  .CodeMirror-selected {
    background-color: #0a67d6 !important;
    > span {
      color: black !important;
    }
  }

  .cm-link {
    color: var(--v-anchor-base) !important;
  }

  .editor-toolbar a {
    color: #f0d3d3 !important;
  }

  .editor-toolbar a:hover,
  a.active {
    background-color: #3e3e3e;
  }

  .cm-spell-error {
    background-color: #ff525290 !important;
  }

  .CodeMirror-code .cm-string {
    color: #6d85d0;
  }

  .CodeMirror-code .cm-attribute {
    color: #937cb6;
  }

  .editor-preview,
  .editor-preview-side,
  .editor-toolbar {
    background-color: #1e1e1e;
  }

  .editor-toolbar::before,
  .editor-toolbar::after {
    background: #1e1e1e !important;
  }

  .disabled-for-preview a {
    background-color: #4e4e4e !important;
  }
}
</style>
