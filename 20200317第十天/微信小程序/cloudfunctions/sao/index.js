// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require("axios");
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let result = "";
  await axios({
    url: "https://api.laolan-runtu.xyz/home/1",
    method: "GET"
  }).then(res => {
    result = res;
  }).catch(err => {
    result = err;
  });

  return result;
}