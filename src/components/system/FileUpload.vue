<template>
  <div class="file-upload-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <div v-if="filePath">
          <h4>
            File Name:
            <span style="font-weight: normal">{{ retVal.name }}</span>
          </h4>
          <h4>
            URL: <a target="new" :href="filePath">{{ filePath }}</a>
          </h4>
        </div>
        <br />
        <v-file-input
          ref="fileInput"
          v-model="file"
          prepend-inner-icon="mdi-file"
          prepend-icon=""
          label="Image Upload"
          filled
        ></v-file-input>
        <v-progress-linear
          :active="uploadProgress != 0"
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
import storage from '@/firebase/storage.js';

export default {
  name: 'FileUploadComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'File Upload',
          defaultTxt: '',
          filePath: '/media'
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          name: '',
          fileURL: ''
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value,
      filePath: this.value.fileURL,
      file: null,
      uploadProgress: 0
    };
  },
  computed: {
    canUpload() {
      return (
        this.file && (this.uploadProgress === 0 || this.uploadProgress === 100)
      );
    }
  },
  created() {
    this.$emit('input', this.retVal);
  },
  methods: {
    async uploadFile() {
      const thisRef = this;
      const fileRef = storage.ref(
        `${this.props.filePath || '/media'}/${this.file.name}`
      );

      let overwrite = true;

      try {
        await fileRef.getDownloadURL();
        overwrite = confirm(
          'That file already exists. Do you want to overwrite it?'
        );
      } catch (e) {
        overwrite = true;
      }

      if (!overwrite) {
        this.file = null;
        return;
      }

      this.retVal.name = this.file.name;

      const uploadTask = fileRef.put(this.file);
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
          thisRef.retVal.fileURL = downloadURL;
          thisRef.filePath = downloadURL;
        });
      });
    }
  }
};
</script>

<style lang="scss">
.file-upload-comp {
  margin: 40px 0;

  .card {
    // min-width: 400px;
    margin: 0 auto;
  }

  h1 {
    line-height: 2.5rem;
  }
}
</style>
