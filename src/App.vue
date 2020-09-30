<template>
  <div id="app">
    <router-link to="/bar">bar</router-link>
    <router-link to="/foo">foo</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'
export default {
  components: {
    Bar,
    Foo
  }
}
</script>