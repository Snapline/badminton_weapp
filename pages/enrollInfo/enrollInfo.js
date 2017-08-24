var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    phone:'',
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo();
    const that = this;
    setTimeout(function(){
      that.setData({
        nickName: app.globalData.userInfo.nickName
      })
    },500)
    
    
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

  //输入用户名
  inputNickname(e){
    this.setData({
      nickName: e.detail.value
    })
  },

  //输入电话
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //输入用户名
  inputNote(e) {
    this.setData({
      message: e.detail.value
    })
  },

  //提交报名
  submitInfo(){
    wx.showToast({
      title: '成功',
      icon: '',
      duration: 2000
    })
  }
})