// miniprogram/pages/rel-page/wiki/wiki.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tem_file_path : [],  //上传图片涉及到的图片路径
    no_photo : true,
    is_loading : false,
    colum_name : "",   //该相册名是随时变动的
    the_init_cloud_photo: "" //初始化时的渲染图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },

  //进入页面的时候，需要进行的
  initImage(pointer_this){
    db.collection("user_colum").where({
      _openid: app.globalData.open_id
    }).get({
      success(res){
        console.log(res);
        pointer_this.setData({
          the_init_cloud_photo : res.data
        })
        if(res.length !== 0)
        {
          pointer_this.setData({
            no_photo : false // 如果不为0，则有图
          })
        }
      }
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
    this.initImage(this);
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



// 图片预上传
  upload_image(){
    let that = this;
    // 先调用图片选择
    wx.chooseImage({
      count: 9,
      sizeType: ["compressed"],
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

// 继续上传后 可以选择添加图片，同时添加相册信息
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
      let currentNum = 0; //计时器
      let filepath = []; //存储本次上传的路径
      let that = this;
      let filePath = [...this.data.tem_file_path];
      let cloudPath = this.data.tem_file_path.map(e => {
        return `${that.data.colum_name}/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + e.match(/\.[^.]+?$/);
      });

        for (let i in cloudPath) {
          let cloudP = cloudPath[i];
          let fileP = filePath[i]; 
          let coName = that.data.colum_name;
          wx.cloud.uploadFile({
            cloudPath: cloudP,
            filePath: fileP,
            success(res) {
              currentNum++;
              console.log(`上传成功!信息: ${res}`)
              console.log(res);
              console.log(typeof res.fileID)
              filepath.push(res.fileID);//记录文件路径。进行索引
              console.log(filepath);
              that.setData({
                is_loading: false //改变页面展示
              })


              //数据库记录
              console.log("cloudPath.length",cloudPath.length);
              console.log("current ",currentNum);

              if(currentNum === cloudPath.length)
              {
                console.log("filepath",filepath);
                db.collection("user_colum").add({
                  data: {
                    open_id: app.globalData.open_id,
                    colum_name: coName,
                    imagePath: filepath
                  }
                })


                that.data.tem_file_path = [];//进行初始化。为下次上传做准备.

      
                setTimeout(that.initImage(that),3000) //更新下页面
              }
            },
            fail(err) {
              console.log(err);
            }
          })

          console.log(i, "sad", cloudPath.length)

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
  },



  ///详细图片跳转页面
  trun_to_photo(e){
    let colum_name = e.target.dataset.name;
    console.log(e);
    wx.navigateTo({
      url: `./wiki-photo/wiki-photo?c_name=${colum_name}`,
    })

  }
})