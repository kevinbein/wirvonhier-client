import { VueComponent } from '@/ui/typings/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';
import { Media } from '@/entities';
import { StoryMedia } from './storyMedia';

const dummyLogo = '/assets/imgs/logo/logo_180x180.png';

interface IProps {
  story: Media;
  class?: string;
  ref?: string;
  storyWidth: number;
  storyHeight: number;
  controls?: boolean;
}

interface IRefs {
  page: HTMLDivElement;
  story: HTMLDivElement;
  storyVideoControls: HTMLDivElement;
}

@Component({
  name: 'Story',
  props: {
    story: {
      type: Media,
    },
    storyWidth: Number,
    storyHeight: Number,
    controls: Boolean,
  },
})
export class StoryView extends VueComponent<IProps, IRefs> {
  public story!: Media;
  public storyWidth!: number;
  public storyHeight!: number;
  public logoWidth = 60;
  public startVideo = false;
  public controls!: boolean;

  public getUploadDateInfo(date: Date = new Date()): string {
    const diff = Date.now() - date.getMilliseconds();
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    if (diff < 7 * DAY) {
      if (diff < DAY) {
        if (diff < HOUR) {
          const minutes = Math.max(1, Math.round(diff / MINUTE));
          return `Vor ${minutes} Minute${minutes > 1 ? 'n' : ''}`;
        }
        const hours = Math.max(1, Math.round(diff / HOUR));
        return `Vor ${hours} Stunde${hours > 1 ? 'n' : ''}`;
      }
      const days = Math.max(1, Math.round(diff / DAY));
      return `Vor ${days} Tage${days > 1 ? 'n' : ''}`;
    }
    return date.toLocaleDateString();
  }

  public mounted(): void {
    this.$on('playMedia', (val = false) => {
      this.startVideo = val;
    });
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div
        ref="story"
        class={Styles['story']}
        style={{ width: `${this.storyWidth}px`, height: `${this.storyHeight}px` }}
      >
        <div class={Styles['story__background']} />
        <div class={Styles['header']}>
          <div class={Styles['header-left-side']}>
            {this.story.business?.media.logo && this.story.business.media.logo.publicId ? (
              <cld-image
                class={Styles['header-left-side__logo']}
                publicId={this.story.business.media.logo && this.story.business.media.logo.publicId}
                width={`${this.logoWidth}`}
                height={`${this.logoWidth}`}
                dpr={window.devicePixelRatio}
              >
                <cld-transformation
                  fetchFormat="auto"
                  crop="fill"
                  width={`${this.logoWidth}`}
                  height={`${this.logoWidth}`}
                  dpr={window.devicePixelRatio}
                />
              </cld-image>
            ) : (
              <img class={Styles['header-left-side__logo']} src={dummyLogo} alt="Heart logo" />
            )}
          </div>
          <div class={Styles['header-right-side']}>
            <div class={Styles['header-right-side__name']}>{this.story.business?.name}</div>
            <div class={Styles['header-right-side__date']}>{this.getUploadDateInfo(this.story.createdAt)}</div>
          </div>
        </div>
        <div class={Styles['story-container']}>
          <StoryMedia
            story={this.story}
            storyWidth={this.storyWidth}
            storyHeight={this.storyHeight}
            startVideo={this.startVideo}
            controls={this.controls}
          />
        </div>
      </div>
    );
  }
}

export default StoryView;
