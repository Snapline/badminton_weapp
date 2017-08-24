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
    orderType: 'time',
    bottomNum: 1,
    hasToEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo();
    const that = this;
    setTimeout(function(){
      console.log(app.globalData.sessionId)
      getActivities(that)
    },800)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //点击时间查询
  timeArrange(){
    this.setData({
      timeModal: true, 
      popularModal: false, 
      progressModal: false,
      progressState: '进度',
      orderType: 'time'
    })
    getActivities(this)
  },

  //点击热度查询
  popularArrange() {
    this.setData({
      timeModal: false,
      popularModal: true,
      progressModal: false,
      progressState: '进度',
      orderType: 'heat'
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
    this.setData({
      progressState: e.currentTarget.dataset.state,
      timeModal: false,
      popularModal: false,
      progressModal: true,
      showModal: !this.data.showModal,
      orderType: 'time'
    })
  },

  //进入活动详情
  gotoDetails(e){
    wx.navigateTo({
      url: '../enroll/enroll?matchid=1',
    })
  }
})

function getActivities(that){
  let param = {
    'API_URL': '/wx/game/list',
    'data': {
      'pageNum': that.data.bottomNum,
      'perPage': 6,
      'orderType': that.data.orderType
    },
    'header': {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': app.globalData.sessionId
    },
    'method': 'POST'
  }

  request.oneRequest.result(param).then(res => {
    that.setData({
      matchList:res.data.result.data
    })
  }
  ).catch(e =>  
    console.log(e)
  )
}