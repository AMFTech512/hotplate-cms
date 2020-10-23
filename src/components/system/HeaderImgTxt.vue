<template>
  <div class="header-img-txt-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ retVal.header }}</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="retVal.header"
          filled
          label="Header"
        ></v-text-field>
        <v-textarea v-model="retVal.text" filled label="Text"></v-textarea>
        <h3>Image</h3>
        <img
          v-if="imgPath"
          :src="imgPath"
          alt="Image"
          style="max-width: 300px; max-height: 200px"
        />
        <v-file-input
          ref="fileInput"
          v-model="imageFile"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp, .svg"
          prepend-inner-icon="mdi-image"
          prepend-icon=""
          filled
          label="Image Upload"
        ></v-file-input>
        <v-progress-linear
          :active="uploadProgress !== 0"
          background-opacity=".3"
          buffer-value="100"
          height="4"
          rounded
          :value="uploadProgress"
          color="secondary"
        ></v-progress-linear>
        <br />
        <v-btn
          color="secondary"
          class="sectext--text"
          :disabled="!canUpload"
          @click="uploadFile"
          >Upload</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import storage from '@/firebase/storage';

export default {
  name: 'HeaderImgTxtComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'Header, Image, Text',
          defaultTxt: '',
          imgPath: '/media'
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          text: this.props.defaultTxt || '',
          header: this.props.headerTxt || 'Header, Image, Text'
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value,
      imgPath: this.value.imgPath,
      imageFile: null,
      uploadProgress: 0,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Image size should be less than 2 MB!'
      ]
    };
  },
  computed: {
    canUpload() {
      return (
        this.imageFile &&
        (this.uploadProgress === 0 || this.uploadProgress === 100) &&
        this.$refs.fileInput.validate()
      );
    }
  },
  created() {
    this.$emit('input', this.retVal);
  },
  methods: {
    uploadFile() {
      const imgRef = storage.ref(
        `${this.props.imgPath || '/media'}/${this.imageFile.name}`
      );
      const uploadTask = imgRef.put(this.imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          alert(`An error occurred: ${JSON.stringify(error)}`);
          this.uploadProgress = 0;
        },
        async () => {
          try {
            this.uploadProgress = 100;
            const url = await uploadTask.snapshot.ref.getDownloadURL();
            this.retVal.imgPath = url;
            this.imgPath = url;
          } catch (error) {
            alert(error);
          }
        }
      );
    }
  }
};
</script>

<style lang="scss">
.header-img-txt-comp {
  margin: 40px 0;

  .card {
    margin: 0 auto;
  }

  h1 {
    line-height: 2.5rem;
  }
}
</style>
