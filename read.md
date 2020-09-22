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