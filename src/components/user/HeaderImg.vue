<!--
  A component designed to work with carousels and image galleries.  You can upload several images to each instance of this component.  This component also has a title slot and allows you to delete multiple images at a time.  WARNING: Due to the nature of v-img, uploading several images or possibly even one large image can crash the page.  Be careful about the images that you upload!
-->
<template>
  <div class="header-img-txt-comp">
    <v-card>
      <v-card-title>
        <h2>{{ retVal.header }}</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="retVal.header" label="Header" />
        <h3>Images</h3>
        <v-item-group v-model="imgDel" multiple>
          <v-row>
            <v-col
              v-for="(img, index) in imgPath"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-item v-slot:default="{ active, toggle }">
                <v-img
                  :src="img"
                  alt="Image"
                  class="text-right pa-2"
                  style="max-width: 300px; max-height: 200px;"
                  eager
                  @click="toggle"
                >
                  <v-btn icon dark>
                    <v-icon class="error--text">{{
                      active
                        ? 'mdi-checkbox-marked'
                        : 'mdi-checkbox-blank-outline'
                    }}</v-icon>
                  </v-btn>
                </v-img>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
        <v-file-input
          ref="fileInput"
          v-model="imageFile"
          accept="image/png, image/jpeg, image/bmp, .svg"
          prepend-icon="mdi-image"
          label="Image Uploads"
          multiple
        />
        <v-progress-linear
          :active="uploadProgress != 0"
          background-opacity=".3"
          buffer-value="100"
          height="4"
          rounded
          :value="uploadProgress"
          color="light-blue"
        />
        <v-spacer />
        <v-btn
          color="blue"
          class="white--text"
          :disabled="!canUpload"
          @click="uploadFile"
          >Upload</v-btn
        >
        <v-btn
          color="red"
          class="white--text ml-5"
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
    name: {
      type: String,
      default: 'HeaderImage'
    },
    props: {
      type: Object,
      default: function() {
        return {
          headerTxt: 'Header, Image'
        };
      }
    },
    value: {
      type: Object,
      default: function() {
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
      imgPath: this.value.imgPath,
      imageFile: null,
      imgDel: [],
      uploadProgress: 0
    };
  },
  computed: {
    canUpload() {
      return (
        this.imageFile &&
        (this.uploadProgress == 0 || this.uploadProgress == 100) &&
        this.$refs.fileInput.validate()
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
    this.$emit('input', this.retVal);
  },
  methods: {
    uploadFile() {
      let thisRef = this;
      this.imageFile.forEach(img => {
        let imgRef = storage.ref(`${thisRef.props.imgPath}/${img.name}`);
        var uploadTask = imgRef.put(img);
        uploadTask.on(
          'state_changed',
          snapshot => {
            thisRef.uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          err => {
            console.log(err);
            alert(`An error occurred: ${JSON.stringify(err)}`);
            thisRef.uploadProgress = 0;
          }
        );

        uploadTask.then(snapshot => {
          snapshot.ref.getDownloadURL().then(function(downloadURL) {
            thisRef.imgPath.push(downloadURL);
          });
        });
      });
    },
    rmImgs() {
      if (this.canDelete) {
        const thisRef = this;
        if (
          confirm(
            'You are about to delete the selected images.  Do you wish to proceed?'
          )
        ) {
          this.imgDel.forEach(img => {
            let selected = thisRef.imgPath[img];
            let imgRef = storage.refFromURL(selected);
            imgRef.delete().then(() => {
              const index = thisRef.imgPath.indexOf(img);
              thisRef.imgPath.splice(index, 1);
              const indexd = thisRef.imgDel.indexOf(img);
              thisRef.imgDel.splice(indexd, 1);
            });
          });
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
