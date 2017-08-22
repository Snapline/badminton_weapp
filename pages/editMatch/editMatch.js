var utils = require('../../utils/util.js');
import request from '../../request/requestFunc.js';
Page({

  data: {
    matchArr: ['男子单打', '女子单打', '男子双打', '女子双打', '男女混双', '团体', '社团活动'],
    matchIndex: 0,
    startTime: utils.formatDay(new Date),
    endTime: utils.formatDay(new Date),
    deadTime: utils.formatDay(new Date),
    address: '',
    memberLimited: 0,
    ownerName: '',
    phoneNumber: ''
  },

  onLoad: function (options) {
    let _this = this;

    let param = {
      'API_URL': '/matchinfo',
      'data': {},
      'method': 'GET'
    }

    request.result(param).then(res => {
      _this.setData({
        matchIndex: res.data.matchIndex,
        startTime: res.data.startTime
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

  //修改截止时间
  deadTimeChange(e) {
    this.setData({
      deadTime: e.detail.value
    })
  },

  //输入地点
  inputAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },

  //修改人数上限
  inputLimited(e) {
    this.setData({
      memberLimited: e.detail.value
    })
  },

  //选择海报
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)

      }
    })
  },

  //输入称呼
  inputName(e) {
    this.setData({
      ownerName: e.detail.value
    })
  },

  //输入手机号
  inputPhone(e) {
    phoneNumber: e.detail.value
  }
})