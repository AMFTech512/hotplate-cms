<template>
    <div class="header-comp">
        <v-card class="card">
        <v-card-title>
            <h2>{{ props.headerTxt }}</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field label="Text" v-model="content"></v-text-field>
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
        }
    },
    data() {
        return {
            content: this.props.defaultTxt
        };
    },
    created() {
        this.updateData()
    },
    watch: {
        content: function() {
            this.updateData()
        }
    },
    methods: {
        updateData() {
            this.$emit('dataChanged', { content: this.content });
        }
    }
}
</script>

<style lang="scss">

.header-comp {
    
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