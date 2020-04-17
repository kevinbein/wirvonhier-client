import Vue from 'vue';
import Component from 'vue-class-component';
import { VirtualMobile } from '@/ui/components';
import { rootModule, UserData as userModule } from '@/store';

@Component({
  name: 'Business',
  watch: {
    userId: {
      immediate: true,
      handler(this: BusinessApp, newId: string) {
        // eslint-disable-next-line no-console
        console.log('this: ', this);
        // eslint-disable-next-line no-console
        console.log('newId: ', newId);
        if (!newId) return;
        this.userModule.actions.loadUserAndSaveUserData();
      },
    },
  },
})
export class BusinessApp extends Vue {
  public rootStore = rootModule.context(this.$store);
  public userModule = userModule.context(this.$store);

  public get userId(): string | null {
    return this.userModule.state.id;
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
