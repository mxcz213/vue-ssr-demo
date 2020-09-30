<template>
  <div>
    bar {{ this.$store.state.name }}
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  // 默认页面一挂载就展示，后端服务器不支持mounted
  // 希望有些数据更新操作是在后端执行的，可以自定义一个方法 asyncData函数，nuxt里面是这么叫的，官方文档也是写的
  asyncData(store){ // 只有页面级别的组件才有这个方法，然后在服务端调用这个方法，然后把结果放到 vuex中
    return store.dispatch('changeName', 'good')
    // 这样写还有个问题，后端返回了最新的数据，但是前端的store是老的数据，然后覆盖了后端返回的，
    // 所以需要把后端的store同步给前端的store
  },
  // mounted(){
  //   this.$store.dispatch('changeName', 'good')
  // }
}
</script>
<style scoped>
div{
  background: #f00;
}
</style>