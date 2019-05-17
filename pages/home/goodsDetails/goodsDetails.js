// pages/home/goodsDetails/goodsDetails.js
var ajax = require("../../../utils/ajax.js");
var WxParse = require('../../../utils/wxParse/wxParse.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetails:'',
        goodsDesc:''
    },
    // 去首页
    goHome(){
        wx.reLaunch({
            url: '../../home/home',
        })
    },
    // 去购物车
    goShopping(){
        wx.reLaunch({
            url: '../../shopping/shopping',
        })
    },
    // 立即兑换
    buyNow(){
        wx.showModal({
            title: '兑换商品',
            content: '确定兑换此商品？',
            cancelText:"取消",
            confirmText:"确定",
            success:function(res){
                if (res.confirm){
                    wx.redirectTo({
                        url: '../../exchange/exchange'
                    })
                }else{
                    
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'id':options.id
        }
        ajax.wxRequest('POST', 'integral_goods/detail', item,
            (res) => {
                console.log(res)
                that.setData({
                    goodsDetails: res.data,
                    goodsDesc: res.data.detail
                })
                WxParse.wxParse('article', 'html', this.data.goodsDesc, this, 5);
            },
            (err) => {
                console.log(err)
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
    onShareAppMessage: function (ops) {
        var that = this;
        var uid = ops.target.dataset.uid;
        var videoId = ops.target.dataset.vid
        // if(ops.from==='button'){}
        return {
            title: '龙江银行积分商城',
            path: '/pages/playvideo/playvideo?uid=' + uid + '&videoId=' + videoId,
            success: function (res) {
                //console.log(res)
                wx.showToast({
                    title: '转发成功！',
                })
            },
            fail: function (res) {
                // 转发失败
                wx.showToast({
                    title: '转发失败',
                    icon: "none"
                })
            }
        }
    },
})