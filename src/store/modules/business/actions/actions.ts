import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { BusinessState, BusinessGetters, BusinessMutations } from '..';
import { RootState } from '@/store';

export class BusinessActions extends Actions<BusinessState, BusinessGetters, BusinessMutations, BusinessActions> {
  private store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  fetchBusiness() {
    return this.store;
  }
}