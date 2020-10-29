import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import AudioVisual from 'vue-audio-visual'

Vue.config.productionTip = false
Vue.use(AudioVisual)
import './assets/scss/style.scss'
import './assets/scss/el.scss'

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
