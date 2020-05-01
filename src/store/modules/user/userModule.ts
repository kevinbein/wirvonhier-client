/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Module } from 'vuex-smart-module';
import { UserDataActions } from './actions';
import { UserDataMutations } from './mutations';
import { UserDataGetters } from './getters';
import { UserDataState } from './state';

export const UserModule = new Module({
  actions: UserDataActions,
  mutations: UserDataMutations,
  getters: UserDataGetters,
  state: UserDataState,
});
