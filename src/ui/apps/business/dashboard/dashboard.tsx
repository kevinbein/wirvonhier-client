import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './dashboard.scss';
import { BusinessModule, UserModule, UserDataState } from '@/store';
import { WVHButton } from '@/ui';

@Component({
  name: 'BusinessDashboard',
})
export class BusinessDashboard extends Vue {
  public businessModule = BusinessModule.context(this.$store);
  public userModule = UserModule.context(this.$store);

  public get user(): UserDataState {
    return this.userModule.state;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={`${Styles.page} ${Styles['dashboard__page']}`}>
        <img class={Styles['dashboard__logo']} src="/assets/imgs/logo/logo-schrift_512x203.png" alt="WirVonHier Logo" />
        <WVHButton class={Styles['dashboard__button']} width="55%" large to={{ name: 'BusinessEditVideo' }}>
          Mein aktuelles Video
        </WVHButton>
        <WVHButton class={Styles['dashboard__button']} width="55%" large to={{ name: 'Explore' }}>
          Andere Händerlvideos
        </WVHButton>
        <WVHButton class={Styles['dashboard__button']} width="55%" large primary to={{ name: 'BusinessUploadVideo' }}>
          Video Hochladen
        </WVHButton>
        <WVHButton class={Styles['dashboard__button']} width="55%" large to={{ name: 'BusinessProfile' }}>
          Zu meinem Profil
        </WVHButton>
        <router-link class={Styles['dashboard__logout']} to={{ name: 'BusinessLogout' }}>
          Logout
        </router-link>
      </div>
    );
  }
}

export default BusinessDashboard;
