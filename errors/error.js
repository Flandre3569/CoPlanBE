const errors = require('../errors/error-types');

const errorHandler = (err, ctx) => {
  let status, message;
  switch (err.message) {
    case errors.NO_USER_OR_PASSWORD:
      status = 400;
      message = '请输入用户名和密码';
      break;
    case errors.ALREADY_HAVE_USER:
      status = 409;
      message = '该用户名已存在';
      break;
    case errors.USERNAME_OR_PASSWORD_ERROR:
      status = 409;
      message = '用户名或密码错误';
      break;
    case errors.NO_AUTHORIZATION:
      status = 401;
      message = 'token未授权';
      break;
    case errors.PARAMETER_ERROR:
      status = 400;
      message = '参数错误，请核实您的邮箱';
      break;
    case errors.FALIURE_SEND_EMAIL:
      status = 421;
      message = '订阅失败';
      break;
    default:
      status = 404;
      message = 'NOT FOUND';
  }

  ctx.response.body = message;
  ctx.response.status = status;
}

module.exports = { errorHandler };