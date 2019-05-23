// pages/discovery/discovery.js
const app = getApp()
var ajax = require("../../utils/ajax.js")
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: '3CQBZ-7N7K4-RINUJ-DXNFS-DMRUH-ZSFOV'
});

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopList:[]//门店列表
    },
    // 门店详情、
    shopDetails(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: './discoveryDetails/discoveryDetails?id='+id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        // 获取当前位置
        wx.getLocation({
            type: "gcj02",
            success: function(res) {
                // console.log(res)
                // 获取门店列表
                var item = {
                    'user_id': app.globalData.userId,
                    'lng':res.longitude ,
                    'lat': res.latitude,
                    'page':"",
                    'limit':"",
                    'keyword':""
                }
                wx.showLoading();
                ajax.wxRequest('POST', 'integralmall/shop', item,
                    (res) => {
                        console.log(res)
                        that.setData({
                            shopList:res.data.data
                        })
                        wx.hideLoading();
                    },
                    (err) => {
                        console.log(err)
                        wx.hideLoading();
                        wx.showToast({
                            title: err,
                            icon:"none"
                        })
                    })
                    // qqmapsdk.reverseGeocoder({
                    //     location: {
                    //         latitude: res.latitude,
                    //         longitude: res.longitude
                    //     },
                    //     coord_type: 5,
                    //     success: function(res) {
                    //         console.log(res)
                    //         that.setData({

                    //         });
                    //     },
                    //     fail: function(err) {
                    //         console.log(err)
                    //     }
                    // });
            },
            fail: function(err) {

            }
        });
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