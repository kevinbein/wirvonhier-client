import { Actions } from 'vuex-smart-module';
import { LocationState, LocationMutations } from '..';
import { IAutocompleteOptions } from '@/services/googleMaps';
import { IAddress } from '@/entities/business';
import { IStore } from '@/store';

export class LocationActions extends Actions<LocationState, never, LocationMutations, LocationActions> {
  public store!: IStore;

  $init(store: IStore): void {
    this.store = store;
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
    const formattedAddress = Object.values(address)
      .filter(Boolean)
      .join(' ');
    return this.store.$services.maps.geocode(formattedAddress);
  }
}
