import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './videos.scss';
import { Business, Story, Video } from '@/entities';
import { BusinessModule, AppearanceModule } from '@/store';
import { StoryView } from '@/ui/components';
//import { WVHButton } from '@/ui/components';

@Component({
  name: 'Videos',
})
export class Videos extends Vue {
  public businessModule = BusinessModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);
  public deviceWidth = window.innerWidth;
  public deviceHeight = window.innerHeight;
  public storyWidth = Math.min(500, this.deviceWidth);
  public storyHeight = this.deviceWidth >= 500 ? this.deviceHeight - 50 : this.deviceHeight;
  private refreshId?: NodeJS.Timeout;

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
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(true);
    this.refreshData();
  }

  public beforeUnmount(): void {
    if (this.refreshId) clearTimeout(this.refreshId);
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
                      {(video.status === 'transcoding' && (
                        <div class={Styles['info__title--transcoding']}>{video.title}</div>
                      )) || (
                        <div on-click={() => this.loadVideoPreview(video)} class={Styles['info__title']}>
                          {video.title}
                        </div>
                      )}
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
            <StoryView
              story={this.previewStory}
              storyWidth={this.storyWidth}
              storyHeight={this.storyHeight}
              controls={true}
            />
            <i
              on-click={() => this.closeVideoPreview()}
              class={`fa fa-times ${Styles['story-preview__close-button']}`}
            />
          </div>
        )}
      </div>
    );
  }

  private refreshData(): void {
    if (!this.business) return;
    this.businessModule.actions.loadAndPersistBusinessDataById([this.business._id as string]);
    this.businessModule.actions.selectBusiness(this.business._id as string);
    this.refreshId = setTimeout(this.refreshData.bind(this), 15000);
  }
}
