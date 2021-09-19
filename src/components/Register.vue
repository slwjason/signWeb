<template>
    <div>
        <el-form class="register-container">
            <h3 class="register_title">用户注册</h3>
            <el-form-item>
                <el-input type="text" v-model="registerForm.number"
                          auto-complete="off" placeholder="学号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" v-model="registerForm.username"
                          auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" v-model="registerForm.nickName"
                          auto-complete="off" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="registerForm.password"
                          auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" id="rePassword" v-model="rePassword"
                          auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%;">
                <el-button type="primary" style="width: 100%;background: olivedrab;border: none" v-on:click="register">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script >
export default {
    name: "Register",

    data () {
        return {
            flag:false,
            rePassword:'',
            registerForm: {
                username: '',
                password: '',
                number:'',
                nickName:'',
            },
            responseResult: []
        }
    },
    methods:{
        register (){
            //首先判断两次密码输入是否相等
            if(this.registerForm.password!==this.rePassword){this.$message.error('抱歉！两次输入的密码不匹配，请重新输入。')}
            this.$axios
                .post('users/register',{
                    number:this.registerForm.number,
                    username: this.registerForm.username,
                    password: this.registerForm.password,
                    nickName:this.registerForm.nickName
            })
            .then(successResponse =>{
                if(successResponse.data.code===200){
                    this.$message.success('恭喜！注册成功。')
                    //注册成功重新登录
                    this.$router.replace('/login')
                }
            })
                // eslint-disable-next-line no-unused-vars
            .catch(failResponse=>{

            })
        }
    }
}
</script>

<style scoped>
    .register-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .register_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: olivedrab;
    }
</style>
