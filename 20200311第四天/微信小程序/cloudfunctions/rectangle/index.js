// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("依然是测试，依然是同步调用")
  return {
    circum: (event.width + event.height) * 2,
    area: event.width * event.height
  }
}