import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './loader.scss';

export const Loader = VueComponent.extend({
  functional: true,

  props: {
    size: {
      type: Number,
      default: 36,
    },
    color: {
      type: String,
      default: 'rgb(95, 109, 175)',
    },
  },

  // @ts-ignore
  render(h, ctx): Vue.VNode {
    return (
      <div class={Styles['loader__container']}>
        <div
          class={Styles['loader']}
          style={{ width: `${ctx.props.size}px`, height: `${ctx.props.size}px`, borderColor: ctx.props.color }}
        />
      </div>
    );
  },
});
