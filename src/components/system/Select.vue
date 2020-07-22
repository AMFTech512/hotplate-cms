<template>
    <div class="text-comp">
        <v-card class="card">
        <v-card-title>
            <h2>{{ props.headerTxt }}</h2>
        </v-card-title>
        <v-card-text>
            <v-select
                :items="props.options"
                item-text="text"
                item-value="value"
                filled
                label="Select"
                v-model="retVal.content"
            ></v-select>
        </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'SelectComponent',
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
                    headerTxt: 'Select',
                    options: {}
                };
            }
        },
        value: {
            type: Object,
            default: function() { 
                return { 
                    content: ''
                }
            }
        }
    },
    created() {
        this.updateData();
    },
    methods: {
        updateData() {
            this.$emit('input', this.retVal);
        }
    }
}
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