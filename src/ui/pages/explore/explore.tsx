import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './explore.scss';

//import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import { ProfilePage } from './../../pages';
import { LatLng } from 'leaflet';

@Component({
  name: 'Explore',
})
export class ExplorePage extends Vue {
  testExplorerImages = [
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

  public businessName: string | null = null;
  loadBusiness(businessName: string): void {
    this.businessName = businessName;
    // @ts-ignore
    this.$refs.profile.loadProfile(businessName);
  }

  public slideChange(): void {
    // @ts-ignore
    const swiper = this.$refs.verticalSwiper.$swiper;
    // Opened profile page
    if (swiper.activeIndex == 1) {
      swiper.allowTouchMove = false;
    }
    // Opened explore page
    else {
      swiper.allowTouchMove = true;
    }
  }

  public exploreSlideChange(): void {
    const index = this.$refs.horizontalSwiper.$swiper.activeIndex;
    const business = this.businesses[index];
    const businessName = business.id;
    this.loadBusiness(businessName);
  }

  public businesses: unknown = null;

  public async loadBusinesses(zip: number, _radius: number): Promise<void> {
    //public async loadBusinesses(location: LatLng, radius: number): Promise<void> {
    this.businesses = await this.$http({
      method: 'get',
      //url: '/businesses?zip=' + zip + '&radius=' + radius,
      url: `/businesses?filter_address.zip=equals:${zip}&schema=story`,
      data: {},
    });
    // eslint-disable-next-line no-console
    console.log('Loaded business', this.businesses);

    // As long as there are no images yet, generate and assign them from an array of given pictures
    for (let i = 0; i < this.businesses.length; ++i) {
      const index = i % this.testExplorerImages.length;
      this.businesses[i].story = this.testExplorerImages[index];
      this.businesses[i].geolocation = new LatLng(47.78099, 9.61529);
    }
    // eslint-disable-next-line no-console
    console.log('Added stories to businesses', this.businesses);
  }

  mounted(): void {
    const zip = 71665;
    //const location = new LatLng(47.78099, 9.61529);
    const radius = 10.5;
    // Load all businesses with the given zip/location and radius (if given)
    // TODO: pagination later
    (async () => {
      await this.loadBusinesses(zip, radius);
      if (this.$route.params.businessName !== undefined) {
        this.loadBusiness(this.$route.params.businessName);
        // @ts-ignore
        const swiper = this.$refs.verticalSwiper.$swiper;
        swiper.slideTo(1, 0);
      } else if (this.businesses.length > 0) {
        this.loadBusiness(this.businesses[0].id);
      }

      // @ts-ignore
      this.$refs.profile.$refs.closeProfileButton.addEventListener('click', () => {
        this.gotoExplorerSlide();
      });
    })();
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
            <swiper
              ref="horizontalSwiper"
              on-slideChange={() => this.exploreSlideChange()}
              options={this.horizontalSwiperOptions}
              class={Styles['vertical-swiper']}
            >
              {(this.businesses !== null &&
                this.businesses.map((business) => {
                  return (
                    <swiper-slide>
                      <div class={Styles['header']}>
                        <div class={Styles['left-side']}>
                          <img class={Styles['logo']} src="/assets/imgs/logo.png" alt="Heart logo" />
                        </div>
                        <div class={Styles['right-side']}>
                          <div class={Styles['name']}>{business.name}</div>
                          <div class={Styles['short-desc']}>{business.category[0]}</div>
                        </div>
                      </div>

                      <div class={Styles['story-container']}>
                        <img class={Styles['story']} src={business.story} alt="image" />
                      </div>
                    </swiper-slide>
                  );
                })) || <div>Loading ...</div>}
            </swiper>
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
          </swiper-slide>
          <swiper-slide class={Styles['profile']}>
            <ProfilePage ref="profile"></ProfilePage>
          </swiper-slide>
        </swiper>
      </div>
    );
  }
}
