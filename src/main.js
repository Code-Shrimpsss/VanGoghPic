import Vue from 'vue'
import App from './App.vue' 
import router from './router' 
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// npm install vue-cookies -S 
import cookies from 'vue-cookies'
Vue.prototype.$cookies = cookies;

Vue.config.productionTip = false

import host from '@/js/host'
Vue.prototype.$host = host

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
