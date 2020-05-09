import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant Toast轻提示
import 'vant/lib/index.css'
import 'assets/css/base.css'

// 引入插件
import { Loading } from 'vant'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 解决移动端300ms延迟
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/loading-svg/loading-spinning-bubbles.svg')
})
Vue.use(Loading)
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
