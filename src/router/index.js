import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import AlbumView from '../views/Album.vue'
import error from '../views/404.vue'
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
        path: '/album',
        name: 'album',
        component: () => import(/* webpackChunkName: "phone" */ '../views/AlbumView.vue')
      }
    ]
  },
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: "phone" */ '../views/MyView.vue')
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue'),
  },
  {
    // 搜索结果页
    path: '/album/:id',
    component: AlbumView,
    name: 'album',
    props: true
  },
  {
    // 创建画册页
    path: '/createimg',
    name: 'createimg',
    component: () => import(/* webpackChunkName: "createImg" */ '../views/CreateImgView'),
  },
  {
    // 404页面
    path: '*',
    component: error,
    meta: { title: '页面走丢了（⊙ｏ⊙）' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
