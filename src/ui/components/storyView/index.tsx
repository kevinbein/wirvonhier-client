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

  private videoEl: HTMLMediaElement | null = null;
  private videoControlsEl: HTMLDivElement | null = null;

  public showStory(): void {
    this.videoEl?.play();
  }

  public hideStory(): void {
    if (this.videoEl !== null) {
      this.videoEl.pause();
      this.videoEl.currentTime = 0;
    }
  }

  public showVideoPlayButton = false;
  public playVideo(): void {
    if (this.videoEl === null) {
      return;
    }
    this.videoEl
      .play()
      .then(() => {
        this.showVideoPlayButton = false;
      })
      .catch(() => {
        // play() failed because the user didn't interact with the document first
        this.showVideoPlayButton = true;
      });
  }

  public pauseVideo(): void {
    this.videoEl?.pause();
  }

  public resumeVideo(): void {
    this.videoEl?.play();
  }

  public initVideo(): void {
    if (this.story.type === 'video') {
      this.videoEl = this.$refs['story-video'] as HTMLMediaElement;
      this.videoControlsEl = this.$refs['story-video-controls'] as HTMLDivElement;

      this.videoControlsEl?.addEventListener('click', () => this.playVideo()); //this.pauseVideo());
      this.videoControlsEl?.addEventListener('mousedown', () => this.pauseVideo());
      this.videoControlsEl?.addEventListener('touchdown', () => this.pauseVideo());
      this.videoControlsEl?.addEventListener('mouseup', () => this.resumeVideo());
      this.videoControlsEl?.addEventListener('touchup', () => this.resumeVideo());
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
            <div class={Styles['story-video-controls']} ref="story-video-controls">
              <video ref="story-video" onCanplay={() => this.playVideo()} onLoadeddata={() => this.initVideo()}>
                <source src={this.story.src} type="video/mp4" />
              </video>
              {this.showVideoPlayButton && (
                <div class={Styles['video-play-button-container']}>
                  <div class={Styles['video-play-button-container__button']}>
                    <i class="fa fa-play"></i>
                  </div>
                </div>
              )}
            </div>
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
