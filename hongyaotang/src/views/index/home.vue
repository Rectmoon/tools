<template>
  <Page title="首页">
    <div slot="content">
      <h2>tabs</h2>
      <tabs :value="selectedIndex" @change="handleChangeTab" class="ignore">
        <tab v-for="(tab, i) in arr" :index="i" :label="tab" :key="i">{{tab}}1</tab>
      </tabs>
    </div>
  </Page>
</template>
 
<script>
import Page from '@/components/base/page'
import { Tabs, Tab } from '@/components/base/tabs'
import { getData1, postData1 } from '@/api/home'
export default {
  components: {
    Page,
    Tabs,
    Tab
  },
  data() {
    return {
      selectedIndex: 0,
      arr: ['all', 'active', 'completed']
    }
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
    },
    handleChangeTab(i) {
      this.selectedIndex = i
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

.ignore
  *
    font-size 16px
</style>