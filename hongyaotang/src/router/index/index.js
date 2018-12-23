import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index/home.vue'
// import Examples from 'example/pages/examples'
// import VerticalScroll from 'example/pages/vertical-scroll/'
// import IndexView from 'example/pages/index-list/'
// import Picker from 'example/pages/picker'
// import Slide from 'example/pages/slide'
// import FullPageSlide from 'example/pages/full-page-slide'
// import FullPageVerticalSlide from 'example/pages/full-page-vertical-slide'
// import FreeScroll from 'example/pages/free-scroll'
// import FormList from 'example/pages/form-list'
// import GoodsList from 'example/pages/goods-list'
// import NavigatorList from 'example/pages/navigator'
// import Infinity from 'example/pages/infinity'
// import SlideRender from 'example/page-render/slide-render'
// import FormListRender from 'example/page-render/form-list-render'
// import SimpleScrollDemo from 'example/pages/simple-scroll-demo'
// import GoodListRender from 'example/page-render/goods-list-render'
// import PickerRender from 'example/page-render/picker-render'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
