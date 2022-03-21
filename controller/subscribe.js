const check = {} //声明一个对象缓存邮箱和验证码，留着
const email = require('../middleware/email'); //引入封装好的函数

class Subscribe {
  async subscribe(ctx, next) {
    const mail = ctx.request.body.email;
    const code = parseInt(Math.random(0, 1) * 10000); //生成随机验证码
    check[mail] = code;
    if (!mail) {
      return ctx.body = '参数错误' //email出错时或者为空时
    }
    async function timeout() {
      return new Promise((resolve, reject) => {
        email.sendMail(mail, code, (state) => {
          
          resolve(state);
        })
      })
    }
    
    await timeout().then(state => {
      if (state) {
        return ctx.body = "发送成功";
      } else {
        return ctx.body = "失败";
      }
    })
  }
}


module.exports = new Subscribe();
