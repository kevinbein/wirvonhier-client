import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './exploreControls.scss';

interface IProps {
  isHidden: boolean;
}

@Component({
  name: 'ExploreControls',
  props: {
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
})
export class ExploreControls extends VueComponent<IProps> {
  public isHidden!: boolean;

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div
        ref="explore-controls"
        class={`${Styles['explore-controls']} ${this.isHidden ? Styles['explore-controls--hidden'] : ''}`}
      >
        <div
          class={`
            ${Styles['explore-controls__arrow']}
            ${Styles['explore-controls__arrow--left']}
          `}
          onClick={() => this.$emit('prev')}
        >
          <i class="fa fa-angle-left"></i>
        </div>
        <div
          class={`
            ${Styles['explore-controls__arrow']}
            ${Styles['explore-controls__arrow--middle']}
          `}
          onClick={() => this.$emit('details')}
        >
          <i class="fa fa-angle-double-up"></i>
        </div>
        <div class={Styles['explore-controls__text']}>Zum Laden</div>
        <div
          class={`
            ${Styles['explore-controls__arrow']}
            ${Styles['explore-controls__arrow--right']}
          `}
          onClick={() => this.$emit('next')}
        >
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    );
  }
}
