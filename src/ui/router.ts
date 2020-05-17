import Vue from 'vue';
import VueRouter, { NavigationGuard, Route, RawLocation } from 'vue-router';
import { MainApp } from './apps';
import { ExplorePage, LandingPage } from './apps/main';
import { CompanyDetailsPage, PrivacyPolicyPage, TermsOfUsePage } from './apps/main/legal';
import { store } from '@/store';

Vue.use(VueRouter);
const privateRoutes = [
  'BusinessManageProfile',
  'BusinessInformation',
  'BusinessStories',
  'BusinessStory',
  'BusinessDashboard',
  'BusinessEditVideo',
  'BusinessUploadVideo',
];
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
        component: () => import(/* webpackChunkName: "MapPage" */ '@/ui/apps/main/map/map'),
      },
      {
        path: '/explore/:businessId?',
        name: 'Explore',
        component: ExplorePage,
      },
      {
        path: 'logout',
        name: 'BusinessLogout',
        component: () => import(/* webpackChunkName: "BusinessLogout" */ '@/ui/apps/business/logout/logout'),
      },
    ],
  },
  {
    path: '/business',
    component: () => import(/* webpackChunkName: "BusinessContainer" */ '@/ui/apps/business/BusinessApp'),
    beforeEnter: async (to: Route, _from: Route, next: (val?: RawLocation) => void) => {
      const requiresPermission = privateRoutes.some((route) => route === to.name);
      if (!requiresPermission) {
        next();
        return;
      }
      const hasPermission = await store.dispatch('hasPermission', to);
      if (hasPermission && to.name !== 'BusinessDashboard') {
        next();
      } else if (
        hasPermission &&
        ['BusinessLanding', 'BusinessLogin', 'BusinessRegister'].includes(to.name as string)
      ) {
        next({ name: 'BusinessDashboard' });
      } else if (!hasPermission && to.name !== 'BusinessLogin') {
        next({ name: 'BusinessLogin' });
      } else next();
    },
    redirect: '/business/dashboard',
    children: [
      {
        path: 'landing',
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
        path: 'register-complete',
        name: 'BusinessRegisterComplete',
        component: () =>
          import(
            /* webpackChunkName: "BusinessRegisterComplete" */ '@/ui/apps/business/registerComplete/registerComplete'
          ),
      },
      {
        path: 'request-new-password',
        name: 'BusinessRequestNewPassword',
        component: () =>
          import(
            /* webpackChunkName: "BusinessRequestNewPassword" */ '@/ui/apps/business/requestNewPassword/requestNewPassword'
          ),
      },
      {
        path: 'request-new-password-success',
        name: 'BusinessRequestNewPasswordSuccess',
        component: () =>
          import(
            /* webpackChunkName: "BusinessRequestNewPasswordSuccess" */ '@/ui/apps/business/requestNewPasswordSuccess/requestNewPasswordSuccess'
          ),
      },
      {
        path: 'reset-password',
        name: 'BusinessResetPassword',
        component: () =>
          import(/* webpackChunkName: "BusinessResetPassword" */ '@/ui/apps/business/resetPassword/resetPassword'),
      },
      {
        path: 'reset-password-success',
        name: 'BusinessResetPasswordSuccess',
        component: () =>
          import(
            /* webpackChunkName: "BusinessResetPasswordSuccess" */ '@/ui/apps/business/resetPasswordSuccess/resetPasswordSuccess'
          ),
      },
      {
        path: 'verify-email',
        name: 'VerifyEmail',
        component: () => import(/* webpackChunkName: "VerifyEmail" */ '@/ui/apps/business/verifyEmail/verifyEmail'),
      },
      {
        path: 'upload-video',
        name: 'BusinessUploadVideo',
        component: () =>
          import(/* webpackChunkName: "BusinessUploadVideo" */ '@/ui/apps/business/uploadVideo/uploadVideo'),
      },
      {
        path: 'edit-video',
        name: 'BusinessEditVideo',
        component: () => import(/* webpackChunkName: "BusinessEditVideo" */ '@/ui/apps/business/editVideo/editVideo'),
      },
      {
        path: 'dashboard',
        name: 'BusinessDashboard',
        component: () => import(/* webpackChunkName: "BusinessDashboard" */ '@/ui/apps/business/dashboard/dashboard'),
      },
      {
        path: 'profile',
        name: 'BusinessManageProfile',
        component: () =>
          import(/* webpackChunkName: "BusinessManageProfile" */ '@/ui/apps/business/manageProfile/manageProfile'),
      },
      {
        path: 'images',
        name: 'BusinessManageImages',
        component: () =>
          import(/* webpackChunkName: "BusinessManageImages" */ '@/ui/apps/business/manageImages/manageImages'),
      },
      {
        path: 'stories',
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
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '@/ui/apps/main/pageNotFound/pageNotFound'),
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes,
});

const protectPrivateRoutes: NavigationGuard<Vue> = async (to, from, next) => {
  const requiresPermission = privateRoutes.some((route) => route === to.name);
  if (!requiresPermission) {
    next();
    return;
  }

  const hasPermission = await store.dispatch('hasPermission', to);

  if (hasPermission) {
    next();
  } else if (from.name !== 'BusinessLogin') {
    next({
      name: 'BusinessLogin',
    });
  } else {
    next(false);
  }
};

router.beforeEach(protectPrivateRoutes);
