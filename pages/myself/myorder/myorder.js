// pages/myself/myorder/myorder.js
const app = getApp()
var ajax = require("../../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList:[]//列表数据
    },
    // 订单详情
    viewDetails(e){
        var orderid = e.currentTarget.dataset.orderid
        wx.navigateTo({
            url: './orderDetails/orderDetails?orderid='+orderid,
        })
    },
    // 订单列表
    getOrderList(){
        var that = this;
        var item = {
            'user_id': app.globalData.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integral_order/list', item,
            (res) => {
                wx.hideLoading();
                console.log(res)
                if(res.code==0){
                    that.setData({
                        orderList:res.data.list
                    })
                }else{
                    wx.showToast({
                        title: res.msg,
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
        this.getOrderList();
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