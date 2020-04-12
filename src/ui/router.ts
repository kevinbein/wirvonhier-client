import Vue from 'vue';
import VueRouter from 'vue-router';
import { MainApp, BusinessApp } from './apps';
import { ExplorePage, MapPage, LandingPage } from './apps/main';
import {
  BusinessLandingPage,
  BusinessNavigationPage,
  BusinessInformationPage,
  BusinessStoriesPage,
  BusinessStoryPage,
} from './apps/business';

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
    component: BusinessApp,
    children: [
      {
        path: '',
        name: 'BusinessLanding',
        component: BusinessLandingPage,
      },
      {
        path: 'profile',
        name: 'BusinessNavigation',
        component: BusinessNavigationPage,
      },
      {
        path: 'profile/information',
        name: 'BusinessInformation',
        component: BusinessInformationPage,
      },
      {
        path: 'profile/stories',
        name: 'BusinessStories',
        component: BusinessStoriesPage,
      },
      {
        path: 'profile/stories/:storyId',
        name: 'BusinessStory',
        component: BusinessStoryPage,
      },
    ],
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes,
});
