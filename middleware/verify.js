const errorTypes = require('../errors/error-types');
const service = require('../service/user');
const { PUBLIC_KEY } = require('../app/config');
const jwt = require('jsonwebtoken');

const userVerify = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    const error = new Error(errorTypes.NO_USER_OR_PASSWORD)
    return ctx.app.emit('error', error, ctx)
  }

  const result = await service.queryByName({ username,password });
  if (result.length) {
    const error = new Error(errorTypes.ALREADY_HAVE_USER);
    return ctx.app.emit('error', error, ctx);
  }
  
  await next();
}

const authVerify = async (ctx, next) => {
  const authorization = ctx.request.headers.authorization;
  const token = authorization.split(" ")[1];
  
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    console.log(result);
    await next();
  } catch (err) {
    const error = new Error(errorTypes.NO_AUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  userVerify, authVerify
};