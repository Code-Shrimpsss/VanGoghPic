import axios from 'axios'
import store from '../store'
import router from '@/router'
import Vue from 'vue'
const instance = axios.create({
  baseURL: 'http://192.168.177.129:8000/',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // }
})

// 添加请求拦截器
// 请求拦截器的作用是在请求发送前进行一些操作，例如在每个请求体里加上token，每次请求携带token传给后端，统一做处理。
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么               
  // if(store.state.token) {
  //   config.headers['token'] = getToken()
  // }
  let token = $cookies.get('token')
  let user = $cookies.get('user')
  if (token && user) {
    config.headers.Authorization = 'Bearer ' + token
  }
  console.log("请求成功 (●'◡'●)");
  return config
}, function (error) {
  console.log("request Error");
  return Promise.reject(error)
})

// 添加响应拦截器
// 响应拦截器的作用是在接收到响应后进行一些操作，例如在服务器返回登录状态token失效，需要重新登录的时候，跳转到登录页，对不同状态码做不同处理
instance.interceptors.response.use(
  response => {
    console.log("响应成功 φ(*￣0￣)")
    return response
  },
  error => {
    // 判断是否过期
    Vue.prototype.$message.error("响应失败 (╯°Д°)╯︵ ┻━┻");
    if (error.response && error.response.status === 404) {
      console.log('token 过期啦')
      // 1 清空 vuex 和 localStorage 中的数据
      store.commit('cleanTokenInfo')
      // 2 强制跳转到登录页
      // router.push('/')
      return Promise.reject(error)
    }
  })

export default instance
