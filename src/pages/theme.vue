<!-- This page is for use with Vuetify applications only.  If you want to use it with a custom-built application, you will have to modify the variables to work with your custom theme system.  For more information about themes, visit https://vuetifyjs.com/en/customization/theme/. -->

<template>
  <div class="theme-editor">
    <div v-if="loading" class="loading">
      <v-progress-circular :size="70" :width="7" color="green" indeterminate />
    </div>
    <div v-else>
      <v-row>
        <v-col cols="auto">
          <h2>Light Theme</h2>
        </v-col>
        <v-col cols="auto">
          <v-btn color="blue" class="white--text" @click="setDefault('light')"
            >Reset to System Default</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Primary Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.light.primary"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Secondary Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.light.secondary"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Card Color</v-card-title>
            <v-card-text>
              <v-color-picker v-model="themes.light.card" flat show-swatches />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Background Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.light.background"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Link Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.light.anchor"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Error Color</v-card-title>
            <v-card-text>
              <v-color-picker v-model="themes.light.error" flat show-swatches />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Info Color</v-card-title>
            <v-card-text>
              <v-color-picker v-model="themes.light.info" flat show-swatches />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Success Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.light.success"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Warning Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.light.warning"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <h2>Dark Theme</h2>
        </v-col>
        <v-col cols="auto">
          <v-btn color="blue" class="white--text" @click="setDefault('dark')"
            >Reset to System Default</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Primary Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.dark.primary"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Secondary Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.dark.secondary"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Card Color</v-card-title>
            <v-card-text>
              <v-color-picker v-model="themes.dark.card" flat show-swatches />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Background Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.dark.background"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Link Color</v-card-title>
            <v-card-text>
              <v-color-picker v-model="themes.dark.anchor" flat show-swatches />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Error Color</v-card-title>
            <v-card-text>
              <v-color-picker v-model="themes.dark.error" flat show-swatches />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Info Color</v-card-title>
            <v-card-text>
              <v-color-picker v-model="themes.dark.info" flat show-swatches />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Success Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.dark.success"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Warning Color</v-card-title>
            <v-card-text>
              <v-color-picker
                v-model="themes.dark.warning"
                flat
                show-swatches
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import firestore from '@/firebase/firestore.js';
export default {
  name: 'ThemePage',
  data() {
    return {
      themes: {
        dark: null,
        light: null
      },
      loading: true
    };
  },
  async created() {
    this.$store.commit('setPageTitle', 'Customize Site Theme');
    this.$store.commit('setCanSave', true);
    await firestore
      .doc('theme/dy9UHEVpdYhdEBNweVtp')
      .get()
      .then(doc => {
        let data = doc.data();

        if(!data) {
          this.setDefault('light');          
          this.setDefault('dark');          
        } else {
          this.themes.light = data.light;
          this.themes.dark = data.dark;
        }
        // console.log(this.$vuetify.theme.themes.dark)
        this.$vuetify.theme.themes.light = this.themes.light;
        this.$vuetify.theme.themes.dark = this.themes.dark;
      });
    this.loading = false;
  },
  methods: {
    save(
      callback,
      err = e => {
        alert(`An error occurred: ${e}`);
      }
    ) {
      firestore
        .doc('theme/dy9UHEVpdYhdEBNweVtp')
        .set(this.themes)
        .then(callback)
        .catch(err);
    },
    // Customize this method to set your own default themes.
    /* 
      To use a theme on your site, put this.$vuetify.theme.themes.light = data.light;
      and this.$vuetify.theme.themes.dark = data.dark; in App.vue in your created method.
      This should be where you pull from firestore.  You also need to add the customProperties option to your vuetify plugin file's themes object.
    */
    setDefault(theme) {
      if (theme === 'light') {
        this.themes.light = {
          error: '#FF5252',
          card: '#FFFFFF',
          warning: '#FB8C00',
          primary: '#66BB6A',
          secondary: '#1976D2',
          info: '#2196F3',
          background: '#FFFFFF',
          anchor: '#1976D2',
          success: '#4CAF50'
        };
      } else if (theme === 'dark') {
        this.themes.dark = {
          background: '#121212',
          error: '#FF5252',
          warning: '#FB8C00',
          info: '#2196F3',
          anchor: '#1976D2',
          success: '#4CAF50',
          card: '#1E1E1E',
          secondary: '#FFCA28',
          primary: '#1565C0'
        };
      }
    }
  }
};
</script>

<style lang="scss">
.theme-editor {
  .loading {
    text-align: center;
    padding: 50px;
  }
  .row {
    > * {
      padding: 24px;
    }
  }
}
</style>
