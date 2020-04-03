import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './explore.scss';

//import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

//import ProfilePage from './../profile';

@Component({
  name: 'Explore',
})
export class ExplorePage extends Vue {
  explorerImages = [
    '/assets/imgs/explore_test1.png',
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
    longSwipesRatio: 0.05,
    longSwipesMs: 100,
    direction: 'vertical',
  };
  horizontalSwiperOptions = {
    speed: 300,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.05,
    longSwipesMs: 100,
    direction: 'horizontal',
  };

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['explore-page']}>
        <div class={Styles['header']}>
          <div class={Styles['left-side']}>
            <img class={Styles['logo']} src="/assets/imgs/logo.png" alt="Heart logo" />
          </div>
          <div class={Styles['right-side']}>
            <div class={Styles['name']}>Prüssing &amp; Köll</div>
            <div class={Styles['short-desc']}>Herrenausstatter</div>
          </div>
        </div>

        <swiper ref="mySwiper" options={this.verticalSwiperOptions} class={Styles['vertical-swiper']}>
          <swiper-slide>
            <swiper ref="horizontalSwiper" options={this.horizontalSwiperOptions} class={Styles['vertical-swiper']}>
              {this.explorerImages.map((image) => {
                return (
                  <swiper-slide>
                    <img src={image} alt="image" />
                  </swiper-slide>
                );
              })}
            </swiper>
          </swiper-slide>
          <swiper-slide>Profile Page</swiper-slide>
        </swiper>

        {/*<v-carousel height="100%" hide-delimiters class={Styles['carousel']}>
            {this.explorerImages.map((image) => {
              return (
                <v-carousel-item class={Styles['item']}>
                  <img class={Styles['image']} src={image} alt="image" />
                </v-carousel-item>
              );
            })}
        </v-carousel>*/}
      </div>
    );
  }
}
