const Koa = require('koa')
const Router = require('@koa/router')
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')

const app = new Koa()
const router = new Router()

// 读取server.bundle.js的内容
// const serverBundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.bundle.js'), 'utf8')
// const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.ssr.html'), 'utf8')
// 创建一个渲染器，读取server.bundle.js，放进去
// const render = createBundleRenderer(serverBundle, {
//   template
// });

// 换一种方式：json
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.ssr.html'), 'utf8')
const render = createBundleRenderer(serverBundle, {
  template,
  clientManifest // 通过后端注入前端的js脚本
})

router.get('/(.*)', async (ctx) => {
  // 在渲染页面的时候，需要让服务器根据当前路径渲染对应的路由
  // 不能写get('*')会报错，要写成'/(.*)',但是这样写，事件又不行了,原因是注册路由和静态资源匹配的顺序
  try {
    ctx.body = await render.renderToString({
      url: ctx.url
    })
  } catch(e){
    if(e.code === 404) {
      ctx.body = 'page not found'
    }
  }
})

// 先匹配静态文件，资源找不到再匹配路由规则，顺序不能乱
app.use(static(path.resolve(__dirname, 'dist'))) // 静态文件查找路径
app.use(router.routes())

app.listen(3006)