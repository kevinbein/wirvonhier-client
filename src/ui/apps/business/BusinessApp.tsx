import Vue from 'vue';
import Component from 'vue-class-component';
import { VirtualMobile, MainNavigation } from '@/ui/components';
import { rootModule, UserModule, BusinessModule, AppearanceModule } from '@/store';
import { VerificationToast } from './components/verificationToast';
import { POSITION, TYPE } from 'vue-toastification';

@Component({
  name: 'Business',
  watch: {
    userId: {
      immediate: true,
      async handler(this: BusinessApp, newId: string) {
        if (!newId) {
          const authenticated = await this.userModule.actions.authenticateMe();
          if (!authenticated) {
            return;
          }
        }
        if (['BusinessLanding', 'BusinessLogin', 'BusinessRegister'].includes(this.$route.name as string)) {
          this.$router.push({ name: 'BusinessDashboard' });
        }
        await this.userModule.actions.loadUserAndSaveUserData();
        await this.userModule.actions.loadUserBusinesses();
        this.businessModule.actions.selectBusiness(this.userModule.state.businesses[0]);
      },
    },
    userIsVerified: {
      immediate: true,
      handler(this: BusinessApp, isVerified) {
        if (isVerified || !this.userId || this.isYoungerThanTwentyMinutes || this.$route.name === 'VerifyEmail') return;
        this.$toast(VerificationToast, { position: POSITION.TOP_CENTER, type: TYPE.ERROR, timeout: false });
      },
    },
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
