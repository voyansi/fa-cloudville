import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import { forgeAPIWrapper } from 'functions/forge/forgeAPIWrapper'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/callback',
    name: 'AuthCallback',
    component: Home
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // if(to.matched.some(r => r.meta.requiresForgeAuth)){
  //   // if(!store.state.permission){
  //   //   const url = store.dispatch('getForgeAuthenticationLink')
  //   // }
    
  // } else {
  //   next()
  // }
})

export default router
