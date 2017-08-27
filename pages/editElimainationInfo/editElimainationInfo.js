var utils = require('../../utils/util.js');
import request from '../../request/requestFunc.js';
var app = getApp();
Page({

  data: {
    addGameId: 0,
    matchArr: ['男子单打', '女子单打', '男子双打', '女子双打', '男女混双'],
    matchIndex: 0,
    matchType: ['1/4决赛', '半决赛', '决赛'],
    typeIndex: 0,
    knockoutType:'1/4决赛',
    participant: '',
    participant2: '',
    matchDay: utils.formatDay(new Date),
    startTime: '08:00',
    endTime: '10:00',
    score: '',
    score2: '',
    address: '',
    champion: '',
    second:'',
    third:'',

    showGolden: false,
    showSilver: false,
    showBlonde: false
  },

  onLoad: function (options) {
    this.setData({
      addGameId: options.matchid,
      teamId: options.teamid
    })
    //查询淘汰赛信息
    let _this = this;
    let param = {
      'API_URL': '/wx/knockout/query',
      'data': {
        'id': options.teamid
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      _this.setData({
        matchIndex: parseInt(res.data.result.data.gameEvent) - 1,
        knockoutType: res.data.result.data.rounds,
        participant: res.data.result.data.participant,
        participant2: res.data.result.data.participant2,
        matchDay: res.data.result.data.gameDate,
        startTime: res.data.result.data.beginTime,
        endTime: res.data.result.data.endTime,
        score: res.data.result.data.score,
        score2: res.data.result.data.score2,
        address: res.data.result.data.address,
        champion: res.data.result.data.champion,
        second: res.data.result.data.second,
        third: res.data.result.data.third
      })
    }
    ).catch(e =>
      console.log(e)
      )
  },

  onShow: function () {

  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  //修改比赛项目
  matchChange(e) {
    this.setData({
      matchIndex: e.detail.value
    })
  },

  //修改类型
  typeChange(e) {
    this.setData({
      knockoutType: this.data.matchType[e.detail.value]
    })
  },

  //修改开始时间
  startTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  //修改结束时间
  endTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  //修改比赛日期
  startDayChange(e) {
    this.setData({
      matchDay: e.detail.value
    })
  },

  //输入参赛方
  inputParticipant(e) {
    this.setData({
      participant: e.detail.value
    })
  },

  inputParticipant2(e) {
    this.setData({
      participant2: e.detail.value
    })
  },

  //输入比分
  inputScore(e) {
    this.setData({
      score: e.detail.value
    })
  },
  inputScore2(e) {
    this.setData({
      score2: e.detail.value
    })
  },

  //输入地点
  inputAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },

  //选择冠亚季军的checkbox
  checkboxChange(e) {
    let checkboxList = e.detail.value;
    Array.prototype.contains = function (obj) {
      var i = this.length;
      while (i--) {
        if (this[i] === obj) {
          return true;
        }
      }
      return false;
    }

    const hasGolden = checkboxList.contains('champion');
    const hasSilver = checkboxList.contains('silverman');
    const hasBlonde = checkboxList.contains('blondeman');

    this.setData({
      showGolden: hasGolden,
      showSilver: hasSilver,
      showBlonde: hasBlonde
    })

  },

  //输入冠亚季军
  inputChampion(e) {
    this.setData({
      champion: e.detail.value
    })
  },
  inputSecond(e) {
    this.setData({
      second: e.detail.value
    })
  },
  inputThird(e) {
    this.setData({
      third: e.detail.value
    })
  },

  //创建淘汰赛
  submitEliminate() {
    let _this = this;

    const submitData = {
      'gameId': this.data.addGameId,
      'gameEvent': parseInt(this.data.matchIndex) + 1,
      'rounds': this.data.matchType[this.data.typeIndex],
      'participant': this.data.participant,
      'participant2': this.data.participant2,
      'gameDate': this.data.matchDay,
      'beginTime': this.data.startTime,
      'endTime': this.data.endTime,
      'address': this.data.address,
      'score': this.data.score,
      'score2': this.data.score2,
      'id': this.data.teamId,
      'champion': this.data.champion,
      'second': this.data.second,
      'third': this.data.third
    }

    let param = {
      'API_URL': '/wx/knockout/update',
      'data': submitData,
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      if (res.data.code == '400001') {
        request.failTips('有相关数据没有填写哦！')
      }
      if (res.data.code == '000000') {
        //成功
        wx.navigateBack({
          delta: -1
        })
      }
    }
    ).catch(e =>
      console.log(e)
      )
  }
})