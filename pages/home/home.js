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
      searchText:''//搜索内容

  },
    //   去认证
    goIdentification(e){
        wx.navigateTo({
            url: './identification/identification',
        })
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
        console.log(e)
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
        // this.getGoodsList(e.detail.current)
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        console.log(e)
        var id = e.currentTarget.dataset.id;
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) { return false; }
        else {
            this.setData({
                currentTab: cur
            })
        }
        this.getGoodsList(id)
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
        ajax.wxRequest('POST', 'integral_cat/lists', item,
            (res) => {
                console.log(res)
                that.setData({
                    goodsTypeList:res.data.list
                })
                that.getGoodsList(0)
            },
            (err) => {
                console.log(err)
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
        ajax.wxRequest('POST', 'integral_goods/lists', item,
            (res) => {
                console.log(res)
                that.setData({
                    goodsList: res.data.list
                })
            },
            (err) => {
                console.log(err)
            })
    },
    // 商品详情
    goodsDetails(e){
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: './goodsDetails/goodsDetails?id='+id,
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
         userInfo: app.globalData.userInfo
     });
      this.getGoodsType();
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