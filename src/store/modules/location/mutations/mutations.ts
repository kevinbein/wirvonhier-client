import { Mutations } from 'vuex-smart-module';
import { LocationState } from '../state';
import { Location } from '../state';

export class LocationMutations extends Mutations<LocationState> {
  SET_CURRENT_ZIP(zip: number | null): void {
    this.state.currentZip = zip;
  }

  SET_CURRENT_LOCATION(location: Location | null): void {
    this.state.currentLocation = location;
  }
}
