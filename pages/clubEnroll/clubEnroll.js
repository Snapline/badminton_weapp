import request from '../../request/requestFunc.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: '../../images/tab1/u73.png',
    matchTime: '',
    matchAddress: '',
    memberNum: 0,
    ownerName: '',
    phone: '',
    sendMatchId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      sendMatchId: options.matchid
    })
    const that = this;
    let param = {
      'API_URL': '/wx/game/query_by_id',
      'data': {
        'id': that.data.sendMatchId
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      if (res.data.result.data.pic != '') {
        that.setData({
          imageUrl: request.APIDomian + '/' + res.data.result.data.pic
        })
      }
      that.setData({
        matchTime: res.data.result.data.beginTime,
        matchAddress: res.data.result.data.address,
        memberNum: res.data.result.data.limitNum,
        ownerName: res.data.result.data.creator,
        phone: res.data.result.data.creatorPhone
      })
    }
    ).catch(e =>
      console.log(e)
      )
  },
  onShow: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '这有一个羽毛球社团活动哦！',
      path: './clubEnroll/clubEnroll?id=share',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //进入信息填写页面
  gotoInfoPage(e) {
    wx.navigateTo({
      url: '../clubEnrollInfo/clubEnrollInfo?matchid=' + this.data.sendMatchId
    })
  }
})