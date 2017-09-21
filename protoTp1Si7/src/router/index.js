import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/pages/signin'
import signup from '@/pages/signup'
import articles from '@/pages/articles'
import userArticles from '@/pages/userArticles'

import authGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/signin',
    	name: 'signin',
    	component: signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/articles',
      name: 'articles',
      component: articles
    },
    {
      path: '/userArticles',
      name: 'userArticles',
      component: userArticles,
      beforeEnter: authGuard
    }
  ]
})
