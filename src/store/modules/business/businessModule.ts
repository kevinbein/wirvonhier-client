/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Module } from 'vuex-smart-module';
import { BusinessActions } from './actions';
import { BusinessMutations } from './mutations';
import { BusinessGetters } from './getters';
import { BusinessState } from './state';

export const Business = new Module({
  actions: BusinessActions,
  mutations: BusinessMutations,
  getters: BusinessGetters,
  state: BusinessState,
});
