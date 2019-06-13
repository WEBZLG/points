// pages/identification/identification.js
var ajax  = require("../../../utils/ajax.js");
var WxParse = require('../../../utils/wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDis:"",//获取验证码按钮点击
    codeText:"获取验证码",
    name:"",
    idCard:"",
    phone:"",
    code:"",
    mztitle:"",//免责题头
    isDetails:false,//免责详情显示
    isShow:false//免责显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var item = {
          'user_id': app.globalData.userId,
          'id':6
      }
      wx.showLoading();
    //   获取免责声明
      ajax.wxRequest('POST', 'article/agreement', item,
          (res) => {
              console.log(res)
              that.setData({
                  mztitle:res.data.title
              })
              WxParse.wxParse('content', 'html', res.data.content, this, 5);
              WxParse.wxParse('description', 'html', res.data.des, this, 5);
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
    // 获取验证码
    getcode: function () {
        var that = this;
        if (that.data.phone==""){
            wx.showToast({
                title: '请输入手机号码',
                icon:"none"
            })
        }else{
        wx.showLoading();
        var item = {
            'user_id': app.globalData.userId,
            'mobile':that.data.phone,
            'type':2
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'sms/sendCode', item,
            (res) => {
                wx.hideLoading();
                console.log(res)
                wx.showToast({
                    title: '发送成功！'
                });
            },
            (err) => {
                console.log(err)
                wx.hideLoading();
                wx.showToast({
                    title: '数据加载失败' + err,
                    icon: "none"
                })
            })
        wx.hideLoading();
        var index = 60;
        var getCode = setInterval(function () {
            index--
            that.setData({
                codeText: index + "s后重新获取",
                isDis: "disable"
            })
            if (index <= 1) {
                clearInterval(getCode)
                that.setData({
                    codeText: "获取验证码",
                    isDis: ""
                })

            }
        }, 1000)
        }
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
    getCodeNum: function (e) {
        this.setData({
            code: e.detail.value
        })
    },

    // 提交数据
    sendData: function () {
        var that = this;
        var name = this.data.name;
        var idCard = this.data.idCard;
        var phone = this.data.phone;
        var code = this.data.code;
        if (name == '' || idCard == '' || phone == ''||code=="" ) {
            wx.showToast({
                title: '请填写完整信息',
                icon: "none"
            })
        } else {
            var item = {
                'user_id': app.globalData.userId,
                'card_no': idCard,
                'true_name': name,
                'mobile': phone,
                'code':code
            }
            wx.showLoading();
            ajax.wxRequest('POST', 'user/certIdentity', item,
                (res) => {
                    console.log(res)
                    if(res.code==0){
                        wx.redirectTo({
                            url: '../isIdentification/isIdentification'
                        })
                    }else{
                        wx.showToast({
                            title: res.message,
                            icon:"none"
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
        }
    },
    _success() {
        this.setData({
            isShow: true
        })
    },
    _error() {
        wx.reLaunch({
            url: '../../home/home',
        })
    },
    _read() {
        var that = this;
        this.setData({
            isDetails: true
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