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
import { BackButton } from '@/ui/components';

@Component({
  name: 'Map',
})
export class Map extends Vue {
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
    if (typeof this.$route.query.lat === 'string' && typeof this.$route.query.lng === 'string') {
      const centerLat = parseFloat(this.$route.query.lat);
      const centerLng = parseFloat(this.$route.query.lng);
      this.center = new LatLng(centerLat, centerLng);
    }
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['map-page']}>
        <div class={Styles['wvh-header']}>
          <div class={Styles['logo-container']}>
            <img class={Styles['logo']} src="/assets/imgs/logo/logo-schrift_512x203.png" />
          </div>
        </div>
        <BackButton style={{ 'z-index': 402 }} />
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
