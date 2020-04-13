import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { BusinessState, BusinessGetters, BusinessMutations } from '..';
import { RootState } from '@/store';
import { IFindNearBusinessesOptions } from '@/services/business/businessService.types';

export class BusinessActions extends Actions<BusinessState, BusinessGetters, BusinessMutations, BusinessActions> {
  public store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  async loadBusinesses(): Promise<void> {
    const businesses = await this.store.$db.businesses.find(this.state.filter);
    this.commit('SET_BUSINESSES', businesses);
  }

  async loadNearBusinesses(options: IFindNearBusinessesOptions): Promise<void> {
    const businesses = await this.store.$services.business.findNear(options);
    this.commit('SET_BUSINESSES', businesses);
  }
}
