// miniprogram/pages/foot/foot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  clickView: function (event) {
    console.log('我是view', event)
    wx.navigateTo({
      url: "/pages/home/detail/detail?id=viewclick&uid=tcb&key=tap&ENV=weapp&frompage=lifecycle"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(1);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:  function () {
    console.log(2);
  },  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    console.log("onload加载多次")
    console.log(3);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(4);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(5);
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
  getUserInfomation: function (event) {
    console.log('getUserInfomation打印的事件对象', event)
  },

  chooseImg: function () {
    let that = this
    wx.chooseImage({
      count: 5,
      sizeType: ['compressed,"original'],
      sourceType: ['album'],
      success(res) {
        const imgurl = res.tempFilePaths
        console.log(res);
          that.setData({
          imgurl
        })
      }
    })
  },
  previewImg: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.imgurl,
    })
  },
})