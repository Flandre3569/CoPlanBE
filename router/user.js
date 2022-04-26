const Router = require('@koa/router');
const { register, login, success, setProfile, queryProfile } = require('../controller/user');
const { authSign } = require('../controller/authorization');
const { userVerify, authVerify } = require('../middleware/verify');
const { md5Crypto } = require('../middleware/md5-crypto');
const { uploadAvatar } = require('../middleware/oss-upload');

const userRouter = new Router({
  prefix: '/user'
})


userRouter.post('/register', userVerify, md5Crypto, register); // 注册
userRouter.post('/login', login, authSign); // 登录，颁布令牌
userRouter.post('/profile', authVerify, setProfile); // 初始化个人信息
userRouter.post('/queryProfile', authVerify, queryProfile); // 查询个人信息
userRouter.post('/avatarUpload', authVerify, uploadAvatar); // 上传头像到oss


userRouter.get('/test', authVerify, success); // 测试用例

module.exports = userRouter;