// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main =  (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("这里是测试云函数，并且是同步调用")
  return {
    event
  }
}