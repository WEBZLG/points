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
    onShow: function(options) {
        var that = this;
        // 获取当前位置

        // this.getLocation()
        this.again_getLocation()
    },
        getLocation: function () {
            var that = this;
            //1、获取当前位置坐标
            wx.getLocation({
                type: "gcj02",
                success: function (res) {
                    // console.log(res)
                    // 获取门店列表
                    var item = {
                        'user_id': app.globalData.userId,
                        'lng': res.longitude,
                        'lat': res.latitude,
                        'page': "",
                        'limit': "",
                        'keyword': ""
                    }
                    wx.showLoading();
                    ajax.wxRequest('POST', 'integralmall/shop', item,
                        (res) => {
                            wx.hideLoading();
                            console.log(res)
                            that.setData({
                                shopList: res.data.data
                            })
                        },
                        (err) => {
                            console.log(err)
                            wx.hideLoading();
                            wx.showToast({
                                title: err,
                                icon: "none"
                            })
                        })
                },
                fail: function (err) {
                    console.log(err)
                }
            });
        },
    again_getLocation: function () {
        let that = this;
        // 获取位置信息
        wx.getSetting({
            success: (res) => {
                console.log(res)
                if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
                    wx.showModal({
                        title: '是否授权当前位置',
                        content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
                        success: function (res) {
                            console.log(res)
                            if (res.cancel) {
                                that.setData({
                                    isshowCIty: false
                                })
                                wx.showToast({
                                    title: '授权失败',
                                    icon: 'success',
                                    duration: 1000
                                })
                            } else if (res.confirm) {
                                wx.openSetting({
                                    success: function (dataAu) {
                                        console.log(dataAu)
                                        if (dataAu.authSetting["scope.userLocation"] == true) {
                                            wx.showToast({
                                                title: '授权成功',
                                                icon: 'success',
                                                duration: 1000
                                            })
                                            //再次授权，调用getLocationt的API
                                            that.getLocation(that);
                                        } else {
                                            wx.showToast({
                                                title: '授权失败',
                                                icon: 'success',
                                                duration: 1000
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
                    that.getLocation(that);
                }
                else { //授权后默认加载
                    that.getLocation(that);
                }
            }
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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