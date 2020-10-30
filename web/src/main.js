import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import AudioVisual from 'vue-audio-visual'

Vue.config.productionTip = false
Vue.use(AudioVisual)
import './assets/scss/style.scss'
import './assets/scss/el.scss'

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
