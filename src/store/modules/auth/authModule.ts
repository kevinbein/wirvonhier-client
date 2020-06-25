/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Module } from 'vuex-smart-module';
import { AuthActions } from './actions';
import { AuthMutations } from './mutations';
import { AuthState } from './state';

export const AuthModule = new Module({
  actions: AuthActions,
  mutations: AuthMutations,
  state: AuthState,
});
