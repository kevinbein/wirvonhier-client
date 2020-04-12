import Vue from 'vue';
import VueRouter from 'vue-router';
import { MainApp } from './apps';
import { ExplorePage, MapPage, LandingPage } from './apps/main';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainApp,
    children: [
      {
        path: '/',
        name: 'Landing',
        component: LandingPage,
      },
      {
        path: '/home',
        redirect: '/',
      },
      {
        path: '/map',
        name: 'Map',
        component: MapPage,
      },
      {
        path: '/explore/:businessId?',
        name: 'Explore',
        component: ExplorePage,
      },
    ],
  },
  {
    path: '/business',
    component: () => import(/* webpackChunkName: "BusinessContainer" */ '@/ui/apps/business/BusinessApp'),
    children: [
      {
        path: '/',
        name: 'BusinessLanding',
        component: () => import(/* webpackChunkName: "BusinessLanding" */ '@/ui/apps/business/landing/landing'),
      },
      {
        path: '/profile',
        name: 'BusinessProfile',
        component: () => import(/* webpackChunkName: "BusinessProfile" */ '@/ui/apps/business/profile/profile'),
      },
    ],
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes,
});
