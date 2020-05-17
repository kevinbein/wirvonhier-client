import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { LocationState, LocationGetters, LocationMutations } from '..';
import { RootState } from '@/store';

export class LocationActions extends Actions<LocationState, LocationGetters, LocationMutations, LocationActions> {
  public store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  public async initGoogleMaps(): Promise<void> {
    await this.store.$services.maps.init();
  }
}
