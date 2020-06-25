export const businessRoutes = {
  path: '/business',
  component: () => import(/* webpackChunkName: "BusinessContainer" */ '@/ui/views/business'),
  redirect: '/business/dashboard',
  children: [
    {
      path: 'upload-video',
      name: 'BusinessUploadVideo',
      component: () => import(/* webpackChunkName: "BusinessUploadVideo" */ '@/ui/views/business/uploadVideo'),
    },
    {
      path: 'dashboard',
      name: 'BusinessDashboard',
      component: () => import(/* webpackChunkName: "BusinessDashboard" */ '@/ui/views/business/dashboard'),
    },
    {
      path: 'profile',
      name: 'BusinessManageProfile',
      component: () => import(/* webpackChunkName: "BusinessManageProfile" */ '@/ui/views/business/manageProfile'),
    },
    {
      path: 'images',
      name: 'BusinessManageImages',
      component: () => import(/* webpackChunkName: "BusinessManageImages" */ '@/ui/views/business/manageImages'),
    },
    {
      path: 'videos',
      name: 'BusinessVideos',
      component: () => import(/* webpackChunkName: "BusinessStories" */ '@/ui/views/business/videos'),
    },
  ],
};
