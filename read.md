概念：放在浏览器进行就是浏览器渲染,放在服务器进行就是服务器渲染。

客户端渲染不利于 SEO 搜索引擎优化
服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
SSR直接将HTML字符串传递给浏览器。大大加快了首屏加载时间。
SSR占用更多的CPU和内存资源
一些常用的浏览器API可能无法正常使用
在vue中只支持beforeCreate和created两个生命周期

## ssr的运行过程：
- 只是做首评做srr 服务端渲染
- 后续路由的切换逻辑执行的是客户端渲染（前端路由来切换）
- vue react 中使用ssr 传统的ssr java+jsp php+smarty(前后端分离)
- node服务来实现

## 整个打包的过程
步骤：先要保证客户端可以跑起来，然后提供一个服务端入口
通过一份代码打包出来两份逻辑（前端 服务端）
前端拿到打包出来的js，后端通过打包的结果渲染出字符串

前端js + 后端渲染的字符串 = 浏览器展示

## 需要用的包
- vue vue-server-renderer
- koa koa-router
```js
vue-ssr-demo % npm install vue vue-server-renderer koa @koa/router -D
```
## 监听文件的改动，自动重启服务
`npm install nodemon -g`

# webpack配置文件，需要用到的包
webpack.conofig.js  vue-style-loader支持服务端渲染，style-loader不支持服务端渲染

- webpack webpack-cli webpack-dev-server
- html-webpack-plugin
- vue-loader vue-style-loader(支持服务端渲染) css-loader vue-template-compiler
- @babel/core @babel/preset-env babel-loader
```
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin vue-loader vue-style-loader css-loader vue-template-compiler @babel/core @babel/preset-env babel-loader -D
```

注意：使用vue-style-loader 样式不起作用: 把css-loader改成3的版本, 4的版本太高
 webpack-merge 合并webpack的配置
 concurrently // 连接多个命令一起
 
后端打包的结果决定了index.html的内容，前断打包出来的结果决定交互逻辑（事件，请求等）
所以两端需要同时打包，一起起n个服务，将几个命令连起来一起使用，可以使用 concurrently 包

2. 打包内容自动插入 vue-server-render/client-plugin
vue-server-render/server-plugin 根据打包出来的json 映射文件 entry（入口） ,files（文件内容）

## 服务端渲染的特性
- 首屏通过服务端渲染，后续切换逻辑还是通过前端路由 （回车的任何一个页面都是首屏）
- 每个客户端访问服务器的时候，都要返回一个全新的路由， 跟app一样不能共享同一个路由，需要返回多个路实例

historyApi 默认刷新会报404
直接刷新路由页面，返回404，因为服务端渲染的时候 没有考虑到路由 只写了/


