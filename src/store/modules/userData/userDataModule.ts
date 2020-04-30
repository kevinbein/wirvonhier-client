/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Module, registerModule } from 'vuex-smart-module';
import { UserDataActions } from './actions';
import { UserDataMutations } from './mutations';
import { UserDataGetters } from './getters';
import { UserDataState } from './state';
import { IStore } from '@/store/store.types';
import { store } from '@/store';

export const UserData = new Module({
  actions: UserDataActions,
  mutations: UserDataMutations,
  getters: UserDataGetters,
  state: UserDataState,
});

export const registerUserDataModule = (store: IStore): void =>
  registerModule(store, ['UserData'], 'UserData/', UserData);

export const userData = UserData.context(store);
