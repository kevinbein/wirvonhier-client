import Vue from 'vue';
import { App, router, attachHttp, attachDB, attachServices, attachI18n, attachWorker } from './ui';
import { store } from './store';
import { i18n } from './services';
import { vuetify } from './ui';
import Cloudinary from 'cloudinary-vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Vue.use(Toast);
Vue.config.productionTip = false;

Vue.use(Cloudinary, {
  configuration: {
    cloudName: CLOUD_NAME,
  },
});

store.$toast = Vue.$toast;

attachI18n(store);
attachHttp(store);
attachDB(store);
attachWorker(store);
attachServices(store);

new Vue({
  i18n,
  store,
  router,
  vuetify,
  render: (h): Vue.VNode => h(App),
}).$mount('#app');
