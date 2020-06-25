export const consumerRoutes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import(/* webpackChunkName: "LandingPage" */ '@/ui/views/consumer/landing'),
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/datenschutz',
    name: 'Privacy',
    component: () => import(/* webpackChunkName: "PrivacyPolicyPage" */ '@/ui/views/consumer/legal/privacyPolicy'),
  },
  {
    path: '/nutzungsbedingungen',
    name: 'Nutzungsbedingungen',
    component: () => import(/* webpackChunkName: "TermsOfUsePage" */ '@/ui/views/consumer/legal/termsOfUse'),
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: () => import(/* webpackChunkName: "CompanyDetailsPage" */ '@/ui/views/consumer/legal/companyDetails'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "MapPage" */ '@/ui/views/consumer/map'),
  },
  {
    path: '/explore/:businessId?',
    name: 'Explore',
    component: () => import(/* webpackChunkName: "ExplorePage" */ '@/ui/views/consumer/explore'),
  },
];
