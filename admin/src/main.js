import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'
//将其听到到Vue的实例原型上，任意的页面都可以使用this.http
Vue.prototype.$http = http
//音频可视化
import AudioVisual from 'vue-audio-visual'
Vue.use(AudioVisual)
//数据可视化
import echarts from 'echarts'
Vue.prototype.$echarts = echarts



//全局添加图片上传的header

Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
