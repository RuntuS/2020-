// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcb_router = require("tcb-router");
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new tcb_router({event});

  app.use(async (ctx,next) => {
    ctx.data = {}; //这里定义了data
    ctx.data.openId = event.userInfo.openId;
    console.log(`ctx = ${JSON.stringify(ctx)}`);
    console.log(`event = ${JSON.stringify(event)}`);
    await next();
  })

//对user 和 school添加中间件。
app.router(["user","school"],async(ctx,next) => {
  ctx.data.from = "小程序云函数";
  await next();
})


app.router("user",async(ctx,next) => {
  ctx.data.name = "有点骚";
  ctx.data.role = "develop";
  await next();
},async (ctx) => {
  ctx.data.nickName = "Van";
  ctx.body = {code : 0 , data : ctx.data};
})

  app.router("school", async (ctx, next) => {
    ctx.data.name = "草";
    ctx.data.role = "develop-school";
    await next();
  }, async (ctx) => {
    ctx.data.nickName = "Van";
    ctx.body = { code: 0, data: ctx.data };
  })

  return app.serve();
}