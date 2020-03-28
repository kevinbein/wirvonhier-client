import { RootState } from '../state';
import { Getters } from 'vuex-smart-module';
import { IStore } from '..';

export class RootGetters extends Getters<RootState> {
  store!: IStore;

  $init(store: IStore) {
    this.store = store;
  }
}
