const Router = require('@koa/router');
const multer = require('@koa/multer');
const path = require('path');

const { register, login, success, setProfile, queryProfile } = require('../controller/user');
const { authSign } = require('../controller/authorization');
const { userVerify, authVerify } = require('../middleware/verify');
const { md5Crypto } = require('../middleware/md5-crypto');
const { uploadAvatar } = require('../middleware/oss-upload');

const userRouter = new Router({
  prefix: '/user'
})
// const upload = multer();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage
})


userRouter.post('/register', userVerify, md5Crypto, register); // 注册
userRouter.post('/login', login, authSign); // 登录，颁布令牌
userRouter.post('/profile', authVerify, setProfile); // 初始化个人信息
userRouter.post('/queryProfile', authVerify, queryProfile); // 查询个人信息
userRouter.post('/avatarUpload', authVerify, upload.single('file'), uploadAvatar); // 上传头像到oss


userRouter.get('/test', authVerify, success); // 测试用例

module.exports = userRouter;