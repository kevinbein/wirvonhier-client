import Vue from 'vue';
import VueRouter from 'vue-router';
import { ProfilePage, GridPage, ExplorePage, MapPage, LandingPage, LoginPage, RegisterPage, EditProfilePage } from './pages';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/profile/:businessId',
    name: 'Profile',
    component: ProfilePage,
    children: [
      {
        path: 'edit',
        name: 'EditProfile',
        component: EditProfilePage,
      }
    ]
  },
  {
    path: '/map',
    name: 'Map',
    component: MapPage,
  },
  {
    path: '/grid',
    name: 'Grid',
    component: GridPage,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: ExplorePage,
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: BASE_URL,
  routes,
});
