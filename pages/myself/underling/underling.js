// pages/myself/underling/underling.js
const app = getApp()
var ajax = require("../../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        peopleList:[]//下属录入人员列表
    },
    // 下属详情
    underlingDetails(e){
        console.log(e)
        var staffid = e.currentTarget.dataset.staffid;
        wx.navigateTo({
            url: './underlingDetails/underlingDetails?staffid='+staffid,
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
        var that = this;
        var item = {
            'user_id': app.globalData.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'user/entryLists', item,
            (res) => {
                console.log(res)
                that.setData({
                    peopleList: res.data
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