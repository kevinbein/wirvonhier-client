/* eslint-disable @typescript-eslint/interface-name-prefix */
import Vue from 'vue';
import Vuex from 'vuex';
import { dbPlugin } from './plugins';
import { createStore, Module } from 'vuex-smart-module';
import { RootActions } from './actions';
import { RootMutations } from './mutations';
import { RootGetters } from './getters';
import { RootState } from './state';
import { Business, UserData } from './modules';

Vue.use(Vuex);

export const rootModule = new Module({
  actions: RootActions,
  mutations: RootMutations,
  getters: RootGetters,
  state: RootState,
  modules: {
    UserData,
    Business,
  },
});

export const store = createStore(rootModule, { plugins: [dbPlugin] });

export const root = rootModule.context(store);
