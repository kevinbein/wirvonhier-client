/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Module } from 'vuex-smart-module';
import { AppearanceActions } from './actions';
import { AppearanceMutations } from './mutations';
import { AppearanceState } from './state';

export const AppearanceModule = new Module({
  actions: AppearanceActions,
  mutations: AppearanceMutations,
  state: AppearanceState,
});
