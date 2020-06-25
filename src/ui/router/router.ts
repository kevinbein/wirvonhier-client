import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { navigationGuards } from './navigationGuards';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes,
});

navigationGuards.forEach((guard) => router.beforeEach(guard));
