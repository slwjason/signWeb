<template>
<el-menu
        :default-active="'/index'"
        router
        mode="horizontal"
        background-color="white"
        text-color="#222"
        active-text-color="red"
        style="min-width: 1100px;">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.url">
        {{ item.name }}
    </el-menu-item>
    <router-link to="../personal">
    <el-tooltip class="item" effect="Light" content="个人中心" placement="bottom-end">

            <i  style="float:right;font-size: 45px;color: olivedrab;padding-top: 8px;cursor: pointer">
                <el-avatar :src="this.$store.state.user.photo"></el-avatar>
            </i>

    </el-tooltip>
    </router-link>
    <el-tooltip class="item" effect="Light" content="退出" placement="bottom-end">
        <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: palevioletred;padding: 10px"></i>
    </el-tooltip>

</el-menu>
</template>

<script>
    export default {
        name: "NavMenu",
        data(){
            return{
                navList:[
                    {url:'/index',name:'首页'},
                    {url:'/classRoom',name:'课堂'},
                    {url:'/awards',name:'奖项'},
                    {url:'/photos',name:'相册'},
                    {url:'/grow',name:'成长随笔'},
                    {url:'/consultation',name:'咨询中心'},
                    {url:'/opus',name:'作品展示'},
                    {url:'/contact',name:'联系我们'},
                    {url:'/admin',name:'管理中心'}
                ]
            }

        },
        methods:{
            logout(){
                //清除localStorge的数据
                this.$store.commit('logout');
                //页面跳转到login
                this.$router.replace('/login')
            },
            //个人中心

        }

    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }
    .el-icon-switch-button {
        cursor: pointer;
        outline:0;
    }
</style>
