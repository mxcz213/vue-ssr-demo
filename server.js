const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')

const vm = new Vue({
  data() {
    return {
      name: 'hcj',
      age: 20
    }
  },
  template: `<div>我是：{{name}}，{{age}}岁</div>`
})

const Koa = require('koa')
const Router = require('@koa/router')
const fs = require('fs')
const path = require('path')

const htmlStr = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8') // 同步读取文件

// 创建一个渲染器
const render = VueServerRenderer.createRenderer({
  // 可以从本地读取html文件当作模板
  // template: htmlStr, // 采用哪个模版去渲染,在html中加入这个<!--vue-ssr-outlet-->标签表示渲染到这个位置上
}) // 创建一个渲染器

let app = new Koa() // app实例
let router = new Router() // 路由实例

router.get('/', async (ctx) => {
  // ctx.body = 'hello world'
  ctx.body = await render.renderToString(vm) // render.renderToString 返回的是一个promise
  // // <div data-server-rendered="true">我是：hcj，20岁</div>
})

app.use(router.routes())
app.listen(3500)

