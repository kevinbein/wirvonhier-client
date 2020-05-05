import Component from 'vue-class-component';
import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './imageThumbnail.scss';
import { IImageData } from '../manageImages.types';

interface IProps {
  image: IImageData;
  width: number;
  height: number;
}

@Component({
  name: 'ImageThumbnail',
  props: {
    image: {
      type: Object,
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
  public image!: IImageData;
  public width!: number;
  public height!: number;
  public isFocused = false;

  public remove(): void {
    if (this.image._id === '0') return;
    this.$emit('remove', this.image);
  }

  public edit(): void {
    if (this.image._id === '0') return;
    this.$emit('edit', this.image);
  }

  public focus(): void {
    if (this.image._id === '0') return;
    this.isFocused = true;
  }
  public blur(): void {
    this.isFocused = false;
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div
        class={Styles['thumbnail__wrapper']}
        tabindex="0"
        style={{ width: `${this.width}px`, height: `${this.height}px` }}
        on-click={this.focus.bind(this)}
        on-blur={this.blur.bind(this)}
      >
        {this.image.src || !this.image.saved ? (
          <img
            class={Styles.thumbnail}
            width={this.width}
            height={this.height}
            src={this.image.src}
            alt={this.image.title}
          />
        ) : (
          <cld-image
            class={Styles.thumbnail}
            publicId={this.image.publicId}
            width={this.width}
            height={this.height}
            crop="scale"
            dpr={window.devicePixelRatio}
          >
            <cld-transformation quality="auto" fetchFormat="auto" />
          </cld-image>
        )}
        {this.image.title !== 'dummy' && <div class={Styles['thumbnail__title']}>{this.image.title}</div>}
        <div
          class={`${Styles.overlay} ${this.image.markedForDelete ? Styles['overlay--delete'] : ''}
          ${!this.image.saved ? Styles['overlay--new'] : ''}`}
        />
        <transition name="fade">
          {this.isFocused && (
            <div
              class={`${Styles['thumbnail__buttons']} ${this.image.isCover ? Styles['thumbnail__buttons--cover'] : ''}`}
            >
              <button class={Styles['thumbnail__button']} on-click={this.edit.bind(this)}>
                <i class={`${Styles['thumbnail__icon']} fa fa-edit`} />
              </button>
              <button class={Styles['thumbnail__button']} on-click={this.remove.bind(this)}>
                <i class={`${Styles['thumbnail__icon']} fa fa-times`} />
              </button>
            </div>
          )}
        </transition>
      </div>
    );
  }
}
