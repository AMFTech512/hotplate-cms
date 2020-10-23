<!-- This page is for use with Vuetify applications only.  If you want to use it with a custom-built application, you will have to modify the variables to work with your custom theme system.  For more information about themes, visit https://vuetifyjs.com/en/customization/theme/. -->

<template>
  <div v-if="!$store.state.loading" class="theme-editor">
    <v-card>
      <v-card-title>Site Theme Editor</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn
              color="secondary"
              class="sectext--text"
              block
              @click="setDefault('light')"
            >
              Reset Light Theme to Default
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="secondary"
              class="sectext--text"
              block
              @click="setDefault('dark')"
            >
              Reset Dark Theme to Default
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="selected"
              :items="items"
              filled
              label="Theme Color"
              color="secondary"
              item-color="secondary"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="mode"
              :items="modes"
              filled
              width="100%"
              label="Mode"
              color="secondary"
              item-color="secondary"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>Theme Color</strong>
            <v-color-picker
              v-if="themes[mode]"
              v-model="themes[mode][selected]"
              flat
              hide-mode-switch
              :show-swatches="selected !== null"
              :disabled="!selected"
              width="450"
              mode="hexa"
              class="mt-4"
            />
          </v-col>
          <v-col>
            <strong>Text Color</strong>
            <v-radio-group
              v-if="themes[mode]"
              v-model="themes[mode][textColors]"
              :disabled="!textColors"
            >
              <v-radio label="Black" value="#000000" color="secondary" />
              <v-radio label="White" value="#FFFFFF" color="secondary" />
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firestore from '@/firebase/firestore';
export default {
  data() {
    return {
      themes: {
        dark: null,
        light: null
      },
      selected: 'background',
      items: [
        {
          text: 'Background',
          value: 'background'
        },
        {
          text: 'Primary',
          value: 'primary'
        },
        {
          text: 'Secondary',
          value: 'secondary'
        },
        {
          text: 'Card',
          value: 'card'
        },
        {
          text: 'Links',
          value: 'anchor'
        },
        {
          text: 'Success',
          value: 'success'
        },
        {
          text: 'Info',
          value: 'info'
        },
        {
          text: 'Warning',
          value: 'warning'
        },
        {
          text: 'Error',
          value: 'error'
        }
      ],
      mode: 'light',
      modes: [
        {
          text: 'Light',
          value: 'light'
        },
        {
          text: 'Dark',
          value: 'dark'
        }
      ]
    };
  },
  computed: {
    textColors() {
      const color = this.selected;
      switch (color) {
        case 'error':
          return 'errtext';
        case 'card':
          return 'cardtext';
        case 'warning':
          return 'warntext';
        case 'primary':
          return 'pritext';
        case 'secondary':
          return 'sectext';
        case 'info':
          return 'infotext';
        case 'background':
          return 'bgtext';
        case 'success':
          return 'suctext';
        default:
          return null;
      }
    }
  },
  async created() {
    try {
      this.$store.commit('setCanSave', true);
      const doc = await firestore.doc('hotplate-cms/theme').get();
      if (doc.exists) {
        const data = doc.data();
        this.themes.light = data.light;
        this.themes.dark = data.dark;
      } else {
        this.setDefault('light');
        this.setDefault('dark');
      }
      this.$store.commit('setPageTitle', 'Customize Site Theme');
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    save(
      callback,
      err = (e) => {
        alert(`An error occurred: ${e}`);
      }
    ) {
      firestore
        .doc('hotplate-cms/theme')
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
          errtext: '#000000',
          card: '#FFFFFF',
          cardtext: '#000000',
          warning: '#FB8C00',
          warntext: '#000000',
          primary: '#66BB6A',
          pritext: '#000000',
          secondary: '#1976D2',
          sectext: '#FFFFFF',
          info: '#2196F3',
          infotext: '#000000',
          background: '#FFFFFF',
          bgtext: '#000000',
          anchor: '#1976D2',
          success: '#4CAF50',
          suctext: '#000000'
        };
      } else if (theme === 'dark') {
        this.themes.dark = {
          background: '#121212',
          bgtext: '#FFFFFF',
          error: '#FF5252',
          errtext: '#000000',
          warning: '#FB8C00',
          warntext: '#000000',
          info: '#2196F3',
          infotext: '#000000',
          anchor: '#42A5F5',
          success: '#4CAF50',
          suctext: '#000000',
          card: '#1E1E1E',
          cardtext: '#FFFFFF',
          secondary: '#FFCA28',
          sectext: '#000000',
          primary: '#1565C0',
          pritext: '#FFFFFF'
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
}
</style>
