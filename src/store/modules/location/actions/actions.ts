import { Actions } from 'vuex-smart-module';
import { LocationState, LocationMutations } from '..';
import { IAutocompleteOptions } from '@/services/googleMaps';
import { IAddress } from '@/entities/business';
import { IStore } from '@/store';
import { Location } from '../state';
import { TYPE, POSITION } from 'vue-toastification';

export class LocationActions extends Actions<LocationState, never, LocationMutations, LocationActions> {
  public store!: IStore;

  $init(store: IStore): void {
    this.store = store;
  }

  public async requestUserLocation(): Promise<{
    status: 'failure' | 'success';
    position?: [number, number];
    accuracy?: number;
  }> {
    const { status, code, position, accuracy } = await this.store.$services.maps.requestUserLocation();
    if (status !== 'success') {
      let msg = '';
      switch (code) {
        case 0:
          msg = 'Dein Browser unterstützt leider keine Geo-Location. Bitte gib eine Postleitzahl ein.';
          break;
        case 1:
          msg = 'Dein Browser unterstützt leider keine Geo-Location. Bitte gib eine Postleitzahl ein.';
          break;
        case 2:
          return { status };
        default:
          msg = 'Unknown Error';
      }
      this.store.$toast(msg, {
        type: TYPE.WARNING,
        position: POSITION.TOP_CENTER,
      });
      return { status };
    }
    return { status, position, accuracy };
  }

  public async setCurrentLocation(loc: {
    coords?: Location | null;
    zip?: number | null;
  }): Promise<[number, number] | null> {
    const { coords, zip } = loc;
    if (zip) {
      const formattedAddress = Object.values({ zip, country: 'Deutschland' })
        .filter(Boolean)
        .join(' ');
      const location = (await this.store.$services.maps.geocode(formattedAddress)) || null;
      this.mutations.SET_CURRENT_LOCATION(location);
      return location;
    }
    if (coords) {
      this.mutations.SET_CURRENT_LOCATION(coords);
      return coords;
    }
    return null;
  }
  public setCurrentZIP(zip: string | null): void {
    this.mutations.SET_CURRENT_ZIP(zip);
  }

  public async initGoogleMaps(): Promise<void> {
    await this.store.$services.maps.init();
  }
  public async initAutocomplete(options: IAutocompleteOptions): Promise<void> {
    await this.store.$services.maps.initAutocomplete(options);
  }
  public destroyAutocomplete(): void {
    this.store.$services.maps.destroyAutocomplete();
  }

  public geocode(address: IAddress): void | Promise<[number, number]> {
    if (!address.country) address.country = 'Deutschland';
    const formattedAddress = Object.values(address)
      .filter(Boolean)
      .join(' ');
    return this.store.$services.maps.geocode(formattedAddress);
  }
}
