import api from '../api/api'
import wx from 'weixin-js-sdk'

/**
 *  微信相关功能
 */
export default {
  /**
   * 初始化微信授权，获取用户信息
   *       如果需要授权获取用户信息，则需要调用该方法
   * @param successCallback 成功回调
   * @param errorCallback   失败回调
   */
  authorize: (successCallback, errorCallback) => {
    let url = window.location.href
    api.wechatAuthorize(url).then(res => {
      if (res.data.code == 200) {
        // 微信用户信息
        // console.log(res.data.wxMpUser)
        successCallback(res.data.wxMpUser)
      } else if (res.data.code == 500) {
        // 没有获取微信授权
        window.location.href = res.data.redirect
      } else {
        errorCallback(res.data.msg)
      }
    }).catch(err => {
      errorCallback(err)
    })
  },
  /**
   * 初始化微信配置config
   * @param successCallback 成功回调
   * @param errorCallback   失败回调
   */
  initConfig: (successCallback, errorCallback) => {
    let url = window.location.href
    api.wechatJsapiSignature(url).then(res => {
      var wxJ = res.data.wxJsapiSignature
      //初始化配置
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxJ.appId, // 必填，公众号的唯一标识
        timestamp: wxJ.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxJ.nonceStr, // 必填，生成签名的随机串
        signature: wxJ.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getLocation',
          'openLocation',
          'openAddress',
          'scanQRCode'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      // wx js-api准备好
      wx.ready(function () {
        successCallback()
      })
      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res)
        errorCallback(res)
      })
    }).catch(err => {
      console.log(err)
      errorCallback(err)
    })
  },
  /**
   * 配置微信分享（注：需要在初始化微信配置config成功后才能执行）
   * @param options 配置参数
   *        {shareTitle:'分享的标题',shareDesc:'分享的详情',shareLink:'分享的链接',shareImgUrl:'分享的图片'}
   */
  configWechatShare: (options, shareCallback, cancelCallback) => {
    // 分享到好友的标题
    let shareTitle = options.shareTitle || '分享到好友的标题xxx'
    // 分享内容
    let shareDesc = options.shareDesc || '分享内容xxx'
    // 分享的链接
    let shareLink = options.shareLink || window.location.href
    // 分享的图标
    let shareImgUrl = options.shareImgUrl || 'shareImg.jpg'

    // 微信对象
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: shareTitle, // 分享标题
      link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareImgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        shareCallback('分享到朋友圈')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        cancelCallback('取消分享到朋友圈')
      }
    })

    //分享给朋友
    wx.onMenuShareAppMessage({
      title: shareTitle, // 分享标题
      desc: shareDesc, // 分享描述
      link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareImgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享给朋友')
        shareCallback('分享到微信朋友')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        cancelCallback('取消分享到微信朋友')
      }
    })

    //分享给QQ
    wx.onMenuShareQQ({
      title: shareTitle, // 分享标题
      desc: shareDesc, // 分享描述
      link: shareLink, // 分享链接
      imgUrl: shareImgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        shareCallback('分享到QQ')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        cancelCallback('取消分享到QQ')
      }
    })

    //分享到腾讯微博
    wx.onMenuShareWeibo({
      title: shareTitle, // 分享标题
      desc: shareDesc, // 分享描述
      link: shareLink, // 分享链接
      imgUrl: shareImgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        shareCallback('分享到腾讯微博')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        cancelCallback('取消分享到腾讯微博')
      }
    })

    //分享到QQ空间
    wx.onMenuShareQZone({
      title: shareTitle, // 分享标题
      desc: shareDesc, // 分享描述
      link: shareLink, // 分享链接
      imgUrl: shareImgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        shareCallback('分享到QQ空间')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        cancelCallback('取消分享到QQ空间')
      }
    })
  },
  /**
   * 拍照或从手机相册中选图
   * @param count 一次允许选择多少张 默认9
   */
  chooseImage: (count, callback) => {
    wx.chooseImage({
      count: count, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片，但在部分场景下可能无效，此时可以使用getLocalImgData接口来直接获取数据。
        callback(localIds)
      }
    })
  },
  /**
   * 通过localId获取本地图片
   * @param localId 图片的localID，由chooseImage接口获取
   */
  getLocalImgData: (localIds, callback) => {
    function getImgData (localIds, imgData, callback) {
      wx.getLocalImgData({
        localId: localIds[0], // 图片的localID
        success: function (res) {
          let localData = res.localData // localData是图片的base64数据，可以用img标签显示
          imgData.push(localData)
          localIds.splice(0, 1)
          if (localIds.length === 0) {
            callback(imgData)
          } else {
            getImgData(localIds, imgData, callback)
          }
        }
      })
    }

    let imgData = []
    getImgData(localIds, imgData, callback)
  },
  /**
   * 预览图片（微信内置预览图片功能）
   * @param options
   * {
      current: '', // 当前显示图片的http链接
      urls: [] // 需要预览的图片http链接列表
    }
   */
  previewImage: function (options) {
    wx.previewImage(options)
  },
  /**
   * 获取网络状态
   * 返回网络类型2g，3g，4g，wifi
   */
  getNetworkType: (callback) => {
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        callback(networkType)
      }
    })
  },
  /**
   * 获取地理位置
   * getLocation返回的坐标在openLocation有偏差，因为getLocation返回的是gps坐标，openLocation打开的腾讯地图为火星坐标，需要第三方自己做转换，6.2版本开始已经支持直接获取火星坐标
   * @param type      默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
   * @param callback  回调
   */
  getLocation: (type, callback) => {
    wx.getLocation({
      type: type, // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        // var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
        // var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
        // var speed = res.speed // 速度，以米/每秒计
        // var accuracy = res.accuracy // 位置精度
        callback(res)
      }
    })
  },
  /**
   * 使用微信内置地图查看位置
   * @param options
   * {
      latitude: 0, // 纬度，浮点数，范围为90 ~ -90
      longitude: 0, // 经度，浮点数，范围为180 ~ -180。
      name: '', // 位置名
      address: '', // 地址详情说明
      scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    }
   */
  openLocation: (options) => {
    wx.openLocation(options)
  },
  /**
   * 共享收货地址
   */
  openAddress: (callback) => {
    wx.openAddress({
      success: function (res) {
        // var userName = res.userName // 收货人姓名
        // var postalCode = res.postalCode // 邮编
        // var provinceName = res.provinceName // 国标收货地址第一级地址（省）
        // var cityName = res.cityName // 国标收货地址第二级地址（市）
        // var countryName = res.countryName // 国标收货地址第三级地址（国家）
        // var detailInfo = res.detailInfo // 详细收货地址信息
        // var nationalCode = res.nationalCode // 收货地址国家码
        // var telNumber = res.telNumber // 收货人手机号码
        callback(res)
      }
    })
  }
}
