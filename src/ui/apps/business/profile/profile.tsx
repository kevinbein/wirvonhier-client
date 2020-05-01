import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './profile.scss';
import { WVHButton } from '@/ui/components';

import { BusinessModule, UserDataState, UserModule } from '@/store';
import { ProfileLoader } from '../components/profileLoader';
import { LogoutButton } from '../components/logoutButton/logoutButton';
import { Business } from '@/entities';

@Component({
  name: 'BusinessProfile',
})
export class BusinessProfile extends Vue {
  public businessModule = BusinessModule.context(this.$store);
  public userModule = UserModule.context(this.$store);

  public get user(): UserDataState {
    return this.userModule.state;
  }

  public get business(): Business | null {
    return this.businessModule.state.selectedBusiness;
  }

  public created(): void {
    this.loadCorrectBusiness();
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <ProfileLoader>
        {this.business !== null ? (
          <div class={Styles['navigation-page']}>
            <div class={Styles['title']}>{this.business.name}</div>
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

  private loadCorrectBusiness(): void {
    const businessId = this.$route.query.business;
    if (typeof businessId !== 'string') {
      this.$router.push({ name: 'BusinessDashboard' });
      return;
    }
    if (this.business && this.business.id === businessId) return;
    if (this.user.businesses.includes(businessId)) {
      this.businessModule.actions.selectBusiness(businessId);
      return;
    }
    this.$router.push({ name: 'BusinessDashboard' });
  }
}

export default BusinessProfile;
