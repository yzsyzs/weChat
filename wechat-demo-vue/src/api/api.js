import axios from './axios'

const baseUrl = ''

export default {
  /**
   * 初始化 微信授权 获取用户信息
   * @param url 授权后返回的地址
   * @returns {AxiosPromise<any>}
   */
  wechatAuthorize: (url) => {
    return axios.get(baseUrl + '/api/init/authorize?url=' + url)
  },
  /**
   * 获取 权限验证配置
   * @param url 需要获取权限验证配置的url（当前网页的URL，不包含#及其后面部分）
   * @returns {AxiosPromise<any>}
   */
  wechatJsapiSignature: (url) => {
    return axios.get(baseUrl + '/api/init/wxJsapiSignature', {
      params: {
        url: url
      }
    })
  },
}
