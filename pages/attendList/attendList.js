import request from '../../request/requestFunc.js';

Page({
  data: {
    matchList: [],
    noRecord: false
  },

  onLoad: function (options) {

  },

  onShow: function () {
    let _this = this;

    let param = {
      'API_URL': '/creatematch',
      'data': {},
      'method': 'GET'
    }

    request.result(param).then(res => {
      _this.setData({
        matchList: res.data
      })
    }
    ).catch(e =>
      console.log(e)
      )
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  //进入赛程详情页面
  gotoDetails(e) {
    wx.navigateTo({
      url: '../matchDetails/matchDetails?matchid=1',
    })
  },

  //删除
  deleteMatch(e) {
    wx.showModal({
      content: '确定取消报名吗？',
      success: function (res) {
        if (res.confirm) {
          //调用接口
        } else if (res.cancel) {

        }
      }
    })
  }
})