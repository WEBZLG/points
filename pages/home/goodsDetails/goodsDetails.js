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
        canvasShow:true,
        newbackpic:"",
        newpicstr:"",
        codeUrl:""
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
        console.log(options)
        // options 中的scene需要使用decodeURIComponent才能获取到生成二维码时传入的scene
        var scene = decodeURIComponent(options.scene)//参数二维码传递过来的参数
        // var senceUid = scene.split("&")[0];
        // var senceRid = scene.split("&")[1];
        var that = this;
        // 分享者uid
        app.globalData.shareUid=options.userId
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
        console.log(ops)
        var that = this;
        var id = ops.target.dataset.id;
        var userId = app.globalData.userId;
        console.log(id,userId)
        // if(ops.from==='button'){}
        return {
            title: '龙江银行积分商城',
            path: '/pages/home/shareGoods/shareGoods?id=' + id + '&userId=' + userId,
            success: function(res) {
                console.log(res)
                wx.showToast({
                    title: '转发成功！',
                })
                that.cancel()
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
    // 生成海报
    getImage: function (url) {
        return new Promise((resolve, reject) => {
            wx.getImageInfo({
                src: url,
                success: function (res) {
                    resolve(res)
                },
                fail: function () {
                    reject("")
                }
            })
        })
    },
    getImageAll: function (image_src) {
        let that = this;
        var all = [];
        image_src.map(function (item) {
            all.push(that.getImage(item))
        })
        return Promise.all(all)
    },
    //创建
    sharePyq: function (e) {
        wx.showLoading()
        var that = this;
        that.cancel();
        var item = {
            'user_id': app.globalData.userId,
            'goods_id':e.currentTarget.dataset.id
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'share/qrcode', item,
            (res) => {
                var url = res.data.url;
                var qrbg = res.data.qrcode_bg;
                //获取网络图片本地路径
                wx.getImageInfo({
                    src: that.data.goodsDetails.pic_list[0],
                    success: function (res) {
                        that.setData({
                            newbackpic: res.path,
                            codeUrl: url
                        });
                        wx.getImageInfo({
                            src: url,
                            success: function (res) {
                                that.setData({
                                    newpicstr: res.path
                                })
                                let bg = that.data.newbackpic;
                                let qr = that.data.newpicstr;
                                that.getImageAll([bg, qr, qrbg]).then((res) => {
                                    console.log(res)
                                    wx.getImageInfo({
                                        src: qrbg,
                                        success: function (res) {

                                        }
                                    })
                                    const ctx = wx.createCanvasContext('shareCanvas')
                                    // 底图
                                    ctx.drawImage(res[0].path, 0, 0, 315, 330);

                                    // 背景
                                    ctx.drawImage(res[2].path, 0, 320, 300, 100)
                                    // 文字
                                    ctx.setTextAlign('center') // 文字居中
                                    ctx.setFillStyle('#fff') // 文字颜色
                                    ctx.setFontSize(16) // 文字字号
                                    ctx.fillText("我在积分商城发现一个宝贝", 110, 350)
                                    ctx.fillText("扫码注册即有积分相送哦！", 110, 370)
                                    // 小程序码
                                    ctx.drawImage(res[1].path, 210, 280, 80, 80)
                                    ctx.stroke()
                                    ctx.draw()
                                    wx.hideLoading()
                                    that.setData({
                                        canvasShow: false
                                    })
                                    wx.showModal({
                                        title: '提示',
                                        content: '图片绘制完成请保存到相册',
                                        showCancel: false,
                                        confirmText: "点击保存",
                                        success: function (res) {
                                            that.save()
                                        }
                                    })
                                })
                            },
                            fail: function (res) {
                            }
                        });
                    },
                    fail: function (res) {
                    }
                });
                that.setData({
                    
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
    //保存
    save: function () {
        var that = this;
        wx.canvasToTempFilePath({ //canvas 生成图片 生成临时路径
            canvasId: 'shareCanvas',
            success: function (res) {
                //console.log(res)
                wx.saveImageToPhotosAlbum({ //下载图片
                    filePath: res.tempFilePath,
                    success: function () {
                        wx.showToast({
                            title: "图片已保存到相册",
                            icon: "success",
                        });
                        setTimeout(function () {
                            that.setData({
                                canvasShow: true
                            })

                            var item = {
                                'user_id': app.globalData.userId,
                                'path': that.data.codeUrl
                            }
                            ajax.wxRequest('POST', 'share/un_qrcode', item,
                                (res) => { },
                                (err) => {})
                        }, 3000)
                    },
                    fail(err) {
                        wx.showToast({
                            title: '请打开相册储存权限',
                            icon: "none"
                        })
                    }
                })
            }
        })
    }

})