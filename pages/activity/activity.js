import request from '../../request/requestFunc.js';
var app = getApp();
Page({
  data: {
    matchList:[],
    timeModal: true, //选择时间排序
    popularModal: false, //热度选择排序
    progressModal: false, //选择进度排序
    showModal: false, //选择进度的弹窗
    progressState: '进度',
    progressNumCode:0,
    orderType: 'time',
    bottomNum: 1,
    hasToEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo();
    getActivities(this)
    const that = this;
  },

  onShow: function () {
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
    console.log('222')
    if (!this.data.hasToEnd) {
      var tempCount = this.data.bottomNum;
      this.setData({
        bottomNum: tempCount + 1
      });
      if (this.data.orderType == 'time' || this.data.orderType == 'heat'){
        getActivities(this);
      }
      else{
        filterActivities(this)
      }
    }
    else {
      request.failTips('已经到底啦！')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //点击时间查询
  timeArrange(){
    this.setData({
      matchList: [],
      timeModal: true, 
      popularModal: false, 
      progressModal: false,
      progressState: '进度',
      orderType: 'time',
      bottomNum: 1,
      hasToEnd: false
    })
    getActivities(this)
  },

  //点击热度查询
  popularArrange() {
    this.setData({
      matchList: [],
      timeModal: false,
      popularModal: true,
      progressModal: false,
      progressState: '进度',
      orderType: 'heat',
      bottomNum: 1,
      hasToEnd: false
    })
    getActivities(this)
  },

  //点击进度查询
  toggleProgressModal(){
    this.setData({
      showModal: !this.data.showModal
    })
  },

  //选择进度
  chooseProgress(e){
    //需要很多reset
    this.setData({
      matchList: [],
      progressState: e.currentTarget.dataset.text,
      progressNumCode: e.currentTarget.dataset.state,
      timeModal: false,
      popularModal: false,
      progressModal: true,
      showModal: !this.data.showModal,
      orderType: 'progress',
      bottomNum: 1,
      hasToEnd: false

    })

    filterActivities(this)
  },

  //进入活动详情
  gotoDetails(e){
    const matchId = e.currentTarget.dataset.matchid;
    wx.navigateTo({
      url: '../enroll/enroll?matchid=' + matchId
    })
  }
})

//排序
function getActivities(that){
  let param = {
    'API_URL': '/wx/game/list',
    'data': {
      'pageNum': that.data.bottomNum,
      'perPage': 10,
      'orderType': that.data.orderType
    },
    'header': {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': app.globalData.sessionId
    },
    'method': 'POST'
  }

  request.oneRequest.result(param).then(res => {
    var resJson = res.data.result.data;
    var previousMatchData = that.data.matchList;
    for (var i = 0; i < resJson.length; i++) {
      previousMatchData.push(resJson[i])
    }

    that.setData({
      matchList: previousMatchData
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

//进度筛选
function filterActivities(that) {
  let param = {
    'API_URL': '/wx/game/list_by_progress',
    'data': {
      'pageNum': that.data.bottomNum,
      'perPage': 10,
      'progress': that.data.progressNumCode
    },
    'header': {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': app.globalData.sessionId
    },
    'method': 'POST'
  }

  request.oneRequest.result(param).then(res => {
    var resJson = res.data.result.data;
    var previousMatchData = that.data.matchList;
    for (var i = 0; i < resJson.length; i++) {
      previousMatchData.push(resJson[i])
    }

    that.setData({
      matchList: previousMatchData
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