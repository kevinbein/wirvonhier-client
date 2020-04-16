import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './explore.scss';
import { BusinessModule } from '@/store';

//import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import { ProfilePage } from './../profile';
import { Business } from '@/entities';

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

  private businessStore = BusinessModule.context(this.$store);

  gotoExplorerSlide(): void {
    // @ts-ignore
    const swiper = this.$refs.verticalSwiper.$swiper;
    swiper.slidePrev();
  }

  public businessId: string | undefined | null = null;
  public profileVisible = false;
  public currentBusiness: Business | null = null;

  public slideChange(): void {
    // @ts-ignore
    const swiper = this.$refs.verticalSwiper.$swiper;
    // Opened profile page
    if (swiper.activeIndex == 1) {
      this.$root.$emit('iosChangeAppBarStyle', 'default');
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
      this.$root.$emit('iosChangeAppBarStyle', 'black-transcluent');
      swiper.allowTouchMove = true;
      const newPath = '/explore/';
      if (this.$route.path != newPath) {
        this.$router.replace(newPath);
      }
      // console.log('Update background to #000000 by going to explorer');
      document.body.style.background = '#000000';
    }
  }

  public exploreSlideChange(): void {
    // @ts-ignore
    const newIndex = this.$refs.horizontalSwiper.$swiper.activeIndex;
    window.localStorage.explorerIndex = newIndex;
    this.businessId = this.slides[newIndex].id;
    this.currentBusiness = this.slides[newIndex];
  }

  public get businesses(): Business[] {
    return this.businessStore.state.businesses;
  }
  public get slides(): Business[] {
    return this.businesses;
  }
  public async loadBusinesses(zip: string, radius: number): Promise<void> {
    await this.businessStore.actions.loadNearBusinesses({ zip, maxDistance: radius, limit: 1000 });
    this.businessId = this.slides[0].id;
    this.currentBusiness = this.slides[0];

    // @ts-ignore
    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    // @ts-ignore
    const vSwiper = this.$refs.verticalSwiper.$swiper;
    if (this.$route.params.businessId !== undefined) {
      const paramBusinessId = this.$route.params.businessId;
      const explorerIndex = this.slides.findIndex((business: Business) => business.id == paramBusinessId);
      if (explorerIndex !== -1) {
        this.businessId = this.slides[explorerIndex].id;
        this.currentBusiness = this.slides[explorerIndex];
        hSwiper.slideTo(explorerIndex, 0);
        vSwiper.slideTo(1, 0);
      }
    } else if (window.localStorage.explorerIndex < this.businesses.length) {
      // @ts-ignore
      const explorerIndex = window.localStorage.explorerIndex;
      hSwiper.slideTo(explorerIndex, 0);
    }
  }

  mounted(): void {
    const zip = '71665';
    const radius = 100420; // in meters
    this.loadBusinesses(zip, radius);
    document.body.style.background = '#000000';

    this.$root.$emit('iosChangeAppBarStyle', 'black-transcluent');
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['explore-page']}>
        <swiper
          ref="verticalSwiper"
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
                this.slides.map((business: Business) => {
                  return (
                    <swiper-slide>
                      <div class={Styles['explore-page__background']} />
                      <div class={Styles['header']}>
                        <div class={Styles['left-side']}>
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
                          <img class={Styles['story']} src={dummyStory} alt="image" />
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

export default ExplorePage;
