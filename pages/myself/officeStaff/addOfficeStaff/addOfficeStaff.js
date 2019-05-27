// pages/myself/officeStaff/addOfficeStaff/addOfficeStaff.js
const app = getApp()
var ajax = require("../../../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexBank: 0,
        indexYear:0,
        selectBank:[],//支行列表
        selectYear:[],//年限比率
        ratio:"",//比率
        bank:"",//银行机关人员
        name:"",//客户姓名
        id:"",//客户id
        money:"",//存储金额
        totalPoints:"",//总积分
        ratioNum:"",//利率年数
        ratioRatio:""//利率
    },
    // 获取输入值
    getName(e){
        this.setData({
            name:e.detail.value
        })
    },
    getId(e) {
        this.setData({
            id: e.detail.value
        })
    },
    getMoney(e) {
        this.setData({
            money: e.detail.value
        })
        this.pointsTotal();
    },
    // 获取支行列表
    getBankList(){
        var that = this;
        var item = {
            'user_id': app.globalData.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integralmall/branch', item,
            (res) => {
                console.log(res)
                that.setData({
                    selectBank:res.data.lists,
                    bank: res.data.lists[0].id
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
    // 获取年限比率
    getYearList() {
        var that = this;
        var item = {
            'user_id': app.globalData.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integralmall/ratio', item,
            (res) => {
                console.log(res)
                that.setData({
                    selectYear: res.data.list,
                    ratio: res.data.list[0].id,
                    ratioRatio: res.data.list[0].ratio,
                    ratioNum: res.data.list[0].num
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
    //申请积分
    applyPoints(){
        var id = this.data.id;
        var name = this.data.name;
        var money = this.data.money;
        if(id==""||name==""||money==""){
            wx.showToast({
                title: '请填写完整参数',
                icon:"none"
            })
        }else{
        var item = {
            'user_id': app.globalData.userId,
            'partner_id':id,
            'true_name':name,
            'money':money,
            'ratio_id':this.data.ratio,
            'reviewer_id':this.data.bank
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'user/applyIntegral', item,
            (res) => {
                console.log(res)
                wx.hideLoading();
                if(res.code==0){
                    wx.showToast({
                        title: '申请成功！',
                    })
                    setTimeout(function(){
                        wx.navigateBack()
                    },2000)
                }else{
                    wx.showToast({
                        title: '申请失败！',
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
        }
    },
    // 下拉选择
    bankPickerChange(e) {
        this.setData({
            indexBank: e.detail.value,
            bank: this.data.selectBank[e.detail.value].id
        })
    },
    yearPickerChange(e) {
        this.setData({
            indexYear: e.detail.value,
            ratio: this.data.selectYear[e.detail.value].id,
            ratioRatio: this.data.selectYear[e.detail.value].ratio,
            ratioNum: this.data.selectYear[e.detail.value].num
        })
        this.pointsTotal();
    },
    // 积分计算
    pointsTotal(){
        var that = this;
        this.setData({
            totalPoints: that.data.money * that.data.ratioRatio * that.data.ratioNum
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBankList();
        this.getYearList();
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