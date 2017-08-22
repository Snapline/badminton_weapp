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
  }
})