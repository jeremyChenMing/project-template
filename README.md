### 项目说明

分支使用规范，开发分支为 develop， 测试分支为 test，生产分支为 master    

发布生产流程 切换到master分支

将测试通过的test分支代码合并到master分支

运行`npm run build`命令等待打包完成

然后将 `dist` 目录下的所有文件打包复制到生产环境解压即可

### 命令行

```shell
  开发命令
  npm start
  
  代码检查命令
  npm run check
  
  代码格式自动修复命令
  npm run autofix
 
```

### 组件库

[ant-design](https://ant.design/docs/react/introduce-cn)


### 代码规范 (强制执行)

代码提交时候会自动进行代码检查，所有代码必须通过代码检查才允许提交到代码库！

在线查看[代码规范](https://standardjs.com/rules-zhcn.html#javascript-standard-style)，各种[编辑器插件](https://standardjs.com/readme-zhcn.html#有现成的编辑器插件吗？)
 

### 项目架构说明

项目架构兼容 ie9+ 到标准浏览器

# ajax

鉴权采用`jwt`方式 可按需要自行定制

数据全部为`json`方式

标准参数为

```javascript

import * as fetch from './src/utils/fetch'

fetch.get('/api/get', { // 参数直接以对象形式给出即可
  offset: 0,
  limit: 10
}, { //附加请求头信息

}).then(data => {

})

fetch.post('/api/post', { // 链接的query参数

}, { // post body数据

}, { // 附加请求头

}).then(data => {

})

//上传文件
fetch.putFormData('/api/upload', { // 链接的query参数

}, { // post body数据
  image: input.files[0] // 直接给出file文件即可
}, { // 附加请求头

}).then(data => {

})


```

提供上传文件接口为 `postFormData`、`putFormData`、`patchFormData` 按需使用即可 使用时直接给file对象即可

`utils/fetch.js`中已经封装好了大多数方法


# 目录结构
.
├── mock // 以本地json形式模拟后端接口的文件夹
├── public // html中使用的纯静态资源 
├── server // 本地调试node server 
│   ├── app.js
│   ├── controllers // 本地 api
│   ├── local
│   │   └── config.js // 唯一需要关心的是 port字段 这个字段是本地调试打开的端口
│   ├── routers // 本地 router
│   ├── util
│   └── views
├── src
│   ├── actions // 各种actions的集中文件夹
│   ├── assets // less文件中引用的静态字段
│   ├── components // react组件文件夹
│   ├── constants 
│   │   ├── ActionTypes.js // actions中所使用的定义
│   │   └── Constants.js // 各种常量以及硬编码
│   ├── index.js // 整个页面的入口包含了启动的配置
│   ├── less // 全局变量以及方法都在此文件夹下
│   ├── models // dva版本redux
│   ├── router.js // 整个应用的router
│   ├── routes // 在router上的组件
│   ├── services // 项目中所使用的后端接口
│   └── utils // 一些方法定义、以及小工具、fetch
├── tools
│   └── start.js // 开发脚本
├── .roadhogrc.js // 这个参考交接文档中 前端架构中的文档地址
├── .roadhogrc.mock // 同上
└── webpack.config.js