<template>
  <Page title="首页">
    <div slot="content">111</div>
  </Page>
</template>
 
<script>
import Page from '@/components/page/page.vue'
import { getData1, postData1 } from '@/api/home'
export default {
  components: {
    Page
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getData1().then(data => {
        console.log(data)
      })
      setTimeout(() => {
        postData1(1).then(res => {
          console.log(res)
        })
      }, 300)
    }
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