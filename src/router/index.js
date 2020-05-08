import Vue from 'vue'
import VueRouter from 'vue-router'
import SpecialPage from '../pages/SpecialPage.vue'
import RegularPage from '../pages/RegularPage.vue'
import RegularPageIndex from '../pages/RegularPageIndex.vue'
import LoginComp from '@/pages/Login.vue'

import auth from '@/firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/spec/:index',
    name: 'SpecialPage',
    component: SpecialPage
  },
  {
    path: '/reg/:index/:id',
    name: 'RegularPage',
    component: RegularPage
  },
  {
    path: '/reg/:index',
    name: 'RegularPageIndex',
    component: RegularPageIndex
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComp
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {

  const goingToLogin = to.path == '/login'

  var user = auth.currentUser;
    if(!user)
      user = await auth.getCurrentUser();

  if(!goingToLogin) {

    if(!(user)) {
      next('/login');
    } else {
      next();
    }

  } else {

    if(user) next('/');
    else next();
  }

})

export default router
