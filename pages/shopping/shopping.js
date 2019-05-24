// pages/shopping/shopping.js
const app = getApp()
var ajax = require("../../utils/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      selectAllStatus: false, // 全选状态，默认全选
      totalPrice: 0, //积分zonge，初始为0
      selectedNum:0,
      management:"管理",
      btnShow:true,//兑换和删除切换
      goodsList: [],
      selectedArray: [],//提交/删除数组
      isNone:true
  },
    /**
      * 购物车全选事件
      */
    selectAll(e) {
        // console.log(e)
        // 全选ICON默认选中
        let selectAllStatus = this.data.selectAllStatus;
        // true  -----   false
        selectAllStatus = !selectAllStatus;
        // 获取商品数据
        let goodsList = this.data.goodsList;
        // 循环遍历判断列表中的数据是否选中
        for (let i = 0; i < goodsList.length; i++) {
            goodsList[i].is_select = selectAllStatus;
        }
        // 页面重新渲染
        this.setData({
            selectAllStatus: selectAllStatus,
            goodsList: goodsList
        });
        // 全选反选数组变化
        if (selectAllStatus==true){
                this.setData({
                    selectedArray: []
                })       
            for (let i = 0; i < goodsList.length; i++) {
                this.data.selectedArray.push(goodsList[i].cart_id)
                console.log(this.data.selectedArray)   
            }
        }else{
            this.setData({
                selectedArray: []
            })   
        }
        // 计算金额方法
        this.count_price();
    },
    /**
       * 当前商品选中事件
       */
    selectList(e) {
        // console.log(e)
        var that = this;
        // 获取选中的radio索引
        var index = e.currentTarget.dataset.index;
        // 获取到商品列表数据
        var goodsList = that.data.goodsList;
        // 默认全选
        that.data.selectAllStatus = true;
        // 循环数组数据，判断----选中/未选中[is_select]
        goodsList[index].is_select = !goodsList[index].is_select;
        // 单选数组变化
        if (goodsList[index].is_select==true){
            that.data.selectedArray.push(goodsList[index].cart_id)
        }else{
            that.setData({
                selectedArray: that.data.selectedArray.filter(function (item) {
                    return item != goodsList[index].cart_id
                })
            })
        }
        console.log(that.data.selectedArray)
        // 如果数组数据全部为is_select[true],全选
        for (var i = goodsList.length - 1; i >= 0; i--) {
            if (!goodsList[i].is_select) {
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
        const catid = e.currentTarget.dataset.catid
        // 获取商品数据
        let goodsList = this.data.goodsList;
        // 获取商品数量
        let num = goodsList[index].num;
        // 点击递增
        num = num + 1;
        goodsList[index].num = num;
        // 更新购物车
        this.updataCar(catid, num)
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
        const catid = e.currentTarget.dataset.catid
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
        // 更新购物车
        this.updataCar(catid,num)
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
        // 声明一个变量接收数组列表unitIntegral
        let total = 0;
        let index = 0;
        // 循环列表得到每个数据
        for (let i = 0; i < goodsList.length; i++) {
            // 判断选中计算价格
            if (goodsList[i].is_select) {
                // 所有价格加起来 count_money
                index ++
                total += goodsList[i].num * goodsList[i].unitIntegral;
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

// 更新購物車数据
    updataCar(id,num){
        var that = this;
        var item = {
            'user_id': app.globalData.userId,
            'id':id,
            'num':num
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'cart/update', item,
            (res) => {
                wx.hideLoading();
                console.log(res)
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
    // 删除商品
    deleteGoods: function (e) {
        var that = this;
        if (that.data.selectedArray==""){
            wx.showToast({
                title: '未选择删除的商品',
                icon:"none"
            })
        }else{
        wx.showModal({
            title: '提示',
            content: '确认删除吗',
            success: function (res) {
                if (res.confirm) {
                    var item = {
                        'user_id': app.globalData.userId,
                        'cart_id_list': JSON.stringify(that.data.selectedArray)
                    }
                    wx.showLoading();
                    ajax.wxRequest('POST', 'cart/delete', item,
                        (res) => {
                            wx.hideLoading();
                            if(res.code == 0){
                                wx.showToast({
                                    title: res.message,
                                })
                                that.onShow();
                            }else{
                                wx.showToast({
                                    title: res.message,
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
                    console.log(res);
                }
            },
            fail: function (res) {
                console.log(res);
            }
        })
        }
    },
    // 购买商品
    buyGoods(e){   
        var that = this;
        if (that.data.selectedArray == "") {
            wx.showToast({
                title: '未选择购买的商品',
                icon: "none"
            })
        } else {
            wx.showModal({
                title: '兑换商品',
                content: '确定兑换此商品？',
                cancelText: "取消",
                confirmText: "确定",
                success: function (res) {
                    if (res.confirm) {
                        var item = {
                            'user_id': app.globalData.userId,
                            'cart_id_list': JSON.stringify(that.data.selectedArray),
                            'goods_info':""
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
                                                    url: '../exchange/exchange'
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
        }
    },
    // 购物车列表数据
    getCarList(){
        var that = this;
        var item = {
            'user_id': app.globalData.userId
        }
        wx.showLoading();
        ajax.wxRequest('POST', 'cart/lists', item,
            (res) => {
                console.log(res)
                wx.hideLoading();
                that.setData({
                    goodsList:res.data.list
                })
                if (res.data.list.length==0){
                    that.setData({
                        isNone: true
                    })
                }else{
                    that.setData({
                        isNone: false
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
    },
    // 商品详情
    goodsDetails(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../home/goodsDetails/goodsDetails?id=' + id,
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
      // 价格方法
      this.count_price();
    //   购物车列表数据
      this.getCarList();
    this.setData({
        selectAllStatus:false
    })
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