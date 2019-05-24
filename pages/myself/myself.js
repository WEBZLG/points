// pages/myself/myself.js
const app = getApp()
var ajax = require("../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {}, //用户信息
        userId: "", //用户id
        classIdentification: "identification-f", //是否认证
        isCert: "未认证",
        signText: "签到领取积分", //签到按钮文字
        signClass: "sign-in", //签到按钮样式
        myInfo: "" ,//个人信息
        isUnderling:false//是否显示我的下属
    },
    //   获取个人信息
    getUserInfo() {
        var that = this;
        var item = {
            'user_id': that.data.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'user/info', item,
            (res) => {
                console.log(res)
                that.setData({
                    myInfo: res.data
                })
                if (res.data.is_sign == true) {
                    that.setData({
                        signText: "已签到",
                        signClass: "signed"
                    })
                }
                if (res.data.is_cert == 1) {
                    that.setData({
                        isCert: "已认证",
                        classIdentification: "identification-t"
                    })
                }
                if (res.data.group_name=="用户"){
                    that.setData({
                        isUnderling:true
                    })
                }
                wx.hideLoading();
            },
            (err) => {
                console.log(err)
                wx.hideLoading();
                wx.showToast({
                    title: '获取数据失败' + err,
                    icon: "none"
                })
            })
    },
    //   签到
    singIn(e) {
        var that = this;
        var item = {
            'user_id': that.data.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integralmall/sign', item,
            (res) => {
                console.log(res)
                wx.hideLoading();
                if (res.code == 0) {
                    wx.showToast({
                        title: '积分' + res.data.integral,
                        duration:2000
                    })
                    that.setData({
                        signText: "已签到",
                        signClass: "signed"
                    })
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: "none"
                    })
                }
                
                setTimeout(function(){
                    that.getUserInfo()
                },2000)
            },
            (err) => {
                console.log(err)
                wx.hideLoading();
                wx.showToast({
                    title: err,
                    icon: "none"
                })
            })
    },

    // 我的优惠券跳转
    myCoupon(e) {
        wx.navigateTo({
            url: './coupon/coupon',
        })
    },
    //  我的认证跳转
    goIdentification(e) {
        if (this.data.isCert == "已认证") {
            wx.navigateTo({
                url: '../home/isIdentification/isIdentification',
            })
        } else {
            wx.navigateTo({
                url: '../home/identification/identification',
            })
        }
    },
    // 我的订单跳转
    myOrder() {
        wx.navigateTo({
            url: './myorder/myorder',
        })
    },
    // 我的下属跳转
    myUnderling() {
        var type = this.data.myInfo.group_name
        if(type=="机关员工"){
            wx.navigateTo({
                url: './officeStaff/officeStaff'
            })
        }else if( type=="录入员"){
            wx.navigateTo({
                url: './keyboarder/keyboarder'
            })
        }else{
            wx.navigateTo({
                url: './underling/underling'
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            userInfo: app.globalData.userInfo,
            userId: app.globalData.userId
        })
        this.getUserInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})