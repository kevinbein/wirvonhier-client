import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { BusinessState, BusinessGetters, BusinessMutations } from '..';
import { IFindNearBusinessesOptions } from '@/services/business/businessService.types';
import { Business, IBusinessData, IUpdateSuccess, IUpdateError } from '@/entities';
import { TYPE, POSITION } from 'vue-toastification';
import { IBusinessUpdateOptions, IUploadImagesResult } from './actions.types';
import { IImageData } from '@/ui/views/business/manageImages/manageImages.types';
import { ICloudinaryImageUploadResponse } from '@/services/images/imageService.types';
import { IHttpErrorResponse } from '@/services';

export class BusinessActions extends Actions<BusinessState, BusinessGetters, BusinessMutations, BusinessActions> {
  public store!: Store<BusinessState>;

  $init(store: Store<BusinessState>): void {
    this.store = store;
  }

  /**
   * Loads Businesses from Server, saves them in the DB and returns those businesses
   * @param businessIds
   */
  async loadAndPersistBusinessDataById(businessIds: string[]): Promise<IBusinessData[]> {
    const businesses = await this.store.$services.business.load(businessIds);
    this.store.$db.businesses.addMany(businesses);
    if (businesses.length === 0) {
      const fromDB = await this.store.$services.business.fromDB(businessIds);
      businesses.push(...fromDB);
    }
    return businesses;
  }

  async getBusinessesByZIP(options: IFindNearBusinessesOptions): Promise<void> {
    if (!options.zip) return;
    const businesses = await this.store.$services.business.loadBusinessesAndUpdateDB({
      filters: [{ name: 'address.zip', value: options.zip }],
    });
    this.commit(
      'SET_BUSINESSES',
      businesses.map((business) => new Business(business)),
    );
  }

  /**
   * Grabs Business from IndexedDB, sets it as selectedBusiness and returns it
   * @param businessId;
   */
  async selectBusiness(businessId: string): Promise<Business | null> {
    const selectedBusiness = await this.store.$services.business.fromDB([businessId]);
    this.commit('SET_SELECTED_BUSINESS', selectedBusiness[0]);
    if (!selectedBusiness[0]) return null;
    return selectedBusiness[0];
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
    this.actions.selectBusiness(businesses[0]._id as string);
  }

  update(options: IBusinessUpdateOptions): IUpdateSuccess | IUpdateError {
    const { business, key, value } = options;
    const { business: updatedBusiness, field, status } = business.update(key, value);
    this.commit('SET_SELECTED_BUSINESS', updatedBusiness);
    return { business: updatedBusiness, field, status };
  }

  async save(businessData: IBusinessData): Promise<boolean> {
    const success = await this.store.$services.business.save(businessData);
    if (!success) {
      // TODO|PWA: If we are offline, update Business later.
      return false;
    }
    await this.actions.loadAndPersistBusinessDataById([businessData._id as string]);
    return true;
  }

  async uploadImages(images: IImageData[]): Promise<IUploadImagesResult[]> {
    const result = [];
    for (const image of images) {
      const res = this.store.$services.images.uploadImage(image);
      if (!res) continue;
      result.push(res);
    }
    return Promise.all(result);
  }

  async validateImageUploads(publicIds: string[]): Promise<void> {
    const { status, ...res } = await this.store.$http.post<{ failed: ICloudinaryImageUploadResponse[] }>(
      '/image-upload-confirmed',
      { publicIds },
    );
    if (status === 'failure') {
      const error = (res as IHttpErrorResponse<{ failed: ICloudinaryImageUploadResponse[] }>).error;
      const failed = (error && error.response?.data.failed) || [];
      // eslint-disable-next-line no-console
      console.log('Failed images: ', failed);
      this.store.$toast('Wir konnten leider nicht alle Bilder speichern.', {
        position: POSITION.TOP_CENTER,
        type: TYPE.ERROR,
      });
      return;
    }
  }
}
