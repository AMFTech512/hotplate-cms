<template>
    <div class="contact-comp">
        <v-card class="card">
        <v-card-title>
            <h2>{{ retVal.name }}</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field label="Full Name" v-model="retVal.name"></v-text-field>
            <v-text-field label="Email" v-model="retVal.email"></v-text-field>
            <v-text-field label="Phone" v-model="retVal.phone"></v-text-field>
        </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'ContactComponent',
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
                };
            }
        },
        value: {
            type: Object,
            default: function() { 
                return { 
                    name: 'John Doe',
                    email: '',
                    phone: ''
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

.contact-comp {
    
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