<template>
  <div>
    <Vcode :show="isShow" @success="success" @close="close" />
    <el-form class="login-container">
      <h3 class="login_title">用户登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码">
          <i slot="suffix" style="color: olivedrab;cursor: pointer"
             @click="forgetPassword"
               >忘记密码？</i>
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button type="primary" style="width: 100%;background: olivedrab;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
      <div class="footer">
        <span style="color: olivedrab;font-size: 14px;cursor: pointer" @click="register">立即注册</span>
        <span>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </span>
      </div>
    </el-form>

  </div>

</template>
  <style scoped>
    .footer{
        width: 100%;
        display: flex;
      justify-content: space-between; /* 横向中间自动空间 */
      align-content: space-between;  /* 竖向中间自动空间 */
      flex-wrap: wrap; /* 换行 */

    }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: olivedrab;
  }

</style>
<script>

import Vcode from "vue-puzzle-vcode";
export default {
  components: {Vcode},
  name: 'Login',
  //入口函数，获得cookie信息
  mounted() {
    this.getCookie();
    // let timer = window.setInterval(() => {
    //   this.clock--
    //
    //   if (this.clock <= 0) {
    //     console.log('清除定时器')
    //     window.clearInterval(timer)
    //   }
    // }, 1000)
  },
  data () {
    return {
      isShow: false,// 验证码模态框是否出现
      checked:false,
      clock:10,
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  // 1.点击登录按钮，向后端发送数
  // 2.受到后端返回的成功代码时，触发 store 中的 login() 方法，把 loginForm 对象传递给 store 中的 user 对象
  // （*这里只是简单的实现，在后端我们可以通过用户名和密码查询数据库，获得 user 表的完整信息，比如用户昵称、用户级别等，返回前端，并传递给 user 对象，以实现更复杂的功能）
  methods: {
    submit() {
      this.isShow = true;
    },
    // 用户通过了验证
    success() {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框

      // // 获取之前在mian.js配置的query
      var path = this.$route.query.redirect
      // // 将路由重定向到query或者index页面
      this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
      // //登录成功后进行验证码验证，在重定向到index页面
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
    //忘记密码
    forgetPassword(){
      alert(1)
    },
    //注册
    register(){
      this.$router.replace('/register')
    },
    login () {
      var _this = this

      // console.log(this.$store.state)
      this.$axios
        .post('/users/login', {
          username: _this.loginForm.username,
          password: _this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.userToken=successResponse.data.token
            // 将用户token保存到vuex中
            _this.$store.commit('changeLogin', { Authorization: _this.userToken })

            this.isShow=true;
            //如果勾选了记住密码，将表达那内容存入cookie
            if(_this.checked){
              _this.setCookie(_this.loginForm.username,_this.loginForm.password,7)
            }

            _this.$store.commit('login', successResponse.data.result[0])
          }
          else{
            _this.$message.error('账号或密码输入错误')


          }
        })

              // eslint-disable-next-line no-unused-vars
        .catch(failResponse => {

        })
    },
    //存储cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('='); //再次切割

          //判断查找相对应的值
          if (arr2[0] == 'username') {
            this.loginForm.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == 'password') {
            this.loginForm.password = arr2[1];
          }
        }

      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
  }
}
</script>
