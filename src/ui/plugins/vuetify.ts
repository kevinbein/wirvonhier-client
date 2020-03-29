import Vue from 'vue';
import Vuetify, { VBtn, VApp } from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VBtn,
    VApp,
  },
});

const opts = {};

export const vuetify = new Vuetify(opts);
