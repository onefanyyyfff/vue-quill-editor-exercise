import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['../views/Home'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/demo',
      name: 'demo',
      component: resolve => require(['../views/demo.vue'], resolve)
    }
  ]
})
