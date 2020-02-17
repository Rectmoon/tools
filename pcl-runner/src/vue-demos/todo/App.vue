<template>
  <div class="app">
    <h1>app</h1>
    <p>111234</p>
    {{ message }}
    <Hello></Hello>
  </div>
</template> 

<script>
import Hello from './Hello'
export default {
  data() {
    return {
      message: '张三'
    }
  },
  components: {
    Hello
  }
};
</script>

<style lang='scss'>
.app {
  height: 100%;

  h1 {
    color: #fff;
  }
}
</style>