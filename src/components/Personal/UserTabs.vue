<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
            <el-dialog
                    title="编辑个人信息"
                    :visible.sync="centerDialogVisible"
                    center>

                <el-form ref="user" :model="user" style="text-align: left"  :rules="rules" >
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="学号" label-width="120px" prop="number">
                                <el-input v-model="user.number" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="用户名" label-width="120px" prop="username">
                                <el-input v-model="user.username" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="昵称" label-width="120px" prop="nickName">
                                <el-input v-model="user.nickName" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="年龄" label-width="120px" prop="age">
                                <el-input v-model="user.age" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" label-width="120px" prop="gender">
                                <el-radio-group v-model="user.gender">
                                    <el-radio :label="0">男</el-radio>
                                    <el-radio :label="1">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col >
                            <el-form-item label="班级" label-width="120px" prop="myClass">
                                <el-input v-model="user.myClass" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-upload
                            class="avatar-uploader"
                            :action= "url"
                            :http-request = upqiniu
                            :show-file-list="false"
                            :before-upload="beforeUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-form-item label="手机号" label-width="120px" prop="phone">
                        <el-input v-model="user.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="qq" label-width="120px" prop="qq">
                        <el-input v-model="user.qq" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" label-width="120px" prop="email">
                        <el-input v-model="user.email" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="commit('user')">确 定</el-button>
  </span>
            </el-dialog>
            <el-card>
                <div class="main">
                    <header >
                        <div class="img" style="display: inline-block;margin: 0px">
                            <img
                                    style="width: 100px; height: 100px;border-radius: 50%"
                                    :src="imageUrl"

                                    />

                        </div>

                        <div class="header_content" style="display: inline-block">
                            <div class="title">
                                <span class="username">{{user.username}}</span>
                                <span class="gender"><i :class="gender_icon"></i></span>
                                <span class="btn"><el-button @click="edit">编辑个人信息</el-button></span>
                            </div>
                            <div class="info">
                                <span class="number">学号:{{user.number}}</span>
                                <span class="rtime">注册时间:{{user.createDate}}</span>

                            </div>
                        </div>
                    </header>
                    <main class="content_main">
                        <div class="content">
                            <div>所属单位</div>
                            <div>所属单位</div>
                            <div>所属单位</div>

                        </div>
                    </main>
                </div>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="安全信息" name="second">
            <el-card>
                <div class="main">
                    <header >
                        <div class="img" style="display: inline-block;margin: 0px">
                            <img
                                    style="width: 100px; height: 100px;border-radius: 50%"
                                    :src="imageUrl"

                                   />


                        </div>

                        <div class="header_content" style="display: inline-block">
                            <div class="title">
                                <span class="username">{{user.username}}</span>
                                <span class="gender"><i :class="gender_icon"></i></span>
                            </div>
                            <div class="info">
                                <span class="number">学号:{{user.number}}</span>
                                <span class="rtime">上次登录时间:2020-04-11 11:20:01</span>

                            </div>
                        </div>
                    </header>
                    <main class="content_main" >
                        <div class="content2">
                            <div class="email">邮箱:{{user.email}}</div>
                            <hr>
                            <div class="nickName">昵称: {{user.nickName}} <span>修改</span></div>
                            <hr>
                            <div class="phone">手机绑定: {{user.phone}}<span>修改</span></div>
                            <hr>
                            <div class="password">账户密码: <span>修改密码</span></div>

                        </div>
                    </main>
                </div>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "UserTabs",
        data(){
            return{
                //这是根据你创建空间时所选择的地区
                url: 'https://up-z2.qiniup.com',
                // 这是七牛云空间的外链默认域名

                // url:'http://127.0.0.1:3000/upload',
                // 这是七牛云空间的外链默认域名
                qiniuaddr: 'qrabc1ft9.hn-bkt.clouddn.com',
                centerDialogVisible:false,//弹框
                gender_icon:'',//性别标签
                activeName: 'first',
                imageUrl: '',//照片
                srcList: [

                ],
                user:{},
                //直接报名表单验证
                rules:{
                    number: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { validator:this.common.checkNumber, trigger: 'blur'},
                    ],
                    username: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },

                    ],
                    nickName: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },

                    ],
                    myClass: [
                        { required: true, message: '请输入班级', trigger: 'blur' },
                        { validator:this.common.checkClass, trigger: 'blur'},
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                        { validator:this.common.checkAge, trigger: 'blur'},
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    email:[
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }],
                    phone:[
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator:this.common.checkPhone, trigger: 'blur'
                        },
                    ],
                    qq: [
                        { required: true, message: '请输入qq', trigger: 'blur' },
                        { validator:this.common.checkQq, trigger: 'blur'},
                    ],

                },
            }
        },
        mounted () {
            this.showUser()
        },
            methods:{
                // 上传文件到七牛云
                upqiniu (req) {

                    console.log(req)
                    // var config
                    // config.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080'
                    // config.headers['Content-Type']='multipart/form-data'
                    const config = {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }

                    let filetype = ''
                    if (req.file.type === 'image/png') {
                        filetype = 'png'
                    } else {
                        filetype = 'jpg'
                    }
                    // 重命名要上传的文件
                    const keyname = 'dfairy' + Date.parse(new Date()) + Math.floor(Math.random() * 100) + '.' + filetype
                    // 从后端获取上传凭证token
                    this.$axios.get('/upload').then(res => {
                        console.log(res)
                        const formdata = new FormData()
                        formdata.append('file', req.file)
                        formdata.append('token', res.data.result)
                        formdata.append('key', keyname)

                        // 获取到凭证之后再将文件上传到七牛云空间
                        this.$axios.post(this.url, formdata, config).then(res => {
                            this.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
                            console.log(this.imageUrl)
                        })
                    })
                },
                // 验证文件合法性
                beforeUpload (file) {
                    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
                    const isLt2M = file.size / 1024 / 1024 < 2
                    if (!isJPG) {
                        this.$message.error('上传头像图片只能是 JPG 格式!')
                    }
                    if (!isLt2M) {
                        this.$message.error('上传头像图片大小不能超过 2MB!')
                    }
                    return isJPG && isLt2M
                },
            handleClick(tab, event) {
                console.log(tab, event);
            },
           //查找用户角色
            showUser(){
                var _this=this
                this.$axios.post('users/getMe', {
                    id: _this.$store.state.user.id,
                }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        console.log(resp.data)
                        _this.user = resp.data.result[0]
                        _this.imageUrl = resp.data.result[0].photo

                        //判断性别
                        if(  _this.user.gender==0){
                            _this.gender_icon='el-icon-male'
                        }else{
                            _this.gender_icon='el-icon-female'
                        }
                    }
                })



            },
           //提交编辑个人信息 //修改用户

            commit(user){

                this.$refs[user].validate((valid) => {
                    if (valid){
                        var that = this
                        that.$axios.post('/users/updateUser',{
                            id:that.$store.state.user.id,
                            number:that.user.number,
                            username:that.user.username,
                            nickName:that.user.nickName,
                            phone:that.user.phone,
                            email:that.user.email,
                            gender:that.user.gender,
                            age:that.user.age,
                            myClass:that.user.myClass,
                            qq:that.user.qq,
                            photo:that.user.photo,

                        })
                            .then(success =>{
                                if(success.data.code==200){
                                    that.$message.success('修改成功')
                                    that.centerDialogVisible=false
                                }
                            })
                    }else{
                        return false
                    }
                })
            },
            // 编辑个人信息
           edit(){
                this.centerDialogVisible=true
           }
    }
    }

</script>

<style >
    .main{
        padding: 20px;
    }
    .main{
        position: relative;
    }
    .header_content{
        position: absolute;
        top:40px;
        left:180px;

    }
    .header_content>.title{
        height: 50px;

    }
    .header_content>.title>span{
        margin-right: 20px;
    }
    .header_content>.info>span{
        margin-right: 100px;

    }
    .content_main{
        width: 500px;
        margin-left: 160px;
        margin-top: 50px;
    }
    .content_main>.content>div{
        margin-bottom: 20px;
    }
    .username{
        font-size: 20px;
        font-weight: bold;
    }
    .content2 >div>span{
       font-size: 12px;
        color: #409EFF;
        cursor: pointer;
    }
    .avatar-uploader .el-upload {
        width: 23%;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: absolute;
        left: 73%;
        top:13%;
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
