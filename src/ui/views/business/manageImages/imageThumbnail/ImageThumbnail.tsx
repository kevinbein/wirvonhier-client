import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './imageThumbnail.scss';
import { Image, IMAGETYPE } from '@/entities';

interface IProps {
  image: Image;
  width: number;
  height: number;
}

@Component({
  name: 'ImageThumbnail',
  props: {
    image: {
      type: Image,
      required: true,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
  },
})
export class ImageThumbnail extends VueComponent<IProps> {
  public image!: Image;
  public width!: number;
  public height!: number;
  public hasFocus = false;
  public dummyImageSrc = {
    story: '/assets/imgs/dummy_cover_1024x576.png',
    profile: '/assets/imgs/dummy_story_575x1024.png',
    logo: '/assets/imgs/logo/logo_192x192.png',
  };

  public edit(): void {
    if (!this.image._id) return;
    this.$emit('edit', this.image);
  }

  public focus(): void {
    if (!this.image._id) return;
    this.hasFocus = !this.hasFocus;
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div
        class={Styles['thumbnail__wrapper']}
        tabindex="0"
        style={{ width: `${this.width}px`, height: `${this.height}px` }}
        on-focus={this.focus.bind(this)}
        on-blur={this.focus.bind(this)}
      >
        {this.image.publicId ? (
          <cld-image
            class={Styles.thumbnail}
            publicId={this.image.publicId}
            width={this.width}
            height={this.height}
            crop="fill"
            dpr={window.devicePixelRatio}
          >
            <cld-transformation quality="auto" fetchFormat="auto" />
          </cld-image>
        ) : (
          <img
            class={Styles.thumbnail}
            width={this.width}
            height={this.height}
            src={this.dummyImageSrc[this.image.imageType]}
            alt={this.image.title}
          />
        )}
        {this.image.title !== 'dummy' && <div class={Styles['thumbnail__title']}>{this.image.title}</div>}

        <transition name="fade">
          {this.hasFocus && (
            <div
              class={`${Styles['thumbnail__buttons']} ${
                this.image.imageType === IMAGETYPE.PROFILE ? Styles['thumbnail__buttons--profile'] : ''
              }`}
            >
              <button class={Styles['thumbnail__button']} on-click={this.edit.bind(this)}>
                <i class={`${Styles['thumbnail__icon']} fa fa-edit`} />
              </button>
            </div>
          )}
        </transition>
      </div>
    );
  }
}
