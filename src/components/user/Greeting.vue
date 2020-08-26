<template>
  <div class="greet-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <h3>Big Text</h3>
        <v-text-field v-model="retVal.big1" label="Line 1"> </v-text-field>
        <v-text-field v-model="retVal.big2" label="Line 2"> </v-text-field>
        <br />

        <h3>Smaller Text</h3>
        <v-text-field v-model="retVal.small1" label="Line 1"> </v-text-field>
        <v-text-field v-model="retVal.small2" label="Line 2"> </v-text-field>
        <br />

        <h3>Background Image</h3>
        <img
          v-if="imgPath"
          :src="imgPath"
          alt="Image"
          style="max-width: 300px; max-height: 200px;"
        />
        <v-file-input
          ref="fileInput"
          v-model="imageFile"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-image"
          label="Image Upload"
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
        <v-btn color="primary" :disabled="!canUpload" @click="uploadFile"
          >Upload</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import storage from '@/firebase/storage.js';

export default {
  name: 'GreetingComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'Greeting',
          imgPath: '/image.png'
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          big1: 'This is',
          big2: 'an awesome greeting',
          small1: 'You wont ever have to content manage again',
          small2: 'because this app does it for you.'
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Image size should be less than 2 MB!'
      ],
      imageFile: null,
      imgPath: this.value.imgPath,
      uploadProgress: 0
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
    this.updateData();
  },
  methods: {
    updateData() {
      this.$emit('input', this.retVal);
    },
    uploadFile() {
      const thisRef = this;

      const imgRef = storage.ref(this.props.imgPath);
      const uploadTask = imgRef.put(this.imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          thisRef.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => {
          console.log(err);
          alert(`An error occurred: ${JSON.stringify(err)}`);
          thisRef.uploadProgress = 0;
        }
      );

      uploadTask.then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          thisRef.retVal.imgPath = downloadURL;
          thisRef.imgPath = downloadURL;
        });
      });
    }
  }
};
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
