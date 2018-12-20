//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '校园问答社区',
    userInfo: {},
    name:null
  },
  //事件处理函数
  toQuestion: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function (option) {
    var that = this
    that.setData({
      followDisplay: 'none',
      avatar: '../../images/icon1.jpeg'
    })
    if(!option.userId){
      option.userId = 1
    }
    wx.request({
      url: 'http://dont-be-evil.cn/answer/' + option.answerId,
      success: function(e){
        console.log(e)
        that.setData({
          /**
           * 返回的数据json格式
           * answer
              anonymous	true
              content	"答案1"
              id	1
              question_id	1
              user_id	1
            code	0
            msg	"get success"
            status	200
           */
          answerId:option.answerId,
          user:option.userId,
          anonymous:e.data.answer.anonymous,
          content:e.data.answer.content,
          questionId:e.data.answer.question_id,
          userId:e.data.answer.user_id
        })
        if(e.data.answer.anonymous){
          that.setData({
            name:'匿名用户',
            selfIntro:'',
          })
        }
        else{
          console.log(e.data.answer.user_id)
          wx.request({
            url: 'http://dont-be-evil.cn/user/' + e.data.answer.user_id,
            success: function (res) {
              that.setData({
                name: res.data.user.nickname,
                selfIntro: res.data.user.self_intro
              })
              if (res.data.user.avatar) {
                that.setData({
                  avatar: res.data.user.avatar
                })
              }
            }
          })
        }
        wx.request({
          url: 'http://dont-be-evil.cn/question/' + e.data.answer.question_id,
          success: function(res){
            that.setData({
              questionTitle:res.data.question.title,
            })
          }
        })
        wx.request({
          url: 'http://dont-be-evil.cn/answer/' + option.answerId + '/comments',
          success: function(res){
            that.setData({
              commentNum:res.data.data.length
            })
          }
        })
        if(!e.data.answer.anonymous && option.userId != e.data.answer.user_id){
          wx.request({
            url: 'http://dont-be-evil.cn/user/' + option.userId + '/followings',
            success: function (res) {
              for (var i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i]['id'] == e.data.answer.user_id) {
                  that.setData({
                    followDisplay: 'block',
                    followedStatus: 1,
                    followedText: '已关注'
                  })
                  return
                }
              }
              that.setData({
                followDisplay: 'block',
                followedStatus: 0,
                followedText: '十 关注'
              })
            }
          })
        }
      }
    })
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
      })
    })
  },
  tapName: function(event){
    console.log(event)
  },
  followIt: function (event) {
    var that = this
    console.log(event.currentTarget);
    if(event.currentTarget.dataset.actionType == 2){
      wx.showToast({
        title: '无法关注匿名者',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    if(event.currentTarget.dataset.actionType == 0){
      wx.request({
        url: 'http://dont-be-evil.cn/user/' + event.currentTarget.dataset.userId + '/follow/' + event.currentTarget.dataset.followUserId,
        method:'PUT',
        success: function(res){
          that.setData({
            followedStatus: 1,
            followedText: '已关注'
          })
        }
      })
      wx.showToast({
        title: '已关注',
        icon: 'success',
        duration: 1000
      })
      return
    }
    if (event.currentTarget.dataset.actionType == 1){
      wx.request({
        url: 'http://dont-be-evil.cn/user/' + event.currentTarget.dataset.userId + '/unfollow/' + event.currentTarget.dataset.followUserId,
        method: 'PUT',
        success: function (res) {
          that.setData({
            followedStatus: 0,
            followedText: '十 关注'
          })
        }
      })
      wx.showToast({
        title: '已取消关注',
        icon: 'success',
        duration: 1000
      })
    }
  },
  toComment: function(event){
    wx.navigateTo({
      url: '../comment/comment?userId=' + event.currentTarget.dataset.userId + '&answerId=' + event.currentTarget.dataset.answerId,
    })
  }
})
