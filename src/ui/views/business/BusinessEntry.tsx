import Vue from 'vue';
import Component from 'vue-class-component';
import { MainNavigation } from '@/ui/components';
import { UserModule, BusinessModule, AppearanceModule } from '@/store';
import { VerificationToast } from './components';
import { POSITION, TYPE } from 'vue-toastification';

@Component({
  name: 'Business',
  watch: {
    userIsVerified: {
      immediate: true,
      handler(this: BusinessEntry, isVerified) {
        if (isVerified || !this.userId || this.isYoungerThanTwentyMinutes || this.$route.name === 'VerifyEmail') return;
        this.$toast(VerificationToast, { position: POSITION.TOP_CENTER, type: TYPE.ERROR, timeout: false });
      },
    },
  },

  beforeRouteEnter(_to, _from, next): void {
    next(async (vm) => {
      const userModule = UserModule.context(vm.$store);
      const userId = userModule.state.id;
      if (!userId) {
        const success = await userModule.actions.authenticateMe();
        if (!success) return;
      }
      const business = userModule.state.selectedBusiness;
      if (!business) {
        await userModule.actions.loadUserAndSaveUserData();
      }
      next();
    });
  },
})
export class BusinessEntry extends Vue {
  public userModule = UserModule.context(this.$store);
  public businessModule = BusinessModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);

  public get userId(): string | null {
    return this.userModule.state.id;
  }
  public get isYoungerThanTwentyMinutes(): boolean {
    return this.userModule.state.createdAt >= new Date(Date.now() - 1200000);
  }
  public get userIsVerified(): boolean {
    return this.userModule.state.isVerified;
  }
  public get isNavVisible(): boolean {
    return this.appearanceModule.state.isNavigationVisible;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div style={{ display: 'contents' }}>
        {this.isNavVisible && <MainNavigation />}
        <router-view></router-view>
      </div>
    );
  }
}
