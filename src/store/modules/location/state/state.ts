import { Location } from './state.types';

export class LocationState {
  currentLocation: Location | null = null;
  currentZip: number | null = null;
}
