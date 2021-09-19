<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">新增用户</el-button>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="50%">
      <el-form :model="loginForm" :rules="rules" label-position="left"
               label-width="0px">
        <el-row>
          <el-col :span="16">
            <el-form-item prop="number">
              <el-input type="text" v-model="loginForm.number"
                        auto-complete="off" placeholder="学号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="16">
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password"
                        auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" >
            <el-form-item prop="username">
              <el-input type="text" v-model="loginForm.username"
                        auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>

            <el-form-item prop="nickName">
              <el-input type="text" v-model="loginForm.nickName"
                        auto-complete="off" placeholder="昵称"></el-input>
            </el-form-item>


        </el-row>
          <el-upload
                  class="avatar-uploader"
                  :action="url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
          </el-upload>
        <el-form-item prop="phone">
          <el-input type="text" v-model="loginForm.phone"
                    auto-complete="off" placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" v-model="loginForm.email"
                    auto-complete="off" placeholder="E-Mail"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BulkRegistration',
  data () {
    return {

      url:'http://127.0.0.1:3000/upload',
      imageUrl:'',
      dialogFormVisible: false,
      rules: {
        number: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { validator:function(rule,value,callback){
              if(/^[0-9]*$/.test(value) == false){
                callback(new Error("请输入正确的数字"));
              }else{
                callback();
              }
            }, trigger: 'blur' },
        ],
        username: [{required: true, message: '用户名不能为空', trigger: '  blur'}],
        nickName: [{required: true, message: '昵称不能为空', trigger: '  blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        email:[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }],
        phone:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator:function(rule,value,callback){
              if(/^1[34578]\d{9}$/.test(value) == false){
                callback(new Error("请输入正确的手机号"));
              }else{
                callback();
              }
            }, trigger: 'blur'
          },
        ],
      },
      loginForm: {
        username: '',
        password: '',
        number:'',
        nickName:'',
        photo:'',
        phone: '',
        email: ''
      }
    }
  },
  methods: {

    //图片上传成功
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.loginForm.photo = res.result;
    },
    //图片上传之前
    beforeAvatarUpload(file) {

      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    clear () {
      this.imageUrl=  '',
      this.loginForm = {
        username: '',
        password: '',
        phone: '',
        email: '',
        number:'',
        nickName: '',
      }
    },
    register () {
      this.$axios
        .post('/users/register', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          number: this.loginForm.number,
          phone: this.loginForm.phone,
          email: this.loginForm.email,
          nickName:this.loginForm.nickName,
          photo:this.loginForm.photo
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('注册成功', '提示', {
              confirmButtonText: '确定'
            })
            this.clear()
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })

    }
  }
}
</script>

<style>
  .add-button {
    margin: 18px 0 0 10px;
  }
  .avatar-uploader .el-upload {
    width: 23%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: absolute;
    left: 73%;
    top:15%;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height:  100%;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  avatar-uploader .el-upload{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
