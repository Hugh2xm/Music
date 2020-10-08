import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import Home from './views/home/Home'

import CategoriesList from './views/categories/CategoriesList'
import CategoriesCreate from './views/categories/CategoriesCreate'

import AdEdit from "./views/ad/AdEdit"
import AdList from "./views/ad/AdList"

import SongsEdit from './views/songs/SongsEdit'
import SongsList from './views/songs/SongsList'

import CollectionsEdit from './views/collections/CollectionsEdit'
import CollectionsList from './views/collections/CollectionsList'

import CommentsEdit from './views/comments/CommentsEdit'
import CommentsList from './views/comments/CommentsList'

import AdminUsersEdit from './views/adminusers/AdminUsersCreate'
import AdminUsersList from './views/adminusers/AdminUsersList'
import AdminUsersCreate from "./views/adminusers/AdminUsersCreate";

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

        { path: '/songs/create', component:SongsEdit },
        { path: '/songs/edit/:id', component:SongsEdit, props: true },
        { path: '/songs/list', component:SongsList },

        { path: '/collections/create', component:CollectionsEdit },
        { path: '/collections/edit/:id', component:CollectionsEdit, props: true },
        { path: '/collections/list', component:CollectionsList },

        { path: '/comments/create', component:CommentsEdit },
        { path: '/comments/edit/:id', component:CommentsEdit, props: true },
        { path: '/comments/list', component:CommentsList },

        { path: '/admin_users/create', component:AdminUsersCreate },
        { path: '/admin_users/edit/:id', component:AdminUsersCreate, props: true },
        { path: '/admin_users/list', component:AdminUsersList },
      ]
    }
  ]
})
