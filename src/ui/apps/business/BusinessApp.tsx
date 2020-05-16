import Vue from 'vue';
import Component from 'vue-class-component';
import { VirtualMobile, MainNavigation } from '@/ui/components';
import { rootModule, UserModule, BusinessModule, AppearanceModule } from '@/store';
import { VerificationToast } from './components/verificationToast';
import { POSITION, TYPE } from 'vue-toastification';

@Component({
  name: 'Business',
  watch: {
    userIsVerified: {
      immediate: true,
      handler(this: BusinessApp, isVerified) {
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
      const businessModule = BusinessModule.context(vm.$store);
      const business = businessModule.state.selectedBusiness;
      if (!business) {
        await userModule.actions.loadUserAndSaveUserData();
        await businessModule.actions.loadAndPersistBusinessDataById(userModule.state.businesses);
        businessModule.actions.selectBusiness(userModule.state.businesses[0]);
      }
      next();
    });
  },
})
export class BusinessApp extends Vue {
  public rootStore = rootModule.context(this.$store);
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

  created(): void {
    this.rootStore.actions.loadDataProtStatements();
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <VirtualMobile>
        {this.isNavVisible && <MainNavigation />}
        <router-view></router-view>
      </VirtualMobile>
    );
  }
}

export default BusinessApp;
