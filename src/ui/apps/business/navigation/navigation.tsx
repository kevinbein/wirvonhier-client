import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './navigation.scss';
import { WVHButton } from '@/ui/components';
//import { db } from '@/db_tmp';

import { ProfileLoader } from './../components/profileLoader';
import { LogoutButton } from '../components/logoutButton/logoutButton';

@Component({
  name: 'BusinessNavigation',
})
export class BusinessNavigationPage extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public profile: any | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private loadedProfile(profile: any): void {
    this.profile = profile;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <ProfileLoader on-loadedProfile={(profile: any) => this.loadedProfile(profile)}>
        {this.profile !== null && (
          <div class={Styles['navigation-page']}>
            <div class={Styles['title']}>{this.profile.name}</div>
            <div class={Styles['navigation']}>
              <div class={Styles['navigation-button-container']}>
                <WVHButton icon="fa-user" to="profile/information" class={Styles['navigation-button']}>
                  Profil bearbeiten
                </WVHButton>
              </div>
              <div class={Styles['navigation-button-container']}>
                <WVHButton icon="fa-photo-video" to="profile/stories" class={Styles['navigation-button']}>
                  Stories verwalten
                </WVHButton>
              </div>
            </div>
            <LogoutButton class={Styles['logout-button']} />
          </div>
        )}
      </ProfileLoader>
    );
  }
}

export default BusinessNavigationPage;
