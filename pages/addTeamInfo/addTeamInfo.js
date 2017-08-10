var utils = require('../../utils/util.js')
Page({

  data: {
    matchArr: ['男子单打', '女子单打', '男子双打', '女子双打', '男女混双'],
    matchIndex: 0,
    roundArr: ['第一轮', '第二轮', '第三轮', '第四轮'],
    matchDay: utils.formatDay(new Date),
    startTime: '',
    endTime: ''
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
  }
})