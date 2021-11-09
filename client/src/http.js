/* @请求拦截 和 @响应拦截 */
import axios from "axios";
// 引入Element UI 加载动画,警告消息
import { Message, Loading } from "element-ui";
import router from "./router";
// 在需要调用时：
let loading;
// 开始一个加载动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "正在加载中...",
    background: "rgba(0,0,0,0.6)",
  });
}
// 结束一个加载动画
function endLoading() {
  loading.close();
}

/* 配置请求拦截和响应拦截
        在登录成功之后将 token 设置为请求头，
        在响应拦截时候判断当前 token 是否过期的--->如果过期的话就把它删除 反之所有接口就可以正常使用
*/
// 请求拦截
axios.interceptors.request.use(
  (config) => {
    // 调用加载动画
    startLoading();

    // 在登录成功之后的判断 token 是否存在
    if (localStorage.eleToken) {
      // 将 token 设置为请求头
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    // 结束加载动画;
    endLoading();
    return res;
  },
  (rej) => {
    endLoading();
    // 错误提醒
    Message.error(rej.response.data);
    // 获取错误状态码 401,401 代表当前 token 已经失效了
    const { status } = rej.response;
    if (status == 401) {
      Message.error("token 失效!,请重新登录");
      //   清除 token
      localStorage.removeItem("eleToken");
      //   重新跳转到登录页面
      router.push("/login");
    }
    return Promise.reject(rej);
  }
);
export default axios;
