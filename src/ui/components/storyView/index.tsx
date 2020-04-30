import { VueComponent } from '@/ui/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';
import { Story } from '@/entities';

const dummyStory = '/assets/imgs/dummy_story_500x1000.jpg';
const dummyLogo = '/assets/imgs/logo/logo_180x180.png';

interface IProps {
  story: Story;
  class?: string;
  ref?: string;
}

interface IRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
  page: HTMLDivElement;
}

@Component({
  name: 'Story',
  props: {
    story: {
      type: Story,
    },
  },
})
export class StoryView extends VueComponent<IProps, IRefs> {
  public story!: Story;

  public logoWidth = 60;
  public deviceWidth = window.innerWidth;
  public deviceHeight = window.innerHeight;
  public storyWidth = Math.min(500, this.deviceWidth);
  public storyHeight = this.deviceWidth >= 500 ? this.deviceHeight - 50 : this.deviceHeight;

  public showStory(): void {
    if (this.story.type === 'video') {
      const videoEl: HTMLMediaElement = this.$refs['story-video'] as HTMLMediaElement;
      videoEl.play();
    }
  }

  public hideStory(): void {
    if (this.story.type === 'video') {
      const videoEl: HTMLMediaElement = this.$refs['story-video'] as HTMLMediaElement;
      videoEl.pause();
      videoEl.currentTime = 0;
    }
  }

  public mounted(): void {
    this.$on('showStory', () => this.showStory());
    this.$on('hideStory', () => this.hideStory());
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
          <div class={Styles['header-right-side']}>{this.story.business.name}</div>
        </div>

        <div class={Styles['story-container']}>
          {/*<vimeo-player
                            class={Styles['story']}
                            ref="player"
                            video-id={222706185}
                            onReady={() => console.log('vimeo ready')}
                            autoplay={true}
                            controls={false}
                            player-width={`${this.storyWidth}`}
                            player-height={`${this.storyHeight}`}
                        ></vimeo-player>*/}
          {(this.story.type === 'video' && (
            <video ref="story-video">
              <source src={this.story.src} type="video/mp4" />
            </video>
          )) ||
            (this.story.type === 'image' && (
              <cld-image
                class={Styles['story']}
                publicId={this.story.publicId}
                width={`${this.storyWidth}`}
                height={`${this.storyHeight}`}
              >
                <cld-transformation
                  fetchFormat="auto"
                  width={this.storyWidth}
                  height={this.storyHeight}
                  crop="fill"
                  gravity="faces"
                  dpr={window.devicePixelRatio}
                />
              </cld-image>
            )) || <img class={Styles['story']} src={dummyStory} alt="image" />}
        </div>
      </div>
    );
  }
}

export default StoryView;
