import { NavigationGuard } from 'vue-router';
import { store } from '@/store';

const privateRoutes = [
  'BusinessManageProfile',
  'BusinessInformation',
  'BusinessStories',
  'BusinessStory',
  'BusinessDashboard',
  'BusinessEditVideo',
  'BusinessUploadVideo',
];

const protectPrivateRoutes: NavigationGuard<Vue> = async (to, from, next) => {
  // If route is not private, allow navigation
  if (to.name && !privateRoutes.includes(to.name)) return next();
  const hasPermission = await store.dispatch('Auth/hasPermission', to);
  if (hasPermission) return next();
  if (from.name === 'BusinessLogin') return next(false);
  next({
    name: 'BusinessLogin',
  });
};

export const navigationGuards = [protectPrivateRoutes];
