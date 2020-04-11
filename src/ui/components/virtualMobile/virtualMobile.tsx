import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './virtualMobile.scss';

@Component({
  name: 'VirtualMobile',
})
export class VirtualMobile extends Vue {
  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['wvh-app-container']}>
        <div class={Styles['wvh-app']}>{this.$slots.default}</div>
      </div>
    );
  }
}
