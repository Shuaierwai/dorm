import axios from "axios";
// import { MessageBox, Message } from "element-ui";

// axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: "http://172.16.110.91:8080/",
  // baseURL: "http://172.16.110.91:8080",
  baseURL: "/api",

  // 超时
  timeout: 2000,
});
//请求拦截
service.interceptors.request.use(function (config) {

  console.log('请求拦截的config',config)
  if(sessionStorage.getItem('token')){
      //取出来有就应该携带再请求头里面
      config.headers.token = sessionStorage.getItem('token')
  }
  return config;
}, function (error) {

  return Promise.reject(error);
});

// 响应拦截
service.interceptors.response.use(function (response) {

  console.log('响应拦截的response',response)
  if(response.data.token){
      sessionStorage.setItem('token',response.data.token)
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default service;
