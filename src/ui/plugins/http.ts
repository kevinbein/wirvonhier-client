import Vue from 'vue';
import { IStore } from '@/store';
import { HTTP } from '@/services';

export const attachHttp = (store: IStore): void => {
  store.$http = new HTTP(store);

  Vue.mixin({
    beforeCreate() {
      this.$http = store.$http;
    },
  });
};
