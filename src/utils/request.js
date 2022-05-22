import axios from "axios";
import { Message } from "element-ui";
import { Loading } from "element-ui";

const instance = axios.create({
  baseURL: 'http://192.168.177.129:8000/',
  timeout: 1000,    //超时配置
  withCredentials: true,  //跨域携带cookie
})
let loadingInstance = null;
let requestNum = 0;

const addLoading = () => {
  // 增加loading 如果pending请求数量等于1，弹出loading, 防止重复弹出
  requestNum++;
  if (requestNum == 1) {
    loadingInstance = Loading.service({
      text: "正在努力加载中....",
      background: "rgba(0,0,0, 0.5)",
    });
  }
};

const cancelLoading = () => {
  // 取消loading 如果pending请求数量等于0，关闭loading
  requestNum--;
  if (requestNum === 0) loadingInstance?.close();
};
// 添加请求拦截器
// 请求拦截器的作用是在请求发送前进行一些操作，例如在每个请求体里加上token，每次请求携带token传给后端，统一做处理。
instance.interceptors.request.use(function (config) {
  const { loading = true } = config;
  config.headers.Authorization = 'Bearer ' + $cookies.get('token');
  if (loading) addLoading();
  return config; 
}, function (error) {
  console.log("error" ,error);
  return Promise.reject(error)
})

// 添加响应拦截器
// 响应拦截器的作用是在接收到响应后进行一些操作，例如在服务器返回登录状态token失效，需要重新登录的时候，跳转到登录页，对不同状态码做不同处理
instance.interceptors.response.use(
  response => {
    const { loading = true } = response.config;
    if (loading) cancelLoading();
    const { code, errmsg } = response.data;
    // console.log(code);
    if (code === 200) return response.data;
    else if (code === 401) {
      Vue.prototype.$router.push('/')
    } else {
      Message.error(errmsg);
      return Promise.reject(response.data);
    }
  },
  error => {
    // 判断是否过期
    console.log("error-response:", error.response);
    console.log("error-config:", error.config);
    console.log("error-request:", error.request);
    const { loading = true } = error.config;
    if (loading) cancelLoading();
    if (error.response) {
      if (error.response.status === 401) {
        Vue.prototype.$router.push('/')
      }
    }
    Message.error(error?.response?.data?.errmsg || "服务端异常");
  })

export default instance
