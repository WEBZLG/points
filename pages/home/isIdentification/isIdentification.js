// pages/identification/identification.js
var ajax  = require("../../../utils/ajax.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    idCard:"",
    phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var item = {
          'user_id': app.globalData.userId,
          'card_no': '',
          'true_name': '',
          'mobile': '',
          'code': ''
      }
      wx.showLoading();
      ajax.wxRequest('POST', 'user/certIdentity', item,
          (res) => {
              console.log(res)
              if (res.code == 0) {
                  that.setData({
                      name:res.data.true_name,
                      idCard:res.data.card_no,
                      phone:res.data.mobile
                  })
              } else {
                  wx.showToast({
                      title: res.message,
                      icon: "none"
                  })
              }
              wx.hideLoading();
          },
          (err) => {
              console.log(err)
              wx.hideLoading();
              wx.showToast({
                  title: '数据加载失败' + err,
                  icon: "none"
              })
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