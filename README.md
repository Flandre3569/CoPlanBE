# NODE-KOA-TEMPLATE

**一个自定义的功能完备的node-koa模板**

### 模板目录结构：
```
│  .env
│  .gitignore
│  LICENSE
│  main.js
│  package-lock.json
│  package.json
│  README.md
│
├─app
│      config.js
│      database.js
│      main.js
│      router.js
│
├─controller
│      authorization.js
│      user.js
│
├─errors
│      error-types.js
│      error.js
│
├─keys
│      private.key
│      public.key
│
├─middleware
│      md5-crypto.js
│      verify.js
│
├─router
│      user.js
│
├─service
│      user.js
│
└─utils
        pwd-handle.js
```

### 模板内容包含：
- 注册功能
- 登录验证
- 用户名、密码合法性验证
- jwt身份验证，验证算法采用RS256非对称加密
- 动态加载后端路由接口
- 密码MD5加密
- dotenv加载环境变量配置
- mysql2数据库连接
- 错误处理封装
- json数据解析，方便接受前端请求


### node-koa框架模板介绍：
该模板的使用首先需要完成以下几个步骤：
1. 在.env文件下配置好自己的数据库信息
2. 使用openssl（其它方法也可）在keys目录下生成公钥和密钥，注意不要将密钥公开。
3. 启动项目 `pnpm(npm) run dev`

该模板方便我们使用koa搭建后端服务器，初步功能已经集成完毕，为我们搭建项目提供便利，提高开发效率。较完善的处理了登录注册的一系列验证和功能，可以使我们尽快投入业务处理。
