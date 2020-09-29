import Vue from 'vue'
import App from './App.vue'
// import createRouter from './create-router'

// const vm = new Vue({
//   el: '#app',
//   render: h => h(App)
// })
// 1. 客户端渲染的时候每打开一个浏览器都会产生一个vue的实例，
// 而服务器如果按照这样的写法，会在所有人访问时都产生同样的实例，
// 所有app.js一定要导出一个函数，每次访问都产生新的实例


export default () => {
  // const router = createRouter()
  const app = new Vue({
    // router,
    render: h => h(App)
  })

  return {// 返回一个对象，后续会加入router等
    app,
    // router
  }
}