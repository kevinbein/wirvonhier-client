import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { AppearanceState, AppearanceGetters, AppearanceMutations } from '..';
import { RootState } from '@/store';

export class AppearanceActions extends Actions<
  AppearanceState,
  AppearanceGetters,
  AppearanceMutations,
  AppearanceActions
> {
  // @ts-ignore
  private store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  setNavigationVisibility(visibility: boolean): void {
    this.commit('SET_NAVIGATION_VISIBILITY', visibility);
  }
}
