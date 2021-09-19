import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppIndex  from "@/components/home/AppIndex";
import Register from "@/components/Register";
import Home from '../components/Home'
import AdminIndex from "@/components/admin/AdminIndex";
import Personal from '../components/Personal/index'
import UserTabs from "@/components/Personal/UserTabs";
import ContactIndex from "@/components/contactUs/ContactIndex";
import Invitee from "@/components/Personal/Invitee";
import WrittenManagement from "@/components/admin/work/writtenManagement";
import Inform from "@/components/Personal/Inform";
import SettingStudentTest from "@/components/admin/work/settingStudentTest"

Vue.use(Router)
export default new Router({
// 从默认的 hash 模式切换为 histroy 模式
// requireAuth属性作用是表明该路由是否需要登录验证，在进行全局拦截时，我们将通过该属性判断路由的跳转，该属性包含在meta属性中.
// 此外还有一个问题，后台切换用户后前端会报路由重复的错误，
// 所以我们要在注销登录时把原本的路由信息清空。
// 比较容易想到的是通过刷新页面清空路由，但是这样页面就会有明显的卡顿或空白，
// 所以我们尝试利用别的方法清空路由
// 常见的方法是新建一个路由，包含不需动态加载的默认路由信息，设置当前路由的 matcher 为新路由的 matcher
    mode: 'history',
    routes: [
        {
            path: '/personal',
            name: 'Index',
            component: Personal,
            //子路由
            children:[
                {
                    path: '/userTabs',
                    name: 'UserTabs',
                    component: UserTabs,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/inform',
                    name: 'Inform',
                    component: Inform,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/opus',
                    name: 'AppIndex',
                    component: AppIndex,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/invitee',
                    name: 'Invitee',
                    component: Invitee,
                    meta: {
                        requireAuth: true
                    }
                },
            ]
        },

        // {
        //     // 新建默认路由
        //     path: '/',
        //     name: 'Default',
        //     redirect: '/index',
        //     component: AppIndex
        // },
        {
            path: '/',
            name: 'index',
            redirect: '/index',
            component: AppIndex,
            meta: {
                requireAuth: true
            }
        },

        {
            path: '/admin',
            name: 'AdminIndex',
            component: AdminIndex,
            children:[
                {
                    path: '/written',
                    name: 'WrittenManagement',
                    component: WrittenManagement,
                },
                {
                    path: '/settingStudentTest',
                    name: 'SettingStudentTest',
                    component: SettingStudentTest,
                }
            ]
        },

        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },

        {
            path: '/home',
            name: 'Home',
            component: Home,
            //重定向到index页面
            redirect: '/index',
            //子路由
            children:[
                {
                    path: '/index',
                    name: 'AppIndex',
                    component: AppIndex,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/opus',
                    name: 'AppIndex',
                    component: AppIndex,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/contact',
                    name: 'ContactIndex',
                    meta: {
                        requireAuth: true
                    },
                    component: ContactIndex
                },
            ]
        },
        {
            path: '/index',
            name: 'AppIndex',
            component: AppIndex,
            // 设置元数据，requireAuth = true时为需要拦截的路由
            meta: {
                requireAuth: true
            }
        },
    ]
})

