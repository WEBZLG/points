//app.js
var ajax = require("./utils/ajax.js")
App({
    onLaunch: function() {
        var that = this;
        // 获取用户信息
        wx.getSetting({
            success: res => {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    wx.getStorage({
                        key: 'userId',
                        success(res) {
                            console.log(res)
                            that.globalData.userId = res.data
                        }
                    })
                    try {
                        const value = wx.getStorageSync('userId')
                        console.log(value)
                        if (value) {
                            that.globalData.userId = value
                        }
                    } catch (e) {
                        wx.login({
                            success: res => {
                                var item = {
                                    code: res.code
                                }
                                ajax.wxRequest('POST', 'login/wx_xcx', item,
                                    (res) => {
                                        console.log(res)
                                        this.globalData.userId = res.data.id;
                                    })
                            }
                        })
                    }
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        userId: null,
        openId: null,
        shareUid:null
    }
})