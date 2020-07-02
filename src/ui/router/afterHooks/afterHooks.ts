import { store } from '@/store';
import { Route } from 'vue-router';

const saveLastRoute: (to: Route, from: Route) => void = (_to, from) => {
  store.dispatch('Appearance/setLastRoute', from);
};

export const afterHooks = [saveLastRoute];
