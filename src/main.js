import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from '@/components/common/common'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'// 导入编辑器样式

// 设置反向代理，前端请求默认发送到 http://localhost:3000
var axios = require('axios')

axios.defaults.baseURL = '/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
axios.defaults.withCredentials=false;//跨域携带cookie
Vue.config.productionTip = false
Vue.use(ElementUI)
//将公共方法放入原型对象中
Vue.prototype.common = common
//编辑器
Vue.use(mavonEditor)
// 在请求头中加token
axios.interceptors.request.use(
    config => {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      let token = window.localStorage.getItem('Authorization')

      if (!Object.prototype.hasOwnProperty.call(config, "Authorization") && token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });


//使用钩子函数判断路由是否需要拦截（钩子函数在路由前进行判断
router.beforeEach((to,form,next)=>{
  // 跳转页面的同时加载菜单
  if (store.state.user.username && to.path.startsWith('/admin')) {
    initAdminMenu(router, store)
  }
  if (to.meta.requireAuth){

    // let token = sessionStorage.getItem('Authorization');
    // console.log(token)
    if(store.state.user.username){
      next()
    }else{
      //首先判断访问的路径是否需要登录，如果需要，判断 store 里有没有存储 user 的信息，如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在登录后跳转到访问页）。
      next({
        path:'login',
        query:{redirect:to.fullPath} // 将目的路由地址存到login的query中（重定向）
      })
    }
  }else{
    next()
  }
})


// 初始化菜单
const initAdminMenu = (router, store) => {
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/admin/menu').then(resp => {


    if (resp.data && resp.data.code === 200) {

      var fmtRoutes = formatRoutes(resp.data.result)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

// 数据处理
const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }
    // 动态加载路由
    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.name_zh,
      iconCls: route.icon_cls,
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}



new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
