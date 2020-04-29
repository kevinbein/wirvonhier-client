import { VueComponent } from '@/ui/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';

interface IProps {
  // full: always 100% height and overflow will be a scroll within the element
  // content: will be the size of the content and any overflow will result in scrolling past 100%
  // fixed: Fixed size, overflow will result in scroll. Needs attribute height
  closeButton?: boolean;
  height?: number;
  value?: boolean;
  onClose?: () => void;
  class?: string;
}

interface IRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
  page: HTMLDivElement;
}

type Swipe = {
  startY: number;
  lastY: number;
  lastDiff: number;
  startTime: number;
};

@Component({
  name: 'SlideInPage',
  props: {
    closeButton: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
    },
    value: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {
        return;
      },
    },
  },
})
export class SlideInPage extends VueComponent<IProps, IRefs> {
  public closeButton?: boolean;
  public height?: number;
  public value?: boolean;

  public finalHeight = 0;

  public close(): void {
    this.$emit('close', true);
  }

  private swiping: Swipe | null = null;
  public startSwiping(e: TouchEvent): void {
    const touchObj = e.changedTouches[0];
    this.swiping = {
      startY: touchObj.pageY,
      lastY: touchObj.pageY,
      lastDiff: 0,
      startTime: new Date().getTime(),
    };
    //e.preventDefault();
  }

  private getSwipeDiffY(touchObj: Touch): number {
    if (this.swiping === null) {
      return 0;
    }
    let diff = touchObj.pageY - this.swiping.startY;
    if (this.finalHeight !== undefined) {
      diff = this.finalHeight - diff;
    } else {
      diff = window.innerHeight - diff;
    }
    return diff;
  }

  public moveSwiping(e: TouchEvent): void {
    if (this.swiping === null) {
      return;
    }
    const touchObj = e.changedTouches[0];
    this.swiping.lastDiff = touchObj.pageY - this.swiping.lastY;
    this.swiping.lastY = touchObj.pageY;
    const diffY = this.getSwipeDiffY(touchObj);
    this.$refs.page.style.height = diffY + 'px';
  }

  public endSwiping(e: TouchEvent): void {
    if (this.swiping === null) {
      return;
    }
    const touchObj = e.changedTouches[0];
    const diffY = this.getSwipeDiffY(touchObj);
    if (diffY > 0) {
      if (this.swiping.lastDiff >= 0) {
        this.$emit('close', true);
        setTimeout(() => (this.$refs.page.style.height = this.finalHeight + 'px'), 300);
      } else {
        this.$refs.page.style.height = this.finalHeight + 'px';
      }
    }
    this.swiping = null;
  }

  mounted(): void {
    this.finalHeight = this.height === undefined ? window.innerHeight : this.height;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    const activeClass = this.value === true ? Styles['page--active'] : '';
    return (
      <div ref="page" class={`${Styles['page']} ${activeClass}`}>
        <header
          ref="slider"
          class={Styles['slider']}
          onTouchstart={(e: TouchEvent) => this.startSwiping(e)}
          onTouchmove={(e: TouchEvent) => this.moveSwiping(e)}
          onTouchend={(e: TouchEvent) => this.endSwiping(e)}
        >
          <div class={Styles['slider__overlay']}></div>
          <div class={Styles['slider__indicator-container']}>
            <div class={Styles['slider__indicator']}></div>
          </div>
          {this.closeButton && (
            <div on-click={() => this.close()} class={Styles['slider__close-button']}>
              <i class="fa fa-times"></i>
            </div>
          )}
        </header>
        <article class={Styles['content']}>{this.$slots.default}</article>
      </div>
    );
  }
}

export default SlideInPage;
