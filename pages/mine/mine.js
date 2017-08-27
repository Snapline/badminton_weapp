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
  },

  //跳转创建的社团活动
  gotoClubMatch() {
    wx.navigateTo({
      url: '../myOrganization/myOrganization',
    })
  },

  //跳转参加的社团活动
  gotoClubParticipant() {
    wx.navigateTo({
      url: '../participantClub/participantClub',
    })
  },
})