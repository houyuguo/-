//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    myFollowings: null,
    mnickName:null,
    mavatarUrl:null,
    mcode:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
    console.log('more onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
    
  },
  //'我的关注'监听事件
  following: function() {
    var myparms = this.data.myFollowings
    wx.navigateTo({
      url: './following/following?userId=1',
    })
  },
  //'我的回答'监听事件
  answered: function() {
    wx.navigateTo({
      url: './answered/answered?userId=1',
    })
  },
  //'我的提问'监听事件
  question: function() {
    wx.navigateTo({
      url: './questions/questions?userId=1',
    })
  },
  //登陆功能
  onGotUserInfo: function(e) {
    var that = this
    that.setData({ mnickName:e.detail.userInfo.nickName,
      mavatarUrl: e.detail.userInfo.avatarUrl})
    console.log(that.data.mnickName,that.data.mavatarUrl)

    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'http://dont-be-evil.cn/auth',
            data: {
              auth_code: res.code,
              avatar: that.data.mavatarUrl,
              nickname: that.data.mnickName
            },
            success: function (e) {
              console.log(e.statusCode)
              console.log(e.data)
              var app = getApp()
              app.globalData.userInfo = e.data.userInfo
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})