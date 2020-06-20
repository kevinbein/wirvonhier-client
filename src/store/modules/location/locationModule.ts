/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Module } from 'vuex-smart-module';
import { LocationActions } from './actions';
import { LocationMutations } from './mutations';
import { LocationGetters } from './getters';
import { LocationState } from './state';

export const LocationModule = new Module({
  actions: LocationActions,
  mutations: LocationMutations,
  getters: LocationGetters,
  state: LocationState,
});
