import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);
Vue.use(ElementUI);

Vue.prototype.openLoading = function () {
  const loading = this.$loading({
    lock: true,
    target: '.tabText',
    background: 'rgba(0, 0, 0, 0.3)',                 // 是否锁屏
    body: true,
  })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  }.bind(this), 5000)
  return loading;
}
// npm install vue-cookies -S 
import cookies from 'vue-cookies'
Vue.prototype.$cookies = cookies;

Vue.config.productionTip = false

import host from '@/js/host'
Vue.prototype.$host = host

import axios from 'axios'
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
