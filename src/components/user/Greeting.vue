<template>
  <div class="greet-comp">
    <v-card class="card">
        <v-card-title>
            <h2>{{ props.headerTxt }}</h2>
        </v-card-title>
        <v-card-text>

            <h3>Big Text</h3>
            <v-text-field
                v-model="retVal.big1"
                label="Line 1">
            </v-text-field>
            <v-text-field
                v-model="retVal.big2"
                label="Line 2">
            </v-text-field>
            <br />

            <h3>Smaller Text</h3>
            <v-text-field
                v-model="retVal.small1"
                label="Line 1">
            </v-text-field>
            <v-text-field
                v-model="retVal.small2"
                label="Line 2">
            </v-text-field>
            <br />

            <h3>Background Image</h3>
           <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-image"
                label="Image Upload"
                v-model="imageFile"
            ></v-file-input>
            <v-btn color="primary" @click="uploadFile">Upload</v-btn>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
    name: 'GreetingComponent',
    data() {
        return {
            retVal: this.value,
            rules: [
                value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
            ],
            imageFile: null
        }
    },
    props: {
        name: String,
        props: {
            type: Object,
            default: function() {
                return {
                    headerTxt: 'Greeting',
                    maxItems: 0
                };
            }
        },
        value: {
            type: Object,
            default: function() { 
                return { 
                    big1: 'This is',
                    big2: 'an awesome greeting',
                    small1: 'You wont ever have to content manage again',
                    small2: 'because this app does it for you.'
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
        },
        uploadFile() {
            console.log(this.imageFile);
        }
    }
}
</script>

<style lang="scss">

.greet-comp {
    
    margin: 10px;

    .card {
        // min-width: 400px;
        margin: 0 auto;
    }

    h1 {
        line-height: 2.5rem;
    }

    .item-list {
        text-align: center;
    }
}

</style>