//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '校园问答社区',
    userInfo: {},
    qid:0,
    question:null,
    qanswers:[],
   
  },
  //事件处理函数
  bindItemTap: function (e) {
    var that = this
    wx.navigateTo({
      url: '../answer/answer?answerId=' + e.currentTarget.dataset.aid
    })
  },
  onLoad: function (options) {
    var that = this
    this.setData({ qid: options.qid })
    // 通过从其他页面传过来的qid（问题的id）
    //首先获取问题的内容，包括title（标题）和content（内容）
    wx.request({
      url: 'http://dont-be-evil.cn/question/'+this.data.qid,
      success: function (res) {
        that.setData({ question: res.data.question })
      }
    })

    wx.request({
      url: 'http://dont-be-evil.cn/page/answer_list',
      data:{
        question_id:that.data.qid
      },
      success: function(res){
        that.setData({qanswers: res.data.data})
        console.log(that.data.qanswers)
      }
    })
    //这里再获取问题的所有回答
    // wx.request({
    //   url: 'http://dont-be-evil.cn/question/' + this.data.qid + '/answers',
    //   success: function (res) {
    //     that.setData({ qanswers: res.data.data })
    //     console.log(that.data.qanswers)
        //根据user_id请求用户信息
        // var userList = []
        // for (var i = 0; i < that.data.qanswers.length; i++) {
        //   wx.request({
        //     url: 'http://dont-be-evil.cn/user/' + that.data.qanswers[i].user_id,
        //     success: function (res) {
        //       userList.push(res.data.user)
        //       // console.log(res.data.user)
        //     }
        //   })
        // }
        // console.log(userList)
        // that.setData({ users: userList })
        // console.log(that.data.users)
    //   }
    // })
  },
  tapName: function (event) {
    console.log(event)
  }
})
