import request from '../../request/requestFunc.js';

Page({
  data: {
    matchList: []
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
  
  }
})