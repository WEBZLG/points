// pages/home/home.js
const app = getApp()
var ajax = require("../../utils/ajax.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
      idx:0,
      currentTab: 0, //预设当前项的值
      scrollLeft: 0, //tab标题的滚动条位置
      navClass:"none",//滚动导航类
      userInfo:{},//微信个人信息
      goodsTypeList:[],//商品分类列表
      goodsList:[],//商品列表
      searchText:'',//搜索内容
      bannerList:[],//banner列表
      isCert:"去认证",//是否认证
      autoHeight:'200rpx'//商品框高度
  },
    //   去认证
    goIdentification(e){
        if(this.data.isCert=="已认证"){
            wx.navigateTo({
                url: './isIdentification/isIdentification',
            })
        }else{
            wx.navigateTo({
                url: './identification/identification',
            })
        }
    },
    // 搜索文字
    searchText(e){
        this.setData({
            searchText:e.detail.value
        })
    },
    // 搜索结果
    searchDetails(e){
        var keyword = this.data.searchText;
        wx.navigateTo({
            url: './search/search?keyword='+keyword,
        })
    },
    // 优惠券跳转
    couponList(e){
        wx.navigateTo({
            url: './coupon/coupon',
        })
    },

    // 滚动切换标签样式
    switchTab: function (e) {
        var id = e.currentTarget.dataset.list[e.detail.current].id
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
        this.getGoodsList(id)
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        var id = e.currentTarget.dataset.id;
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) { return false; }
        else {
            this.setData({
                currentTab: cur
            })
        }
        // this.getGoodsList(id)
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
        if (this.data.currentTab > 4) {
            this.setData({
                scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
    // 监听分类导航
    onPageScroll: function (e) {
        if (e.scrollTop>=330){
            this.setData({
                navClass: "block"
            })
        }else{
            this.setData({
                navClass: "none",
            })
        }
    },
    // 商品分类函数
    getGoodsType(e){
        var that = this;
        var item = {
            'user_id': app.globalData.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integral_cat/lists', item,
            (res) => {
                console.log(res)
                that.setData({
                    goodsTypeList:res.data.list
                })
                that.getGoodsList(res.data.list[0].id)
                wx.hideLoading();
            },
            (err) => {
                console.log(err)
                wx.hideLoading();
            })
    },
    // 商品列表函数
    getGoodsList(typeId) {
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'keyword':'',
            'cat_id': typeId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integral_goods/lists', item,
            (res) => {
                console.log(res)
                var autoHeight = Math.ceil(res.data.list.length / 2) * 500+'rpx'
                if (autoHeight=="0rpx"){
                    that.setData({
                        goodsList: res.data.list,
                        autoHeight: '200rpx'
                    })
                }else{
                    that.setData({
                        goodsList: res.data.list,
                        autoHeight: autoHeight
                    })
                }
                wx.hideLoading();
            },
            (err) => {
                console.log(err)
                wx.hideLoading();
            })
    },
    // 商品详情
    goodsDetails(e){
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: './goodsDetails/goodsDetails?id='+id,
        })
    },
    //轮播图
    getBanner(){
        var that = this;
        var item = {
            'user_id': app.globalData.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'integralmall/banner', item,
            (res) => {
                console.log(res)
                that.setData({
                    bannerList:res.data.list
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
    // 轮播图外链
    jumpOut(e){
        var outUrl = e.currentTarget.dataset.outurl;
        console.log(outUrl)
        wx.redirectTo({
            url: './webView/webView?outUrl=' + outUrl,
        })
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
               wx.hideLoading();
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
    //   获取个人信息
    getUserInfo() {
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'user/info', item,
            (res) => {
                if (res.data.is_cert == 1) {
                    that.setData({
                        isCert: "已认证",
                    })
                }
                wx.hideLoading();
            },
            (err) => {
                wx.hideLoading();
                wx.showToast({
                    title: '获取数据失败' + err,
                    icon: "none"
                })
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
      this.setData({
          userInfo: app.globalData.userInfo,
          currentTab:0
      });
      this.getGoodsType();
      this.getBanner();
      this.getUserInfo()
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