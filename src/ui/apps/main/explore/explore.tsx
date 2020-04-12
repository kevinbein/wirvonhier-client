import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './explore.scss';

//import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import { ProfilePage } from './../profile';

const dummyStory = '/assets/imgs/dummy_story_500x1000.jpg';
const dummyLogo = '/assets/imgs/logo/logo_180x180.png';

@Component({
  name: 'Explore',
})
export class ExplorePage extends Vue {
  public logoWidth = 60;
  public deviceWidth = window.innerWidth;
  public deviceHeight = window.innerHeight;
  public storyWidth = Math.min(500, this.deviceWidth);
  public storyHeight = this.deviceWidth >= 500 ? this.deviceHeight - 50 : this.deviceHeight;
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
    spaceBetween: 0,
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

  gotoExplorerSlide(): void {
    // @ts-ignore
    const swiper = this.$refs.verticalSwiper.$swiper;
    swiper.slidePrev();
  }

  public businessId: string | null = null;
  public profileVisible = false;
  public currentBusiness: any = null;
  public slideChange(): void {
    // @ts-ignore
    const swiper = this.$refs.verticalSwiper.$swiper;
    // Opened profile page
    if (swiper.activeIndex == 1) {
      const newPath = '/explore/' + this.businessId;
      if (this.$route.path != newPath) {
        this.$router.replace(newPath);
      }
      setTimeout(() => {
        this.profileVisible = true;
      }, 50);
      swiper.allowTouchMove = false;
      // console.log('Update background to #ffffff by going to profile');
      document.body.style.background = '#ffffff';
    }
    // Opened explore page
    else {
      this.profileVisible = false;
      swiper.allowTouchMove = true;
      const newPath = '/explore/';
      if (this.$route.path != newPath) {
        this.$router.replace(newPath);
      }
      // console.log('Update background to #000000 by going to explorer');
      document.body.style.background = '#000000';
    }
  }

  public sliderIndex = 3;
  public exploreSlideChange(): void {
    // @ts-ignore
    const newIndex = this.$refs.horizontalSwiper.$swiper.activeIndex;
    this.businessId = this.slides[newIndex].id;
    this.currentBusiness = this.slides[newIndex];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public slides: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public businesses: any | unknown = null;
  public async loadBusinesses(zip: number, _radius: number): Promise<void> {
    //public async loadBusinesses(location: LatLng, radius: number): Promise<void> {
    const data = await this.$http({
      method: 'get',
      //url: '/businesses?zip=' + zip + '&radius=' + radius,
      url: `/businesses?filter_location=${zip},50000&schema=story&limit=1000`, // HOTFIX! use pagination instead of crazy high limit
      data: {},
    });
    // @ts-ignore
    this.businesses = data.list;
    if (!this.currentBusiness) {
      this.currentBusiness = this.businesses[0];
    }
    if (this.businessId) {
      this.businessId = this.businesses[0].id;
    }
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
    this.slides = this.businesses; // Slides should not contain all businesses - probably not implementable with sliderjs
    // eslint-disable-next-line no-console
    // console.log('Loaded business', this.businesses, data);
  }

  async mounted(): Promise<void> {
    document.body.style.background = '#000000';

    const zip = 71665;
    //const location = new LatLng(47.78099, 9.61529);
    const radius = 100.42; // km

    await this.loadBusinesses(zip, radius);
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
              on-slideChange={this.exploreSlideChange.bind(this)}
              options={this.horizontalSwiperOptions}
              class={Styles['vertical-swiper']}
            >
              {(this.slides !== null &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.slides.map((business: any) => {
                  return (
                    <swiper-slide>
                      <div class={Styles['explore-page__background']} />
                      <div class={Styles['header']}>
                        <div class={Styles['left-side']}>
                          {/*<img class={Styles['logo']} src="/assets/imgs/logo/logo_512x512.png" alt="Heart logo" />*/}
                          {business.media.logo && business.media.logo.publicId ? (
                            <cld-image
                              class={Styles['logo']}
                              publicId={business.media.logo && business.media.logo.publicId}
                              width={`${this.logoWidth}`}
                              dpr={window.devicePixelRatio}
                            >
                              <cld-transformation crop="scale" />
                            </cld-image>
                          ) : (
                            <img class={Styles['logo']} src={dummyLogo} alt="Heart logo" />
                          )}
                        </div>
                        <div class={Styles['right-side']}>
                          <div>{business.name}</div>
                          <div>{business.category[0]}</div>
                        </div>
                      </div>

                      <div class={Styles['story-container']}>
                        {business.media.stories.images.length > 0 ? (
                          <cld-image
                            class={Styles['story']}
                            publicId={business.media.stories.images[0].publicId}
                            width={`${this.storyWidth}`}
                            height={`${this.storyHeight}`}
                          >
                            <cld-transformation
                              fetchFormat="auto"
                              width={this.storyWidth}
                              height={this.storyHeight}
                              crop="fill"
                              gravity="faces"
                              dpr={window.devicePixelRatio}
                            />
                          </cld-image>
                        ) : (
                          <img class={Styles['story']} src={business.story} alt="image" />
                        )}
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
            <div class={Styles['profile__placeholder']}>
              <transition name="fade">
                {this.currentBusiness && this.profileVisible && (
                  <ProfilePage
                    profile={this.currentBusiness}
                    on-go-to-explorer={this.gotoExplorerSlide.bind(this)}
                  ></ProfilePage>
                )}
              </transition>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    );
  }
}
