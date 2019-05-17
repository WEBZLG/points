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
        isCert:"未认证",
        signText: "签到领取积分", //签到按钮文字
        signClass: "sign-in", //签到按钮样式
        myInfo: ""//个人信息
    },
    //   获取个人信息
    getUserInfo() {
        var that = this;
        var item = {
            'user_id': that.data.userId
        }
        ajax.wxRequest('POST', 'user/info', item,
            (res) => {
                console.log(res)
                that.setData({
                    myInfo:res.data
                })
                if (res.data.is_sign==true){
                    that.setData({
                        signText: "已签到",
                        signClass:"signed"
                    })
                }
                if (res.data.is_cert == 1) {
                    that.setData({
                        isCert: "已认证",
                        classIdentification: "identification-t"
                    })
                }
            },
            (err) => {
                console.log(err)
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
        ajax.wxRequest('POST', 'integralmall/sign', item,
            (res) => {
                console.log(res)
                if(res.code==1){
                    wx.showToast({
                        title: '积分+100'
                    })
                    that.setData({
                        signText: "已签到",
                        signClass: "signed"
                    })
                }else{
                    wx.showToast({
                        title: '签到失败'+res.message,
                        icon:"none"
                    })
                }
                
            },
            (err) => {
                console.log(err)
                wx.showToast({
                    title: '签到失败' + err,
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
        wx.navigateTo({
            url: '../home/identification/identification',
        })
    },
    // 我的订单跳转
    myOrder(){
        wx.navigateTo({
            url: './myorder/myorder',
        })
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