<template>
    <div class="header-comp">
        <v-card class="card">
        <v-card-title>
            <h1>{{ content }}</h1>
        </v-card-title>
        <v-card-text>
            <v-text-field label="Header" v-model="content"></v-text-field>
        </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',
    props: {
        contentProp: {
            type: String,
            default: 'I\'m a header!'
        }
    },
    data() {
        return {
            content: this.contentProp
        };
    }
}
</script>

<style lang="scss">

.header-comp {
    
    margin: 10px;

    .card {
        width: 400px;
        margin: 0 auto;
    }

    h1 {
        line-height: 2.5rem;
    }
}

</style>