/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Module } from 'vuex-smart-module';
import { FormActions } from './actions';
import { FormMutations } from './mutations';
import { FormGetters } from './getters';
import { FormState } from './state';

export const FormModule = new Module({
  actions: FormActions,
  mutations: FormMutations,
  getters: FormGetters,
  state: FormState,
});
