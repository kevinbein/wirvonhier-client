import Vue from 'vue';
import Component from 'vue-class-component';
import { VirtualMobile } from '@/ui/components';
import { rootModule, UserModule } from '@/store';
import { VerificationToast } from './components/verificationToast';

@Component({
  name: 'Business',
  watch: {
    userId: {
      immediate: true,
      handler(this: BusinessApp, newId: string) {
        if (!newId) {
          this.userModule.actions.authenticateMe();
        }
        this.userModule.actions.loadUserAndSaveUserData();
        this.userModule.actions.loadUserBusinesses();
      },
    },
    userIsVerified: {
      immediate: true,
      handler(this: BusinessApp, isVerified) {
        if (isVerified || !this.userId) return;
        this.$toast(VerificationToast);
      },
    },
  },
})
export class BusinessApp extends Vue {
  public rootStore = rootModule.context(this.$store);
  public userModule = UserModule.context(this.$store);

  public get userId(): string | null {
    return this.userModule.state.id;
  }
  public get userIsVerified(): boolean {
    return this.userModule.state.verified;
  }

  created(): void {
    this.rootStore.actions.loadDataProtStatements();
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <VirtualMobile>
        <router-view></router-view>
      </VirtualMobile>
    );
  }
}

export default BusinessApp;
