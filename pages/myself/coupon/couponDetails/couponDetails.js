// pages/myself/coupon/couponDetails/couponDetails.js
const app = getApp()
var ajax = require("../../../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        couponDetails:"",//优惠券详情
        vouchersId: ""//优惠券id
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
            user_id: app.globalData.userId,
            vouchers_id: options.id
        }
        wx.hideLoading();
        ajax.wxRequest('POST', 'vouchers/detail', item,
            (res) => {
                // console.log(res)
                that.setData({
                    couponDetails: res.data
                })
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
    // 使用优惠券
    useNow(e) {
        var that = this;
        var item = {
            user_id: app.globalData.userId,
            vouchers_id: that.data.vouchersId
        }
        wx.showModal({
            title: '使用优惠券',
            content: '确定使用此优惠券？',
            cancelText: "取消",
            confirmText: "确定",
            success: function (res) {
                if (res.confirm) {
                    wx.hideLoading();
                    ajax.wxRequest('POST', 'vouchers/use', item,
                        (res) => {
                            // console.log(res)
                            if (res.code == 0) {
                                wx.showToast({
                                    title: res.message,
                                })
                                setTimeout(function () {
                                    wx.navigateBack()
                                }, 2000)
                            } else {
                                wx.showToast({
                                    title: res.message,
                                    icon: "none"
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