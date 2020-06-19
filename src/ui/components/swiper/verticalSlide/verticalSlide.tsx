import Component from 'vue-class-component';
import Styles from './verticalSlide.scss';
import { VueComponent } from '@/ui/vue-ts-component';

interface IProps {
  class?: string;
  ref?: string;
}
@Component({})
export class VerticalSlide extends VueComponent<IProps> {
  public getSwiperHeight(): number {
    return this.$parent.$parent.$el ? this.$parent.$parent.$el.clientHeight : window.innerHeight;
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={`${Styles['vertical-slide']}`} style={{ height: `${this.getSwiperHeight()}px` }}>
        {this.$slots.default}
      </div>
    );
  }
}
