import Vue from 'vue';
// either load vuetify components a-la-carte
import Vuetify, { VBtn, VApp } from 'vuetify/lib';

// or load all of Vuetify
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  components: {
    VBtn,
    VApp,
  },
});

const opts = {};

export const vuetify = new Vuetify(opts);
