<template>
    <div class="text-comp">
        <v-card class="card">
        <v-card-title>
            <h2>{{ props.headerTxt }}</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field label="Text" :value="value.content" @input="updateData($event)"></v-text-field>
        </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'TextComponent',
    props: {
        name: String,
        props: {
            type: Object,
            default: function() {
                return {
                    headerTxt: 'Text',
                    defaultTxt: ''
                };
            }
        },
        value: {
            type: Object,
            default: function() { return { content: this.props.defaultTxt } }
        }
    },
    created() {
        this.updateData(this.value.content);
    },
    methods: {
        updateData(input) {
            this.$emit('input', { content: input });
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