import { Mutations } from 'vuex-smart-module';
import { AppearanceState } from '../state';

export class AppearanceMutations extends Mutations<AppearanceState> {
  SET_NAVIGATION_VISIBILITY(visibility: boolean): void {
    this.state.isNavigationVisible = visibility;
  }
}
