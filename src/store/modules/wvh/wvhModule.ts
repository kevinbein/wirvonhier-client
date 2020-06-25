/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Module } from 'vuex-smart-module';
import { WVHActions } from './actions';
import { WVHMutations } from './mutations';
import { WVHState } from './state';

export const WVHModule = new Module({
  actions: WVHActions,
  mutations: WVHMutations,
  state: WVHState,
});
