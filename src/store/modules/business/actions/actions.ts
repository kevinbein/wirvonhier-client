import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { BusinessState, BusinessGetters, BusinessMutations } from '..';
import { RootState } from '@/store';
import { IFindNearBusinessesOptions } from '@/services/business/businessService.types';
import { IBusinessFilter, IBusinessData } from '@/entities';
import { IHttpResponse } from '@/services';

export class BusinessActions extends Actions<BusinessState, BusinessGetters, BusinessMutations, BusinessActions> {
  public store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  async loadBusinesses(): Promise<void> {
    const businesses = await this.store.$db.businesses.find(this.state.filter);
    this.commit('SET_BUSINESSES', businesses);
  }

  async loadBusiness(id: string): Promise<IHttpResponse> {
    try {
      const business = await this.store.$http.get('businesses/' + id);
      return { status: 'success', data: { business: business } };
    } catch (e) {
      return { status: 'failure', message: e.message };
    }
  }

  async loadNearBusinesses(options: IFindNearBusinessesOptions): Promise<void> {
    const businesses = await this.store.$services.business.findNear(options);
    this.commit('SET_BUSINESSES', businesses);
  }
}
