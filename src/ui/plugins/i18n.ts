import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { IStore } from '@/store';
import { i18n } from '@/services';

export const attachI18n = (store: IStore): void => {
  Vue.use(VueI18n);
  store.$i18n = i18n;
};
