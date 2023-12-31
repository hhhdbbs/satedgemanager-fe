import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import EdgeNode from '@/views/EdgeNode'
import AddEdgeNode from '@/views/AddEdgeNode'
import JobManagement from '@/views/JobManagement'
import NodeInfo from '@/views/NodeInfo'
import PodManagement from '@/views/PodManagement'
import Login from '@/views/Login'
import AddPod from '@/views/AddPod'
import DeploymentManagement from '@/views/DeploymentManagement'
import AddDeployment from '@/views/AddDeployment'
import ImageManagement from '@/views/ImageManagement'
import UserManagement from '@/views/UserManagement'
import LogManagement from '@/views/LogManagement.vue'
import NPUInfo from '@/views/NPUInfo.vue'
import GPUInfo from '@/views/GPUInfo.vue'
import StorageManagement from '@/views/StorageManagement.vue'
import VMManagement from '@/views/VMManagement.vue'
import ServiceManagement from '@/views/ServiceManagement.vue'
import AddJob from '@/views/AddJob.vue'
import AddService from '@/views/AddService.vue'
import AddImage from '@/views/AddImage.vue'
import AddUser from '@/views/AddUser.vue'
import UpdatePod from '@/views/UpdatePod.vue'
import UpdateDeployment from '@/views/UpdateDeployment.vue'
import StreamingComputingTask from '@/views/StreamingComputingTask.vue'
import AppInfo from '@/views/AppInfo.vue'

Vue.use(Router)

const router = new Router({
  routes: [
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
      component: EdgeNode,
      props:true
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
      component: PodManagement,
      props:true
    },
    {
      path: '/nodeinfo',
      name: 'nodeinfo',
      component: NodeInfo,
      props:true
    },
    {
      path: '/addpod',
      name: 'addpod',
      component: AddPod
    },
    {
      path: '/deployment',
      name: 'deployment',
      component: DeploymentManagement,
      props:true
    },
    {
      path: '/adddeployment',
      name: 'adddeployment',
      component: AddDeployment
    },
    {
      path: '/image',
      name: 'image',
      component: ImageManagement
    },
    {
      path: '/user',
      name: 'user',
      component: UserManagement
    },
    {
      path: '/log',
      name: 'log',
      component: LogManagement
    },
    {
      path: '/npuinfo',
      name: 'npuinfo',
      component: NPUInfo
    },
    {
      path: '/gpuinfo',
      name: 'gpuinfo',
      component: GPUInfo
    },
    {
      path: '/storage',
      name: 'storage',
      component: StorageManagement
    },
    {
      path: '/vm',
      name: 'vm',
      component: VMManagement
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceManagement
    },
    {
      path:'/addjob',
      name: 'addjob',
      component: AddJob
    },
    {
      path:'/addservice',
      name: 'addservice',
      component: AddService
    },
    {
      path:'/addimage',
      name: 'addimage',
      component: AddImage
    },
    {
      path:'/adduser',
      name: 'adduser',
      component: AddUser
    },
    {
      path:'/updatepod',
      name: 'updatepod',
      component: UpdatePod,
      props:true
    },
    {
      path:'/updatedeployment',
      name: 'updatedeployment',
      component: UpdateDeployment,
      props:true
    },
    {
      path:'/streamingtask',
      name:'streamingtask',
      component: StreamingComputingTask
    },
    {
      path: '/appinfo',
      name: 'AppInfo',
      component: AppInfo
    }
  ]
})


// router.beforeEach((to, from, next) => {
//   next();
// })

export default router;

