import { Getters } from 'vuex-smart-module';
import { LocationState } from '../state';
import { IStore } from '@/store';

export class LocationGetters extends Getters<LocationState> {
  store!: IStore;

  $init(store: IStore): void {
    this.store = store;
  }
}
