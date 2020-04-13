import Vue from 'vue';
import Component from 'vue-class-component';
import { VirtualMobile } from '@/ui/components';

@Component({
  name: 'Business',
})
export class BusinessApp extends Vue {
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
