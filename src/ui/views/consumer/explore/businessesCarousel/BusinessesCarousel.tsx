import Component from 'vue-class-component';
import Vue from 'vue';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { Video, Image } from '@/entities';
import { ExploreControls } from '..';
import { StoryView, LadyPage, WVHButton } from '@/ui';
import Styles from './businessesCarousel.scss';
import { BusinessModule } from '@/store';

Vue.use(VueAwesomeSwiper /* { default options with global component } */);

interface IRefs {
  horizontalSwiper: any; // eslint-disable-line
}

@Component({
  name: 'BusinessesCarousel',
  watch: {
    activeBusinessId: {
      immediate: true,
      handler(this: BusinessesCarousel, newId: string) {
        if (newId) this.businessModule.actions.selectBusiness(newId);
      },
    },
  },
})
export class BusinessesCarousel extends VueComponent<{}, IRefs> {
  public businessModule = BusinessModule.context(this.$store);
  public deviceWidth = window.innerWidth;
  public deviceHeight = window.innerHeight;
  public storyWidth = Math.min(500, this.deviceWidth);
  public storyHeight = this.deviceWidth >= 500 ? this.deviceHeight - 50 : this.deviceHeight;
  public exploreControlsHidden = false;
  public exploreControlsFullyHidden = false;
  public horizontalSwiperOptions = {
    speed: 300,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.05,
    longSwipesMs: 100,
    direction: 'horizontal',
    preloadImages: false,
    initialSlide: 0,
    effect: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  };

  public get allSlides(): (Image | Video)[] {
    return this.businessModule.getters.filteredSlides;
  }
  public get currentIndex(): number {
    return this.businessModule.state.currentExplorerIndex;
  }
  public get activeBusinessId(): string | null {
    const activeSlide = this.allSlides[this.currentIndex];
    return activeSlide?.business?._id || null;
  }

  public exploreSlideChange(): void {
    const newSwiperIndex = this.$refs.horizontalSwiper?.$swiper.activeIndex;
    this.businessModule.actions.setCurrentExplorerIndex(newSwiperIndex);
    this.exploreControlsFullyHidden = newSwiperIndex >= this.allSlides.length;
    if (!this.activeBusinessId) return;
    this.businessModule.actions.selectBusiness(this.activeBusinessId);
  }

  public hideExploreControls(): void {
    this.exploreControlsHidden = true;
  }
  public showExploreControls(): void {
    this.exploreControlsHidden = false;
  }

  public gotoBeginning(): void {
    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    hSwiper.slideTo(0, 0);
  }

  public nextSlide(): void {
    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    hSwiper.slideTo(hSwiper.activeIndex + 1);
  }

  public previousSlide(): void {
    const hSwiper = this.$refs.horizontalSwiper.$swiper;
    hSwiper.slideTo(hSwiper.activeIndex - 1);
  }

  public showDetails(): void {
    this.$emit('show-details');
  }

  public mounted(): void {
    const id = this.$route.params.businessId;
    const index = this.allSlides.findIndex((slide) => slide.business?._id === id);
    if (index) {
      this.$refs.horizontalSwiper.$swiper.slideTo(index);
    }
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={Styles['businesses-carousel']}>
        <swiper
          ref="horizontalSwiper"
          on-slideChangeTransitionEnd={this.exploreSlideChange.bind(this)}
          on-touchStart={this.hideExploreControls.bind(this)}
          on-touchEnd={this.showExploreControls.bind(this)}
          options={this.horizontalSwiperOptions}
          class={Styles['businesses-carousel__swiper']}
        >
          {this.allSlides.map((slide) => {
            return (
              <swiper-slide>
                <StoryView story={slide} storyHeight={this.storyHeight} storyWidth={this.storyWidth} />
              </swiper-slide>
            );
          })}
          <swiper-slide>
            <LadyPage
              class={Styles['last-page']}
              style={{ width: `${this.storyWidth}px`, height: `${this.storyHeight}px` }}
            >
              <div class={Styles['last-page__text']}>Du hast alles gesehen</div>
              <WVHButton large on-click={() => this.gotoBeginning()} class={Styles['last-page__button']}>
                Zurück zum Anfang
              </WVHButton>
              <WVHButton large on-click={() => this.$router.push({ name: 'Map' })} class={Styles['last-page__button']}>
                Zur Kartenansicht
              </WVHButton>
            </LadyPage>
          </swiper-slide>
        </swiper>

        {!this.exploreControlsFullyHidden && (
          <ExploreControls
            isHidden={this.exploreControlsHidden}
            on-prev={this.previousSlide.bind(this)}
            on-next={this.nextSlide.bind(this)}
            on-details={this.showDetails.bind(this)}
          />
        )}
      </div>
    );
  }
}
