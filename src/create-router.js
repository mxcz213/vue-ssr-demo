// 用来创建路由

// 可以用异步组件来加载（webpack 代码分割功能，import()）
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Foo = () => import('./components/Foo')
const Bar = () => import('./components/Bar')

export default () => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {path: '/', redirect: '/bar'},
      {path: '/foo', component: Foo},
      {path: '/bar', component: Bar}
    ]
  })
  return router
}
