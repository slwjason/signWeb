<template>
  <el-card class="admin-header">

    <a href="/index">
      <el-tooltip class="item" effect="Center" content="个人中心" placement="bottom-end">
      <img src="../../assets/img/icon/icon2.png" alt="" width="55px" style="float: left;margin-top: -5px;">
      </el-tooltip>
    </a>

    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">Jason</span>
    <el-tooltip class="item" effect="Light" content="返回" placement="bottom-end">
    <i class="el-icon-switch-button" v-on:click="fanhui" style="font-size: 40px;float: right"></i>
    </el-tooltip>
  </el-card>
</template>

<script>
// import {createRouter} from '../../router'

export default {
  name: 'Header',
  methods: {
    fanhui () {
      var _this = this
      _this.$router.replace('/index')
    }
  }
}
</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>
