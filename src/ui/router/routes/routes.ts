import { authRoutes, consumerRoutes, businessRoutes } from '.';
import { RouteConfig } from 'vue-router';

export const routes: RouteConfig[] = [
  ...authRoutes,
  ...consumerRoutes,
  businessRoutes,
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '@/ui/views/pageNotFound'),
  },
];
