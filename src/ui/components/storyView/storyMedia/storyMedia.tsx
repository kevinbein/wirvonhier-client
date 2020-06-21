import Component from 'vue-class-component';
import Styles from './storyMedia.scss';
import { VueComponent } from '@/ui/vue-ts-component';
import { Story, MEDIATYPE } from '@/entities';

interface IProps {
  story: Story;
  storyWidth: number;
  storyHeight: number;
  startVideo: boolean;
}

interface IRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
  storyVideoControls: HTMLDivElement;
}

@Component({
  name: 'StoryMedia',
  props: {
    story: Object,
    storyHeight: Number,
    storyWidth: Number,
    startVideo: Boolean,
  },
  watch: {
    startVideo: {
      immediate: true,
      handler(this: StoryMedia, value: boolean) {
        //console.log('watch startVideo', value);
        if (value) this.playVideo();
        if (!value) this.stopVideo();
      },
    },
  },
})
export class StoryMedia extends VueComponent<IProps, IRefs> {
  public dummyStory = '/assets/imgs/dummy_story_500x1000.jpg';
  public story!: Story;
  public storyWidth!: number;
  public storyHeight!: number;
  public startVideo!: boolean;
  public showVideoPlayButton = false;
  public videoUrl: string | null = null;
  public videoError: string | null = null;

  private videoEl: HTMLMediaElement | null = null;

  public mounted(): void {
    if (this.story.type === MEDIATYPE.VIDEO) {
      this.loadVideo(this.story.src);
    }
  }

  public playVideo(): void {
    if (this.videoEl === null) return;
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
    if (this.videoEl === null) return;
    this.videoEl.pause();
  }
  public stopVideo(): void {
    if (this.videoEl === null) return;
    this.videoEl.pause();
    this.videoEl.currentTime = 0;
  }

  public clickVideo(): void {
    //console.log('clickVideo', this.startVideo);
    this.playVideo();
  }

  public mouseTouchDown(): void {
    //console.log('mouseTouchDown', this.startVideo);
    this.pauseVideo();
    if (!this.startVideo) {
      this.stopVideo();
    }
  }

  public mouseTouchUp(): void {
    //console.log('mouseTouchUp', this.startVideo);
    if (this.startVideo) {
      this.playVideo();
    }
  }

  public documentBlur(): void {
    this.pauseVideo();
  }

  public initVideo(): void {
    if (this.story.type === MEDIATYPE.VIDEO) {
      this.videoEl = this.$refs['story-video'] as HTMLMediaElement;
      const videoControlsEl = this.$refs.storyVideoControls;

      videoControlsEl.addEventListener('mousedown', this.mouseTouchDown.bind(this));
      videoControlsEl.addEventListener('touchstart', this.mouseTouchDown.bind(this));
      videoControlsEl.addEventListener('mouseup', this.mouseTouchUp.bind(this));
      videoControlsEl.addEventListener('touchend', this.mouseTouchUp.bind(this));
      window.addEventListener('blur', this.documentBlur.bind(this));
    }
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    switch (this.story.type) {
      case MEDIATYPE.IMAGE: {
        return (
          <cld-image
            class={Styles['story']}
            publicId={this.story.src}
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
        );
      }
      case MEDIATYPE.VIDEO: {
        return (
          <div class={Styles['story__video-container']}>
            {(this.videoUrl && [
              <video
                ref="story-video"
                class={Styles['story__video']}
                playsinline={true}
                preload={true}
                onLoadeddata={this.initVideo.bind(this)}
              >
                <source src={this.videoUrl} type="video/mp4" />
              </video>,
              <div class={Styles['story__video-controls']} ref="storyVideoControls"></div>,
            ]) ||
              (this.videoError && <div class={Styles['story__message']}>{this.videoError}</div>) || (
                <div class={Styles['story__message']}></div>
              )}
            {this.showVideoPlayButton && (
              <div class={Styles['video-play-button-container']} onClick={this.clickVideo.bind(this)}>
                <div class={Styles['video-play-button-container__button']}>
                  <i class="fa fa-play"></i>
                </div>
              </div>
            )}
          </div>
        );
      }
      default:
        return <img class={Styles['story']} src={this.dummyStory} alt="image" />;
    }
  }

  private async loadVideo(videoId: string): Promise<void> {
    try {
      this.videoUrl = await this.$services.videos.loadVideoUrl(videoId);
      if (this.videoUrl === null) {
        this.videoError = "Error: The requested video couldn't be found";
      }
    } catch (e) {
      this.videoError = 'Error: Unknown!';
    }
  }
}
