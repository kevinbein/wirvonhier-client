import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './explore.scss';

//import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import { ProfilePage } from './../../pages';

const dummyStory = '/assets/imgs/wvh-after-login_1024x1581.png';
const dummyLogo = '/assets/imgs/logo/logo_180x180.png';

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
    preloadImages: false,
    effect: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadBusiness(businessName: string, business?: any): void {
    this.businessName = businessName;
    // @ts-ignore
    this.$refs.profile.loadProfile(businessName, business);
  }

  public slideChange(): void {
    // @ts-ignore
    const swiper = this.$refs.verticalSwiper.$swiper;
    // Opened profile page
    if (swiper.activeIndex == 1) {
      const newPath = '/explore/' + this.businessName;
      if (this.$route.path != newPath) {
        this.$router.replace(newPath);
      }
      swiper.allowTouchMove = false;
    }
    // Opened explore page
    else {
      swiper.allowTouchMove = true;
      const newPath = '/explore/';
      if (this.$route.path != newPath) {
        this.$router.replace(newPath);
      }
    }
  }

  public exploreSlideChange(): void {
    // @ts-ignore
    const index = this.$refs.horizontalSwiper.$swiper.activeIndex;
    // @ts-ignore
    const businessName = this.businesses[index].id;
    this.loadBusiness(businessName, this.businesses[index]);
  }

  // TODO: copied 1:1 to map for now
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public businesses: any | unknown = null;
  public async loadBusinesses(zip: number, _radius: number): Promise<void> {
    //public async loadBusinesses(location: LatLng, radius: number): Promise<void> {
    const data = await this.$http({
      method: 'get',
      //url: '/businesses?zip=' + zip + '&radius=' + radius,
      url: `/businesses?filter_address.zip=equals:${zip}&schema=story`,
      data: {},
    });
    // @ts-ignore
    this.businesses = data.businesses;

    for (let i = 0; i < this.businesses.length; ++i) {
      const media = this.businesses[i].media;
      if (media.stories.images.length > 0) {
        const images = media.stories.images;
        this.businesses[i].story = images[images.length - 1].src;
      } else {
        this.businesses[i].story = dummyStory;
      }
      if (media.logo) {
        this.businesses[i].logo = media.logo.src;
      }
    }
    // eslint-disable-next-line no-console
    // console.log('Loaded business', this.businesses, data);
  }

  mounted(): void {
    const zip = 71665;
    //const location = new LatLng(47.78099, 9.61529);
    const radius = 100.42; // km
    // TODO: pagination later
    (async () => {
      await this.loadBusinesses(zip, radius);
      // Lazy load businesses (we can just pass the data from this.businesses instead of forcing a complete reload)
      // TODO: maybe change later
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const business = this.businesses.find((b: any) => b.id == this.businessName);
      if (this.$route.params.businessName !== undefined) {
        this.loadBusiness(this.$route.params.businessName, business);
        // @ts-ignore
        const swiper = this.$refs.verticalSwiper.$swiper;
        swiper.slideTo(1, 0);
      } else if (this.businesses.length > 0) {
        this.loadBusiness(this.businesses[0].id, business);
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.businesses.map((business: any) => {
                  return (
                    <swiper-slide>
                      <div class={Styles['header']}>
                        <div class={Styles['left-side']}>
                          {/*<img class={Styles['logo']} src="/assets/imgs/logo/logo_512x512.png" alt="Heart logo" />*/}
                          <img class={Styles['logo']} src={business.logo || dummyLogo} alt="Heart logo" />
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
              <router-link to="/map" class={Styles['button']}>
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
