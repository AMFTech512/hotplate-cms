<template>
  <div class="header-img-txt-comp">
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
            <h3>Image</h3>
            <img 
                v-if="imgPath" 
                :src="imgPath"
                alt="Image" 
                style="max-width: 300px; max-height: 200px;">
            <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp, .svg"
                prepend-icon="mdi-image"
                label="Image Upload"
                v-model="imageFile"
                ref="fileInput"
            ></v-file-input>
            <v-progress-linear
                :active="uploadProgress != 0"
                background-opacity=".3"
                buffer-value="100"
                height="4"
                rounded
                :value="uploadProgress"
                color="light-blue"
            ></v-progress-linear>
            <br />
            <v-btn color="primary" @click="uploadFile" :disabled="!canUpload">Upload</v-btn>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
import storage from '@/firebase/storage.js'

export default {
    name: 'HeaderImgTxtComponent',
    data() {
        return {
            retVal: this.value,
            imgPath: this.value.imgPath,
            imageFile: null,
            uploadProgress: 0,
            rules: [
                value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
            ],
        }
    },
    props: {
        name: String,
        props: {
            type: Object,
            default: function() {
                return {
                    headerTxt: 'Header, Image, Text',
                    defaultTxt: '',
                    imgPath: '/media'
                };
            }
        },
        value: {
            type: Object,
            default: function() { 
                return { 
                    text: this.props.defaultTxt || '',
                    header: this.props.headerTxt || 'Header, Image, Text'
                }
            }
        }
    },
    created() {
        this.$emit('input', this.retVal);
    },
    methods: {
        uploadFile() {

            let thisRef = this;

            let imgRef = storage.ref(`${this.props.imgPath || '/media'}/${this.imageFile.name}`);
            var uploadTask = imgRef.put(this.imageFile);
            uploadTask.on('state_changed', snapshot => {
                thisRef.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            err => {
                console.log(err);
                alert(`An error occurred: ${JSON.stringify(err)}`);
                thisRef.uploadProgress = 0;
            })

            uploadTask.then(snapshot => {
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    thisRef.retVal.imgPath = downloadURL;
                    thisRef.imgPath = downloadURL;
                });
            })
        }
    },
    computed: {
        canUpload() {
            return this.imageFile && (this.uploadProgress == 0 || this.uploadProgress == 100) && this.$refs.fileInput.validate();
        }
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