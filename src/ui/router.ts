import Vue from 'vue';
import VueRouter from 'vue-router';
import { MainApp } from './apps';
import { ExplorePage, MapPage, LandingPage } from './apps/main';
import { CompanyDetailsPage, PrivacyPolicyPage, TermsOfUsePage } from './apps/main/legal';

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
        path: '/datenschutz',
        name: 'Privacy',
        component: PrivacyPolicyPage,
      },
      {
        path: '/nutzungsbedingungen',
        name: 'Nutzungsbedingungen',
        component: TermsOfUsePage,
      },
      {
        path: '/impressum',
        name: 'Impressum',
        component: CompanyDetailsPage,
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
        path: 'login',
        name: 'BusinessLogin',
        component: () => import(/* webpackChunkName: "BusinessLogin" */ '@/ui/apps/business/login/login'),
      },
      {
        path: 'register',
        name: 'BusinessRegister',
        component: () => import(/* webpackChunkName: "BusinessRegister" */ '@/ui/apps/business/register/register'),
      },
      {
        path: 'verify',
        name: 'UserVerify',
        component: () => import(/* webpackChunkName: "UserVerify" */ '@/ui/apps/business/verify/verify'),
      },
      {
        path: 'create',
        name: 'CreateBusiness',
        component: () => import(/* webpackChunkName: "CreateBusiness" */ '@/ui/apps/business/create/create'),
      },
      {
        path: 'profile',
        name: 'BusinessNavigation',
        component: () =>
          import(/* webpackChunkName: "BusinessNavigation" */ '@/ui/apps/business/navigation/navigation'),
      },
      {
        path: 'profile/information',
        name: 'BusinessInformation',
        component: () =>
          import(/* webpackChunkName: "BusinessInformation" */ '@/ui/apps/business/information/information'),
      },
      {
        path: 'profile/stories',
        name: 'BusinessStories',
        component: () => import(/* webpackChunkName: "BusinessStories" */ '@/ui/apps/business/stories/stories'),
      },
      {
        path: 'profile/stories/:storyId',
        name: 'BusinessStory',
        component: () => import(/* webpackChunkName: "BusinessStory" */ '@/ui/apps/business/story/story'),
      },
    ],
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes,
});
