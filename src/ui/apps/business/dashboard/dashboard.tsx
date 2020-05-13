import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './dashboard.scss';
import SharedStyles from '@/ui/styles/main.scss';
import { BusinessModule, UserModule, UserDataState, AppearanceModule } from '@/store';
import { WVHButton } from '@/ui';
import { Business } from '@/entities';

@Component({
  name: 'BusinessDashboard',
})
export class BusinessDashboard extends Vue {
  public businessModule = BusinessModule.context(this.$store);
  public userModule = UserModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);

  public get user(): UserDataState {
    return this.userModule.state;
  }

  public get business(): Business | null {
    return this.userModule.state.userBusinesses[0];
  }

  public get hasVideo(): boolean {
    return !!this.business && !!this.business.media.stories.videos && !!this.business.media.stories.videos[0];
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(true);
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['dashboard__page']}`}>
        <img class={Styles['dashboard__logo']} src="/assets/imgs/logo/logo-schrift_512x203.png" alt="WirVonHier Logo" />
        <WVHButton class={Styles['dashboard__button']} disabled={!this.hasVideo} to={{ name: 'BusinessStories' }}>
          Meine Videos
        </WVHButton>
        {/*<WVHButton class={Styles['dashboard__button']} to={{ name: 'Explore' }}>
          Andere Händlervideos
        </WVHButton>*/}
        <WVHButton class={Styles['dashboard__button']} primary to={{ name: 'BusinessUploadVideo' }}>
          Video Hochladen
        </WVHButton>
        <WVHButton
          class={Styles['dashboard__button']}
          to={{ name: 'BusinessManageProfile', query: this.business ? { selected: this.business.id } : undefined }}
        >
          Mein Profil bearbeiten
        </WVHButton>
      </div>
    );
  }
}

export default BusinessDashboard;
