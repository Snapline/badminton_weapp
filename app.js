import API from './request/requestFunc.js';
App({
  onLaunch: function (options) {
    console.log(options.scene);
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getSession: function (cb) {
    var that = this
    if (this.globalData.sessionId) {
      typeof cb == "function" && cb(this.globalData.sessionId)
    }
    else {
      //调用登录接口
      var that = this;
      wx.login({
        success: function (res) {
          wx.request({
            url: API.APIDomian + 'wx/auth/login',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: {
              code: res.code
            },
            success: function (res) {
              //存储session
              that.globalData.sessionId = res.data.session;
              typeof cb == "function" && cb(that.globalData.sessionId);
            }
          });

        }
      })
    }
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    }
    else {
      //调用登录接口
      var that = this;
      wx.login({
        success: function (res) {
          wx.request({
            url: API.APIDomian + '/wx/auth/login',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: {
              code: res.code
            },
            success: function (res) {
              //存储session
              that.globalData.sessionId = res.data.session;

              wx.getUserInfo({
                success: function (resInfo) {
                  that.globalData.userInfo = resInfo.userInfo;
                  typeof cb == "function" && cb(that.globalData.userInfo);
                  //向后台传输保存用户信息
                  wx.request({
                    url: API.APIDomian + '/wx/user/check',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                      'Cookie': that.globalData.sessionId
                    },
                    method: 'POST',
                    data: {
                      'nickName': resInfo.userInfo.nickName,
                      'gender': resInfo.userInfo.gender,
                      'language': resInfo.userInfo.language,
                      'city': resInfo.userInfo.city,
                      'province': resInfo.userInfo.province,
                      'country': resInfo.userInfo.country,
                      'avatarUrl': resInfo.userInfo.avatarUrl,
                      'signature': resInfo.signature,
                      'rawData': resInfo.rawData,
                      'encryptedData': resInfo.encryptedData,
                      'iv': resInfo.iv
                    },
                    success: function (res) {
                      console.log(res.data)
                    }
                  })

                  
                },
                fail: function () {
                  wx.showModal({
                    content: '您已拒绝授权个人资料，部分功能将无法使用！'
                  })
                }
              })
            }
          });

        }
      })
    }
  },
  globalData: {
    userInfo: null,
    sessionId: null
  }
})