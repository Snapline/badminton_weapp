var utils = require('../../utils/util.js');
import request from '../../request/requestFunc.js';
var app = getApp();
Page({

  data: {
    updateId:0,
    matchArr: ['男子单打', '女子单打', '男子双打', '女子双打', '男女混双', '团体', '社团活动'],
    matchIndex: 0,
    teamType: [
      { name: '男单', value: 1 },
      { name: '女单', value: 2 },
      { name: '男双', value: 3 },
      { name: '女双', value: 4 },
      { name: '混双', value: 5 },
    ],
    teamTypeChosen: [],
    startTime: utils.formatDay(new Date),
    endTime: utils.formatDay(new Date),
    deadTime: utils.formatDay(new Date),
    address: '',
    memberLimited: 0,
    imageList: [],
    hasImage: false,
    imageUrl:'',
    ownerName: '',
    phoneNumber: ''
  },

  onLoad: function (options) {
    const MatchId= options.matchid;
    let _this = this;

    let param = {
      'API_URL': '/wx/game/query_by_id',
      'data': {
        'id': MatchId
      },
      'header': {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': app.globalData.sessionId
      },
      'method': 'POST'
    }

    request.oneRequest.result(param).then(res => {
      if (res.data.result.data.pic != '') {
        _this.setData({
          imageUrl: request.APIDomian + '/' + res.data.result.data.pic,
          hasImage: true
        })
      }
      else{
        _this.setData({
          imageUrl: '',
          hasImage: false
        })
      }
      _this.setData({
        updateId: MatchId,
        matchIndex: parseInt(res.data.result.data.gameType)-1,
        teamTypeChosen: res.data.result.data.teamType,
        startTime: res.data.result.data.beginTime,
        endTime: res.data.result.data.endTime,
        deadTime: res.data.result.data.deadline,
        address: res.data.result.data.address,
        memberLimited: res.data.result.data.limitNum,
        ownerName: res.data.result.data.creator,
        phoneNumber: res.data.result.data.creatorPhone
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
    this.setData({
      phoneNumber: e.detail.value
    })
    
  },

  //点击提交
  submitInfo() {
    const submitData = {
      'id': this.data.updateId,
      'gameType': parseInt(this.data.matchIndex) + 1,
      'teamType': this.data.teamTypeChosen.join(','),
      'beginTime': this.data.startTime,
      'endTime': this.data.endTime,
      'deadline': this.data.deadTime,
      'address': this.data.address,
      'limitNum': this.data.memberLimited,
      'creator': this.data.ownerName,
      'creatorPhone': this.data.phoneNumber
    }
    if (this.data.imageList.length == 0) {
      //没有上传图片
      let _this = this;

      let param = {
        'API_URL': '/wx/game/update',
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
          wx.switchTab({
            url: '../mine/mine',
          })
        }
      }
      ).catch(e =>
        console.log(e)
        )
    }

    else {
      //有上传海报
      let that = this;
      wx.uploadFile({
        url: request.APIDomian + '/wx/game/update',
        filePath: that.data.imageList[0],
        name: 'file',
        formData: submitData,
        header: {
          'Cookie': app.globalData.sessionId
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == '400001') {
            request.failTips('有相关数据没有填写哦！')
          }
          if (res.data.code == '000000') {
            //成功
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        },
        fail: function (e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '评论失败',
            showCancel: false
          })
        }
      })
    }
  }

})