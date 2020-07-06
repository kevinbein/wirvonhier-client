import Component from 'vue-class-component';
import Styles from './verticalSwiper.scss';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { VNode } from 'vue';
import { VerticalSlide } from '..';

type Swipe = {
  startX: number;
  lastX: number;
  startY: number;
  lastY: number;
  startTime: number;
};

type Spacer = {
  height: number;
  color: string;
};

interface IProps {
  class?: string;
  ref?: string;
  spacer?: Spacer | null;
}
@Component({
  name: 'VerticalSwiper',
  props: {
    spacer: {
      type: Object,
      default: null,
    },
  },
})
export class VerticalSwiper extends VueComponent<IProps> {
  public spacer?: Spacer | null;

  public translateY = 0;
  public activeIndex = 0;
  private swiping: Swipe | null = null;
  public finishTransition = false;
  public transitionDuration = 370;

  public getSlides(): VNode[] {
    return this.$slots.default ? this.$slots.default : [];
  }

  get spacerCount(): number {
    return this.getSlides().length - 1;
  }

  public startSwiping(e: TouchEvent | MouseEvent): void {
    // only start swiping if the position at the top or bottom of the scrolled page
    // @ts-ignore
    const slides = this.getSlides();
    if (!slides[this.activeIndex]) {
      return;
    }
    const activeEl = slides[this.activeIndex].elm;
    // @ts-ignore
    if (this.activeIndex === slides.length - 1 && activeEl.scrollTop !== 0) {
      return;
    }
    const eventData = e instanceof MouseEvent ? e : e.changedTouches[0];
    this.swiping = {
      startX: eventData.pageX,
      lastX: eventData.pageX,
      startY: eventData.pageY,
      lastY: eventData.pageY,
      startTime: new Date().getTime(),
    };
    this.finishTransition = false;
  }

  public moveSwiping(e: TouchEvent | MouseEvent): void {
    const slides = this.getSlides();
    const eventData = e instanceof MouseEvent ? e : e.changedTouches[0];
    if (this.swiping === null) {
      return;
    }
    this.swiping.lastX = eventData.pageX;
    this.swiping.lastY = eventData.pageY;
    const diff = this.getSwipeDiff(eventData);
    // Cannot scroll up on the first page or down on the last page
    if ((diff.Y > 0 && this.activeIndex === 0) || (diff.Y < 0 && this.activeIndex + 1 === slides.length)) {
      this.translateY = 0;
      this.swiping = null;
      return;
    } else if (Math.abs(diff.Y) > 20) {
      this.translateY = diff.Y;
    } else {
      this.translateY = 0;
    }
  }

  public endSwiping(e: TouchEvent | MouseEvent): void {
    const slides = this.getSlides();
    if (this.swiping === null) {
      this.translateY = 0;
      return;
    }
    const eventData = e instanceof MouseEvent ? e : e.changedTouches[0];
    const diff = this.getSwipeDiff(eventData);
    if (Math.abs(diff.Y) > 100) {
      this.activeIndex = Math.min(Math.max(0, diff.Y > 0 ? this.activeIndex - 1 : this.activeIndex + 1), slides.length);
      this.emitSlideChangeEvents();
    }
    this.swiping = null;
    this.translateY = 0;
    this.finishTransition = true;
  }

  private getSwipeDiff(eventData: Touch | MouseEvent): { X: number; Y: number } {
    if (this.swiping === null) {
      return { X: 0, Y: 0 };
    }
    return {
      X: eventData.pageX - this.swiping.startX,
      Y: eventData.pageY - this.swiping.startY,
    };
  }

  public slidePrev(): void {
    this.activeIndex = Math.max(0, this.activeIndex - 1);
    this.emitSlideChangeEvents();
  }

  public slideTo(index: number | undefined, _duration = 0): void {
    this.activeIndex =
      index === undefined || index < 0 || !this.$slots.default || index >= this.$slots.default.length ? 0 : index;
    this.emitSlideChangeEvents();
  }

  private emitSlideChangeEvents(): void {
    this.$emit('slideChange', true);
    setTimeout(() => {
      this.$emit('slideChangeTransitionEnd', true);
    }, this.transitionDuration);
  }

  public mounted(): void {
    window.addEventListener('resize', this.$forceUpdate.bind(this));
  }

  public getFinalYTranslation(): number {
    const parentHeight = this.$parent.$el ? this.$parent.$el.clientHeight : 0;
    const spacerHeight = this.spacer ? this.spacer.height * this.activeIndex : 0;
    return this.translateY - parentHeight * this.activeIndex - spacerHeight;
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div
        ref="vertical-swiper"
        onTouchstart={this.startSwiping.bind(this)}
        onTouchmove={this.moveSwiping.bind(this)}
        onTouchend={this.endSwiping.bind(this)}
        onMousedown={this.startSwiping.bind(this)}
        onMousemove={this.moveSwiping.bind(this)}
        onMouseup={this.endSwiping.bind(this)}
        class={`
          ${Styles['vertical-swiper']}
          ${this.finishTransition ? Styles['vertical-swiper--transition'] : ''}
        `}
        style={{ transform: `translateY(${this.getFinalYTranslation()}px)` }}
      >
        {(this.spacer !== null &&
          this.getSlides().map((slide, index) => {
            if (index === 0) {
              return <VerticalSlide>{slide}</VerticalSlide>;
            }
            return [
              <div
                class={Styles['spacer']}
                style={{ height: `${this.spacer?.height}px`, background: `${this.spacer?.color}` }}
              ></div>,
              <VerticalSlide>{slide}</VerticalSlide>,
            ];
          })) ||
          this.getSlides()}
      </div>
    );
  }
}
