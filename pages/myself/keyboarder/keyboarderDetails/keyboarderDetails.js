// pages/myself/underling/underlingDetails/underlingDetails.js
const app = getApp()
var ajax = require("../../../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        staffName :"",//申请人
        applyList:[]//申请记录
    },
// 发放积分
    giveOut(e){
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'apply_id': e.currentTarget.dataset.id
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'user/issueIntegral', item,
            (res) => {
                console.log(res)
                if(res.code==0){
                    wx.showToast({
                        title: res.message,
                    })
                }else{
                    wx.showToast({
                        title: res.message,
                        icon:"none"
                    })
                }
                wx.hideLoading();
                that.onload();
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
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'partner_id':options.staffid
        }
        wx.showLoading();
        //申请人记录详情
        ajax.wxRequest('POST', 'user/applyIntegralList', item,
            (res) => {
                console.log(res)
                that.setData({
                    applyList:res.data.list
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