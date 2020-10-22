import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

import Login from "./views/login/Login";
import Home from './views/home/Home.vue'
import List from './views/list/List.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home},
        { path: '/list', name: 'list', component: List}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
