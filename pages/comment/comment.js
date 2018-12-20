//index.js

var util = require('../../utils/util.js')
var app = getApp()
var message = ''
Page({
  data: {
    data: [],
    data_length: 0
  },
///////////////////
  onLoad: function (option) {
    var that = this
    //调用应用实例的方法获取全局数据
    that.setData({
      answerId: option.answerId,
      userId: option.userId
    })
    wx.request({
      url: 'http://dont-be-evil.cn/page/comment_list',
      data: {answer_id: option.answerId},
      success: function(e){
        console.log(e.data.data)
        that.setData({
          data:e.data.data,
          data_length:e.data.data.length
        })
      }
    })
  },
  bindChange: function(e){
    message = e.detail.value
  },
  addComment: function(event){
    var that = this
    var comment = {
      user_id: event.currentTarget.dataset.userId,
      answer_id: event.currentTarget.dataset.answerId,
      content: message
    }
    console.log(comment)
    wx.request({
      url: 'http://dont-be-evil.cn/comment/',
      method: 'POST',
      data: comment,
      success: function(res){
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
    //刷新页面
    that.onLoad({answerId: event.currentTarget.dataset.answerId, userId: event.currentTarget.dataset.userId})
  }

})
