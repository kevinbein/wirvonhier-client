import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './map.scss';

import { BusinessModule, LocationModule } from '@/store';
import '../../../plugins/leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';
import 'vue2-leaflet';
import { Business, IBusinessFilter } from '@/entities';
import { BackButton, Loader } from '@/ui/components';
import { Route } from 'vue-router';

@Component({
  name: 'Map',
  components: {
    Loader,
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      async handler(this: Map, newRoute, oldRoute) {
        await this.setCurrentLocationFromQuery(newRoute, oldRoute);
        if (!this.currentLocation) await this.getUserLocation();
        if (!this.currentLocation) this.$router.push({ name: 'Landing' });
      },
    },
    currentLocation: {
      deep: true,
      immediate: true,
      handler(this: Map, newLoc) {
        if (!newLoc) return;
        this.centerMap();
      },
    },
    currentFilter: {
      deep: true,
      immediate: true,
      handler(this: Map, newFilters: IBusinessFilter[]) {
        if (newFilters.some((f) => f.name === 'location')) this.loadBusinesses();
      },
    },
  },
})
export class Map extends Vue {
  public businessModule = BusinessModule.context(this.$store);
  public locationModule = LocationModule.context(this.$store);

  public zoom = 13;
  public center: LatLng = new LatLng(48.932237, 8.9585);
  public url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  public icon = L.icon({
    iconUrl: '/assets/imgs/logo/logo_192x192.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  public get currentLocation(): [number, number] | null {
    return this.locationModule.state.currentLocation;
  }

  public get currentFilter(): IBusinessFilter[] {
    return this.businessModule.state.filters;
  }

  public get businesses(): Business[] {
    return this.businessModule.state.businesses;
  }

  public openProfile(id: string): void {
    this.$router.push({ name: 'Explore', params: { businessId: id } });
  }

  public onMoveEnd(e: Event): void {
    const target = (e.target as unknown) as L.Map;
    const { lat, lng } = target.getCenter();
    this.$router.replace({ query: { lat: lat.toString(), lng: lng.toString() } });
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={Styles['map-page']}>
        <div class={Styles['wvh-header']}>
          <div class={Styles['logo-container']}>
            <img class={Styles['logo']} src="/assets/imgs/logo/logo-schrift_512x203.png" />
          </div>
        </div>
        <BackButton style={{ 'z-index': 402 }} />
        <div ref="leafletmap" class={Styles['map']}>
          <l-map
            style="height: 100%; width: 100%"
            zoom={this.zoom}
            center={this.center}
            on-moveend={this.onMoveEnd.bind(this)}
          >
            <l-tile-layer url={this.url} />
            {this.businesses.map((business: Business) => {
              const latLng = [business.location.geo.coordinates[1], business.location.geo.coordinates[0]];
              return <l-marker onClick={() => this.openProfile(business.id)} lat-lng={latLng} icon={this.icon} />;
            }) || <Loader size={128} />}
          </l-map>
        </div>
      </div>
    );
  }

  private async setCurrentLocationFromQuery(newRoute: Route, oldRoute?: Route): Promise<void> {
    const { lat, lng } = newRoute.query;
    const { lat: oldLat, lng: oldLng } = oldRoute?.query || {};
    if (!lat || Array.isArray(lat) || !lng || Array.isArray(lng) || (lat == oldLat && lng == oldLng)) return;
    await this.locationModule.actions.setCurrentLocation({ coords: [parseFloat(lng), parseFloat(lat)] });
    await this.businessModule.actions.setFilter({
      name: 'location',
      value: {
        lng,
        lat,
        maxDistance: 10000,
      },
    });
  }

  private async getUserLocation(): Promise<void> {
    const { status, position } = await this.locationModule.actions.requestUserLocation();
    if (status !== 'success') return;
    this.$router.replace({ query: { lat: position[1].toString(), lng: position[0].toString() } });
  }

  private async loadBusinesses(page = 0, limit = 50): Promise<void> {
    await this.businessModule.actions.loadFilteredBusinesses({ page, limit });
  }

  private centerMap(): void {
    if (!this.currentLocation) return;
    const [lng, lat] = this.currentLocation;
    this.center = new LatLng(lat, lng);
  }
}
