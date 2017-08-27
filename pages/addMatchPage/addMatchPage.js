import request from '../../request/requestFunc.js';
var app = getApp();
Page({
  data: {
    matchId: 0,
    teamList: [],
    knockoutList: []
  },
  onLoad: function (options) {
    this.setData({
      matchId: options.matchid
    });

  },

  onShow: function () {

    //获取小组赛信息
    getTeamList(this);

    //获取淘汰赛信息
    getKnockoutList(this);
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  },

  //修改小组赛信息
  editTeamInfo(e){
    const teamId = e.currentTarget.dataset.teamid;
    wx.navigateTo({
      url: '../editTeamInfo/editTeamInfo?matchid=' + this.data.matchId + '&teamid=' + teamId
    })
  },

  //删除小组赛
  deleteTeam(e){
    const teamId = e.currentTarget.dataset.teamid;
    const that = this;
    wx.showModal({
      content: '确定删除该比赛吗？',
      success: function (res) {
        if (res.confirm) {
          //调用接口
          let param = {
            'API_URL': '/wx/group_game/delete',
            'data': {
              'gameId': that.data.matchId,
              'id': teamId
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
                title: '删除成功',
                icon: '',
                duration: 2000
              });
              setTimeout(function () {
                getTeamList(that)
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
  },

  //添加小组赛
  gotoTeamMatch(){
    wx.navigateTo({
      url: '../addTeamInfo/addTeamInfo?matchid=' + this.data.matchId,
    })
  },

  //修改淘汰赛信息
  editKnockoutInfo(e) {
    const teamId = e.currentTarget.dataset.teamid;
    wx.navigateTo({
      url: '../editElimainationInfo/editElimainationInfo?matchid=' + this.data.matchId + '&teamid=' + teamId
    })
  },

  //删除淘汰赛
  deleteKnockout(e) {
    const teamId = e.currentTarget.dataset.teamid;
    const that = this;
    wx.showModal({
      content: '确定删除该淘汰赛吗？',
      success: function (res) {
        if (res.confirm) {
          //调用接口
          let param = {
            'API_URL': '/wx/knockout/delete',
            'data': {
              'gameId': that.data.matchId,
              'id': teamId
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
                title: '删除成功',
                icon: '',
                duration: 2000
              });
              setTimeout(function () {
                getKnockoutList(that)
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
  },

  //添加淘汰赛
  gotoKnockoutMatch() {
    wx.navigateTo({
      url: '../addElimaination/addElimaination?matchid=' + this.data.matchId,
    })
  }
})

//获取小组赛信息
function getTeamList(that){
  let param = {
    'API_URL': '/wx/group_game/list',
    'data': {
      gameId: that.data.matchId
    },
    'header': {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': app.globalData.sessionId
    },
    'method': 'POST'
  }

  request.oneRequest.result(param).then(res => {
    if (res.data.code == '000000') {
      that.setData({
        teamList: res.data.result.data
      })
    }
  }
  ).catch(e =>
    console.log(e)
    )
}

//获取淘汰赛信息
function getKnockoutList(that){
  let knockParam = {
    'API_URL': '/wx/knockout/list',
    'data': {
      gameId: that.data.matchId
    },
    'header': {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': app.globalData.sessionId
    },
    'method': 'POST'
  }

  request.oneRequest.result(knockParam).then(res => {
    if (res.data.code == '000000') {
      that.setData({
        knockoutList: res.data.result.data
      })
    }
  }
  ).catch(e =>
    console.log(e)
  )
}