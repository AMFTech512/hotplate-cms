import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
import auth from '@/firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/spec/:index',
    name: 'SpecialPage',
    component: () => import(/* webpackChunkName: "SpecialPage" */ '@/pages/SpecialPage.vue')
  },
  {
    path: '/reg/:index/:id',
    name: 'RegularPage',
    component: () => import(/* webpackChunkName: "RegularPage" */ '@/pages/RegularPage.vue')
  },
  {
    path: '/reg/:index',
    name: 'RegularPageIndex',
    component: () => import(/* webpackChunkName: "RegularPageIndex" */ '@/pages/RegularPageIndex.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/pages/dashboard.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "Users" */ '@/pages/users.vue')
  },
  {
    path: '/taxonomies',
    name: 'Taxonomies',
    component: () => import(/* webpackChunkName: "Taxonomies" */ '@/pages/Taxonomies.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/pages/Login.vue')
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import(/* webpackChunkName: "Unauthorized" */ '@/pages/Unauthorized.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {

  store.commit('setCanSave', false);
  store.commit('setPageTitle', '');

  const goingToLogin = to.path == '/login';
  const goingToUnauthorized = to.path == '/unauthorized';

  var user = auth.currentUser;
  if(!user)
    user = await auth.getCurrentUser();

  store.commit('setUser', user);

  var isWebmaster = false;
  if(user)
    isWebmaster = (await user.getIdTokenResult()).claims.admin;
  store.commit('setAuthorized', isWebmaster || false);

  if(goingToUnauthorized) {
    next();
  } else if(goingToLogin) {

    if(user) next('/');
    else next();

  } else {

    if(!user) {
      next('/login');
    } else if (!isWebmaster) {
      next('/unauthorized');
    } else {
      next();
    }
  }

})

export default router
