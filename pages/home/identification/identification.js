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
    code:"",
    content1:"亲爱的用户，积分商城依照相关法规要求进行实名制管理，请您积极配合",
    content2:"积分商城严格保护您的个人信息，确保信息安全，具体详见《积分商城免责条款》",
    content3:"您在点击同意下列下以前，请务必审慎阅读，并充分理解协议条款内容"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.selectComponent("#statement").showPopup();
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
  },
    _success(){
        this.selectComponent("#statement").hidePopup();
    },
    _error(){
        wx.reLaunch({
            url: '../../home/home',
        })
    },
    _read(){
        this.setData({
            content1:"本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。",
            content2:"除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供本应用会不时更新本隐私权政策。",
            content3:"您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。 适用范围在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；"
        })
    }
})