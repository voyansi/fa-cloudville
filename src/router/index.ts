import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// we actually don't need the router for this example.
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
