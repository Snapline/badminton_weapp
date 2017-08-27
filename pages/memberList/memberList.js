import request from '../../request/requestFunc.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limitNum: 0,
    participantNum: 0,
    participantList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //获取报名人数
    let paramA = {
      'API_URL': '/wx/game/participant_num',
      'data': {
        'gameId': options.matchid
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(paramA).then(res => {
      that.setData({
        limitNum: res.data.result.data.limitNum,
        participantNum: res.data.result.data.participantNum
      })
    }
    ).catch(e =>
      console.log(e)
    )
    
    //报名列表查询
    let paramB = {
      'API_URL': '/wx/club/participant/query_num',
      'data': {
        'gameId': options.matchid
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(paramB).then(res => {
      that.setData({
        participantList:res.data.result.data
      })
    }
    ).catch(e =>
      console.log(e)
      )
  },

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
  
  }
})