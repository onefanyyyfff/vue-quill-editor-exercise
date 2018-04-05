import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['../views/Home'], resolve)
const DemoHome = resolve => require(['../views/DemoHome'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'DemoHome',
      component: DemoHome
    },
    {
      path: '/demo',
      name: 'demo',
      component: resolve => require(['../views/demo.vue'], resolve)
    }
  ]
})
