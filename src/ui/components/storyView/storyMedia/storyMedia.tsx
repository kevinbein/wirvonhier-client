import Component from 'vue-class-component';
import Styles from './storyMedia.scss';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { Media, Image, MEDIATYPE, Video } from '@/entities';

interface IProps {
  story: Media;
  storyWidth: number;
  storyHeight: number;
  startVideo: boolean;
  controls?: boolean;
}

interface IRefs {
  storyVideoControls: HTMLDivElement;
  videoEl: HTMLVideoElement;
}
// WHEN DO PLAY / STOP Video?
@Component({
  name: 'StoryMedia',
  props: {
    story: Media,
    storyHeight: Number,
    storyWidth: Number,
    startVideo: Boolean,
    controls: Boolean,
  },
  watch: {
    startVideo: {
      immediate: true,
      handler(this: StoryMedia, value: boolean) {
        if (value) this.playVideo();
        if (!value) this.stopVideo();
      },
    },
  },
})
export class StoryMedia extends VueComponent<IProps, IRefs> {
  public dummyStory = '/assets/imgs/dummy_story_500x1000.jpg';
  public story!: Media;
  public storyWidth!: number;
  public storyHeight!: number;
  public startVideo!: boolean;
  public showVideoPlayButton = false;
  public videoError: string | null = null;
  public controls!: boolean;

  public playVideo(): void {
    if (!this.$refs.videoEl) return;
    this.$refs.videoEl
      .play()
      .then(() => {
        this.showVideoPlayButton = false;
      })
      .catch(() => {
        this.showVideoPlayButton = true;
      });
  }

  public pauseVideo(): void {
    if (!this.$refs.videoEl) return;
    this.$refs.videoEl.pause();
  }
  public stopVideo(): void {
    if (!this.$refs.videoEl) return;
    this.$refs.videoEl.pause();
    this.$refs.videoEl.currentTime = 0;
  }

  public clickVideo(): void {
    this.playVideo();
  }

  public mouseTouchDown(): void {
    this.pauseVideo();
    if (!this.startVideo) {
      this.stopVideo();
    }
  }

  public mouseTouchUp(): void {
    if (this.startVideo) {
      this.playVideo();
    }
  }

  public documentBlur(): void {
    this.pauseVideo();
  }

  public initVideo(): void {
    if (this.story.mediatype === MEDIATYPE.VIDEO) {
      const videoControlsEl = this.$refs.storyVideoControls;
      if (videoControlsEl) {
        videoControlsEl.addEventListener('mousedown', this.mouseTouchDown.bind(this));
        videoControlsEl.addEventListener('touchstart', this.mouseTouchDown.bind(this));
        videoControlsEl.addEventListener('mouseup', this.mouseTouchUp.bind(this));
        videoControlsEl.addEventListener('touchend', this.mouseTouchUp.bind(this));
      }
      window.addEventListener('blur', this.documentBlur.bind(this));
    }
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    switch (this.story.mediatype) {
      case MEDIATYPE.IMAGE: {
        return (
          <cld-image
            class={Styles['story']}
            publicId={(this.story as Image).publicId}
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
            {[
              <video
                ref="videoEl"
                class={Styles['story__video']}
                playsinline={true}
                preload={true}
                controls={this.controls}
                onLoadeddata={this.initVideo.bind(this)}
              >
                <source src={(this.story as Video).url} type="video/mp4" />
              </video>,
              !this.controls && <div class={Styles['story__video-controls']} ref="storyVideoControls"></div>,
            ].filter(Boolean) ||
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
}
