import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  const  store = new Vuex.Store({
    state: {
      name: 'john'
    },
    mutations: {
      changeName(state, payload){
        state.name = payload
      }
    },
    actions: {
      changeName({commit}, payload){
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('changeName', payload)
            resolve()
          }, 1000)
        })
      }
    }
  })

  // 前端运行的时候会执行下面方法，从window上取出server端加上去的state属性，然后替换掉前端的状态，就可以保持前后统一
  // <script>
  //   window.__INITIAL_STATE__ = {
  //       "name": "good"
  //   }
  // </script>
  window.__INITIAL_STATE__这个方法名也是固定的
  if(typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }

  return store // 导出store容器
}