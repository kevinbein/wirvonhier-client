import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './explore.scss';
import { BusinessModule } from '@/store';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

import { ProfilePage } from './../profile';
import { Business, Story } from '@/entities';
import { SlideInPage, StoryView, WVHButton, LadyPage } from '@/ui/components';
import { VueComponent } from '@/ui/vue-ts-component';
import { VerticalSwiper, VerticalSlide } from '@/ui/components/swiper';

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
    //allowTouchMove: false,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  };
  public deviceWidth = window.innerWidth;
  public deviceHeight = window.innerHeight;
  public storyWidth = Math.min(500, this.deviceWidth);
  public storyHeight = this.deviceWidth >= 500 ? this.deviceHeight - 50 : this.deviceHeight;

  private businessStore = BusinessModule.context(this.$store);

  gotoExplorerSlide(): void {
    const swiper = this.$refs.verticalSwiper;
    swiper.slidePrev();
  }

  public businessId: string | undefined | null = null;
  public currentBusiness: Business | null = null;
  public lastExploreIndex = -1;

  public slideChange(): void {
    //const swiper = this.$refs.verticalSwiper.$swiper;
    const swiper = this.$refs.verticalSwiper;
    // Opened profile page
    if (swiper.activeIndex == 1) {
      this.$root.$emit('iosChangeAppBarStyle', 'default');
      const newPath = '/explore/' + this.businessId;
      if (this.$route.path != newPath) {
        this.$router.replace(newPath);
      }
      swiper.allowTouchMove = false;

      // stop previous story video
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentStory: any = this.$refs['story-' + swiper.activeIndex];
      currentStory?.$emit('hideStory');

      // console.log('Update background to #ffffff by going to profile');
      document.body.style.background = '#ffffff';
    }
    // Opened explore page
    else {
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

  public nextSlide(): void {
    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    hSwiper.slideTo(hSwiper.activeIndex + 1);
  }

  public previousSlide(): void {
    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    hSwiper.slideTo(hSwiper.activeIndex - 1);
  }

  public gotoProfile(): void {
    const vSwiper = this.$refs.verticalSwiper;
    vSwiper.slideTo(1);
  }

  public gotoBeginning(): void {
    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    hSwiper.slideTo(0, 0);
  }

  public exploreSlideChange(): void {
    // stop previous story video
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastVideoEl: any = this.$refs['story-' + window.localStorage.lastExploreIndex];
    lastVideoEl?.$emit('hideStory', window.localStorage.lastExploreIndex);

    const newIndex = this.$refs.horizontalSwiper.$swiper.activeIndex;
    window.localStorage.lastExploreIndex = newIndex;
    if (this.slides === null || newIndex >= this.slides.length) {
      // reached last slide
      return;
    }
    this.businessId = this.slides[newIndex].business.id;
    this.currentBusiness = this.slides[newIndex].business;

    // start playing current video
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videoEl: any = this.$refs['story-' + newIndex];
    videoEl?.$emit('showStory', newIndex);
  }

  public exploreControlsHidden = false;
  public hideExploreControls(): void {
    this.exploreControlsHidden = true;
  }
  public showExploreControls(): void {
    this.exploreControlsHidden = false;
  }

  public get businesses(): Business[] {
    return this.businessStore.state.businesses;
  }

  public slides: Story[] | null = null;

  public async loadBusinesses(zip: string, radius: number): Promise<void> {
    await this.businessStore.actions.getBusinessesByZIP({ zip, maxDistance: radius, limit: 1000 });
    if (this.businesses.length === 0) return;
    this.slides = this.businessStore.getters.getMixedStories();
    this.businessId = this.slides[0].business.id;
    this.currentBusiness = this.slides[0].business;

    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    //const vSwiper = this.$refs.verticalSwiper.$swiper;
    const vSwiper = this.$refs.verticalSwiper;
    if (this.$route.params.businessId !== undefined) {
      const paramBusinessId = this.$route.params.businessId;
      const exploreIndex = this.slides.findIndex((story: Story) => story.business.id == paramBusinessId);
      if (exploreIndex !== -1) {
        this.businessId = this.slides[exploreIndex].business.id;
        this.currentBusiness = this.slides[exploreIndex].business;
        hSwiper.slideTo(exploreIndex, 0);
        vSwiper.slideTo(1, 0);
      }
      window.localStorage.lastExploreIndex = exploreIndex;
    } else if (window.localStorage.lastExploreIndex > 0) {
      hSwiper.slideTo(window.localStorage.lastExploreIndex, 0);
    } else {
      window.localStorage.lastExploreIndex = 0;
    }
  }

  public slideIn = false;

  mounted(): void {
    const zip = '71665';
    const radius = 100420; // in meters
    this.loadBusinesses(zip, radius);
    //document.body.style.background = '#000000';

    this.$root.$emit('iosChangeAppBarStyle', 'black-transcluent');
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['explore-page']}>
        {/*ref="verticalSwiper"
          {/*on-slideChange={() => this.slideChange()}
          {/*options={this.verticalSwiperOptions}
        */}
        <VerticalSwiper
          ref="verticalSwiper"
          on-slideChangeTransitionEnd={() => this.slideChange()}
          class={Styles['vertical-swiper']}
          spacer={{ height: 10, color: '#000' }}
        >
          <VerticalSlide class={Styles['explorer']}>
            <swiper
              ref="horizontalSwiper"
              on-slideChangeTransitionEnd={this.exploreSlideChange.bind(this)}
              on-touchStart={this.hideExploreControls.bind(this)}
              on-touchEnd={this.showExploreControls.bind(this)}
              options={this.horizontalSwiperOptions}
              class={Styles['horizontal-swiper']}
            >
              {this.slides !== null &&
                this.slides.length > 0 &&
                this.slides.map((story: Story, index: number) => {
                  return (
                    <swiper-slide>
                      <StoryView
                        ref={`story-${index}`}
                        story={story}
                        storyHeight={this.storyHeight}
                        storyWidth={this.storyWidth}
                      ></StoryView>
                    </swiper-slide>
                  );
                })}
              {this.slides !== null && this.slides.length > 0 && (
                <swiper-slide>
                  <LadyPage class={Styles['last-page']}>
                    <div class={Styles['last-page__text']}>Du hast alles gesehen</div>
                    <WVHButton on-click={() => this.gotoBeginning()} class={Styles['last-page__button']}>
                      Zurück zum Anfang
                    </WVHButton>
                    <WVHButton on-click={() => this.$router.push({ name: 'Map' })} class={Styles['last-page__button']}>
                      Zur Kartenansicht
                    </WVHButton>
                  </LadyPage>
                </swiper-slide>
              )}
              {this.slides === null && <div>Loading ...</div>}
            </swiper>
            <div class={Styles['top-controls']}>
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
            <div ref="explore-controls" class={Styles['explore-controls']}>
              <div
                class={`
                  ${Styles['explore-controls__left-arrow']}
                  ${
                    this.exploreControlsHidden
                      ? Styles['explore-controls__left-arrow--hidden']
                      : Styles['explore-controls__left-arrow--visible']
                  }
                `}
                onClick={() => this.previousSlide()}
              >
                <i class="fa fa-angle-left"></i>
              </div>
              <div
                class={`
                  ${Styles['explore-controls__middle-arrow']}
                  ${
                    this.exploreControlsHidden
                      ? Styles['explore-controls__middle-arrow--hidden']
                      : Styles['explore-controls__middle-arrow--visible']
                  }
                `}
                onClick={() => this.gotoProfile()}
              >
                <i class="fa fa-angle-double-up"></i>
              </div>
              <div
                class={`
                  ${Styles['explore-controls__text']}
                  ${
                    this.exploreControlsHidden
                      ? Styles['explore-controls__text--hidden']
                      : Styles['explore-controls__text--visible']
                  }
                `}
              >
                Zum Laden
              </div>
              <div
                class={`
                  ${Styles['explore-controls__right-arrow']}
                  ${
                    this.exploreControlsHidden
                      ? Styles['explore-controls__right-arrow--hidden']
                      : Styles['explore-controls__right-arrow--visible']
                  }
                `}
                onClick={() => this.nextSlide()}
              >
                <i class="fa fa-angle-right"></i>
              </div>
            </div>
          </VerticalSlide>
          <VerticalSlide class={Styles['profile']}>
            {this.currentBusiness && (
              <ProfilePage
                profile={this.currentBusiness}
                on-go-to-explorer={this.gotoExplorerSlide.bind(this)}
              ></ProfilePage>
            )}
          </VerticalSlide>
        </VerticalSwiper>

        <SlideInPage
          value={this.slideIn}
          class={Styles['settings']}
          height={410}
          closeButton={false}
          onClose={() => (this.slideIn = false)}
        >
          <ul class={Styles['settings-navigation']}>
            <li class={Styles['settings-navigation__item']}>
              <router-link to="/" class={Styles['settings-navigation__link']}>
                Startseite
              </router-link>
            </li>
            {/*this.currentBusiness?.website && (
              <li class={Styles['settings-navigation__item']}>
                <a
                  class={Styles['settings-navigation__link']}
                  href={this.currentBusiness?.website}
                  alt={`Link zur Händlerseite`}
                >
                  Händlerseite {this.currentBusiness?.name}
                </a>
              </li>
            )*/}
            <li class={Styles['settings-navigation__item']}>
              <router-link to="/map" class={Styles['settings-navigation__link']}>
                Zur Karte
              </router-link>
            </li>
            <li class={Styles['settings-navigation__item']}>
              <router-link to="/business" class={Styles['settings-navigation__link']}>
                Händlerlogin
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
