<template>
  <el-menu
          default-active="/UserTabs"
          class="el-menu-vertical-demo"
          router
          @open="handleOpen"
          @close="handleClose">
    <el-menu-item index="/UserTabs">
      <i class="el-icon-user"></i>
      <span slot="title">个人信息</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-star-off"></i>
      <span slot="title">我的收藏</span>
    </el-menu-item>
    <el-menu-item index="/inform">
      <i class="el-icon-chat-dot-round"></i>
      <span slot="title">通知信息</span>
    </el-menu-item>
    <el-menu-item index="/invitee" >
      <i class="el-icon-position"></i>
      <span slot="title">我来邀请</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {

  name: 'AdminMenu',
  data () {
    return {
      routes:[
        './components/Personal/UserTabs.vue'
      ]
    }
  },
  mounted(){

  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

  }
}
</script>

<style scoped>
  .el-container{
    top:200px
  }
</style>
