import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { AppearanceState, AppearanceMutations } from '..';
import { Route } from 'vue-router';

export class AppearanceActions extends Actions<AppearanceState, never, AppearanceMutations, AppearanceActions> {
  // @ts-ignore
  private store!: Store<AppearanceState>;

  $init(store: Store<AppearanceState>): void {
    this.store = store;
  }

  setNavigationVisibility(visibility: boolean): void {
    this.commit('SET_NAVIGATION_VISIBILITY', visibility);
  }

  setLastRoute(route: Route): void {
    this.commit('SET_LAST_ROUTE', route);
  }
}
