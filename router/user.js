const Router = require('@koa/router');
const { register, login, success } = require('../controller/user');
const { authSign } = require('../controller/authorization');
const { userVerify, authVerify } = require('../middleware/verify');
const { md5Crypto } = require('../middleware/md5-crypto');

const userRouter = new Router({
  prefix: '/user'
})


userRouter.post('/register', userVerify, md5Crypto, register);
userRouter.post('/login', login, authSign);
userRouter.get('/test', authVerify, success)


module.exports = userRouter;