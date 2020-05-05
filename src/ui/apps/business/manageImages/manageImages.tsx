import { VueComponent } from '@/ui/vue-ts-component';
import Component from 'vue-class-component';
import debounce from 'lodash/debounce';
import SharedStyles from '@/ui/styles/main.scss';
import Styles from './manageImages.scss';
import { ImageThumbnail } from './imageThumbnail';
import { WVHButton } from '@/ui';
import { Business, MEDIATYPE } from '@/entities';
import { BusinessModule, AppearanceModule, UserModule, UserDataState } from '@/store';
import { IImageData } from './manageImages.types';
import { ManageImagesForm } from './manageImagesForm';
import { IHttpSuccessResponse } from '@/services';
import { ICloudinaryImageUploadResponse } from '@/services/images/imageService.types';

interface IRefs {
  [key: string]: HTMLDivElement;
  page: HTMLDivElement;
}

interface IFile {
  file: File;
  id: string;
}

@Component({
  name: 'BusinessManageImages',
})
export class BusinessManageImages extends VueComponent<{}, IRefs> {
  public businessModule = BusinessModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);
  public userModule = UserModule.context(this.$store);
  public newStoryImages: IImageData[] = [];
  public newCoverImage: IImageData | null = null;
  public deviceWidth!: number;
  public storyWidth!: number;
  public storyHeight!: number;
  public coverWidth!: number;
  public coverHeight!: number;
  public showImages = false;
  public showButtons = false;
  public imageSelectedForEdit: IImageData | null = null;
  public files: IFile[] = [];
  public checkScrollTop!: () => void;

  public get business(): Business | null {
    return this.businessModule.state.selectedBusiness;
  }

  public get user(): UserDataState {
    return this.userModule.state;
  }

  public get coverImage(): IImageData {
    const cover = this.business?.media.cover?.image;
    const existingCover = cover ? { ...cover, isCover: true, saved: true, markedForDelete: false, file: null } : null;
    const dummyCover = {
      src: '/assets/imgs/dummy_cover_1024x576.png',
      title: '',
      saved: true,
      markedForDelete: false,
      _id: '0',
      publicId: '',
      createdAt: '0',
      modifiedAt: '0',
      type: MEDIATYPE.IMAGE,
      isCover: true,
      file: null,
    };
    return this.newCoverImage || existingCover || dummyCover;
  }

  public get savedStoryImages(): IImageData[] {
    const stories = this.business?.media.stories.images;
    return stories
      ? stories.map((image) => ({ ...image, saved: true, file: null, markedForDelete: false, isCover: false }))
      : [];
  }

  public get allStoryImages(): IImageData[] {
    const allImages = [...this.newStoryImages, ...this.savedStoryImages];
    return allImages.filter(Boolean);
  }

  public get imagesMarkedForDelete(): IImageData[] {
    return [...this.allStoryImages, this.coverImage].filter((image) => image.markedForDelete);
  }

  public get unsavedImages(): IImageData[] {
    return [...this.allStoryImages, this.coverImage].filter((image) => !image.saved);
  }

  public get hasChanges(): boolean {
    return this.imagesMarkedForDelete.length > 0 || this.unsavedImages.length > 0;
  }

  public async saveChanges(): Promise<void> {
    if (!this.business) return;
    const media = this.business.media;
    const cover = { ...this.coverImage };
    cover.src = '';
    const businessMedia = {
      ...media,
      logo: media.logo, // LOGO MISSING
      cover: {
        ...(media.cover || {}),
        image: cover,
      },
      stories: {
        images: this.allStoryImages.map((img) => {
          const copy = { ...img };
          copy.src = '';
          return copy;
        }),
        videos: media.stories.videos,
      },
    };

    const updateRes = await this.businessModule.actions.update({
      business: this.business,
      key: 'media',
      value: businessMedia,
    });

    if (updateRes.status === 'failure') {
      // eslint-disable-next-line no-console
      console.log('Some UpdateError: ', updateRes);
    }

    const success = await this.businessModule.actions.save(updateRes.business);
    if (!success) {
      // eslint-disable-next-line no-console
      console.log('Some SaveError');
    }

    const all = [...this.allStoryImages, this.coverImage];
    const uploadRes = await this.businessModule.actions.uploadImages(all);
    const successfulUploads = uploadRes
      .filter((item: any) => item.status === 'success') // eslint-disable-line
      .map((item: IHttpSuccessResponse<ICloudinaryImageUploadResponse>) => {
        return item.data.public_id;
      });
    this.businessModule.actions.validateImageUploads(successfulUploads);
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(true);
    this.loadCorrectBusiness();
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
  }

  public addImage(data: IImageData): void {
    if (data.isCover) {
      this.newCoverImage = data;
    } else {
      this.newStoryImages.push(data);
    }
    this.imageSelectedForEdit = null;
  }

  public editImage(image: IImageData): void {
    this.imageSelectedForEdit = image;
    this.$refs.page.scrollTop = 0;
  }

  public removeImage(image: IImageData): void {
    if (image.saved) {
      image.markedForDelete = true;
    } else if (image.isCover) {
      this.newCoverImage = null;
    } else {
      this.newStoryImages = this.newStoryImages.filter((img) => img.src !== image.src);
    }
  }

  public cancelChanges(): void {
    this.newCoverImage = null;
    this.newStoryImages = [];
    this.imagesMarkedForDelete.forEach((image) => (image.markedForDelete = false));
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div ref="page" class={`${SharedStyles.page} ${Styles['manage-images__page']}`}>
        <router-link
          to={{ name: 'BusinessManageProfile', query: this.$route.query }}
          title="zurück"
          class={Styles['manage-images__back']}
        >
          zurück
        </router-link>
        <h1 class={Styles['manage-images__title']}>PROFIL VERWALTEN</h1>
        <ManageImagesForm
          on-new-image={this.addImage.bind(this)}
          on-cancel={() => (this.imageSelectedForEdit = null)}
          image={this.imageSelectedForEdit}
          coverHeight={this.coverHeight}
          coverWidth={this.coverWidth - (48 / 16) * 9}
          storyWidth={this.storyWidth}
          storyHeight={this.storyHeight}
        />
        <h2 class={Styles['manage-images__title']}>Derzeitige Bilder</h2>
        {this.showImages && (
          <div class={Styles['manage-images__images-wrapper']}>
            <h3 class={Styles['manage-images__section-title']}>Cover-Bild</h3>
            <ImageThumbnail
              image={this.coverImage}
              width={this.coverWidth}
              height={this.coverHeight}
              on-remove={this.removeImage.bind(this)}
              on-edit={this.editImage.bind(this)}
            />
            <h3 class={Styles['manage-images__section-title']}>Story-Bilder</h3>
            <div class={Styles['manage-images__stories-wrapper']}>
              {this.allStoryImages.map((image) => (
                <ImageThumbnail
                  image={image}
                  width={this.storyWidth}
                  height={this.storyHeight}
                  on-remove={this.removeImage.bind(this)}
                  on-edit={this.editImage.bind(this)}
                />
              ))}
            </div>
          </div>
        )}
        <transition name="bounce">
          {this.hasChanges && this.showButtons && (
            <div class={Styles['buttons__wrapper']}>
              <WVHButton
                cancel
                on-click={this.cancelChanges.bind(this)}
                class={`${Styles['buttons__button']} ${Styles['buttons__button--cancel']}`}
              >
                VERWERFEN
              </WVHButton>
              <WVHButton primary on-click={this.saveChanges.bind(this)} class={Styles['buttons__button']}>
                SPEICHERN
              </WVHButton>
            </div>
          )}
        </transition>
      </div>
    );
  }

  private loadCorrectBusiness(): void {
    const businessId = this.$route.query.selected;

    if (!businessId && this.business) return;

    if (this.business && this.business.id === businessId) return;

    if (typeof businessId === 'string' && this.user.businesses.includes(businessId)) {
      this.businessModule.actions.selectBusiness(businessId);
    }
  }

  private _checkScrollTop(): void {
    const show = this.$refs.page.scrollTop > 200;
    if (this.showButtons !== show) {
      this.showButtons = show;
      this.$forceUpdate();
    }
  }
}

export default BusinessManageImages;
