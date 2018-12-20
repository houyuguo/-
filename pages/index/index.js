//index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0
  },
  bindItemTap: function(e) {
    console.log("aid= "+ e.currentTarget.dataset.aid)
    wx.navigateTo({
      //userId是登录的用户的id
      url: '../answer/answer?answerId=' + e.currentTarget.dataset.aid + '&userId=' + 1
    })
  },
  bindQueTap: function(e) {
    console.log(e.currentTarget.dataset.qid)
    wx.navigateTo({
      url: '../question/question?qid=' + e.currentTarget.dataset.qid
    })
  }, 
///////////////////
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh0();
  },

  // upper: function () {
  //   wx.showNavigationBarLoading()
  //   this.refresh();
  //   console.log("upper");
  //   setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  // },

  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现首页刷新
  refresh0: function(){
    var that = this
    util.getData()
      .then(function (data) {
        console.log('load index');
        var feed_data = data.data
        that.setData({
          feed: feed_data,
          feed_length: feed_data.length
        });
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  getData: function(){
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },

  refresh: function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });

    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });

    setTimeout(function(){
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    },3000)

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh0();
  },

  //搜索功能
  search:function(){
    wx.showToast({
      title: '搜索功能正在开发呦',
      icon: 'none',
      duration:3000,
      
    })
  },
  
  //跳转到提问页面
  putQuestion:function(){
    wx.navigateTo({
      url: '../putQuestion/put_question',
    })
  }

})
