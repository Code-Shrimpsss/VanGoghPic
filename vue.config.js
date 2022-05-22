const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host:'www.vgpic.com',
    open: true, // 开启服务器后是否自动打开浏览器
    port: 8082, // 服务器所占端口
    hot: true,
    historyApiFallback: true,//找不到页面默认跳index.html
    // proxy: {
    //   ws: false
    // }
  }
})
