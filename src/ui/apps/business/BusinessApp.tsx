import Vue from 'vue';
import Component from 'vue-class-component';
import { VirtualMobile } from '@/ui/components';
import { rootModule } from '@/store';

@Component({
  name: 'Business',
})
export class BusinessApp extends Vue {
  public rootStore = rootModule.context(this.$store);

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
