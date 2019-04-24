//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    shopName:'祥宇门窗',
    shopInfo:'本店承接项目包括：这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,这是一段店铺介绍,',
    shopImg:[
      '../images/good_img1.jpeg',
      '../images/good_img2.jpeg',
      '../images/good_img3.jpeg',
      '../images/good_img4.jpeg',
      '../images/good_img5.jpeg',
      '../images/good_img6.jpeg',
      '../images/good_img7.jpeg',
      '../images/good_img8.jpeg',
      '../images/good_img9.jpeg'
    ],
    contactPhone:'1585907560',
    contactWechat:'1585907560',
    address:'福建省福州市台江区海润滨江花园',
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    latitude:26.0492990000,//纬度
    longitude:119.3483200000,//经度
    controls:[],
    markers: [{
      iconPath: "/pages/images/myAddress.png",
      id: 0,
      latitude:26.0492990000,//纬度
      longitude:119.3483200000,//经度
      width: 32,
      height: 32
    }],

  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })

    wx.showShareMenu()//分享按钮
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  openWeChatMap(){ //打开微信地图
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 18,
      name: this.data.shopName,
      address:this.data.address
    })
  },
  copyBtn: function (e) { //点击按钮复制微信号
    var that = this;
    wx.setClipboardData({
      data: that.data.contactWechat,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  phoneCall: function (e) {
    wx.makePhoneCall({   
    phoneNumber: this.data.contactPhone,  
    success: function () { 
    console.log("成功拨打电话")  
    },
    })
    },
  onShareAppMessage: (res) => { //设置转发信息
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
