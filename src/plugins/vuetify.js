import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#2f90ff',
        pritext: '#000000',
        secondary: '#ffca28',
        sectext: '#000000',
        anchor: '#00FF00',
        success: '#00FF00',
        warning: '#FFFF00',
        info: '0000FF',
        error: '#FF5252'
      }
    },
    options: {
      customProperties: true
    }
  }
});
