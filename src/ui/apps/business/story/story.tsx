import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './story.scss';
import { ProfileLoader } from '../components';
//import { WVHButton } from '@/ui/components';

@Component({
  name: 'BusinessStory',
})
export class BusinessStoryPage extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public profile: any | null = null;
  public story: any = [];
  private loadedProfile(profile: any): void {
    this.profile = profile;

    // sort media by modified date

    const images = this.profile.media.stories.images;
    const image = images.find((image: any) => image.publicId == this.storyId);
    if (image === undefined) {
      const videos = this.profile.media.stories.videos;
      const video = videos.find((video: any) => video.publicId == this.storyId);
      if (video === undefined) {
        this.$router.push('/business/profile/stories');
        return;
      }
      this.story = video;
      this.story.type = 'video';
    } else {
      this.story = image;
      this.story.type = 'image';
    }
    console.log('Found story', this.story);
  }

  private storyId: string | null = null;
  created(): void {
    this.storyId = this.$route.params.storyId;
  }

  public gotoStories(): void {
    this.$router.push('/business/profile/stories');
  }

  public save(): void {
    console.log('Save', this.profile.name);
    this.isSaved = true;
  }

  public isSaved = true;
  public storyChanged(): void {
    console.log('Profile changed!');
    this.isSaved = false;
  }

  public overlay = false;
  public showOverlay(): void {
    this.overlay = true;
    return;
    const nullfn = (e) => {
      console.log('touchmove');
      window.scrollTo(0, 0);
      e.preventDefault();
      return false;
    };
    //this.$refs.storyPage.classList.add('active-overlay');
    document.body.ontouchmove = nullfn;
    document.body.onscroll = nullfn;
    document.body.onmousemove = nullfn;
  }

  public hideOverlay(): void {
    document.body.ontouchmove = undefined;
    this.overlay = false;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    if (this.profile !== null) {
      console.log(this.profile.media.stories.images);
    }
    return (
      <ProfileLoader on-loadedProfile={(profile: any) => this.loadedProfile(profile)}>
        {this.profile !== null && [
          <div class={Styles['story-page-container'] + ' ' + (this.overlay ? Styles['hidden'] : '')}>
            <v-app-bar dense class={Styles['nav-bar']}>
              <v-btn icon on-click={() => this.gotoStories()}>
                <v-icon class={Styles['back-icon']}>fa-chevron-left</v-icon>
              </v-btn>
              <v-spacer />
              <v-toolbar-title>Stories</v-toolbar-title>
              <v-spacer />
              <v-btn icon disabled={this.isSaved}>
                {(this.isSaved && (
                  <v-icon on-click={() => this.save()} class={Styles['check-icon']}>
                    fa-check
                  </v-icon>
                )) || (
                  <v-icon on-click={() => this.save()} class={Styles['save-icon']}>
                    fa-save
                  </v-icon>
                )}
              </v-btn>
            </v-app-bar>
            <div class={Styles['story-page']}>
              <div class={Styles['preview']}>
                <v-btn class={Styles['button']} on-click={() => this.showOverlay()}>
                  Vorschau <v-icon class={Styles['icon']}>fa-image</v-icon>
                </v-btn>
              </div>
              <div class={Styles['headline']}>Informationen</div>
              <div class={Styles['field-title']}>
                <v-textarea
                  label="Titel"
                  value={this.story.title}
                  onChange={() => this.storyChanged()}
                  outlined
                ></v-textarea>
              </div>
              <div class={Styles['field-id']}>
                <v-text-field label="ID" value={this.story.publicId} outlined disabled></v-text-field>
              </div>
              <div class={Styles['field-created']}>
                <v-text-field label="Erstellt" value={this.story.created} outlined disabled></v-text-field>
              </div>
              <div class={Styles['field-modified']}>
                <v-text-field label="Geändert" value={this.story.modified} outlined disabled></v-text-field>
              </div>
            </div>
          </div>,
          <div class={Styles['overlay'] + ' ' + (this.overlay ? Styles['visible'] : '')}>
            <div class={Styles['overlay-content']}>
              <div class={Styles['close-button']} onClick={() => this.hideOverlay()}>
                <v-icon class={Styles['close-icon']}>fa-times</v-icon>
              </div>
              <div class={Styles['story-preview']}>
                <cld-image
                  class={Styles['cld']}
                  publicId={this.story.publicId}
                  width={`${Math.min(...[500, window.innerWidth])}`}
                  height={`${window.innerHeight}`}
                  crop="fill"
                />
              </div>
            </div>
          </div>,
        ]}
      </ProfileLoader>
    );
  }
}
