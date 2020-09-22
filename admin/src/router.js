import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import Home from './views/home/Home'

import CategoriesList from './views/categories/CategoriesList'
import CategoriesCreate from './views/categories/CategoriesCreate'

import AdEdit from "./views/ad/AdEdit";
import AdList from "./views/ad/AdList";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        { path: '/',component: Home },

        { path: '/categories/create', component: CategoriesCreate },
        { path: '/categories/create/:id', component: CategoriesCreate, props: true },
        { path: '/categories/list', component: CategoriesList},

        { path: '/ads/create', component:AdEdit },
        { path: '/ads/edit/:id', component:AdEdit, props: true },
        { path: '/ads/list', component:AdList },
      ]
    }
  ]
})
