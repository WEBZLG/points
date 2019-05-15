// pages/myself/myself.js
const app = getApp()
var ajax = require("../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},//用户信息
      userId:"",//用户id
      classIdentification: "identification-t",//是否认证
      signText: "签到领取积分",//签到按钮文字
      signClass:"sign-in"//签到按钮样式
  },
    singIn(e){
        wx.showToast({
            title: '积分+100'
        })
        this.setData({
            signText:"已签到",
            signClass:"signed"
        })
    },
    // 我的优惠券跳转
    myCoupon(e){
        wx.navigateTo({
            url: './coupon/coupon',
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          userInfo: app.globalData.userInfo,
          userId:app.globalData.userId
      })
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

  }
})