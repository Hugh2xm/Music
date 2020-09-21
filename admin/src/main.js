import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'
//将其听到到Vue的实例原型上，任意的页面都可以使用this.http
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
