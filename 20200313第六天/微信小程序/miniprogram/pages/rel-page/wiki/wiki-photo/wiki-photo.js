// miniprogram/pages/rel-page/wiki/wiki-photo/wiki-photo.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_name : "" ,//唯一标识相册名
    init_image: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.c_name)
    this.setData({
      c_name : options.c_name,
    })
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
    this.serach_photo(this,this.data.c_name);//进行索引
  },

  serach_photo(pointer_this, c_name) {
    db.collection("user_colum").where({
      colum_name: c_name
    }).get({
      success(res) {
        console.log(res);
        pointer_this.setData({
          init_image : [...res.data[0].imagePath]
        })
      }
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

  },

  add_photo(){

  },

  delete_photo(){
    
  }
})