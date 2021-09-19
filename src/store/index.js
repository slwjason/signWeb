import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //公共变量
    state:{
        user:{
            username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
            password: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).password,
            nickName: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).nickName,
            id: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).id,
            number: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).number,
            email: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).email,
            phone: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).phone,
            photo: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).photo,
            createDate: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).createDate,
            gender: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).gender,
            status: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).status,
        },
        adminMenus: [],
        // 存储token
        Authorization: window.localStorage.getItem('Authorization') ? window.localStorage.getItem('Authorization') : ''
    },

    //公共方法
    mutations:{
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            state.Authorization = user.Authorization;
            window.localStorage.setItem('Authorization', "Bearer "+user.Authorization);
        },
        initAdminMenu (state, menus) {
            state.adminMenus = menus
        },

        // 登录之后将user对象写入localStorage
        login(state,user){
            state.user = user
            window.localStorage.setItem('user',JSON.stringify(user));
        },
        logout (state) {
            state.user = []
            state.Authorization=''
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('Authorization')
        },

    },

})
