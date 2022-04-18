const errorTypes = require('../errors/error-types');
const check = {} //声明一个对象缓存邮箱和验证码，留着
const email = require('../middleware/email'); //引入封装好的函数
const service = require('../service/subscribe'); // 将订阅的邮箱进行存储

class Subscribe {
  async subscribe(ctx, next) {
    const mail = ctx.request.body.email;
    const code = parseInt(Math.random(0, 1) * 10000); //生成随机验证码
    check[mail] = code;
    if (!mail) {
      const error = new Error(errorTypes.PARAMETER_ERROR);
      return ctx.app.emit('error', error, ctx); //email出错时或者为空时
    }
    async function timeout() {
      return new Promise((resolve, reject) => {
        email.sendMail(mail, code, (state) => {
          resolve(state);
        })
      })
    }

    // 将邮箱存储到数据库中
    service.subscribe(mail);

    await timeout().then(state => {
      if (state) {
        return ctx.body = "success";
      } else {
        const error = new Error(errorTypes.FALIURE_SEND_EMAIL);
        return ctx.app.emit('error', error, ctx);
      }
    })
  }
}


module.exports = new Subscribe();
