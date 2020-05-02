import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { BusinessState, BusinessGetters, BusinessMutations } from '..';
import { RootState } from '@/store';
import { IFindNearBusinessesOptions } from '@/services/business/businessService.types';
import { Business, IBusinessData, IValidationError, IUpdateSuccess, IUpdateError } from '@/entities';
import { TYPE, POSITION } from 'vue-toastification';
import { IBusinessUpdateOptions } from './actions.types';

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

  async create(businessData?: Partial<IBusinessData>): Promise<void> {
    const businesses = await this.store.$services.business.create(businessData);
    if (!businesses) {
      this.store.$toast(
        `Oops! Wir sind auf einen unbekannten Fehler gestoßen. Bitte wende dich an unseren support und versuche es später erneut.`,
        { type: TYPE.ERROR, position: POSITION.TOP_CENTER, timeout: 10000 },
      );
      return;
    }
    this.actions.selectBusiness(businesses[0]._id);
  }

  update(options: IBusinessUpdateOptions): IUpdateSuccess | IUpdateError {
    const { business, key, value } = options;
    const { business: updatedBusiness, field, status } = business.update(key, value);
    this.commit('SET_SELECTED_BUSINESS', updatedBusiness);
    return { business: updatedBusiness, field, status };
  }

  async save(business: Business): Promise<boolean> {
    const success = await this.store.$services.business.save(business.getData());
    if (!success) {
      this.store.$toast(
        `Wir konnten die Änderungen nicht speichern. Bitte wende dich an unseren support und versuche es später erneut.`,
        { type: TYPE.ERROR, position: POSITION.TOP_CENTER, timeout: 10000 },
      );
      return false;
    }
    return true;
  }
}
