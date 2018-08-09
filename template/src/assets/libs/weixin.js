if (!window.wx) {
  console.error('[weixin.js] - 未加载微信JSSDK')
}

export default class Weixin {
  static config (config) {
    wx.config({
      debug: config.debug,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
    })
  }

  static ready () {
    return new Promise((resolve, reject) => {
      wx.ready(resolve)
    })
  }

  static error () {
    return new Promise((resolve, reject) => {
      wx.error(resolve)
    })
  }

  /**
   * 获取位置
   *
   * @static
   * @returns
   *
   * @memberOf Weixin
   */
  static getLocation () {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        success (res) {
          resolve(res)
        },
        cancel () {
          resolve()
        }
      })
    })
  }

  /**
   * 调起微信地图
   *
   * @static
   * @param {any} {lat, lng, name, address, scale = 14, infoUrl = 'http://weixin.qq.com'}
   * @returns
   *
   * @memberOf Weixin
   */
  static openLocation ({lat, lng, name, address, scale = 14, infoUrl = 'http://weixin.qq.com'}) {
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      name: name,
      address: address,
      scale: scale,
      infoUrl: infoUrl
    })
  }

  /**
   * 分享给朋友
   *
   * @static
   * @param {any} {title, desc, link, imgUrl}
   * @returns
   *
   * @memberOf Weixin
   */
  static shareAppMessage ({title, desc, link = window.location.href, imgUrl}) {
    return new Promise((resolve, reject) => {
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * 分享到朋友圈
   *
   * @static
   * @param {any} {title, link, imgUrl}
   * @returns
   *
   * @memberOf Weixin
   */
  static shareTimeline ({title, link = window.location.href, imgUrl}) {
    return new Promise((resolve, reject) => {
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl,
        success: resolve,
        fail: reject
      })
    })
  }

  static getNetworkType () {
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success: resolve,
        fail: reject
      })
    })
  }

  static share (obj) {
    obj.link = window.location.origin + window.location.pathname
    this.shareTimeline(obj)
    this.shareAppMessage(obj)
  }
}
