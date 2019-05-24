// pages/myself/coupon/couponDetails/couponDetails.js
const app = getApp()
var ajax = require("../../../../utils/ajax.js")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        couponNum:1 ,//优惠券数量
        couponDetails:"",//优惠券详情
        vouchersId:""//优惠券id
    },
    // 优惠券数量加减
    btn_reduce(){
        var couponNum = this.data.couponNum
        this.setData({
            couponNum: parseInt(couponNum) - 1
        })
        if (this.data.couponNum<1){
            this.setData({
                couponNum:  1
            })
        }
    },
    btn_add(){
        var couponNum = this.data.couponNum
        this.setData({
            couponNum: parseInt(couponNum) + 1
        })
    },
    // 使用优惠券
    useNow(e){
        var that = this;
        var item = {
            user_id: app.globalData.userId,
            vouchers_id: that.data.vouchersId,
            num: that.data.couponNum
        }
        wx.showModal({
            title: '兑换优惠券',
            content: '确定兑换此优惠券？',
            cancelText: "取消",
            confirmText: "确定",
            success: function (res) {
                if (res.confirm) {
                    wx.showLoading();
                    ajax.wxRequest('POST', 'vouchers/exchange', item,
                        (res) => {
                            // console.log(res)
                            wx.hideLoading();
                            if(res.code==0){
                                wx.showToast({
                                    title: res.message
                                })
                                setTimeout(function(){
                                    wx.navigateBack()
                                },2000)    
                            }else{
                                wx.showToast({
                                    title: res.message,
                                    icon:"none",
                                    duration: 2000
                                })
                                setTimeout(function () {
                                    wx.navigateBack()
                                }, 2000) 
                            }
                            
                        },
                        (err) => {
                            // console.log(err)
                            wx.hideLoading();
                            wx.showToast({
                                title: '兑换失败' + err,
                                icon: "none"
                            })
                            setTimeout(function () {
                                wx.navigateBack()
                            }, 2000) 
                        })
                } else {

                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 详情数据加载
        var that = this;
        this.setData({
            vouchersId: options.id
        })
        var item = {
            vouchers_id:options.id
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'vouchers/detail', item,
            (res) => {
                // console.log(res)
                that.setData({
                    couponDetails:res.data
                })
                wx.hideLoading();
            },
            (err) => {
                // console.log(err)
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