import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './imageThumbnail.scss';
import { IImageData } from '../manageImages.types';

interface IProps {
  image: IImageData;
  width: number;
  height: number;
  'marked-for-delete': boolean;
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
    markedForDelete: {
      type: Boolean,
      default: false,
    },
  },
})
export class ImageThumbnail extends VueComponent<IProps> {
  public image!: IImageData;
  public width!: number;
  public height!: number;
  public hasFocus = false;
  public markedForDelete!: boolean;

  public toggleRemove(): void {
    if (this.image._id === '0') return;
    this.$emit('toggle-remove', this.image);
  }

  public edit(): void {
    if (this.image._id === '0') return;
    this.$emit('edit', this.image);
  }

  public focus(): void {
    if (this.image._id === '0') return;
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
            crop="fill"
            dpr={window.devicePixelRatio}
          >
            <cld-transformation quality="auto" fetchFormat="auto" />
          </cld-image>
        )}
        {this.image.title !== 'dummy' && <div class={Styles['thumbnail__title']}>{this.image.title}</div>}
        <div
          class={`${Styles.overlay} ${this.markedForDelete ? Styles['overlay--delete'] : ''}
          ${!this.image.saved ? Styles['overlay--new'] : ''}`}
        />
        <transition name="fade">
          {this.hasFocus && (
            <div
              class={`${Styles['thumbnail__buttons']} ${this.image.isCover ? Styles['thumbnail__buttons--cover'] : ''}`}
            >
              <button class={Styles['thumbnail__button']} on-click={this.edit.bind(this)}>
                <i class={`${Styles['thumbnail__icon']} fa fa-edit`} />
              </button>
              <button
                class={`${Styles['thumbnail__button']} ${Styles['thumbnail__button--delete']}`}
                on-click={this.toggleRemove.bind(this)}
              >
                <i class={`${Styles['thumbnail__icon']} far fa-trash-alt`} />
              </button>
            </div>
          )}
        </transition>
      </div>
    );
  }
}
