import { VueComponent } from '@/ui/typings/vue-ts-component';
import Component from 'vue-class-component';
import SharedStyles from 'styles';
import Styles from './manageImages.scss';
import { ImageThumbnail } from './imageThumbnail';
import { Business, Image, IMAGETYPE } from '@/entities';
import { BusinessModule, AppearanceModule, UserModule, UserDataState } from '@/store';
import { IImageSizes } from './manageImages.types';
import { ImageForms } from './imageForms';
import { BackButton } from '@/ui';

interface IRefs {
  page: HTMLDivElement;
}

@Component({
  name: 'ManageImages',
  components: {
    BackButton,
    ImageForms,
  },
})
export class ManageImages extends VueComponent<{}, IRefs> {
  public businessModule = BusinessModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);
  public userModule = UserModule.context(this.$store);
  public imageSizes: IImageSizes = {} as IImageSizes;

  public get isLoading(): boolean {
    return !this.business || !this.imageSizes.profile;
  }
  public get user(): UserDataState {
    return this.userModule.state;
  }
  public get business(): Business | null {
    return this.user.selectedBusiness;
  }
  public get logo(): Image {
    return this.business?.media.logo || new Image(IMAGETYPE.LOGO, null, null);
  }
  public get profile(): Image {
    return this.business?.media.profile || new Image(IMAGETYPE.LOGO, null, null);
  }
  public get imageStories(): Image[] {
    return this.business?.media.stories.images || [];
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(true);
  }

  public mounted(): void {
    this.setPreviewSizes();
  }

  public editImage(image: Image): void {
    this.businessModule.actions.selectImageForEdit(image);
    this.$refs.page.scrollTop = 0;
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    const { profile, story, logo } = this.imageSizes || {};
    return (
      <div ref="page" class={`${SharedStyles.page} ${Styles['manage-images__page']}`}>
        <BackButton to={{ name: 'BusinessManageProfile' }} />
        {!this.isLoading && (
          <div class={Styles['manage-images__page-wrapper']}>
            <h1 class={Styles['manage-images__title']}>BILDER VERWALTEN</h1>
            <ImageForms imageSizes={this.imageSizes} />
            <h2 class={Styles['manage-images__title']}>Derzeitige Bilder</h2>
            <div class={Styles['manage-images__images-wrapper']}>
              <h3 class={Styles['manage-images__section-title']}>Logo</h3>
              <ImageThumbnail
                image={this.logo}
                width={logo.width}
                height={logo.height}
                on-edit={this.editImage.bind(this)}
              />
              <h3 class={Styles['manage-images__section-title']}>Titelbild</h3>
              <ImageThumbnail
                image={this.profile}
                width={profile.width}
                height={profile.height}
                on-edit={this.editImage.bind(this)}
              />
              <h3 class={Styles['manage-images__section-title']}>Story-Bilder</h3>
              <div class={Styles['manage-images__stories-wrapper']}>
                {this.imageStories.map((image) => (
                  <ImageThumbnail
                    image={image}
                    width={story.width}
                    height={story.height}
                    on-edit={this.editImage.bind(this)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  private setPreviewSizes(): void {
    const deviceWidth = Math.min(window.innerWidth, 500);
    const profileWidth = Math.round(deviceWidth - 50);
    const profileHeight = Math.round((profileWidth / 16) * 9);
    const storyWidth = Math.round(profileWidth / 2 - 8);
    const storyHeight = Math.round((storyWidth / 9) * 16);
    this.imageSizes = {
      profile: {
        width: profileWidth,
        height: profileHeight,
      },
      story: {
        width: storyWidth,
        height: storyHeight,
      },
      logo: {
        width: 120,
        height: 120,
      },
    };
  }
}
