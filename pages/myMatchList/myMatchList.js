import request from '../../request/requestFunc.js';

Page({
  data: {
    matchList: [],
    noRecord: false
  },

  onLoad: function (options) {
  
  },

  onShow: function () {
    let _this = this;
    
    let param = {
      'API_URL': '/creatematch',
      'data':{},
      'method': 'GET'
    }

    request.result(param).then(res => {
      _this.setData({
          matchList: res.data
        })
      }
    ).catch(e =>
      console.log(e)
    )
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

  //进入编辑页面
  gotoEdit(e){
    wx.navigateTo({
      url: '../editMatch/editMatch?matchid=1',
    })
  },

  //进入添加页面
  gotoAdd(e){
    wx.navigateTo({
      url: '../addMatchPage/addMatchPage?matchid=1',
    })
  },

  //删除
  deleteMatch(e){
    wx.showModal({
      content: '确定删除该比赛吗？',
      success: function (res) {
        if (res.confirm) {
          //调用接口
        } else if (res.cancel) {
          
        }
      }
    })
  }
})