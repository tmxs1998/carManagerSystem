import axios from 'axios'
import store from '../store/store'
import actionCreator from '../store/actionCreator'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    let token  = localStorage.getItem('token') || 'no token'
    config.headers.authorization = 'Bearer' + token
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    let { code } = response.data
    if(code === 402) {
      // token 失效
      let action = actionCreator.changeTokenModal(true)
      store.dispatch(action)
    }
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default axios