// pages/putQuestion/put_question.js
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    feed: [],
    feed_length: 0,
    qtitle: null,
    qcontent: null
  },

  //提交事件监听函数
  formSubmit: function(e) {
    // console.log(e.detail.value)
    var that = this
    this.setData({qtitle: e.detail.value.qtitle,
      qcontent: e.detail.value.qcontent})
    console.log(that.data.qtitle)
    console.log(that.data.qcontent)
    wx.request({
      url: 'http://dont-be-evil.cn/question/',
      method:'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        user_id:1,
        title:that.data.qtitle,
        content:that.data.qcontent
      },
      success:function(res) {
        console.log("提交问题成功")
      }
    })
  },

  //重置事件监听函数
  formReset: function (e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //点击分享按钮跳转到首页吗
    wx.navigateTo({
      url: '../index/index',
    })
  }
})