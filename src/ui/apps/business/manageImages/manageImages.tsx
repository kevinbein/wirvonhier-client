import { VueComponent } from '@/ui/vue-ts-component';
import Component from 'vue-class-component';
import debounce from 'lodash/debounce';
import SharedStyles from '@/ui/styles/main.scss';
import Styles from './manageImages.scss';
import { ImageThumbnail } from './imageThumbnail';
import { WVHButton } from '@/ui';
import { Business, MEDIATYPE } from '@/entities';
import { BusinessModule, AppearanceModule, UserModule, UserDataState } from '@/store';
import { IImageData, IEditableBusinessMediaData } from './manageImages.types';
import { ManageImagesForm } from './manageImagesForm';
import { IHttpSuccessResponse } from '@/services';
import { ICloudinaryImageUploadResponse } from '@/services/images/imageService.types';

interface IRefs {
  [key: string]: HTMLDivElement;
  page: HTMLDivElement;
}

interface IFiles {
  [key: string]: string;
}

@Component({
  name: 'BusinessManageImages',
  watch: {
    business: {
      immediate: true,
      handler(this: BusinessManageImages, business) {
        if (!business) return;
        this.setInitialMediaData();
      },
    },
  },
})
export class BusinessManageImages extends VueComponent<{}, IRefs> {
  public businessModule = BusinessModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);
  public userModule = UserModule.context(this.$store);

  public deviceWidth!: number;
  public storyWidth!: number;
  public storyHeight!: number;
  public coverWidth!: number;
  public coverHeight!: number;
  public logoWidth!: number;
  public logoHeight!: number;

  public imageSelectedForEdit: IImageData | null = null;
  public imagesMarkedForDelete: Map<string, IImageData> = new Map();

  public files: IFiles = {};
  public dummyCover: IImageData = {
    src: '/assets/imgs/dummy_cover_1024x576.png',
    title: '',
    saved: true,
    _id: '0',
    publicId: '',
    createdAt: '0',
    modifiedAt: '0',
    type: MEDIATYPE.IMAGE,
    isCover: true,
  };
  public dummyLogo: IImageData = {
    src: '/assets/imgs/logo/logo_180x180.png',
    title: '',
    saved: true,
    _id: '0',
    publicId: '',
    createdAt: '0',
    modifiedAt: '0',
    isLogo: true,
    type: MEDIATYPE.IMAGE,
  };
  public showImages = false;
  public showButtons = false;
  public checkScrollTop!: () => void;

  public mediaData: IEditableBusinessMediaData = (null as unknown) as IEditableBusinessMediaData;

  public get business(): Business | null {
    return this.businessModule.state.selectedBusiness;
  }
  public get user(): UserDataState {
    return this.userModule.state;
  }

  public get unsavedImages(): IImageData[] {
    return [...this.allStoriesThumbnails, this.newCoverThumbnail, this.newLogoThumbnail].filter(
      (image) => image && !image.saved,
    );
  }

  public get hasChanges(): boolean {
    return this.imagesMarkedForDelete.size > 0 || this.unsavedImages.length > 0;
  }

  public get newLogoThumbnail(): IImageData {
    const l = this.mediaData ? this.mediaData.logo : null;
    return l ? { ...l, src: this.files[l.publicId] } : this.dummyLogo;
  }

  public get newCoverThumbnail(): IImageData {
    const c = this.mediaData ? this.mediaData.cover.image : null;
    return c ? { ...c, src: this.files[c.publicId] } : this.dummyCover;
  }

  public get allStoriesThumbnails(): IImageData[] {
    if (!this.mediaData) return [];
    return this.mediaData.stories.images.map((img) => {
      const thumbnail = { ...img };
      thumbnail.src = this.files[img.publicId];
      return thumbnail;
    });
  }

  public async created(): Promise<void> {
    this.appearanceModule.actions.setNavigationVisibility(true);
    await this.loadCorrectBusiness();
  }

  public mounted(): void {
    this.deviceWidth = Math.min(window.innerWidth, 500);
    this.setPreviewSizes();
    this.showImages = true;
    this.checkScrollTop = debounce(this._checkScrollTop.bind(this), 50);
    this.$refs.page.addEventListener('scroll', this.checkScrollTop);
  }

  public beforeUnmount(): void {
    this.$refs.page.removeEventListener('scroll', this.checkScrollTop);
  }

  public setPreviewSizes(): void {
    this.coverWidth = Math.round(this.deviceWidth - 50);
    this.coverHeight = Math.round((this.coverWidth / 16) * 9);
    this.storyWidth = Math.round(this.coverWidth / 2 - 8);
    this.storyHeight = Math.round((this.storyWidth / 9) * 16);
    this.logoWidth = 120;
    this.logoHeight = 120;
  }

  public addImage(data: IImageData): void {
    if (!this.files[data.publicId] && data.src) {
      this.files[data.publicId] = data.src;
      data.src = '';
    }
    if (data.isCover) {
      this.mediaData.cover.image = { ...data };
    }
    if (data.isStory) {
      const index = this.mediaData.stories.images.findIndex((img) => img.publicId === data.publicId);
      if (index > -1) {
        this.mediaData.stories.images.splice(index, 1);
      }
      this.mediaData.stories.images.unshift({ ...data });
    }
    if (data.isLogo) {
      this.mediaData.logo = { ...data };
    }
    if (data.isProfile) {
      this.mediaData.profile.image = { ...data };
    }
    this.imageSelectedForEdit = null;
  }

  public editImage(image: IImageData): void {
    this.imageSelectedForEdit = image;
    this.$refs.page.scrollTop = 0;
  }

  public toggleImageMarkedForDelete(image: IImageData): void {
    if (image.saved) {
      if (this.imagesMarkedForDelete.has(image.publicId)) {
        this.imagesMarkedForDelete.delete(image.publicId);
        this.imagesMarkedForDelete = new Map(this.imagesMarkedForDelete);
      } else {
        this.imagesMarkedForDelete = new Map(this.imagesMarkedForDelete.set(image.publicId, image));
      }
    } else if (image.isCover) {
      this.mediaData.cover.image = null;
    } else if (image.isProfile) {
      this.mediaData.profile.image = null;
    } else if (image.isLogo) {
      this.mediaData.logo = null;
    } else if (image.isStory) {
      this.mediaData.stories.images = this.mediaData.stories.images.filter((img) => img.saved);
    }
    this.$forceUpdate();
  }

  public cancelChanges(): void {
    this.setInitialMediaData();
    // this.newLogoData = null;
    // this.newCoverData = null;
    // this.newStoriesData = [];
    this.imagesMarkedForDelete = new Map();
  }

  /*
   * Saves additions AND deletions
   * All keys that contain values in the client-side document are created IF they DON'T exist in the DB
   * All keys that are empty | null in the client-side document are deleted IF they DO exist in the DB
   * All keys that are EQUAL in the client-side document and DB are ignored
   *
   * TODO: Update Image Upload logic to work directly with Image Collection
   */
  public async saveChanges(): Promise<void> {
    if (!this.business) return;

    if (this.mediaData.cover.image && this.imagesMarkedForDelete.has(this.mediaData.cover.image.publicId)) {
      this.mediaData.cover.image = null;
    }
    if (this.mediaData.profile.image && this.imagesMarkedForDelete.has(this.mediaData.profile.image.publicId)) {
      this.mediaData.profile.image = null;
    }
    if (this.mediaData.logo && this.imagesMarkedForDelete.has(this.mediaData.logo.publicId)) {
      this.mediaData.logo = null;
    }
    this.mediaData.stories.images = this.mediaData.stories.images.filter(
      (img) => !this.imagesMarkedForDelete.has(img.publicId),
    );
    const updateRes = await this.businessModule.actions.update({
      business: this.business,
      key: 'media',
      value: this.mediaData,
    });

    if (updateRes.status === 'failure') {
      // eslint-disable-next-line no-console
      console.log('Some UpdateError: ', updateRes);
    }

    const success = await this.businessModule.actions.save(updateRes.business);
    if (!success) {
      // eslint-disable-next-line no-console
      console.log('Some SaveError');
      return;
    }

    const imagesToUpload = ([
      ...this.mediaData.stories.images,
      this.mediaData.cover.image,
      this.mediaData.logo,
    ] as IImageData[])
      .filter((image) => {
        if (!image) return false;
        if (image.saved) return false;
        if (!this.files[image.publicId]) return false;
        return true;
      })
      .map((image) => {
        const img = { ...image };
        img.src = this.files[img.publicId];
        img.publicId = img.publicId.split('/')[1];
        return img;
      });

    const uploadRes = await this.businessModule.actions.uploadImages(imagesToUpload);
    const successfulUploads = uploadRes
      .filter((item: any) => item.status === 'success') // eslint-disable-line
      .map((item: IHttpSuccessResponse<ICloudinaryImageUploadResponse>) => {
        return item.data.public_id;
      });
    if (successfulUploads.length > 0) this.businessModule.actions.validateImageUploads(successfulUploads);
    this.setInitialMediaData();
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div ref="page" class={`${SharedStyles.page} ${Styles['manage-images__page']}`}>
        <router-link to={{ name: 'BusinessManageProfile', query: this.$route.query }} title="zurück">
          <div class={Styles['manage-images__back']}>
            <img src="/assets/icons/icon_arrow-left-492.svg" alt="arrow-back" />
          </div>
          <div class={Styles['manage-images__business-name']}>{this.business?.name}</div>
        </router-link>
        <div class={Styles['manage-images__page-wrapper']}>
          <h1 class={Styles['manage-images__title']}>BILDER VERWALTEN</h1>
          <ManageImagesForm
            on-new-image={this.addImage.bind(this)}
            on-cancel={() => (this.imageSelectedForEdit = null)}
            image={this.imageSelectedForEdit}
            coverHeight={this.coverHeight}
            coverWidth={this.coverWidth - (48 / 16) * 9}
            storyWidth={this.storyWidth}
            storyHeight={this.storyHeight}
            logoWidth={this.logoWidth}
            logoHeight={this.logoHeight}
          />
          <h2 class={Styles['manage-images__title']}>Derzeitige Bilder</h2>
          {this.showImages && (
            <div class={Styles['manage-images__images-wrapper']}>
              <h3 class={Styles['manage-images__section-title']}>Logo</h3>
              <ImageThumbnail
                image={this.newLogoThumbnail}
                width={this.logoWidth}
                height={this.logoHeight}
                marked-for-delete={this.imagesMarkedForDelete.has(this.newLogoThumbnail.publicId)}
                on-toggle-remove={this.toggleImageMarkedForDelete.bind(this)}
                on-edit={this.editImage.bind(this)}
              />
              <h3 class={Styles['manage-images__section-title']}>Cover-Bild</h3>
              <ImageThumbnail
                image={this.newCoverThumbnail}
                width={this.coverWidth}
                height={this.coverHeight}
                marked-for-delete={this.imagesMarkedForDelete.has(this.newCoverThumbnail.publicId)}
                on-toggle-remove={this.toggleImageMarkedForDelete.bind(this)}
                on-edit={this.editImage.bind(this)}
              />
              <h3 class={Styles['manage-images__section-title']}>Story-Bilder</h3>
              <div class={Styles['manage-images__stories-wrapper']}>
                {this.allStoriesThumbnails.map((image) => (
                  <ImageThumbnail
                    image={image}
                    width={this.storyWidth}
                    height={this.storyHeight}
                    marked-for-delete={this.imagesMarkedForDelete.has(image.publicId)}
                    on-toggle-remove={this.toggleImageMarkedForDelete.bind(this)}
                    on-edit={this.editImage.bind(this)}
                  />
                ))}
              </div>
            </div>
          )}
          <transition name="bounce">
            {this.hasChanges && this.showButtons && (
              <div class={Styles['buttons__wrapper']}>
                <WVHButton cancel on-click={this.cancelChanges.bind(this)} class={`${Styles['buttons__button']}`}>
                  VERWERFEN
                </WVHButton>
                <WVHButton primary on-click={this.saveChanges.bind(this)} class={Styles['buttons__button']}>
                  SPEICHERN
                </WVHButton>
              </div>
            )}
          </transition>
        </div>
      </div>
    );
  }

  private async loadCorrectBusiness(): Promise<void> {
    const businessId = this.$route.query.selected;
    if (!businessId && this.business) return;
    if (this.business && this.business.id === businessId) return;
    if (typeof businessId === 'string' && this.user.businesses.includes(businessId)) {
      await this.businessModule.actions.selectBusiness(businessId);
    }
  }

  private _checkScrollTop(): void {
    const show = this.$refs.page.scrollTop > 100;
    if (this.showButtons !== show) {
      this.showButtons = show;
      this.$forceUpdate();
    }
  }

  private setInitialMediaData(): void {
    if (!this.business) return;
    this.$set(this, 'mediaData', {});
    const { logo, cover, stories, profile } = this.business.media;
    const initialLogo = logo ? { ...logo, saved: true, isLogo: true } : null;
    this.$set(this.mediaData, 'logo', initialLogo);

    this.$set(this.mediaData, 'cover', {});
    const initialCoverImage = cover && cover.image ? { ...(cover.image || {}), saved: true, isCover: true } : null;
    this.$set(this.mediaData.cover, 'image', initialCoverImage);
    const initialCoverVideo = cover && cover.video ? { ...(cover.video || {}), saved: true, isCover: true } : null;
    this.$set(this.mediaData.cover, 'video', initialCoverVideo);

    this.$set(this.mediaData, 'profile', {});
    const initialProfileImage =
      profile && profile.image ? { ...(profile.image || {}), saved: true, isProfile: true } : null;
    this.$set(this.mediaData.profile, 'image', initialProfileImage);
    const initialProfileVideo =
      profile && profile.video ? { ...(profile.video || {}), saved: true, isProfile: true } : null;
    this.$set(this.mediaData.profile, 'video', initialProfileVideo);

    this.$set(this.mediaData, 'stories', {});
    this.$set(this.mediaData.stories, 'images', []);
    this.$set(this.mediaData.stories, 'videos', []);

    for (const image of stories.images) {
      const initialStoryImage = { ...image, saved: true, isStory: true };
      this.mediaData.stories.images.push(initialStoryImage);
    }
    for (const video of stories.videos) {
      const initialStoryVideo = { ...video, saved: true, isStory: true };
      this.mediaData.stories.videos.push(initialStoryVideo);
    }
  }
}

export default BusinessManageImages;
