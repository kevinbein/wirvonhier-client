import Vue from 'vue';
// either load vuetify components a-la-carte
//import Vuetify, { VBtn, VApp } from 'vuetify/lib';

// or load all of Vuetify
import '@fortawesome/fontawesome-free/css/all.css'
//import '@mdi/font/css/materialdesignicons.css'

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  //components: {
    ////VBtn,
    ////VApp,
  //},
});

export const vuetify = new Vuetify({
  icons: {
    iconfont: 'fa',
  },
});
