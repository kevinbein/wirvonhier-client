import Vue from 'vue';
import Component from 'vue-class-component';
import { VirtualMobile } from '@/ui/components';
import '@/ui/styles/global/index.scss';
import { WVHModule } from '@/store/modules';

@Component({
  name: 'App',
})
export class App extends Vue {
  public wvhModule = WVHModule.context(this.$store);

  created(): void {
    this.setVH();
    this.wvhModule.actions.loadDataProtStatements();
  }

  setVH(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
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
