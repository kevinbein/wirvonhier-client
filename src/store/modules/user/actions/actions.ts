import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { UserDataState, UserDataGetters, UserDataMutations } from '..';
import { RootState } from '@/store';
import { IUserData } from '../state/state.types';
import { Business, IBusinessData } from '@/entities';
import { IHttpSuccessResponse } from '@/services';

export class UserDataActions extends Actions<UserDataState, UserDataGetters, UserDataMutations, UserDataActions> {
  // @ts-ignore
  private store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
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
    }
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
