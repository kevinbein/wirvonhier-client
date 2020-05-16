import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './stories.scss';
import { Business, Story, Video } from '@/entities';
import { BusinessModule, AppearanceModule } from '@/store';
import { StoryView } from '@/ui/components';
//import { WVHButton } from '@/ui/components';

@Component({
  name: 'BusinessStories',
})
export class BusinessStoriesPage extends Vue {
  public businessModule = BusinessModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);

  get business(): Business | null {
    return this.businessModule.state.selectedBusiness;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get stories(): any[] {
    if (this.business === null) {
      return [];
    }

    const videos = this.business.media.stories.videos;
    videos.sort((video1: Video, video2: Video) => {
      const time1 = new Date(video1.modifiedAt).getTime();
      const time2 = new Date(video2.modifiedAt).getTime();
      return time2 - time1;
    });
    return videos;

    /*
    // sort media by modified date
    const media = this.business.media.stories.images;
    media.map((image: any) => {
      image.type = 'image';
      return image;
    });
    const videos = this.business.media.stories.videos;
    videos.map((video: any) => {
      video.type = 'video';
      return video;
    });
    media.push(...videos);
    media.sort((story1: any, story2: any) => {
      const time1 = new Date(story1.modifiedAt).getTime();
      const time2 = new Date(story2.modifiedAt).getTime();
      return time1 - time2;
    });
    return media;
    */
  }

  public async deleteVideo(video: Video): Promise<void> {
    if (this.business === null) {
      return;
    }

    await this.$services.videos.delete(this.business, video);

    const videoIndex = this.business.media.stories.videos.findIndex((video2: Video) => {
      return video2._id === video._id;
    });
    this.business.media.stories.videos.splice(videoIndex, 1);
  }

  public previewStory: Story | null = null;
  public loadVideoPreview(video: Video): void {
    if (this.business) {
      this.previewStory = new Story(video, this.business);
    }
  }

  public closeVideoPreview(): void {
    this.previewStory = null;
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(true);
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['stories-page-container']}>
        <router-link
          class={Styles['back-button']}
          to={{ name: 'BusinessDashboard', query: this.$route.query }}
          title="zurück"
        >
          <i class="fa fa-chevron-left"></i>
          <div class={Styles['back-button__title']}>Zurück</div>
        </router-link>
        <div class={Styles['stories-page']}>
          <table class={Styles['stories']}>
            <thead>
              <tr>
                <th>Titel</th>
                <th class={Styles['stories--center']}>Status</th>
                <th class={Styles['stories--center']}>Aktion</th>
              </tr>
            </thead>
            <tbody>
              {// eslint-disable-next-line @typescript-eslint/no-explicit-any
              this.stories.map((video: Video) => {
                return [
                  <tr class={Styles['stories__date']}>
                    <td colspan="3">{new Date(video.modifiedAt).toLocaleString()}</td>
                  </tr>,
                  <tr class={Styles['stories__info']}>
                    <td>
                      <div on-click={() => this.loadVideoPreview(video)} class={Styles['info__title']}>
                        {video.title}
                      </div>
                    </td>
                    <td class={Styles['stories--center']}>
                      {(video.status === 'transcoding' && (
                        <i class={`fa fa-spinner fa-spin ${Styles['info__status--transcoding']}`}></i>
                      )) || <i class={`fa fa-check ${Styles['info__status--complete']}`}></i>}
                    </td>
                    <td class={Styles['action-buttons'] + ' ' + Styles['stories--center']}>
                      <i
                        class={`fa fa-edit ${Styles['action-buttons__icon-button']} ${Styles['action-buttons__icon-button--disabled']}`}
                      ></i>
                      <i
                        on-click={() => this.deleteVideo(video)}
                        class={`fa fa-trash ${Styles['action-buttons__icon-button']} ${Styles['action-buttons__icon-button--critical']}`}
                      ></i>
                    </td>
                  </tr>,
                ];
              })}
            </tbody>
          </table>
        </div>
        {this.previewStory !== null && (
          <div class={Styles['story-preview__container']}>
            <StoryView story={this.previewStory}></StoryView>
            <i
              on-click={() => this.closeVideoPreview()}
              class={`fa fa-times ${Styles['story-preview__close-button']}`}
            ></i>
          </div>
        )}
      </div>
    );
  }
}

export default BusinessStoriesPage;
