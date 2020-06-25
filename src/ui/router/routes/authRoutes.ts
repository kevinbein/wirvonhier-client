export const authRoutes = [
  {
    path: '/login',
    name: 'BusinessLogin',
    component: () => import(/* webpackChunkName: "BusinessLogin" */ '@/ui/views/auth/login'),
  },
  {
    path: '/register',
    name: 'BusinessRegister',
    component: () => import(/* webpackChunkName: "BusinessRegister" */ '@/ui/views/auth/register'),
  },
  {
    path: '/logout',
    name: 'BusinessLogout',
    component: () => import(/* webpackChunkName: "BusinessLogout" */ '@/ui/views/auth/logout'),
  },
  {
    path: '/register-complete',
    name: 'BusinessRegisterComplete',
    component: () => import(/* webpackChunkName: "BusinessRegisterComplete" */ '@/ui/views/auth/registerSuccess'),
  },
  {
    path: '/request-new-password',
    name: 'BusinessRequestNewPassword',
    component: () => import(/* webpackChunkName: "BusinessRequestNewPassword" */ '@/ui/views/auth/requestNewPassword'),
  },
  {
    path: '/request-new-password-success',
    name: 'BusinessRequestNewPasswordSuccess',
    component: () =>
      import(/* webpackChunkName: "BusinessRequestNewPasswordSuccess" */ '@/ui/views/auth/requestNewPasswordSuccess'),
  },
  {
    path: '/reset-password',
    name: 'BusinessResetPassword',
    component: () => import(/* webpackChunkName: "BusinessResetPassword" */ '@/ui/views/auth/resetPassword'),
  },
  {
    path: '/reset-password-success',
    name: 'BusinessResetPasswordSuccess',
    component: () =>
      import(/* webpackChunkName: "BusinessResetPasswordSuccess" */ '@/ui/views/auth/resetPasswordSuccess'),
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: () => import(/* webpackChunkName: "VerifyEmail" */ '@/ui/views/auth/verifyEmail'),
  },
];
