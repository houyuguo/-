//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this
   
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if (res.code) {
    //       wx.request({
    //         url: 'http://dont-be-evil.cn:6001/auth',
    //         data: {
    //           auth_code: res.code
    //         },
    //         success: function(e) {
    //           console.log(e.statusCode)
    //           console.log(e.data)
    //         }
    //       })
    //       console.log('code:' + res.code)
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  
  },
    
  getUserInfo: function (cb) {
    typeof cb == "function" && cb(this.globalData.userInfo)
  },
  globalData: {
    userInfo: null
  }
})