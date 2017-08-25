var utils = require('../../utils/util.js')
Page({

  data: {
    matchArr: ['男子单打', '女子单打', '男子双打', '女子双打', '男女混双'],
    matchIndex: 0,
    roundArr: ['第一轮', '第二轮', '第三轮', '第四轮'],
    roundIndex: 0,
    groups:'',
    matchDay: utils.formatDay(new Date),
    startTime: '08:00',
    endTime: '10:00'
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  //修改比赛类型
  matchChange(e) {
    this.setData({
      matchIndex: e.detail.value
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

  //提交添加小组赛
  submitAdd(){
    let _this = this;

    const submitData = {
      'gameEvent': this.data.matchIndex + 1,
      'rounds': this.data.roundArr[this.data.roundIndex],
      'beginTime': this.data.startTime,
      'endTime': this.data.endTime,
      'deadline': this.data.deadTime,
      'address': this.data.address,
      'limitNum': this.data.memberLimited,
      'creator': this.data.ownerName,
      'creatorPhone': this.data.phoneNumber
    }

    let param = {
      'API_URL': '/wx/game/create',
      'data': submitData,
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {

    }
    ).catch(e =>
      console.log(e)
    )
  }
})