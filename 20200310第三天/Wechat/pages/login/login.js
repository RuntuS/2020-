// pages/login/login.js
let lesson = "云开发技术训练营";
let enname = "CloudBase Camp";
let x = 3, y = 4, z = 5.001, a = -3, b = -4, c = -5;
let now = new Date();
let sd = {a : 1, b : 2};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sd: sd.toString(),
    charat: lesson.charAt(4),
    concat: enname.concat(lesson),
    uppercase: enname.toUpperCase(),
    abs: Math.abs(b),
    pow: Math.pow(x, y),
    sign: Math.sign(a),
    now: now.toString(),
    fullyear: now.getFullYear(),
    date: now.getDate(),
    day: now.getDay(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    time: now.getTime()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // this.data.obj = this.data.obj.toString();
      // console.log(this.data.obj)
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
  catchD(e){
    wx.navigateTo({
      url: `/pages/index/index?id=${e.currentTarget.dataset.id}`,
    })
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

  scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  scrollToPosition() {
    wx.pageScrollTo({
      scrollTop: 6000,
      duration: 300
    })
  },

  modalTap() {
    wx.showModal({
      title: '学习声明',
      content: '学习小程序的开发是一件有意思的事情，我决定每天打卡学习',
      showCancel: true,
      confirmText: '确定',
      success(res) {
        if (res.confirm) {
          console.log('用户点击了确定')
        } else if (res.cancel) {
          console.log('用户点击了取消')
        }
      }
    })
  },
})