import { Mutations } from 'vuex-smart-module';
import { AppearanceState } from '../state';
import { Route } from 'vue-router';

export class AppearanceMutations extends Mutations<AppearanceState> {
  SET_NAVIGATION_VISIBILITY(visibility: boolean): void {
    this.state.isNavigationVisible = visibility;
  }

  SET_LAST_ROUTE(route: Route): void {
    this.state.lastRoute = route;
  }
}
