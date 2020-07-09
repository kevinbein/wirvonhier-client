import Component from 'vue-class-component';
import { BusinessModule, LocationModule, Location } from '@/store';
import { Business, IBusinessFilter, Image, Video } from '@/entities';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { MainNavigation, VerticalSwiper, Loader } from '@/ui/components';
import { BusinessDetails, NoBusinessesFound } from '..';
import { BusinessesCarousel } from '.';
import Styles from './explore.scss';

interface IRefs {
  verticalSwiper: VerticalSwiper;
}
// reload when route changes (zip / location query params)
// reload on page load (pull zip / location from query)

@Component({
  name: 'Explore',
  components: {
    NoBusinessesFound,
    BusinessesCarousel,
    BusinessDetails,
    MainNavigation,
    Loader,
    VerticalSwiper,
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(this: Explore) {
        this.setZip();
        this.setLocation();
      },
    },
    businessesFilter: {
      immediate: true,
      deep: true,
      async handler(this: Explore) {
        await this.clearSlides();
        this.loadBusinesses();
      },
    },
  },
})
export class Explore extends VueComponent<{}, IRefs> {
  public isLoading = true;
  private businessModule = BusinessModule.context(this.$store);
  private locationModule = LocationModule.context(this.$store);

  public get businessesFilter(): IBusinessFilter[] {
    return this.businessModule.state.filters;
  }

  public get slides(): (Image | Video)[] {
    return this.businessModule.getters.filteredSlides;
  }

  public get businessId(): Business['_id'] | null {
    return this.businessModule.state.selectedBusiness?._id || null;
  }

  public slideChange(): void {
    const swiper = this.$refs.verticalSwiper;
    // BusinessDetails page is active
    if (swiper.activeIndex === 1) {
      const path = '/explore/' + this.businessId;
      if (this.$route.path !== path) this.$router.replace({ path, query: this.$route.query });
    }
    // Explore page is active
    else {
      const path = '/explore';
      if (this.$route.path !== path) this.$router.replace({ path, query: this.$route.query });
    }
  }

  public showCarousel(): void {
    const swiper = this.$refs.verticalSwiper;
    swiper.slideTo(0);
  }

  public showDetails(): void {
    const vSwiper = this.$refs.verticalSwiper;
    vSwiper.slideTo(1);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={Styles['explore-page']}>
        {this.isLoading ? (
          <Loader />
        ) : this.slides.length > 0 ? (
          <VerticalSwiper
            ref="verticalSwiper"
            on-slideChangeTransitionEnd={this.slideChange.bind(this)}
            class={Styles['vertical-swiper']}
            spacer={{ height: 10, color: '#000' }}
          >
            <BusinessesCarousel on-show-details={this.showDetails.bind(this)} />
            <BusinessDetails on-close={this.showCarousel.bind(this)} />
          </VerticalSwiper>
        ) : (
          <NoBusinessesFound />
        )}

        <MainNavigation />
      </div>
    );
  }

  private setZip(): void {
    const routeZip = this.$route.query.zip;
    if (!routeZip || Array.isArray(routeZip)) return;
    const currentZip = this.locationModule.state.currentZip;
    if (currentZip === routeZip) return;
    this.locationModule.actions.setCurrentZIP(routeZip);
    this.businessModule.actions.clearFilter('location');
    this.businessModule.actions.setFilter({
      name: 'location',
      value: {
        zip: routeZip,
        maxDistance: 10000,
      },
    });
  }

  private setLocation(): void {
    const routeLocation = this.$route.query.location;
    if (!routeLocation || Array.isArray(routeLocation)) return;
    const currentLocation = this.locationModule.state.currentLocation;
    const location = (routeLocation.split(',').map((val) => +val) as unknown) as Location;
    if (currentLocation === location) return;
    this.locationModule.actions.setCurrentLocation(location);
    this.businessModule.actions.clearFilter('location');
    this.businessModule.actions.setFilter({
      name: 'location',
      value: {
        lng: location[0],
        lat: location[1],
        maxDistance: 10000,
      },
    });
  }

  private async loadBusinesses(page = 0): Promise<void> {
    this.isLoading = true;
    await this.businessModule.actions.loadFilteredBusinesses({ page });
    this.isLoading = false;
  }

  private async clearSlides(): Promise<void> {
    await this.businessModule.actions.clearSlides();
  }
}
