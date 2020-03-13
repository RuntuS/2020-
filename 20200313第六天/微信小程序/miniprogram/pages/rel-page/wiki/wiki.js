// miniprogram/pages/rel-page/wiki/wiki.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tem_file_path : [],
    no_photo : true,
    is_loading : false,
    colum_name : ""
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




  upload_image(){
    let that = this;
    // 先调用图片选择
    wx.chooseImage({
      count: 9,
      sizeType: ["compressed","original"],
      sourceType : ["album"],
      success: function(res) {
          console.log(res);
          console.log(res.tempFilePaths);
          const tem_file_path =  res.tempFilePaths;
          that.setData({
            tem_file_path ,
            no_photo : false,
            is_loading : true
          });

        
      },
    })
  },

  continue_upload(){
    let that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ["compressed", "original"],
      sourceType: ["album"],
      success: function(res) {
       let tem_file_path = that.data.tem_file_path.concat(res.tempFilePaths);
       that.setData({
        tem_file_path
       }) 
      },
    })
  },

  upload_to_cloud(){
    if(this.data.colum_name === "")
    {
      wx.showToast({
        title : "相册名称不能为空",
        icon : "none",
        duration: 2000
      })
    }
    else
    {
      wx.showLoading({
        title: '上传中',
      })
      let that = this;
      let filePath = [...this.data.tem_file_path];
      let cloudPath = this.data.tem_file_path.map(e => {
        return `${that.data.colum_name}/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + e.match(/\.[^.]+?$/);
      });

      console.log(cloudPath);
      for (let i in cloudPath) {
        
        let cloudP = cloudPath[i];
        let fileP = filePath[i]; 
        wx.cloud.uploadFile({
          cloudPath: cloudP,
          filePath: fileP,
          success(res) {
            console.log(`上传成功!信息: ${res}`)
            that.setData({
              is_loading: false
            })
          },
          fail(err) {
            console.log(err);
          }
        })

        console.log(i , "sad", cloudPath.length)
        
      }

      wx.hideLoading();
      wx.showToast({
        title: '成功',
        icon: "success",
        duration: 2000
      })

    }
    
  },

  current_catch_input(e){
    this.setData({
      colum_name : e.detail.value
    })
  }
})