// pages/identification/identification.js
var ajax  = require("../../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDis:"",
    codeText:"获取验证码",
    name:"",
    idCard:"",
    phone:"",
    code:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  // 获取验证码
  getcode:function(){
    var that = this;
    wx.showLoading();
    let data = {
      uid: '1'
    };
    ajax.wxRequest('POST', '', data, (res) => {
      console.log(res.data)
    }, (err) => {
      console.log(err.errMsg)
    })
    wx.hideLoading();
    var index = 60;
    var getCode = setInterval(function(){
      index --
      that.setData({
        codeText:index+"s后重新获取",
        isDis: "disable"
      })
      if(index<=1){
        clearInterval(getCode)
        that.setData({
          codeText: "获取验证码",
          isDis: ""
        })
        
      }
    },1000)
  },
  // 获取输入数据
  getName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  getIdCard: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeNum:function(e){
    this.setData({
      code:e.detail.value
    })
  },

  // 提交数据
  sendData:function(){
    wx.redirectTo({
        url: '../isIdentification/isIdentification',
    })
    var name = this.data.name;
    var idCard = this.data.idCard;
    var phone = this.data.phone;
    var code = this.data.code;
    if (name=='' || idCard=='' || phone=='' || code==''){
      wx.showToast({
        title: '请填写完整信息',
        icon:"none"
      })
    }else{
      let data = {
        uid: '1'
      };
      ajax.wxRequest('POST', '', data, (res) => {
        console.log(res.data)
      }, (err) => {
        console.log(err.errMsg)
      })
    }
  }
})