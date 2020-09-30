import createApp from './app'

// 服务端入口导出函数，每次请求进来返回的都是全新

// export default () => {
//   const { app, router }= createApp()
//   return app
// }

export default (context) => { // context中包含着当前访问服务端的路径 context.url
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url) // 服务端会传进来一个context.url，直接默认跳转到路径
    
    // 路由里加载的有异步组件，需要等带组件渲染完成之后，在返回app
    router.onReady(() => {
      // 获取当前匹配到的组件
      const matchedComponents = router.getMatchedComponents();
      if(matchedComponents.length > 0){ // 匹配到了路由
        // 调用组件的 asyncData 方法, 将store传进去
        Promise.all(matchedComponents.map(component => {
          if(component.asyncData) {
            // 返回的是promise，等到所有组件的promise全部完成
            return component.asyncData({ store, route: router.currentRoute})
          }
        })).then(() => {
          // 所有promise完成，路由准备完毕调用返回app
          // 成功之后还要将store放到上下文context中,会自动给页面增加一个window属性
          // vue-server-render 实现的
          context.state = store.state

          resolve(app)
        }).catch(reject)
        
      } else {
        return reject({code: 404})
      }
      
    }, reject)

    // router.onReady(() => {
    //   resolve(app)
    // }, reject)
  })
}