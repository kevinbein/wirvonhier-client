import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { UserDataState, UserDataGetters, UserDataMutations } from '..';
import { RootState } from '@/store';

export class UserDataActions extends Actions<UserDataState, UserDataGetters, UserDataMutations, UserDataActions> {
  private store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  userdata() {
    return this.store;
  }
}
