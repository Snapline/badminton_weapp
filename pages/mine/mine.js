// pages/mine/mine.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },

  onShow: function () {
  
  },

  onShareAppMessage: function () {
  
  },

  //跳转创建的比赛
  gotoCreateMatch(){
    wx.navigateTo({
      url: '../myMatchList/myMatchList',
    })
  },

  //跳转参加的比赛
  gotoAttendMatch(){
    wx.navigateTo({
      url: '../attendList/attendList',
    })
  }
})