const path = require('path');

const OSS = require('ali-oss');
const co = require('co');
const fs = require('fs');

// 错误处理
const errorTypes = require('../errors/error-types');

const { REGION, ACCESSKEY_ID, ACCESSKEY_SECRET, BUCKET, END_POINT } = require('../app/config');

const client = new OSS({ // 连接OSS实例
  region: REGION,
  accessKeyId: ACCESSKEY_ID,
  accessKeySecret: ACCESSKEY_SECRET,
  bucket: BUCKET
});

const endPoint = END_POINT; // 自己的oss链接名，可以在oss上随便找一个文件链接就知道了
const bucket = BUCKET;

// const rules = [{
//   // 指定允许跨域请求的来源，支持通配符星号（*），表示允许所有的来源域。
//   allowedOrigin: '*',
//   // 指定允许的跨域请求方法，支持GET、PUT、DELETE、POST和HEAD方法。
//   allowedMethod: 'GET',
//   // 指定允许跨域请求的响应头。建议无特殊情况下将此项设置为通配符星号（*）。
//   allowedHeader: '*',
// }];
// // 最多允许设置10条跨域资源共享规则。如果配置了相同的规则，则已存在的规则将被覆盖。
// const putResult = await client.putBucketCORS(config.BUCKET, rules);

const uploadAvatar = async (ctx, next) => {
  // 文件路径
  let filePath = path.resolve('./' + ctx.request.file.path);
  // 文件类型
  let temp = ctx.request.file.originalname.split('.');
  let fileType = temp[temp.length - 1];
  let lastName = '.' + fileType;
  // 构建图片名
  let fileName = Date.now() + lastName;
  // 图片重命名
  let key = fileName;

  // 上传文件
  function handleUpload() {
    return new Promise(async (resolve, reject) => {
      client.useBucket(bucket);
      let result = await client.put('/image/coplan/' + key, filePath); // 上传
      let imageSrc = `http://${endPoint}/` + result.name;
      // 删除本地文件
      fs.unlinkSync(filePath);
      // 返回图片地址
      resolve(imageSrc)
    }).catch(err => {
      // 删除本地文件
      fs.unlinkSync(filePath);
      // 上传失败
      const error = new Error(errorTypes.UPLOAD_FLAIURE);
      return ctx.app.emit('error', error, ctx);
    })
  }

  const result = await co(handleUpload);
  return result;
}

module.exports = {
  uploadAvatar
}
