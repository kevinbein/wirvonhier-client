/* eslint-disable @typescript-eslint/interface-name-prefix */
import Vue from 'vue';
import Vuex from 'vuex';
import { dbPlugin } from './plugins';
import { createStore, Module } from 'vuex-smart-module';
import { AppearanceModule, AuthModule, BusinessModule, FormModule, UserModule, WVHModule } from './modules';

Vue.use(Vuex);

export const rootModule = new Module({
  modules: {
    Appearance: AppearanceModule,
    Auth: AuthModule,
    Business: BusinessModule,
    Form: FormModule,
    User: UserModule,
    WVH: WVHModule,
  },
});

export const store = createStore(rootModule, { plugins: [dbPlugin] });

export const root = rootModule.context(store);
