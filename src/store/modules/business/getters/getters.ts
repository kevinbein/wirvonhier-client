import { Getters } from 'vuex-smart-module';
import { BusinessState } from '../state';
import { IStore } from '@/store';
import { IBusinessFilter } from '@/entities';

export class BusinessGetters extends Getters<BusinessState> {
  store!: IStore;

  $init(store: IStore) {
    this.store = store;
  }

  get find() {
    return (filter: IBusinessFilter) => {
      return this.store.$db.businesses.find(filter)
    }
  }
}
