<template>
  <div @click="counter += 1">
    foo{{ counter }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  method: {
  }
}
</script>