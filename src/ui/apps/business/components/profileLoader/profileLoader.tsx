import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './profileLoader.scss';
import { BusinessModule, UserData as UserModule } from '@/store';
import { Business } from '@/entities';

@Component({
  name: 'ProfileLoader',
  watch: {
    businessId: {
      immediate: true,
      handler(this: ProfileLoader, newId: string) {
        if (!newId) return;
        try {
          this.businessStore.actions.selectBusiness(newId);
        } catch (error) {
          this.loadingFailed = true;
        }
      },
    },
  },
})
export class ProfileLoader extends Vue {
  public userModule = UserModule.context(this.$store);
  public businessStore = BusinessModule.context(this.$store);
  public loadingFailed = false;

  get businessId(): string | null {
    return this.userModule.state.businesses[0];
  }
  get business(): Business | null {
    return this.businessStore.state.selectedBusiness;
  }

  logout(): void {
    this.$router.push('/business');
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    if (this.business != null) {
      return <div>{this.$slots.default}</div>;
    }
    return (
      <div class={Styles['loading-error-container']}>
        <div on-click={this.logout.bind(this)} class={Styles['close-button']}>
          <v-icon class={Styles['icon']}>fa-sign-out-alt</v-icon>
        </div>
        <div class={Styles['loading-error']}>
          <div class={Styles['message']}>
            Loading profile &nbsp;
            {(this.loadingFailed && (
              <span>
                ... <span class={Styles['error']}>failed!</span>
              </span>
            )) || <v-icon class={Styles['icon']}>fas fa-spinner fa-spin</v-icon>}
          </div>
        </div>
      </div>
    );
  }
}
