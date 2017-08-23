// pages/activity/activity.js
Page({
  data: {
    timeModal: true, //选择时间排序
    popularModal: false, //热度选择排序
    progressModal: false, //选择进度排序
    showModal: false, //选择进度的弹窗
    progressState: '进度'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
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
      progressState: '进度'
    })
  },

  //点击热度查询
  popularArrange() {
    this.setData({
      timeModal: false,
      popularModal: true,
      progressModal: false,
      progressState: '进度'
    })
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
      showModal: !this.data.showModal
    })
  }
})