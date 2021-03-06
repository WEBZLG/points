// pages/home/search/search.js
const app = getApp();
var ajax = require("../../../utils/ajax.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList:[]//商品列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getGoodsList(options.keyword)
    },
    // 商品列表函数
    getGoodsList(keyword) {
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'keyword': keyword,
            'cat_id':""
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integral_goods/lists', item,
            (res) => {
                console.log(res)
                that.setData({
                    goodsList: res.data.list
                })
                wx.hideLoading();
            },
            (err) => {
                wx.hideLoading();
                wx.showToast({
                    title: '数据加载失败' + err,
                    icon: "none"
                })
            })
    },
    //添加购物车
    addCar(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        var item = {
            'user_id': app.globalData.userId,
            'goods_id': id,
            'num': 1,
            'attr': '[]'
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'cart/addCart', item,
            (res) => {
                console.log(res)
                wx.showToast({
                    title: res.message
                })
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
    // 商品详情
    goodsDetails(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../goodsDetails/goodsDetails?id=' + id,
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