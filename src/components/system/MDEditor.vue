<template>
  <div class="header-img-txt-comp">
    <v-card class="card">
        <v-card-title>
            <h2>{{ retVal.header }}</h2>
        </v-card-title>
        <v-card-text>
            <markdown-editor></markdown-editor>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
    name: 'MarkdownEditorComponent',
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
                    text: this.props.defaultTxt,
                    header: this.props.headerTxt
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

.header-img-txt-comp {
    
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