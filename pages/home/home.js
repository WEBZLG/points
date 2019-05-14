// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      idx:0,
      currentTab: 0, //预设当前项的值
      scrollLeft: 0, //tab标题的滚动条位置
      navClass:"nav-tab",//滚动导航类
      navList: [{
          id: 0,
          name: "全部"
      },
      {
          id: 1,
          name: "餐饮"
      },
      {
          id: 2,
          name: "酒店"
      },
      {
          id: 3,
          name: "商超"
      },
      {
          id: 4,
          name: "数码"
      },
      {
          id: 5,
          name: "教育"
      } ,
    {
        id: 5,
        name: "服务"
    } ,
    {
        id: 5,
        name: "其他"
    }
      ],
  },
    //   去认证
    goIdentification(e){
        wx.navigateTo({
            url: './identification/identification',
        })
    },
    // 搜索结果
    searchDetails(e){
        wx.navigateTo({
            url: './search/search',
        })
    },
    couponList(e){
        wx.navigateTo({
            url: './coupon/coupon',
        })
    },
    // 滚动切换标签样式
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) { return false; }
        else {
            this.setData({
                currentTab: cur
            })
        }
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
        if (e.scrollTop>=335){
            this.setData({
                navClass: "nav-tab-fixed"
            })
        }else{
            this.setData({
                navClass: "nav-tab",
            })
        }
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