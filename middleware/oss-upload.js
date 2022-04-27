let OSS = require('ali-oss');
const { REGION, ACCESSKEY_ID, ACCESSKEY_SECRET, BUCKET } = require('../app/config');

const client = new OSS({ // 连接OSS实例
  region: REGION,
  accessKeyId: ACCESSKEY_ID,
  accessKeySecret: ACCESSKEY_SECRET,
  bucket: BUCKET
});

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
  console.log(ctx.request);
  const filename = `${Date.now()}${ctx.request.body}`;

  const catalog = `/images/${filename}`
  /* 此处的catalog指的是上传的文件存储在当前Bucket或Bucket下的指定目录 */
  let result = await client.put(catalog, Buffer.from(req.body.file, 'base64'));
  res.send({
    result
  })

}

module.exports = {
  uploadAvatar
}
