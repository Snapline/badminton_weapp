var utils = require('../../utils/util.js')
Page({

  data: {
    matchArr: ['男子单打', '女子单打', '男子双打', '女子双打', '男女混双'],
    matchIndex: 0,
    matchType: ['1/4决赛', '半决赛', '决赛'],
    typeIndex: 0,
    matchDay: utils.formatDay(new Date),
    startTime: '08:00',
    endTime: '10:00',
    showGolden: false,
    showSilver: false,
    showBlonde: false
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

  //修改比赛项目
  matchChange(e) {
    this.setData({
      matchIndex: e.detail.value
    })
  },

  //修改类型
  typeChange(e) {
    this.setData({
      typeIndex: e.detail.value
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

  //选择冠亚季军的checkbox
  checkboxChange(e){
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

  }
})