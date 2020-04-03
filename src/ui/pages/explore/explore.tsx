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
    '/assets/imgs/explore_test1_cross.png',
    '/assets/imgs/explore_test2.png',
    '/assets/imgs/explore_test3.png',
    '/assets/imgs/explore_test4.png',
    '/assets/imgs/explore_test5.png',
    '/assets/imgs/explore_test6.png',
  ];
  verticalSwiperOptions = {
    speed: 300,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 100,
    direction: 'vertical',
    resistance: false,
  };
  horizontalSwiperOptions = {
    speed: 300,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.05,
    longSwipesMs: 100,
    direction: 'horizontal',
  };

  mounted(): void {
    // @ts-ignore: SwiperClass is not detected as type but it still works
    const swiper = this.$refs.verticalSwiper.$swiper;
    swiper.slideTo(1, 0);
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['explore-page']}>
        <swiper ref="verticalSwiper" options={this.verticalSwiperOptions} class={Styles['vertical-swiper']}>
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
                      <div class={Styles['button']}>
                        <v-icon class={Styles['icon']}>fa-cog</v-icon>
                      </div>
                      <div class={Styles['button']}>
                        <v-icon class={Styles['icon']}>fa-filter</v-icon>
                      </div>
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
            <ProfilePage></ProfilePage>
          </swiper-slide>
        </swiper>
      </div>
    );
  }
}
