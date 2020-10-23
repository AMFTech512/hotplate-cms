<!--
  A component designed to work with carousels and image galleries.  You can upload several images to each instance of this component.  This component also has a title slot and allows you to delete multiple images at a time.  WARNING: Due to the nature of v-img, uploading several images or possibly even one large image can crash the page.  Be careful about the images that you upload!
-->
<template>
  <div class="header-img-txt-comp">
    <v-card>
      <v-card-title>
        <h2>{{ retVal.header || props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="retVal.header" filled label="Header" />
        <h3>Images - Click to Select</h3>
        <v-item-group v-model="imgDel" multiple>
          <v-row>
            <v-col
              v-for="(img, index) in retVal.imgPath"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-item v-slot:default="{ active, toggle }">
                <div>
                  <img
                    v-if="!active"
                    :src="img"
                    alt="Image"
                    class="text-right pa-2"
                    style="max-width: 100%; max-height: 200px; cursor: pointer;"
                    @click="toggle"
                  />
                  <v-card v-else color="error" height="200" @click="toggle">
                    <v-icon style="width: 100%; height: 100%; font-size: 5rem;"
                      >mdi-delete</v-icon
                    >
                  </v-card>
                </div>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
        <v-file-input
          ref="fileInput"
          v-model="imageFile"
          accept="image/png, image/jpeg, image/bmp, .svg"
          prepend-inner-icon="mdi-image"
          prepend-icon=""
          label="Image Uploads"
          multiple
          :disabled="!(props.max === 0 || retVal.imgPath.length < props.max)"
          filled
        />
        <v-progress-linear
          :active="uploadProgress !== 0"
          background-opacity=".3"
          buffer-value="100"
          height="4"
          rounded
          :value="uploadProgress"
          color="light-blue"
        />
        <v-spacer />
        <v-btn
          color="secondary"
          class="sectext--text"
          :disabled="!canUpload"
          @click="uploadFile"
          >Upload</v-btn
        >
        <v-btn
          color="red"
          class="black--text ml-5"
          :disabled="!canDelete"
          @click="rmImgs"
          >Delete Selected Images</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import storage from '@/firebase/storage.js';

export default {
  name: 'HeaderImgComponent',
  props: {
    props: {
      type: Object,
      default() {
        return {
          headerTxt: 'Header, Image',
          max: 0
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          header: this.props.headerTxt,
          imgPath: []
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value,
      imageFile: null,
      imgDel: [],
      uploadProgress: 0
    };
  },
  computed: {
    canUpload() {
      return (
        this.imageFile &&
        (this.uploadProgress === 0 || this.uploadProgress === 100) &&
        this.$refs.fileInput.validate() &&
        (this.props.max === 0 || this.retValimgPath.length < this.props.max) &&
        this.imageFile.length > 0
      );
    },
    canDelete() {
      if (this.imgDel.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    if (!this.retVal.imgPath) {
      this.retVal.imgPath = [];
    }
    this.$emit('input', this.retVal);
  },
  methods: {
    uploadFile() {
      this.imageFile.forEach((img) => {
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
              this.retVal.imgPath.push(url);
            } catch (error) {
              alert(error);
            }
          }
        );
      });
    },
    rmImgs() {
      if (this.canDelete) {
        if (
          confirm(
            'You are about to delete the selected images.  Do you wish to proceed?'
          )
        ) {
          this.imgDel.forEach(async (img) => {
            const selected = this.retVal.imgPath[img];
            const imgRef = storage.refFromURL(selected);
            await imgRef.delete();
            const index = this.retVal.imgPath.indexOf(img);
            this.retVal.imgPath.splice(index, 1);
            const indexd = this.imgDel.indexOf(img);
            this.imgDel.splice(indexd, 1);
          })
        }
      } else {
        alert('Please select some images to delete.');
      }
    }
  }
};
</script>

<style lang="scss">
.header-img-txt-comp {
  margin: 40px 0;

  .spacer {
    height: 20px;
  }

  .v-input--checkbox {
    margin: 0 10px;
  }

  img {
    margin: 5px;
  }
}
</style>
