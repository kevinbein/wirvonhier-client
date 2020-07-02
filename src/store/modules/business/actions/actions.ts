import { Actions, Context } from 'vuex-smart-module';
import { BusinessState, BusinessGetters, BusinessMutations } from '..';
import { IFindNearBusinessesOptions } from '@/services/business/businessService.types';
import { Business, IBusinessData, IUpdateSuccess, IUpdateError, Image, INewImageData, IImageUpdates } from '@/entities';
import { TYPE, POSITION } from 'vue-toastification';
import { IBusinessUpdateOptions } from './actions.types';
import { ICloudinaryImageUploadResponse } from '@/services/images/imageService.types';
import { IHttpErrorResponse } from '@/services';
import { IStore } from '@/store';
import { UserModule } from '../../user';

export class BusinessActions extends Actions<BusinessState, BusinessGetters, BusinessMutations, BusinessActions> {
  public store!: IStore;
  public userModule!: Context<typeof UserModule>;
  $init(store: IStore): void {
    this.store = store;
    this.userModule = UserModule.context(store);
  }

  /**
   * Loads Businesses from Server, saves them in the DB and returns those businesses
   * @param businessIds
   */
  async loadAndPersistBusinessDataById(businessIds: string[]): Promise<void> {
    const businesses = await this.store.$services.business.load(businessIds);
    this.store.$db.businesses.addMany(businesses);
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
    this.actions.selectBusiness(businesses[0]._id);
  }

  update(options: IBusinessUpdateOptions): IUpdateSuccess | IUpdateError {
    const { business, key, value } = options;
    const { business: updatedBusiness, field, status } = business.update(key, value);
    this.commit('SET_SELECTED_BUSINESS', updatedBusiness);
    return { business: updatedBusiness, field, status };
  }

  async save({ businessId, updates }: { businessId: string; updates: Partial<IBusinessData> }): Promise<boolean> {
    const success = await this.store.$services.business.save(businessId, updates);
    if (!success) {
      // TODO|PWA: If we are offline, update Business later.
      return false;
    }
    await this.actions.loadAndPersistBusinessDataById([businessId]);
    return true;
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

  selectImageForEdit(image: Image | null): void {
    this.mutations.SELECT_IMAGE_TO_EDIT(image);
  }

  async deleteImage(imageId: string): Promise<void> {
    const business = this.userModule.state.selectedBusiness;
    if (!business) {
      this.store.$toast('Oops! Da ging etwas schief. Bitte versuche die Seite neu zu laden.', {
        position: POSITION.TOP_CENTER,
        type: TYPE.ERROR,
      });
      return;
    }
    await this.store.$services.business.deleteImage(business._id, imageId);
    await this.actions.loadAndPersistBusinessDataById([business._id]);
    this.userModule.actions.selectBusiness(business._id);
  }

  async updateImage({ imageId, updates }: { imageId: string; updates: IImageUpdates }): Promise<void> {
    const businessId = this.userModule.state.selectedBusiness?._id;
    if (!businessId) {
      this.store.$toast('Oops! Da ging etwas schief. Bitte versuche die Seite neu zu laden.', {
        position: POSITION.TOP_CENTER,
        type: TYPE.ERROR,
      });
      return;
    }
    await this.store.$services.business.updateImage(businessId, imageId, updates);
    await this.actions.loadAndPersistBusinessDataById([businessId]);
    this.userModule.actions.selectBusiness(businessId);
  }

  async saveNewImage({
    newImageData,
    imageFile,
  }: {
    newImageData: Omit<INewImageData, 'publicId'>;
    imageFile: string;
  }): Promise<void> {
    const currentSelectedBusiness = this.userModule.state.selectedBusiness;
    if (!currentSelectedBusiness) {
      this.store.$toast('Oops! Da ging etwas schief. Bitte versuche die Seite neu zu laden.', {
        position: POSITION.TOP_CENTER,
        type: TYPE.ERROR,
      });
      return;
    }
    const businessId = currentSelectedBusiness._id;
    const publicId = currentSelectedBusiness.generateImagePublicId(newImageData);
    const publicIdWithFolder = `${this.store.$services.images.folder}${publicId}`;
    const savedImage = await this.store.$services.business.saveNewImage({
      ...newImageData,
      businessId,
      publicId: publicIdWithFolder,
    });
    const uploadSuccessful = await this.store.$services.images.uploadToCloudinary(publicId, imageFile);
    if (uploadSuccessful) {
      await this.store.$services.business.updateImage(businessId, savedImage._id, {
        uploadVerified: true,
      });
    }
    await this.actions.loadAndPersistBusinessDataById([currentSelectedBusiness._id]);
    this.userModule.actions.selectBusiness(currentSelectedBusiness._id);
  }
}
