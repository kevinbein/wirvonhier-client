import Component from 'vue-class-component';
import Styles from './verticalSlide.scss';
import { VueComponent } from '@/ui/vue-ts-component';

interface IProps {
  class?: string;
  ref?: string;
}
@Component({})
export class VerticalSlide extends VueComponent<IProps> {
  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={`${Styles['vertical-slide']}`} style={{ height: `${window.innerHeight}px` }}>
        {this.$slots.default}
      </div>
    );
  }
}
