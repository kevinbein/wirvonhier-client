import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { RootState, RootGetters, RootMutations } from '..';

export class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {
  private store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  fetchBusinesses() {
    return this.store;
  }
}
