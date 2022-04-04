import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainView,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '/phone',
        name: 'phone',
        component: () => import(/* webpackChunkName: "phone" */ '../views/PhoneView.vue')
      }
    ]
  },
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: "phone" */ '../views/MyView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
