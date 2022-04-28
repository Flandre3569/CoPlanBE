const path = require('path');

const OSS = require('ali-oss');
const co = require('co');
const fs = require('fs');

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
  // console.log(ctx.request.file);
  let filePath = path.resolve('./' + ctx.request.file.path);
  // 文件类型
  let temp = ctx.request.file.originalname.split('.');
  let fileType = temp[temp.length - 1];
  let lastName = '.' + fileType;
  // 构建图片名
  let fileName = Date.now() + lastName;
  // 图片重命名
  let key = fileName;
  console.log(key);
  // 阿里云 上传文件 
  co(async function () {
    client.useBucket(bucket);
    let result = await client.put('/image/coplan' + key, filePath); // 这是上传的代码
    let imageSrc = `http://${endPoint}/` + result.name;
    console.log(imageSrc);
    // 上传之后删除本地文件
    fs.unlinkSync(filePath);
    ctx.response.body = {
      status: "200",
      message: "OK",
      path: imageSrc
    }
  }).catch(function (err) {
    // 上传之后删除本地文件
    // 如果你发现上传失败了，多检查一下配置参数是否有问题，参数出问题的可能性比较大
    fs.unlinkSync(filePath);
    ctx.response.body = { code: 0, msg: '500', error: "上传失败" };
  });
}

module.exports = {
  uploadAvatar
}
