import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { BusinessState, BusinessGetters, BusinessMutations } from '..';
import { RootState } from '@/store';
import { IFindNearBusinessesOptions } from '@/services/business/businessService.types';
import { Business } from '@/entities';

export class BusinessActions extends Actions<BusinessState, BusinessGetters, BusinessMutations, BusinessActions> {
  public store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  async loadNearBusinesses(options: IFindNearBusinessesOptions): Promise<void> {
    const businesses = await this.store.$services.business.findNear(options);
    this.commit('SET_BUSINESSES', businesses);
  }

  async selectBusiness(businessId: string | undefined): Promise<void> {
    if (!businessId) return;
    const selectedBusiness = await this.store.$services.business.getBusinessById(businessId);
    if (selectedBusiness) this.commit('SET_SELECTED_BUSINESS', new Business(selectedBusiness));
  }
}
