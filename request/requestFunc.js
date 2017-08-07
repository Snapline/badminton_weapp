import Promise from 'es6-promise';

var oneRequest = {

  fetchApi: function (params) {

    var _this = this;
    var apiDomain = 'http://192.168.31.172:3000'

    return new Promise((resolve, reject) => {
      wx.request({
        url: apiDomain+params.API_URL,
        data: Object.assign({}, params.data),
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: params.method,
        success: resolve,
        fail: reject
      })
    })

  },

  result: function (params) {

    var _this = this;

    return _this.fetchApi(params).then(res => res)

  }

}


export default oneRequest;