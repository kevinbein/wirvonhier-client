import Vue from 'vue';
import VueRouter from 'vue-router';
import { MainApp, BusinessApp } from './apps';
import { ExplorePage, MapPage, LandingPage } from './apps/main';
import { BusinessLandingPage, BusinessProfilePage } from './apps/business';

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
        path: '/explore/:businessName?',
        name: 'Explore',
        component: ExplorePage,
      },
    ],
  },
  {
    path: '/business',
    component: BusinessApp,
    children: [
      {
        path: '/',
        name: 'BusinessLanding',
        component: BusinessLandingPage,
      },
      {
        path: '/profile',
        name: 'BusinessProfile',
        component: BusinessProfilePage,
      },
    ],
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes,
});
