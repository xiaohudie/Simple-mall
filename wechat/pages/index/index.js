//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '../images/good_img1.jpeg',
      '../images/good_img1.jpeg',
      '../images/good_img1.jpeg'
    ],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    menuArry:[
    ],
    recommendArry:[
    ],
    page:1,
    total:1,//分页数量
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.showLoading({
      title: '加载中...',
    })
    //请求获取商品信息
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bebc08e3dee233591e4e4fd/example_copy/indexList', //请求接口的url
      method: 'GET', //请求方式
      data: {
        page:this.data.page,
      },//请求参数
      header: {
          'content-type': 'application/json' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
          const data = res.data.data
          let arryNew = data.recommendArry
          let arry = this.data.recommendArry.concat(arryNew)
          this.setData({
            menuArry:data.menuArry,
            recommendArry:arry
          })
        }
      });
    wx.showShareMenu()
  },

  onReachBottom: function () {
    wx.showLoading({
      title: '加载中...',
    })
    this.data.page = this.data.page +1;
    //请求获取商品信息
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bebc08e3dee233591e4e4fd/example_copy/indexList', //请求接口的url
      method: 'GET', //请求方式
      data: {
        page:this.data.page,
      },//请求参数
      header: {
          'content-type': 'application/json' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
          const data = res.data.data
          let arryNew = data.recommendArry
          let arry = this.data.recommendArry.concat(arryNew)
          this.setData({
            menuArry:data.menuArry,
            recommendArry:arry
          })
        }
      });
  },
  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onShareAppMessage: (res) => {
    return {
      title: '祥宇门窗',
      path: '/pages/index/index',
      imageUrl: "/pages/images/good_img1.jpeg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})
