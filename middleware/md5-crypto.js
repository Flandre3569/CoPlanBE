const md5PWD = require('../utils/pwd-handle');

const md5Crypto = async (ctx, next) => {
  let { password } = ctx.request.body;
  password = md5PWD(password);
  ctx.request.body.password = password;
  await next();
}

module.exports = {
  md5Crypto
}