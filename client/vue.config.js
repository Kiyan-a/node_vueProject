/* @解决同源策列  #跨域请求 */
module.exports = {
  devServer: {
    host: "localhost",
    port: "8080", // 端口号
    https: false, // https: {type:Bollean}
    open: true, // 配置自动启动浏览器
    // 配置代理
    proxy: {
      "/ai": {
        target: "https://api.qingyunke.com/", //送请求的数据,并同时接收请求的数据,这样服务端和服务端进行数据交互就不会有问题
        pathRewrite: {
          "^/ai": "", // 利用这个地面的值拼接上target里面的地址
        },
      },
      // "/new": {
      //   target: "https://3g.163.com/touch/reconstruct/article/list/", //送请求的数据,并同时接收请求的数据,这样服务端和服务端进行数据交互就不会有问题
      //   pathRewrite: {
      //     "^/new": "", // 利用这个地面的值拼接上target里面的地址
      //   },
      // },
      "/api": {
        target: "http://localhost:3000/api/", // 想要访问接口域名
        changeOrigin: true, // 开启跨域,在本地创建一个虚拟服务,然后发送请求的数据,并同时接收请求的数据,这样服务端和服务端进行数据交互就不会有问题
        pathRewrite: {
          "^/api": "", // 利用这个地面的值拼接上target里面的地址
        },
      },
    },
  },
};
