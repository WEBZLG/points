// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      selectAllStatus: true, // 全选状态，默认全选
      totalPrice: 0, //积分zonge，初始为0
      selectedNum:0,
      management:"管理",
      btnShow:true,//兑换和删除切换
      goodsList: [{
          id: 1,
          title: '1Apple iPhone XR (A2108) 128GB 珊瑚色 移动联通电信4G手机 双卡双待',
          image: '../../images/shop.png',
          addr:"黑龙江省哈尔滨市平房区新疆大街117号红旗MALLF1",
          num: 1,
          price: 180,
          selected: true
      },
      {
          id: 2,
          title: '2Apple iPhone XR (A2108) 128GB 珊瑚色 移动联通电信4G手机 双卡双待',
          image: '../../images/shop.png',
          addr:"黑龙江省哈尔滨市平房区新疆大街117号红旗MALLF1",
          num: 1,
          price: 62,
          selected: true
      }]

  },
    /**
      * 购物车全选事件
      */
    selectAll(e) {
        console.log(e)
        // 全选ICON默认选中
        let selectAllStatus = this.data.selectAllStatus;
        // true  -----   false
        selectAllStatus = !selectAllStatus;
        // 获取商品数据
        let goodsList = this.data.goodsList;
        // 循环遍历判断列表中的数据是否选中
        for (let i = 0; i < goodsList.length; i++) {
            goodsList[i].selected = selectAllStatus;
        }
        // 页面重新渲染
        this.setData({
            selectAllStatus: selectAllStatus,
            goodsList: goodsList
        });
        // 计算金额方法
        this.count_price();
    },
    /**
       * 当前商品选中事件
       */
    selectList(e) {
        console.log(e)
        var that = this;
        // 获取选中的radio索引
        var index = e.currentTarget.dataset.index;
        // 获取到商品列表数据
        var goodsList = that.data.goodsList;
        // 默认全选
        that.data.selectAllStatus = true;
        // 循环数组数据，判断----选中/未选中[selected]
        goodsList[index].selected = !goodsList[index].selected;
        // 如果数组数据全部为selected[true],全选
        for (var i = goodsList.length - 1; i >= 0; i--) {
            if (!goodsList[i].selected) {
                that.data.selectAllStatus = false;
                break;
            }
        }
        // 重新渲染数据
        that.setData({
            goodsList: goodsList,
            selectAllStatus: that.data.selectAllStatus
        })
        // 调用计算金额方法
        that.count_price();
    },
    /**
     * 绑定加数量事件
     */
    btn_add(e) {
        // 获取点击的索引
        const index = e.currentTarget.dataset.index;
        // 获取商品数据
        let goodsList = this.data.goodsList;
        // 获取商品数量
        let num = goodsList[index].num;
        // 点击递增
        num = num + 1;
        goodsList[index].num = num;
        // 重新渲染 ---显示新的数量
        this.setData({
            goodsList: goodsList
        });
        // 计算金额方法
        this.count_price();
    },
    /**
   * 绑定减数量事件
   */
    btn_minus(e) {
        //   // 获取点击的索引
        const index = e.currentTarget.dataset.index;
        // const obj = e.currentTarget.dataset.obj;
        // console.log(obj);
        // 获取商品数据
        let goodsList = this.data.goodsList;
        // 获取商品数量
        let num = goodsList[index].num;
        // 判断num小于等于1  return; 点击无效
        if (num <= 1) {
            return false;
        }
        // else  num大于1  点击减按钮  数量--
        num = num - 1;
        goodsList[index].num = num;
        // 渲染页面
        this.setData({
            goodsList: goodsList
        });
        // 调用计算金额方法
        this.count_price();
    },

    // 计算金额方法
    count_price() {
        // 获取商品列表数据
        let goodsList = this.data.goodsList;
        // 声明一个变量接收数组列表price
        let total = 0;
        let index = 0;
        // 循环列表得到每个数据
        for (let i = 0; i < goodsList.length; i++) {
            // 判断选中计算价格
            if (goodsList[i].selected) {
                // 所有价格加起来 count_money
                index ++
                total += goodsList[i].num * goodsList[i].price;
            }
        }
        // 最后赋值到data中渲染到页面
        this.setData({
            goodsList: goodsList,
            selectedNum:index,
            totalPrice: total.toFixed(2)
        });
    },
    // 管理
    management(e){
        if (this.data.management=="管理"){
            this.setData({
                management:"完成",
                btnShow:false
            })
        }else{
            this.setData({
                management: "管理",
                btnShow: true
            })
        }
    },
    deleteGoods: function (e) {
        var that = this;
        // 获取索引
        const index = e.currentTarget.dataset.index;
        // 获取商品列表数据
        let goodsList = this.data.goodsList;
        // wx.showModal({
        //     title: '提示',
        //     content: '确认删除吗',
        //     success: function (res) {
        //         if (res.confirm) {
        //             // 删除索引从1
        //             goodsList.splice(index, 1);
        //             // 页面渲染数据
        //             that.setData({
        //                 goodsList: goodsList
        //             });
        //             // 如果数据为空
        //             if (!goodsList.length) {
        //                 that.setData({
        //                     hasList: false
        //                 });
        //             } else {
        //                 // 调用金额渲染数据
        //                 that.count_price();
        //             }
        //         } else {
        //             console.log(res);
        //         }
        //     },
        //     fail: function (res) {
        //         console.log(res);
        //     }
        // })
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
      // 价格方法
      this.count_price();

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