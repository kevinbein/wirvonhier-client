import Vue from 'vue';
import { IStore } from '@/store';
import { db } from '@/services';

export const attachDB = async (store: IStore): Promise<void> => {
  store.$db = db;

  Vue.mixin({
    beforeCreate() {
      this.$db = store.$db;
    },
  });
};
