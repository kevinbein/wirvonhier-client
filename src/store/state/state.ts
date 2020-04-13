import { Location } from './state.types';

export class RootState {
  currentLocation: undefined | Location = undefined;
  currentZip: undefined | string = undefined;
}

export function getRootState(): RootState {
  // set initial state from db
  return new RootState();
}
