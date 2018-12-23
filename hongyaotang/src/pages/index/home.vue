<template>
  <Page title="首页">
    <div slot="content">111</div>
  </Page>
</template>
 
<script>
import Page from '@/components/page/page.vue'
export default {
  components: {
    Page
  }
}
</script>

<style lang='stylus'>
*
  margin 0
  padding 0

html, body
  width 100%
  height 100%
  overflow hidden

#box
  width 100%
  height 100%
  display flex
  background yellow
</style>