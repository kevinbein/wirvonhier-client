import Vue from 'vue';
import { wrap } from 'comlink';
import { IStore } from '@/store';

export const attachWorker = (store: IStore): void => {
  const worker = {} || wrap(new Worker('./worker.ts', { type: 'module' }));
  store.$worker = worker;

  Vue.mixin({
    beforeCreate() {
      this.$worker = store.$worker;
    },
  });
};
