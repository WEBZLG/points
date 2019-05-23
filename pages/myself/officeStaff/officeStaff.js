// pages/myself/officeStaff/officeStaff.js
const app = getApp()
var ajax = require("../../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clientList: []//下属客户列表
    },
    // 添加机关人员
    addOfficeStaff() {
        wx.navigateTo({
            url: './addOfficeStaff/addOfficeStaff',
        })
    },
    // 机关人员详情
    officeStaffDetails(e) {
        var staffid = e.currentTarget.dataset.staffid
        wx.navigateTo({
            url: './officeStaffDetails/officeStaffDetails?staffid='+staffid,
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
        ajax.wxRequest('POST', 'user/customerLists', item,
            (res) => {
                console.log(res)
                that.setData({
                    clientList: res.data.list
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