var utils = require('../../utils/util.js')
Page({

  data: {
    matchArr:['男子单打', '女子单打', '男子双打', '女子双打', '男女混双', '团体', '社团活动'],
    matchIndex:0,
    startTime: utils.formatDay(new Date),
    endTime: utils.formatDay(new Date),
    deadTime: utils.formatDay(new Date)
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
  matchChange(e){
    this.setData({
      matchIndex: e.detail.value
    })
  },

  //修改开始时间
  startTimeChange(e){
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

  //修改截止时间
  deadTimeChange(e) {
    this.setData({
      deadTime: e.detail.value
    })
  }
})