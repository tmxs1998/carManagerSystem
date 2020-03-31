import axios from 'axios'

axios.interceptors.request.use(function (config) {
  //获取token 存入请求头
  let token =localStorage.getItem('token')||'no token'
  config.headers.authorization = 'Bearer '+ token 

  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});
export default axios;