<!-- A great component for a page header.  This allows you to have a page title, subtitle, to upload an image for the background, and to create a 100vh or 50vh header. -->

<template>
  <div class="header-comp">
    <v-card>
      <v-card-title>
        <h2>{{ props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <h3 class="mb-4">Heading</h3>
        <v-text-field
          v-model="retVal.head"
          color="secondary"
          filled
          label="Heading"
        />
        <h3 class="mb-4">Subheading</h3>
        <v-text-field
          v-model="retVal.sub"
          color="secondary"
          filled
          label="Subheading"
        />
        <h3 class="mb-4">Background Image</h3>
        <img
          v-if="imgPath"
          :src="imgPath"
          alt="Image"
          style="max-width: 300px; max-height: 200px;"
        />
        <v-spacer />
        <v-file-input
          ref="fileInput"
          v-model="imageFile"
          accept="image/png, image/jpeg, image/jpg, image/bmp"
          prepend-inner-icon="mdi-image"
          prepend-icon=""
          label="Image Upload"
          filled
          color="secondary"
        />
        <v-progress-linear
          :active="uploadProgress !== 0"
          background-opacity=".3"
          buffer-value="100"
          height="4"
          rounded
          :value="uploadProgress"
          color="secondary"
        />
        <v-spacer v-if="uploadProgress !== 0" />
        <v-btn
          color="secondary"
          class="sectext--text"
          :disabled="!canUpload"
          @click="uploadFile"
          >Upload</v-btn
        >
        <v-btn
          color="error"
          class="black--text ml-5"
          :disabled="!canDelete"
          @click="delImg"
          >Delete Image</v-btn
        >
        <v-switch
          v-model="retVal.fullPage"
          color="secondary"
          label="Full Page Header"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import storage from '@/firebase/storage';

export default {
  name: 'PageHeader',
  props: {
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'Greeting'
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          head: 'This is a page header.',
          sub: 'This is a page subheader.',
          fullPage: false,
          imgPath: ''
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value,
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
    },
    canDelete() {
      if (this.imgPath) {
        return true;
      } else {
        return false;
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
      const imgRef = storage.ref(this.retVal.imgPath);
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
    },
    async delImg() {
      if (this.canDelete) {
        if (confirm('Are you sure you want to delete this image?')) {
          try {
            const imgRef = storage.refFromURL(this.imgPath);
            await imgRef.delete();
            this.retVal.imgPath = null;
            this.imgPath = null;
          } catch (error) {
            alert(error);
          }
        }
      } else {
        alert('No image is uploaded.');
      }
    }
  }
};
</script>

<style lang="scss">
.header-comp {
  margin: 40px 0;

  .spacer {
    height: 20px;
  }
}
</style>
