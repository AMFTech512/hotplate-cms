<template>
  <div class="quote-comp">
    <v-card class="card">
        <v-card-title>
            <h2>{{ props.headerTxt }}</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field label="Author" v-model="retVal.author" @input="updateData()"></v-text-field>
            <v-textarea
                filled
                label="Quote"
                v-model="retVal.quote"
            ></v-textarea>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
    name: 'QuoteComponent',
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
                    headerTxt: 'Quote',
                    defaultTxt: ''
                };
            }
        },
        value: {
            type: Object,
            default: function() { 
                return { 
                    quote: this.props.defaultTxt,
                    author: ''
                }
            }
        }
    },
    created() {
        this.updateData(this.value.content);
    },
    methods: {
        updateData() {
            this.$emit('input', this.retVal);
        }
    }
}
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