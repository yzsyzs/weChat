/*
 * Created by sam on 2017/6/6.
 */
/**
 * http配置
 */

import axios from 'axios'
// import router from '../router/index'

// axios 配置
axios.defaults.timeout = 10000

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    return response
  },
  error => {
    console.error(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          // router.replace({
          //   path: '/login',
          //   query: {redirect: router.currentRoute.fullPath}
          // })
          // error.response.data.message = '访问超时,请重新登录!'
          return Promise.reject(error.response ? error.response : error)
        // break
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios
