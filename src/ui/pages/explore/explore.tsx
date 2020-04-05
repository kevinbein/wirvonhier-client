import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './explore.scss';

//import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import { ProfilePage } from './../../pages';

@Component({
  name: 'Explore',
})
export class ExplorePage extends Vue {
  explorerImages = [
    '/assets/stories/Stock1.jpg',
    '/assets/stories/Stock2.jpg',
    '/assets/stories/Stock3.jpg',
    '/assets/stories/Stock4.jpg',
    '/assets/stories/Stock5.jpg',
    '/assets/stories/Stock6.jpg',
    '/assets/stories/Stock7.jpg',
    '/assets/stories/Stock8.jpg',
    '/assets/stories/Stock9.jpg',
  ];
  verticalSwiperOptions = {
    speed: 300,
    shortSwipes: false,
    longSwipes: true,
    longSwipesRatio: 0.2,
    longSwipesMs: 100,
    resistance: true,
    resistanceRatio: 1,
    direction: 'vertical',
    spaceBetween: 15,
    //allowTouchMove: false,
  };
  horizontalSwiperOptions = {
    speed: 300,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.05,
    longSwipesMs: 100,
    direction: 'horizontal',
  };

  /*private touchstart = 0;
  private touchstartEvent: MouseEvent | null;
  verticalTouchStart(e): void {
    console.log('touchstart', e);
    this.touchstart = Date.now();
    this.touchstartEvent = e;
    //this.$refs.verticalSwiper.$swiper.slideNext();
  }

  verticalTouchEnd(e): void {
    if (this.touchstartEvent != null) {
      const x1 = this.touchstartEvent.screenX;
      const y1 = this.touchstartEvent.screenY;
      const x2 = e.screenX;
      const y2 = e.screenY;
      const xDir = x1 - x2;
      const yDir = y1 - y2;
      const n1 = Math.sqrt(x1 * x1 + y1 * y1);
      const n2 = Math.sqrt(x2 * x2 + y2 * y2);
      //const angle = (Math.acos((x1 * x2 + y1 * y2) / (n1 * n2)) * 180) / Math.PI;
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
      const dist = Math.sqrt(xDir ** 2 + yDir ** 2);

      console.log('dist:', dist);
      console.log('angle:', angle);
      if (yDir < 0) {
        console.log('swipe down');
      } else {
        console.log('swipe up');
      }
    }
    console.log('touchend', e);
    this.touchstartEvent = null;
    if (yDir < 0 && dist > 200 && angle < 135 && angle > 45) {
      this.$refs.verticalSwiper.$swiper.slideNext();
    }
  }*/

  gotoExplorerSlide(): void {
    // @ts-ignore
    const swiper = this.$refs.verticalSwiper.$swiper;
    swiper.slidePrev();
  }

  public slideChange(): void {
    // @ts-ignore
    const swiper = this.$refs.verticalSwiper.$swiper;
    if (swiper.activeIndex == 1) {
      swiper.allowTouchMove = false;
    } else {
      swiper.allowTouchMove = true;
    }
  }

  public businessId: number | null = null;
  loadBusiness(businessId: number): void {
    this.businessId = businessId;
  }

  mounted(): void {
    if (this.$route.params.businessId !== undefined) {
      const businessId = parseInt(this.$route.params.businessId);
      this.loadBusiness(businessId);
      // @ts-ignore
      const swiper = this.$refs.verticalSwiper.$swiper;
      swiper.slideTo(1, 0);
    }

    // @ts-ignore
    this.$refs.profile.$refs.closeProfileButton.addEventListener('click', () => {
      this.gotoExplorerSlide();
    });
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['explore-page']}>
        <swiper
          ref="verticalSwiper"
          /*onTouchEnd={this.verticalTouchEnd}
          onTouchStart={this.verticalTouchStart}*/
          on-slideChange={() => this.slideChange()}
          options={this.verticalSwiperOptions}
          class={Styles['vertical-swiper']}
        >
          <swiper-slide class={Styles['explorer']}>
            <swiper ref="horizontalSwiper" options={this.horizontalSwiperOptions} class={Styles['vertical-swiper']}>
              {this.explorerImages.map((image) => {
                return (
                  <swiper-slide>
                    <div class={Styles['header']}>
                      <div class={Styles['left-side']}>
                        <img class={Styles['logo']} src="/assets/imgs/logo.png" alt="Heart logo" />
                      </div>
                      <div class={Styles['right-side']}>
                        <div class={Styles['name']}>Prüssing &amp; Köll</div>
                        <div class={Styles['short-desc']}>Herrenausstatter</div>
                      </div>
                    </div>

                    <div class={Styles['controls']}>
                      <router-link to="/" class={Styles['button']}>
                        <v-icon class={Styles['icon']}>fa-cog</v-icon>
                      </router-link>
                      {/*<div class={Styles['button']}>
                        <v-icon class={Styles['icon']}>fa-filter</v-icon>
                      </div>*/}
                      <router-link to="map" class={Styles['button']}>
                        <v-icon class={Styles['icon']}>fa-location-arrow</v-icon>
                      </router-link>
                    </div>

                    <div class={Styles['story-container']}>
                      <img class={Styles['story']} src={image} alt="image" />
                    </div>
                  </swiper-slide>
                );
              })}
            </swiper>
          </swiper-slide>
          <swiper-slide class={Styles['profile']}>
            <ProfilePage ref="profile"></ProfilePage>
          </swiper-slide>
        </swiper>
      </div>
    );
  }
}
