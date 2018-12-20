function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')
var recommend = require('../data/data_recommend.js')
var recommend_next = require('../data/data_recommend_next.js')


function getData(){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://dont-be-evil.cn/page/index',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("success")
        resolve(res.data)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function getData2(){
  return index.index;
}

function getNext(){
  return index_next.next;
}

function getDiscovery(user_id){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://dont-be-evil.cn/page/following_questions_update/user/' + user_id,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("success")
        resolve(res.data)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function discoveryNext(){
  return discovery_next.next;
}

function getRecommend() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://dont-be-evil.cn/question/hot',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("success")
        resolve(res.data)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function recommendNext() {
  return recommend_next.next;
}


module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.getRecommend = getRecommend;
module.exports.recommendNext = recommendNext;