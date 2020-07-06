import { VueComponent } from '@/ui/typings/vue-ts-component';
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
  public height!: number;
  public value!: boolean;
  public translateY = 0;

  public close(): void {
    this.$emit('close', true);
  }

  private swiping: Swipe | null = null;
  public startSwiping(e: TouchEvent | MouseEvent): void {
    this.stopEvents(e);

    const eventData = e instanceof MouseEvent ? e : e.changedTouches[0];
    this.swiping = {
      startY: eventData.pageY,
      lastY: eventData.pageY,
      lastDiff: 0,
      startTime: new Date().getTime(),
    };
  }

  public moveSwiping(e: TouchEvent | MouseEvent): void {
    this.stopEvents(e);

    if (this.swiping === null) {
      return;
    }
    const eventData = e instanceof MouseEvent ? e : e.changedTouches[0];
    this.swiping.lastDiff = eventData.pageY - this.swiping.lastY;
    this.swiping.lastY = eventData.pageY;
    const deltaY = this.swiping.lastY > this.swiping.startY ? this.getSwipeDiffY(eventData) : 0;
    this.translateY = deltaY;
  }

  public endSwiping(e: TouchEvent | MouseEvent): void {
    this.stopEvents(e);

    if (this.swiping === null) {
      return;
    }
    const eventData = e instanceof MouseEvent ? e : e.changedTouches[0];
    const diffY = this.getSwipeDiffY(eventData);
    if (diffY > 0) {
      if (this.swiping.lastDiff >= 0) {
        this.$emit('close', true);
        setTimeout(() => (this.translateY = 0), 600);
      }
    }
    this.swiping = null;
  }

  public stopEvents(e: TouchEvent | MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
  }

  private getSwipeDiffY(eventData: Touch | MouseEvent): number {
    if (this.swiping === null) {
      return 0;
    }
    return eventData.pageY - this.swiping.startY;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    const activeClass = this.value === true ? Styles['page--active'] : '';
    return (
      <div ref="page" class={`${Styles['page']} ${activeClass}`}>
        {this.value === true && <div class={Styles['page__overlay']} onClick={this.close.bind(this)} />}
        <div class={Styles['slider-container']} style={{ transform: `translateY(${this.translateY}px)` }}>
          <header
            ref="slider"
            class={Styles['slider']}
            onMousedown={this.startSwiping.bind(this)}
            onMousemove={this.moveSwiping.bind(this)}
            onMouseup={this.endSwiping.bind(this)}
            onTouchstart={this.startSwiping.bind(this)}
            onTouchmove={this.moveSwiping.bind(this)}
            onTouchend={this.endSwiping.bind(this)}
          >
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
      </div>
    );
  }
}

export default SlideInPage;
