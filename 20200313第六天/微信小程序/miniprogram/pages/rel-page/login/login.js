// miniprogram/pages/rel-page/login/login.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    buttonClass : true,
    isH : true
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

  },

  getUserInfomation(e){
    console.log("你好")
    console.log(e)
    this.setData({
      userInfo : e.detail.userInfo,
      isH : false
    })

    wx.cloud.callFunction({
      name : "login",
      data : {},
      success(res) {
        app.globalData.openid = res.result.openid
        console.log(res.result.openid)
      }
    })
    app.globalData.userInfo = this.data.userInfo;
  },

  router_to_wiki(){
    wx.navigateTo({
      url: './../wiki/wiki',
    })
  },
  
  router_to_about_me(){
    wx.navigateTo({
      url: './../about-me/about-me',
    })
  }
})