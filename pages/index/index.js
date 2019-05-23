//index.js
//获取应用实例
const app = getApp()
var ajax = require("../../utils/ajax.js")
Page({
  data: {
    motto: '申请使用您的微信号登录积分商城',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.reLaunch({
        url: '../home/home',
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.reLaunch({
          url: '../home/home',
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
          wx.reLaunch({
            url: '../home/home',
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if (e.detail.errMsg =="getUserInfo:fail auth deny"){
      wx.showToast({
        title: '拒绝授权',
        icon:'none'
      })
    }else{
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })  
        console.log(app.globalData.userId)
        var item ={
            'user_id': app.globalData.userId,
            'wx_xcx_data': e.detail.rawData
        } 
        ajax.wxRequest('POST', 'user/updateInfo', item,
            (res) => {
                console.log(res)
            },
            (err) => {
                console.log(err)
            })
      wx.reLaunch({
        url: '../home/home',
      })
    }
  }
})
