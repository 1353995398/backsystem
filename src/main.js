import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import req from '@/http/req'

Vue.config.productionTip = false
Vue.use(VueBlu)
Vue.use(ElementUI)
Vue.prototype.$http = req

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
