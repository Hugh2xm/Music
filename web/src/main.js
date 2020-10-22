import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false
import './assets/scss/style.scss'
import './assets/scss/el.scss'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
