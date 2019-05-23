// pages/myself/myorder/orderDetials/orderDetails.js
const app = getApp()
var ajax = require("../../../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderListData:[]//订单详情
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrderDetails(options.orderid)
    },
    // 查看商品详情
    viewGoods(e){
        console.log(e)
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../../../home/goodsDetails/goodsDetails?id='+id,
        })
    },
    // 订单详情
    getOrderDetails(orderid){
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'order_id':orderid
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integral_order/detail', item,
            (res) => {
                wx.hideLoading();
                console.log(res)
                if(res.code==0){
                    that.setData({
                        orderListData: res.data
                    })
                }else{
                    wx.showToast({
                        title: res.message,
                        icon:"none"
                    })
                }
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
    // 确认收货
    takeGoods(e){
        console.log(e)
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'order_detail_id': e.currentTarget.dataset.orderid
        }
        wx.showModal({
            title: '确定取货',
            content: '确定取货？',
            cancelText: "取消",
            confirmText: "确定",
            success: function (res) {
                if (res.confirm) {
                    wx.showLoading();
                    ajax.wxRequest('POST', 'integral_order/confirm', item,
                        (res) => {
                            wx.hideLoading();
                            console.log(res)
                            if (res.code == 0) {
                                wx.showToast({
                                    title: res.message,
                                })
                                setTimeout(function(){
                                    wx.navigateBack()
                                },2000)
                            } else {
                                wx.showToast({
                                    title: res.message,
                                    icon: "none"
                                })
                            }
                        },
                        (err) => {
                            console.log(err)
                            wx.hideLoading();
                            wx.showToast({
                                title: '数据加载失败' + err,
                                icon: "none"
                            })
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