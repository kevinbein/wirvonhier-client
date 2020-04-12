import Vue from 'vue';
import Component from 'vue-class-component';
import { VirtualMobile } from '@/ui/components';

@Component({
  name: 'Main',
})
export class MainApp extends Vue {
  created(): void {
    this.setVH();
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
