import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import EdgeNode from '@/views/EdgeNode'
import AddEdgeNode from '@/views/AddEdgeNode'
import JobManagement from '@/views/JobManagement'
import NodeInfo from '@/views/NodeInfo'
import PodManagement from '@/views/PodManagement'
import Login from '@/views/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/',
      redirect: '/login'
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/node',
      name: 'node',
      component: EdgeNode
    },
    {
      path: '/addnode',
      name: 'addnode',
      component: AddEdgeNode
    },
    {
      path: '/job',
      name: 'job',
      component: JobManagement
    },
    {
      path: '/pod',
      name: 'pod',
      component: PodManagement
    },
    {
      path: '/nodeinfo',
      name: 'nodeinfo',
      component: NodeInfo
    },
  ]
})


// export default new Router({
//   mode: 'history',
//   routes: [
//     // {
//     //   path: '/',
//     //   name: 'HelloWorld',
//     //   component: HelloWorld
//     // },
//     {
//       path:'/',
//       redirect: '/login'
//     },
//     {
//       path:'/login',
//       name: 'login',
//       component: Login
//     },
//     {
//       path: '/home',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/node',
//       name: 'node',
//       component: EdgeNode
//     },
//     {
//       path: '/addnode',
//       name: 'addnode',
//       component: AddEdgeNode
//     },
//     {
//       path: '/job',
//       name: 'job',
//       component: JobManagement
//     },
//     {
//       path: '/pod',
//       name: 'pod',
//       component: PodManagement
//     },
//     {
//       path: '/nodeinfo',
//       name: 'nodeinfo',
//       component: NodeInfo
//     },
//   ]
// },
router.beforeEach((to, from, next) => {
  // 判断用户是否登录
  var isLoggedIn = ''/* 在这里判断用户是否登录，比如从 Vuex 状态中获取登录状态 */;
  isLoggedIn = sessionStorage.getItem('name')
  if (to.name !== 'login' && !isLoggedIn) {
    // 如果不是登录页面且用户未登录，则重定向到登录页面
    next('/login');
  } else {
    // this.$parent.ifLogin = true
    next(); // 继续导航
  }
})

export default router;

