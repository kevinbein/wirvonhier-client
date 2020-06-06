import { VueComponent } from '@/ui/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';

interface IProps {
  closeButton?: boolean;
  value?: boolean;
  class?: string;
}

@Component({
  name: 'SlideInPage',
  props: {
    closeButton: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
    },
  },
})
export class OverlayView extends VueComponent<IProps> {
  public closeButton?: boolean;
  public value!: boolean;

  public close(): void {
    this.$emit('close', true);
  }

  // @ts-ignore
  render(h): Vue.VNode {
    return (
      <div ref="page" class={`${Styles['page']} ${this.value ? Styles['page--active'] : ''}`}>
        {this.closeButton && (
          <div class={Styles['close-button']}>
            <i class={`${Styles['close-button__icon']} fa fa-times`} onClick={this.close.bind(this)}></i>
          </div>
        )}
        {this.$slots.default}
      </div>
    );
  }
}
export default OverlayView;
