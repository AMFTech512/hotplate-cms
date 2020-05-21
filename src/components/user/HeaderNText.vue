<template>
  <div class="header-txt-comp">
    <v-card class="card">
        <v-card-title>
            <h2>{{ retVal.header }}</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field label="Header" v-model="retVal.header"></v-text-field>
            <v-textarea
                filled
                label="Text"
                v-model="retVal.text"
            ></v-textarea>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
    name: 'HeaderNTextComponent',
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
                    headerTxt: 'Header \'N Text',
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
    }
}
</script>

<style lang="scss">

.header-txt-comp {
    
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