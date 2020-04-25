import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './explore.scss';
import { BusinessModule } from '@/store';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import { ProfilePage } from './../profile';
import { Business, IVideo } from '@/entities';
import { SlideInPage } from '@/ui/components';
import { VueComponent } from '@/ui/vue-ts-component';

const dummyStory = '/assets/imgs/dummy_story_500x1000.jpg';
const dummyLogo = '/assets/imgs/logo/logo_180x180.png';

const dummyVideo: IVideo = {
  _id: 'dummy',
  publicId: 'dummy',
  created: '21-04-2020T01:15:27',
  modified: '21-04-2020T01:15:27',
  title: 'Dummy video',
  description: 'This is a test video story',
  src: '/assets/stories/dummy_story_video.mov',
  type: 'video',
};

interface IRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
  // Why vue-awesome-swiper no provide Typing??
  verticalSwiper: any; // eslint-disable-line
  horizontalSwiper: any; // eslint-disable-line
}

@Component({
  name: 'Explore',
})
export class ExplorePage extends VueComponent<{}, IRefs> {
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
    const swiper = this.$refs.verticalSwiper.$swiper;
    swiper.slidePrev();
  }

  public businessId: string | undefined | null = null;
  public profileVisible = false;
  public currentBusiness: Business | null = null;
  public lastExploreIndex = -1;

  public slideChange(): void {
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
    // stop previous story video
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastVideoEl: any = this.$refs['story-video-' + window.localStorage.lastExploreIndex];
    if (lastVideoEl) {
      lastVideoEl.pause();
      lastVideoEl.currentTime = 0;
    }

    // @ts-ignore
    const newIndex = this.$refs.horizontalSwiper.$swiper.activeIndex;
    window.localStorage.lastExploreIndex = newIndex;
    this.businessId = this.slides[newIndex].id;
    this.currentBusiness = this.slides[newIndex];

    // start playing current video
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videoEl: any = this.$refs['story-video-' + newIndex];
    if (videoEl) {
      videoEl.play();
    }
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

    this.businessStore.state.businesses[0].media.stories.videos.push(dummyVideo);

    // @ts-ignore
    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    const vSwiper = this.$refs.verticalSwiper.$swiper;
    if (this.$route.params.businessId !== undefined) {
      const paramBusinessId = this.$route.params.businessId;
      const exploreIndex = this.slides.findIndex((business: Business) => business.id == paramBusinessId);
      if (exploreIndex !== -1) {
        this.businessId = this.slides[exploreIndex].id;
        this.currentBusiness = this.slides[exploreIndex];
        hSwiper.slideTo(exploreIndex, 0);
        vSwiper.slideTo(1, 0);
      }
      window.localStorage.lastExploreIndex = exploreIndex;
    } else if (window.localStorage.lastExploreIndex < this.businesses.length) {
      hSwiper.slideTo(window.localStorage.lastExploreIndex, 0);
    } else {
      window.localStorage.lastExploreIndex = 0;
    }
  }

  public playFirstVideo(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videoEl: any = this.$refs['story-video-' + window.localStorage.lastExploreIndex];
    if (videoEl) {
      videoEl.play();
    }
  }

  public slideIn = false;

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
                this.slides.map((business: Business, index: number) => {
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
                        <div class={Styles['right-side']}>{business.name}</div>
                      </div>

                      <div class={Styles['story-container']}>
                        {(business.media.stories.videos.length > 0 && (
                          <video onCanplay={() => this.playFirstVideo()} muted="muted" ref={`story-video-${index}`}>
                            <source src={business.media.stories.videos[0].src} type="video/mp4" />
                          </video>
                        )) ||
                          (business.media.stories.images.length > 0 && (
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
                          )) || <img class={Styles['story']} src={dummyStory} alt="image" />}
                      </div>
                    </swiper-slide>
                  );
                })) || <div>Loading ...</div>}
            </swiper>
            <div class={Styles['controls']}>
              {(this.slideIn === false && (
                <div on-click={() => (this.slideIn = true)} class={Styles['button']}>
                  <i class={`${Styles['icon']} fa fa-bars`}></i>
                </div>
              )) || (
                <div on-click={() => (this.slideIn = false)} class={Styles['button']}>
                  <i class={`${Styles['icon']} fa fa-times`}></i>
                </div>
              )}
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

        <SlideInPage
          value={this.slideIn}
          class={Styles['settings']}
          height={375}
          closeButton={false}
          onClose={() => (this.slideIn = false)}
        >
          <ul class={Styles['settings-navigation']}>
            {this.currentBusiness?.website && (
              <li class={Styles['settings-navigation__item']}>
                <a
                  class={Styles['settings-navigation__link']}
                  href={this.currentBusiness?.website}
                  alt={`Link zur Händlerseite`}
                >
                  Händlerseite {this.currentBusiness?.name}
                </a>
              </li>
            )}
            <li class={Styles['settings-navigation__item']}>
              <router-link to="/map" class={Styles['settings-navigation__link']}>
                Zur Karte
              </router-link>
            </li>
            <li class={Styles['settings-navigation__item']}>
              <router-link to="/datenschutz" class={Styles['settings-navigation__link']}>
                Datenschutz
              </router-link>
            </li>
            <li class={Styles['settings-navigation__item']}>
              <router-link to="/nutzungsbedingungen" class={Styles['settings-navigation__link']}>
                Nutzungsbedingungen
              </router-link>
            </li>
            <li class={Styles['settings-navigation__item']}>
              <router-link to="/impressum" class={Styles['settings-navigation__link']}>
                Impressum
              </router-link>
            </li>
            <li class={Styles['settings-navigation__item']}>
              <a
                href="mailto:office@wirvonhier.net"
                alt="Link zu WirVonHier"
                target="_blank"
                class={Styles['settings-navigation__link']}
              >
                Kontakt zu WirVonHier
              </a>
            </li>
          </ul>
        </SlideInPage>
      </div>
    );
  }
}

export default ExplorePage;
