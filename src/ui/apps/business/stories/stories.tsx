import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './stories.scss';
import NavigationBarStyles from './../styles/navigationBar.scss';
import { ProfileLoader } from '../components';
//import { WVHButton } from '@/ui/components';

@Component({
  name: 'BusinessStories',
})
export class BusinessStoriesPage extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public profile: any | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public media: any = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private loadedProfile(profile: any): void {
    this.profile = profile;

    // sort media by modified date
    this.media = this.profile.media.stories.images;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.media.map((image: any) => {
      image.type = 'image';
      return image;
    });
    const videos = this.profile.media.stories.videos;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    videos.map((video: any) => {
      video.type = 'video';
      return video;
    });
    this.media.push(...videos);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.media.sort((story1: any, story2: any) => {
      const time1 = new Date(story1.modified).getTime();
      const time2 = new Date(story2.modified).getTime();
      return time1 - time2;
    });
  }

  public gotoProfile(): void {
    this.$router.push('/business/profile');
  }

  public gotoEditStory(storyId: string): void {
    this.$router.push('/business/profile/stories/' + storyId);
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <ProfileLoader on-loadedProfile={(profile: any) => this.loadedProfile(profile)}>
        {this.profile !== null && (
          <div class={Styles['stories-page-container']}>
            <v-app-bar dense class={NavigationBarStyles['nav-bar']}>
              <v-btn icon on-click={() => this.gotoProfile()}>
                <v-icon class={NavigationBarStyles['back-icon']}>fa-chevron-left</v-icon>
              </v-btn>
              <v-spacer />
              <v-toolbar-title>Stories</v-toolbar-title>
              <v-spacer />
              {/* needed for the title to be centered .-.*/}
              <v-btn icon disabled></v-btn>
              {/*<v-btn icon disabled>
                <v-icon on-click={() => null} class={Styles['check-icon']}>
                  fa-check
                </v-icon>
              </v-btn>*/}
            </v-app-bar>
            <div class={Styles['stories-page']}>
              <div class={Styles['upload-button']}>
                <img class={Styles['icon']} src="/assets/imgs/profile_story_upload_372x306.png" alt="Upload logo" />
                <div>Video hochladen</div>
              </div>
              <div class={Styles['stories']}>
                <table class={Styles['table']}>
                  <thead>
                    <tr>
                      <th>Titel</th>
                      <th>Typ</th>
                      <th class={Styles['center']}>Aktion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.media.map((item: any) => {
                      return [
                        <tr class={Styles['date']}>
                          <td colspan="3">{new Date(item.modified).toLocaleString()}</td>
                        </tr>,
                        <tr class={Styles['info']}>
                          <td>{item.title} sd fas df asfd asdf </td>
                          <td class={Styles['center']}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</td>
                          <td class={Styles['action-buttons'] + ' ' + Styles['center']}>
                            <v-btn
                              icon
                              on-click={() => this.gotoEditStory(item.publicId)}
                              class={Styles['action-button']}
                            >
                              <v-icon class={Styles['icon']}>fa-edit</v-icon>
                            </v-btn>
                          </td>
                        </tr>,
                      ];
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </ProfileLoader>
    );
  }
}
