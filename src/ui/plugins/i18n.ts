import { IStore } from '@/store';
import { i18n } from '@/services';

export const attachI18n = (store: IStore): void => {
  store.$i18n = i18n;
};
