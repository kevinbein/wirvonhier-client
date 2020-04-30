import Vue from 'vue';
import { IStore } from '@/store';
import { http } from '@/services';

export const attachHttp = (store: IStore): void => {
  store.$http = http;

  Vue.mixin({
    beforeCreate() {
      this.$http = store.$http;
    },
  });
};
