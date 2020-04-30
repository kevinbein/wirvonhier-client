import { Mutations } from 'vuex-smart-module';
import { UserDataState } from '../state';
import { IUserData } from '../state/state.types';
import Vue from 'vue';

export class UserDataMutations extends Mutations<UserDataState> {
  SET_USER_DATA(userData: Partial<IUserData>): void {
    Object.keys(userData).forEach((key) => {
      Vue.set(this.state, key, userData[key]);
    });
  }
}
