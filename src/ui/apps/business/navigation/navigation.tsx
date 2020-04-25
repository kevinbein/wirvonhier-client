import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './navigation.scss';
import { WVHButton } from '@/ui/components';

import { BusinessModule } from '@/store';
import { ProfileLoader } from './../components/profileLoader';
import { LogoutButton } from '../components/logoutButton/logoutButton';
import { Business } from '@/entities';

@Component({
  name: 'BusinessNavigation',
})
export class BusinessNavigationPage extends Vue {
  public businessModule = BusinessModule.context(this.$store);

  public get profile(): Business | null {
    return this.businessModule.state.selectedBusiness;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <ProfileLoader>
        {this.profile !== null ? (
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
        ) : (
          <WVHButton icon="fa-user" to={{ name: 'CreateBusiness' }} class={Styles['navigation-button']}>
            Neues Profil erstellen
          </WVHButton>
        )}
      </ProfileLoader>
    );
  }
}

export default BusinessNavigationPage;
