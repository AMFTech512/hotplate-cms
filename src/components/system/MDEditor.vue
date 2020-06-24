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
import VueSimplemde from 'vue-simplemde'

export default {
    name: 'MarkdownEditorComponent',
    components: {
        VueSimplemde
    },
    data() {
        return {
            retVal: this.value
        }
    },
    props: {
        name: String,
        props: {
            type: Object,
            default: function() {
                return {
                    headerTxt: 'Markdown Editor',
                    defaultTxt: ''
                };
            }
        },
        value: {
            type: Object,
            default: function() { 
                return { 
                    content: this.props.defaultTxt || ''
                }
            }
        }
    },
    created() {
        this.$emit('input', this.retVal);
    },
    methods: {
    },
    computed: {
    }
}
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