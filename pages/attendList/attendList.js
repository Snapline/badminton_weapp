import request from '../../request/requestFunc.js';
var app = getApp();
Page({
  data: {
    matchList: []
  },

  onLoad: function (options) {
    getMyList(this)
  },

  onShow: function () {
    
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {
    if (!this.data.hasToEnd) {
      var tempCount = this.data.bottomNum;
      this.setData({
        bottomNum: tempCount + 1
      });
      getMyList(this)
    }
    else {
      request.failTips('已经到底啦！')
    }
  },

  onShareAppMessage: function () {

  },

  //进入赛程详情页面
  gotoDetails(e) {
    wx.navigateTo({
      url: '../matchDetails/matchDetails?matchid=1',
    })
  },

  //取消报名
  deleteMatch(e) {
    const matchId = e.currentTarget.dataset.matchid;
    const that = this;
    wx.showModal({
      content: '确定取消报名吗？',
      success: function (res) {
        if (res.confirm) {
          //调用接口
          let param = {
            'API_URL': '/wx/participant/cancel',
            'data': {
              'id': matchId
            },
            'header': {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              'Cookie': app.globalData.sessionId
            },
            'method': 'POST'
          }

          request.oneRequest.result(param).then(res => {
            if (res.data.code == '000000') {
              wx.showToast({
                title: '取消成功',
                icon: '',
                duration: 2000
              });
              setTimeout(function () {
                //翻页变量reset
                that.setData({
                  bottomNum: 1,
                  hasToEnd: false
                });
                getMyList(that)
              }, 1000)

            }
          }
          ).catch(e =>
            console.log(e)
            )
        } else if (res.cancel) {

        }
      }
    })
  }
})

function getMyList(that) {
  let param = {
    'API_URL': '/wx/game/participant/query',
    'data': {
      'pageNum': that.data.bottomNum,
      'perPage': 5
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