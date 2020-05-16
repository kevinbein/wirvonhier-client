import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './map.scss';
import { CreateElement } from 'vue/types/umd';

import { BusinessModule } from '@/store';
import '../../../plugins/leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';
import 'vue2-leaflet';
import { Business } from '@/entities';

@Component({
  name: 'Map',
})
export class MapPage extends Vue {
  private businessStore = BusinessModule.context(this.$store);
  zoom = 17;
  // Center of Ravensburg
  //center: LatLng = new LatLng(47.78099, 9.61529);
  // Center of Vaihingen
  //center: LatLng = new LatLng(48.9316137, 8.9581946);
  center: LatLng = new LatLng(48.932237, 8.9585);
  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  icon = L.icon({
    iconUrl: './assets/imgs/logo/logo_192x192.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  updateZoom(zoom: number): void {
    this.zoom = zoom;
  }
  updateCenter(center: LatLng): void {
    this.center = center;
  }

  openProfile(id: string): void {
    this.$router.push('/explore/' + id);
  }

  public get businesses(): Business[] {
    return this.businessStore.state.businesses;
  }
  public loadBusinesses(zip: string, radius: number): void {
    this.businessStore.actions.getBusinessesByZIP({ zip, maxDistance: radius, limit: 1000 });
  }

  mounted(): void {
    const zip = '71665';
    const radius = 1004200; // in meters
    this.loadBusinesses(zip, radius);
    if (this.$route.params.lat && this.$route.params.lng) {
      const centerLat = parseFloat(this.$route.params.lat);
      const centerLng = parseFloat(this.$route.params.lng);
      this.center = new LatLng(centerLat, centerLng);
    }
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['map-page']}>
        <div class={Styles['wvh-header']}>
          <div class={Styles['logo-container']}>
            <img class={Styles['logo']} src="./assets/imgs/logo/logo-schrift_1024x405.png" />
          </div>
        </div>

        <router-link to="explore" class={Styles['close-button']}>
          <v-icon class={Styles['icon']}>fa-times</v-icon>
        </router-link>

        <div ref="leafletmap" class={Styles['map']}>
          <l-map style="height: 100%; width: 100%" zoom={this.zoom} center={this.center}>
            <l-tile-layer url={this.url}></l-tile-layer>
            {(this.businesses !== null &&
              this.businesses.map((business: Business) => {
                if (
                  business.location &&
                  business.location.geo &&
                  business.location.geo.coordinates &&
                  business.location.geo.coordinates.length == 2
                ) {
                  const latLng = [business.location.geo.coordinates[1], business.location.geo.coordinates[0]];
                  return (
                    <l-marker
                      onClick={() => this.openProfile(business.id)}
                      lat-lng={latLng}
                      icon={this.icon}
                    ></l-marker>
                  );
                }
                return '';
              })) || <div>Loading ...</div>}
          </l-map>
        </div>
      </div>
    );
  }
}

export default MapPage;
