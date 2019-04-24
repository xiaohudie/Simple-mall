//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    recommendArry:[
    ],
    type:'',//商品类型
    page:1,//分页页数
    total:1,//分页数量
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (query) {
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

    const goodListType = query.text; 
    this.setData({
      type:goodListType
    })

    wx.showLoading({
      title: '加载中...',
    })

    //请求获取商品信息
    wx.request({
          url: 'https://www.easy-mock.com/mock/5bebc08e3dee233591e4e4fd/example_copy/goodList', //请求接口的url
          method: 'GET', //请求方式
          data: {
            page:this.data.page,
            type:this.data.type
          },//请求参数
          header: {
              'content-type': 'application/json' // 默认值
          },
          complete() {  //请求结束后隐藏 loading 提示框
              wx.hideLoading();
          },
          success: res => {
              const data = res.data.data
              var arryNew = data.recommendArry
              var arry = this.data.recommendArry.concat(arryNew)
              this.setData({
                recommendArry:arry
              })
          }
      });

      wx.setNavigationBarTitle({ //设置页面标题
        title: query.text + '商品列表'
      })
      wx.showShareMenu()
  },

  onReachBottom: function () {
    wx.showLoading({
      title: '加载中...',
    })

    this.data.page = this.data.page +1;

    //请求获取商品信息
    wx.request({
          url: 'https://www.easy-mock.com/mock/5bebc08e3dee233591e4e4fd/example_copy/goodList', //请求接口的url
          method: 'GET', //请求方式
          data: {
            page:this.data.page,
            type:this.data.type
          },//请求参数
          header: {
              'content-type': 'application/json' // 默认值
          },
          complete() {  //请求结束后隐藏 loading 提示框
              wx.hideLoading();
          },
          success: res => {
              const data = res.data.data
              var arryNew = data.recommendArry
              var arry = this.data.recommendArry.concat(arryNew)
              this.setData({
                recommendArry:arry
              })
          }
      });
  },
  onShareAppMessage: (res) => {
    return {
      title: '祥宇门窗',
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
