import { Actions, Context } from 'vuex-smart-module';
import { UserDataState, UserDataMutations } from '..';
import { IUserData } from '../state/state.types';
import { Business, IBusinessData } from '@/entities';
import { IHttpSuccessResponse } from '@/services';
import { IStore } from '@/store';
import { BusinessModule } from '@/store/modules';

export class UserDataActions extends Actions<UserDataState, never, UserDataMutations, UserDataActions> {
  public businessModule!: Context<typeof BusinessModule>;
  private store!: IStore;

  $init(store: IStore): void {
    this.store = store;
    this.businessModule = BusinessModule.context(store);
  }

  async authenticateMe(): Promise<boolean> {
    const { status, ...res } = await this.store.$http.get<{ id: string }>('/me', true);
    if (status === 'success') {
      const data = (res as IHttpSuccessResponse<{ id: string }>).data;
      this.commit('SET_USER_DATA', data);
      return true;
    }
    return false;
  }

  setUserData(userData: Partial<IUserData>): void {
    this.commit('SET_USER_DATA', userData);
  }

  async loadUserAndSaveUserData(): Promise<void> {
    const userId = this.state.id;
    if (!userId) return;
    const { status, ...res } = await this.store.$http.get<Partial<IUserData>>(`/users/${userId}`, true);
    if (status === 'failure') return;
    else {
      const data = (res as IHttpSuccessResponse<Partial<IUserData>>).data;
      this.actions.setUserData(data);
      await this.businessModule.actions.loadAndPersistBusinessDataById(this.state.businesses);
      this.actions.selectBusiness(this.state.businesses[0]);
    }
  }

  async selectBusiness(businessId: string): Promise<void> {
    const selectedBusiness = await this.store.$services.business.fromDB([businessId]);
    this.commit('SELECT_BUSINESS', selectedBusiness[0]);
  }

  async loadUserBusinesses(): Promise<void> {
    const businessIds = this.state.businesses;
    const promises = [];
    for (const businessId of businessIds) {
      if (typeof businessId !== 'string') continue;
      promises.push(this.store.$services.business.getBusinessById(businessId));
    }
    const businessesData = await Promise.all(promises);
    const businesses = (businessesData.filter((data) => !!data) as IBusinessData[]).map(
      (business) => new Business(business),
    );
    this.commit('SET_USER_DATA', { userBusinesses: businesses });
  }
}
