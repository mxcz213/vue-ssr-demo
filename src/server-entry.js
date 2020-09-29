import createApp from './app'

// 服务端入口导出函数，每次请求进来返回的都是全新

export default () => {
  const { app, router }= createApp()
  return app
}

// export default (context) => {
//   return new Promise((resolve, reject) => {
//     const { app, router }= createApp()

//     router.push(context.url) // 服务端会传进来一个context.url，直接默认跳到路径
    
//     // 路由里加载的有异步组件，需要等带组件渲染完成之后，在返回app
//     router.onReady(() => {
//       resolve(app)
//     }, reject)
//   })
// }