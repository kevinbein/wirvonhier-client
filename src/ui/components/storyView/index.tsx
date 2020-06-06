import { VueComponent } from '@/ui/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';
import { Story } from '@/entities';
import { StoryMedia } from './storyMedia';

const dummyLogo = '/assets/imgs/logo/logo_180x180.png';

interface IProps {
  story: Story;
  class?: string;
  ref?: string;
  storyWidth: number;
  storyHeight: number;
}

interface IRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
  page: HTMLDivElement;
  story: HTMLDivElement;
  storyVideoControls: HTMLDivElement;
}

@Component({
  name: 'Story',
  props: {
    story: {
      type: Story,
    },
    storyWidth: Number,
    storyHeight: Number,
  },
})
export class StoryView extends VueComponent<IProps, IRefs> {
  public story!: Story;
  public storyWidth!: number;
  public storyHeight!: number;
  public logoWidth = 60;
  public startVideo = false;

  public getUploadDateInfo(dateStr: string | undefined): string {
    if (dateStr === undefined) {
      return '';
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const date = new Date(dateStr) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const now = new Date() as any;
    const diff = now - date;
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    if (diff < 7 * DAY) {
      if (diff < DAY) {
        if (diff < HOUR) {
          const minutes = Math.max(1, Math.round(diff / MINUTE));
          return `Vor ${minutes} Minuten`;
        }
        const hours = Math.max(1, Math.round(diff / HOUR));
        return `Vor ${hours} Stunden`;
      }
      const days = Math.max(1, Math.round(diff / DAY));
      return `Vor ${days} Tagen`;
    }
    return date.toLocaleDateString();
  }

  public mounted(): void {
    this.$on('showStory', () => (this.startVideo = true));
    this.$on('hideStory', () => (this.startVideo = false));
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div ref="story" class={Styles['story']}>
        <div class={Styles['story__background']} />
        <div class={Styles['header']}>
          <div class={Styles['header-left-side']}>
            {this.story.business.media.logo && this.story.business.media.logo.publicId ? (
              <cld-image
                class={Styles['header-left-side__logo']}
                publicId={this.story.business.media.logo && this.story.business.media.logo.publicId}
                width={`${this.logoWidth}`}
                dpr={window.devicePixelRatio}
              >
                <cld-transformation crop="scale" />
              </cld-image>
            ) : (
              <img class={Styles['header-left-side__logo']} src={dummyLogo} alt="Heart logo" />
            )}
          </div>
          <div class={Styles['header-right-side']}>
            <div class={Styles['header-right-side__name']}>{this.story.business.name}</div>
            <div class={Styles['header-right-side__date']}>{this.getUploadDateInfo(this.story.createdAt)}</div>
          </div>
        </div>
        <div class={Styles['story-container']}>
          <StoryMedia
            story={this.story}
            storyWidth={this.storyWidth}
            storyHeight={this.storyHeight}
            startVideo={this.startVideo}
          />
        </div>
      </div>
    );
  }
}

export default StoryView;
