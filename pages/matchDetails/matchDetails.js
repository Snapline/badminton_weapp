import request from '../../request/requestFunc.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchId: 0,
    teamList:[],
    knockoutList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      matchId: options.matchid
    });
  },

  onShow: function () {
    //获取小组赛信息
    let _this = this;
    let param = {
      'API_URL': '/wx/group_game/list2',
      'data': {
        gameId: _this.data.matchId
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      if (res.data.code == '000000') {
        //处理数据
        var jsonData = res.data.result.data;
        var resultArr = [];
        var match
        for (var key in jsonData){
          var matchArr = [];
          for(var key2 in jsonData[key]){
            var newObj2 = {
              'teamName': key2,
              'matchInfo': jsonData[key][key2]
            };
            matchArr.push(newObj2)
          }

          var newObj = {
            'roundName': key,
            'teamInfo': matchArr
          };
          resultArr.push(newObj)
        }

        _this.setData({
          teamList: resultArr
        })
      }
    }
    ).catch(e =>
      console.log(e)
      )

    //获取淘汰赛信息
    let knockoutParam = {
      'API_URL': '/wx/knockout/list2',
      'data': {
        gameId: _this.data.matchId
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(knockoutParam).then(res => {
      if (res.data.code == '000000') {
        //处理数据
        var jsonData = res.data.result.data;
        var resultArr = [];
        var match
        for (var key in jsonData) {
          var newObj = {
            'roundName': key,
            'matchInfo': jsonData[key]
          };
          resultArr.push(newObj)
        }

        _this.setData({
          knockoutList: resultArr
        })
      }
    }
    ).catch(e =>
      console.log(e)
      )
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