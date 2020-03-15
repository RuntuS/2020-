// 云函数入口文件
const cloud = require('wx-server-sdk')
const db = cloud.database()
const _ = db.command
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('user_colum').where({
      _openid : event.open_id,
      colum_name : event.c_name
    }).remove()
  } catch (e) {
    console.error(e)
  }
}