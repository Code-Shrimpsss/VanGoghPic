import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import AlbumView from '../views/Album/Album.vue'
import error from '../views/Order/404.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainView,
    children: [
      {
        // 主页
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        // 图片页
        path: '/pic',
        name: 'pic',
        component: () => import(/* webpackChunkName: "pic" */ '../views/Pic/PicView.vue')
      },
      {
        // 画册页
        path: '/album',
        name: 'album',
        component: () => import(/* webpackChunkName: "phone" */ '../views/Album/AlbumView.vue')
      }
    ]
  },
  {
    // 个人主页
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: "phone" */ '../views/User/MyView.vue')
  },  {
    // 用户主页
    path: '/avatar/:id',
    name: 'avatar',
    props: true,
    component: () => import(/* webpackChunkName: "avatar" */ '../views/User/AvatarView.vue')
  },
  {
    // 收藏页
    path: '/favorites',
    name: 'favorites',
    component: () => import(/* webpackChunkName: "favorites" */ '../views/Album/FavoritesView.vue'),
  },
  {
    // 画册详情页
    path: '/album/:id',
    component: AlbumView,
    name: 'albumPage',
    props: true
  }, 
  {
    // 创建画册页
    path: '/createimg',
    name: 'createimg',
    component: () => import(/* webpackChunkName: "createImg" */ '../views/Pic/CreateImgView'),
  },
  {
    // 上传图片页
    path: '/updataimg',
    name: 'updataimg',
    component: () => import(/* webpackChunkName: "updataimg" */ '../views/Pic/UpdataImgView'),
  },
  {
    // 上传图片页
    path: '/great',
    name: 'great',
    component: () => import(/* webpackChunkName: "great" */ '../views/Order/GreatView'),
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
