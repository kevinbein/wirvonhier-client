import Vue from 'vue';
import { provider } from '@/services';
import { IStore } from '@/store';

export const attachServices = (store: IStore): void => {
  store.$services = provider(store, store.$worker, store.$db, store.$http);

  Vue.mixin({
    beforeCreate() {
      this.$services = store.$services;
    },
  });
};
