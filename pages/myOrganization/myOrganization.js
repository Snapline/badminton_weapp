import request from '../../request/requestFunc.js';
var app = getApp();
Page({
  data: {
    matchList: [],
    noRecord: false,
    bottomNum: 1,
    hasToEnd: false
  },

  onLoad: function (options) {

  },

  onShow: function () {
    getMyMatch(this)
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {
    if (!this.data.hasToEnd) {
      var tempCount = this.data.bottomNum;
      this.setData({
        bottomNum: tempCount + 1
      });
      getMyMatch(this)
    }
    else {
      request.failTips('已经到底啦！')
    }
  },

  onShareAppMessage: function () {

  },

  //进入编辑页面
  gotoEdit(e) {
    wx.navigateTo({
      url: '../editMatch/editMatch?matchid=1',
    })
  },

  //进入添加页面
  gotoAdd(e) {
    wx.navigateTo({
      url: '../addMatchPage/addMatchPage?matchid=1',
    })
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
      content: '确定删除该比赛吗？',
      success: function (res) {
        if (res.confirm) {
          //调用接口
        } else if (res.cancel) {

        }
      }
    })
  }
})

function getMyMatch(that) {
  let param = {
    'API_URL': '/wx/club/creator/query',
    'data': {
      'pageNum': that.data.bottomNum,
      'perPage': 2
    },
    'header': {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': app.globalData.sessionId
    },
    'method': 'POST'
  }

  request.oneRequest.result(param).then(res => {
    var resJson = res.data.result.data;
    var previousmatchList = that.data.matchList;
    for (var i = 0; i < resJson.length; i++) {
      previousmatchList.push(resJson[i])
    }

    that.setData({
      matchList: previousmatchList
    })

    if (that.data.bottomNum == res.data.result.totalPage) {
      that.setData({
        hasToEnd: true
      })
    }
  }
  ).catch(e =>
    console.log(e)
    )
}