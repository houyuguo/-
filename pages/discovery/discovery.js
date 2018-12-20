//discovery.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["热榜", "收藏"],
    currentNavtab: "0",
    imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0,
    recommend: [],
    recommend_length:0,

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
    this.recommend_refresh();
  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  bindItemTap: function(e) {
    var user_id = '1';
    if(user_id == null){
      user_id = getApp().globalData.userInfo;
    }
    wx.navigateTo({
      url: '../answer/answer?answerId=' + e.currentTarget.dataset.aid + '&userId=' + user_id
    })
    // setTimeout(function () {
    //   console.log(e.currentTarget.dataset.aid);
    // }, 600);

  },
  bindQueTap: function(e) {
    console.log(e.currentTarget.dataset.qid)
    wx.navigateTo({
      url: '../question/question?qid=' + e.currentTarget.dataset.qid
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();that.recommend_nextLoad()}, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},


  // 收藏刷新————fake数据
  // refresh: function(){
  //   var feed = util.getDiscovery();
  //   console.log("loaddata");
  //   var feed_data = feed.data;
  //   this.setData({
  //     feed:feed_data,
  //     feed_length: feed_data.length
  //   });
  // },

  //推荐刷新————真实数据
  recommend_refresh: function () {
    var that = this
    util.getRecommend()
      .then(function (data) {
        console.log('load recommend');
        var recommend_data = data.data
        that.setData({
          recommend: recommend_data,
          recommend_length: recommend_data.length
        });
        console.log(data);
      });
  },

  //收藏刷新————真实数据
  refresh: function () {
    var that = this
    util.getDiscovery('1')
      .then(function (data) {
        console.log('load feed');
        var feed_data = data.data
        that.setData({
          feed: feed_data,
          feed_length: feed_data.length
        });
        console.log(data);
      });
  },



  //推荐持续加载————fake数据
  recommend_nextLoad: function () {
    var next = util.recommendNext();
    var next_data = next.data;
    this.setData({
      recommend: this.data.recommend.concat(next_data),
      recommend_length: this.data.recommend_length + next_data.length
    });
  },


  //收藏持续加载————fake数据
  nextLoad: function(){
    var next = util.discoveryNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  },

  //推荐持续加载————真实数据
  recommend_nextLoad0: function () {
    util.getData(index_api)
      .then(function (nextdata) {
        // nextdata = nextdata.data
        this.setData({
          recommend: this.data.recommend.concat(nextdata),
          recommend_length: this.data.recommend_length + nextdata.length
        });
        console.log(data);
      });
  },

  //收藏持续加载————真实数据
  nextLoad0: function () {
    var index_api = 'rest接口_持续加载收藏';
    util.getData(index_api)
      .then(function (nextdata) {
        // nextdata = nextdata.data
        this.setData({
          feed: this.data.feed.concat(nextdata),
          feed_length: this.data.feed_length + nextdata.length
        });
        console.log(data);
      });
  },

});
