// pages/home/goodsDetails/goodsDetails.js
var ajax = require("../../../utils/ajax.js");
var WxParse = require('../../../utils/wxParse/wxParse.js');
import { promisify } from '../../../utils/promise'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetails: '',
        goodsDesc: '',
        modelShow: true,
        canvasShow:true
    },
    // 去首页
    goHome() {
        wx.reLaunch({
            url: '../../home/home',
        })
    },
    // 去购物车
    goShopping() {
        wx.reLaunch({
            url: '../../shopping/shopping',
        })
    },
    // 去分享
    goShare() {
        this.setData({
            modelShow: false
        })
    },
    // 取消分享
    cancel() {
        this.setData({
            modelShow: true
        })
    },
    // 立即兑换
    buyNow(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '兑换商品',
            content: '确定兑换此商品？',
            cancelText: "取消",
            confirmText: "确定",
            success: function(res) {
                if (res.confirm) {
                    var item = {
                        'user_id': app.globalData.userId,
                        'cart_id_list': "",
                        'goods_info': JSON.stringify({
                            "goods_id": id,
                            "attr": [],
                            "num": 1
                        })
                    }
                    wx.showLoading();
                    ajax.wxRequest('POST', 'integral_order/submit', item,
                        (res) => {
                            console.log(res)
                            if (res.code == 0) {
                                var item = {
                                    'user_id': app.globalData.userId,
                                    'order_id': res.data.order_id
                                }
                                ajax.wxRequest('POST', 'integral_order/payData', item,
                                    (res) => {
                                        wx.hideLoading();
                                        console.log(res)
                                        if (res.code == 0) {
                                            wx.redirectTo({
                                                url: '../../exchange/exchange'
                                            })
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
                                wx.hideLoading();
                                wx.showToast({
                                    title: res.message,
                                    icon: "none"
                                })
                            }
                        },
                        (err) => {
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
    onLoad: function(options) {
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'id': options.id
        }
        // 商品详情
        wx.showLoading();
        ajax.wxRequest('POST', 'integral_goods/detail', item,
            (res) => {
                console.log(res)
                that.setData({
                    goodsDetails: res.data,
                    goodsDesc: res.data.detail
                })
                WxParse.wxParse('article', 'html', this.data.goodsDesc, this, 5);
                wx.hideLoading();
            },
            (err) => {
                wx.hideLoading();
                wx.showToast({
                    title: '数据加载失败' + err,
                    icon: "none"
                })
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
    onShareAppMessage: function(ops) {
        var that = this;
        var uid = ops.target.dataset.uid;
        var videoId = ops.target.dataset.vid
        // if(ops.from==='button'){}
        return {
            title: '龙江银行积分商城',
            path: '/pages/playvideo/playvideo?uid=' + uid + '&videoId=' + videoId,
            success: function(res) {
                //console.log(res)
                wx.showToast({
                    title: '转发成功！',
                })
            },
            fail: function(res) {
                // 转发失败
                wx.showToast({
                    title: '转发失败',
                    icon: "none"
                })
            }
        }
    },
    // 分享朋友圈
    sharePyq(){
        var that = this;
        this.cancel();
        wx.showLoading()
        const wxGetImageInfo = promisify(wx.getImageInfo)
        Promise.all([
            wxGetImageInfo({
                src: 'http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg'
            }),
            wxGetImageInfo({
                src: 'http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg'
            })
        ]).then(res => {
            that.setData({
                canvasShow: false
            })
            const ctx = wx.createCanvasContext('shareCanvas')

            // 底图
            ctx.drawImage(res[0].path, 0, 0, 600, 900)

            // 作者名称
            ctx.setTextAlign('center')    // 文字居中
            ctx.setFillStyle('#fff')  // 文字颜色：黑色
            ctx.setFontSize(16)         // 文字字号：22px
            ctx.fillText("我在积分商城发现一个宝贝，扫码注册既有积分相送哦！", 100 / 2, 250)

            // 小程序码
            const qrImgSize = 180
            ctx.drawImage(res[1].path, (600 - qrImgSize) / 2, 530, qrImgSize, qrImgSize)
            ctx.stroke()
            ctx.draw()
            wx.hideLoading()
        })
    },
    savePhoto(){
        const wxCanvasToTempFilePath = promisify(wx.canvasToTempFilePath)
        const wxSaveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum)
        wxCanvasToTempFilePath({
            canvasId: 'shareCanvas'
        }, this).then(res => {
            return wxSaveImageToPhotosAlbum({
                filePath: res.tempFilePath
            })
        }).then(res => {
            wx.showToast({
                title: '已保存到相册'
            })
        })
    }
})