<template>
    <div style="margin-top: 40px;overflow: hidden">
        <div class="left">
            <el-menu
                    default-active="1"
                    style="width: 100%">
                <a href="#message">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">留言板</span>
                    </el-menu-item>
                </a>
                <a href="#joinUs">
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">加入我们</span>
                    </el-menu-item>
                </a>
            </el-menu>
            <el-card class="box-card mycard">
                <div slot="header" >
                    <span>联系方式</span>
                </div>
                <div  class="text item">
                    <div>
                        <i style="margin-right: 10px">电话:</i>
                        <span>133-5605-4027</span>
                        <hr>
                        <i style="margin-right: 10px">QQ:</i>
                        <span>1933166034</span>
                        <hr>
                        <i style="margin-right: 10px">邮箱:</i>
                        <span>1933166034@qq.com</span>
                        <hr>
                        <i style="margin-right: 10px">微信:</i>
                        <span>112122122</span>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="right">
            <div class="r_header">
                <el-card style="padding: 5px;text-align: left" >
                    <a href="/index">
                        <el-tooltip class="item" effect="Light" content="首页" placement="bottom-end">
                            <img src="../../assets/img/icon/icon2.png" alt="" width="55px" style="float: left;margin-top: -5px;">
                        </el-tooltip>
                    </a>
                    <span style="display:inline-block;width:50%;position: relative;top:20px;left:20px">您好！我是小白，感谢您的关注。 </span>
                </el-card>
            </div>
            <div id="message">
                <el-card class="mycard">
                    <h4>我要留言</h4>
                    <hr>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="姓名">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>

                            </el-col>
                            <el-col :span="12">
                            <el-form-item label="联系电话">
                                <el-input  v-model="form.phone"></el-input>
                            </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-form-item label="邮件">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="标题">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-form-item label="留言内容">
                            <el-input type="textarea" v-model="form.content"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
            <div id="joinUs">
                <el-card class="mycard" style="margin-bottom: 20px">
                    <h4 style="display: inline-block;margin-right: 2%">我要报名</h4>
                    <span>
                           <el-dropdown style="display: inline-block"  @command="handleCommand">
                                <span class="el-dropdown-link">
                                报名方式<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item command="zhijie">直接报名</el-dropdown-item>
                            <el-dropdown-item command="yaoqingma">邀请码报名</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    </span>
                    <hr>
                    <div class="content zhijie" v-if="sign=='zhijie'">
                        <el-form ref="signForm" :model="signForm" label-width="80px" :rules="rulesForm" >
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="姓名" prop="username">
                                        <el-input  v-model="signForm.username"></el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="学号" prop="number">
                                        <el-input  v-model="signForm.number"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="年龄" prop="age">
                                        <el-input v-model="signForm.age"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <el-form-item label="性别" >
                                            <el-radio-group v-model="signForm.gender">
                                                <el-radio label="0">男</el-radio>
                                                <el-radio label="1">女</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12 " >
                                    <el-form-item label="班级" prop="myClass">
                                        <el-input v-model="signForm.myClass"></el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="联系电话" prop="phone">
                                        <el-input  v-model="signForm.phone"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                <el-form-item label="邮件" prop="email">
                                    <el-input v-model="signForm.email"></el-input>
                                </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-row>
                                        <el-form-item label="QQ" prop="qq">
                                            <el-input v-model="signForm.qq"></el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-form-item label="报名原因">
                                <el-input type="textarea" v-model="signForm.reason" maxlength="400"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="signSubmit('signForm')">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="content yaoqinma" v-if="sign=='yaoqingma'">
                        <el-dialog title="填入邀请码" :visible.sync="dialogYqm">
                                    <el-form ref="form" :model="yaoqinmaForm" label-width="100px">
                                        <el-form-item label="填入邀请码">
                                            <el-input v-model="signForm.code"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit(signForm)">提交</el-button>
                                        </el-form-item>
                                    </el-form>
                        </el-dialog>

                        <div class="item" v-for="item in invitees" :key="item.id">
                            <span style="color: #409EFF;cursor: pointer" @click="showDialogYqm(item)">接受来自{{item.inviteename}}的邀请</span>
                            <el-divider content-position="right">邀请码：{{item.code}}</el-divider>
                        </div>

                    </div>
                </el-card>
            </div>
        </div>
        <div class="footer"></div>
    </div>

</template>

<script>
    export default {
        name: "ContactIndex",
        data(){
            return{
                sign:'',
                //邀请数据
                invitees:[],
                //留言表单
                form: {},
                //直接报名表单
                signForm:{},
                //直接报名表单验证
                rulesForm:{

                    number: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { validator:this.common.checkNumber, trigger: 'blur'},
                    ],
                    username: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },

                    ],
                    myClass: [
                        { required: true, message: '请输入班级', trigger: 'blur' },
                        { validator:this.common.checkClass, trigger: 'blur'},
                    ],
                    age: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { validator:this.common.checkNumber, trigger: 'blur'},
                    ],
                    email:[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }],
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
                //邀请码表单
                yaoqinmaForm:{},
                dialogYqm:false
            }
        },
        mounted(){

            this.listCode()
        },
        methods: {
            //显示邀请码弹框
            showDialogYqm(item){
                this.dialogYqm = true
                this.signForm = item;
            },
            //提交邀请码
            onSubmit(signForm) {
                var that = this
                //1.判断验证码的有效性
                // console.log(signForm.overDate)
                if(new Date(signForm.overDate).getTime()-(new Date().getTime())<=0){
                   that.$message.error('抱歉！,验证码过期了。。。。。。')
                }else{
                    //报名
                    that.$axios.put('/invitee/sign',{
                        invitees:signForm.invitees,
                        invitee:signForm.invitee,
                        code:signForm.code
                    })
                    .then(success =>{
                        if(success.data.code==200){
                            that.$message.success('报名成功')
                            that.dialogYqm = false
                        }
                    })
                }

            },
            //查找邀请我的所有数据
            listCode(){
                var that = this
                that.$axios.post('/invitee/findCodeByInvitee',{
                    invitees:that.$store.state.user.id
                })
                    .then(success =>{
                        if(success.data.code==200){
                            console.log(success.data)
                            that.invitees = success.data.result
                        }
                    })
            },
            //直接报名
            signSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        var that = this
                        that.$axios.post('/contact/joinUs',{
                            user:that.$store.state.user.id,
                            number:that.signForm.number,
                            username:that.signForm.username,
                            phone:that.signForm.phone,
                            email:that.signForm.email,
                            gender:that.signForm.gender,
                            age:that.signForm.age,
                            myClass:that.signForm.myClass,
                            qq:that.signForm.qq,
                            reason:that.signForm.reason,
                        })
                            .then(success =>{
                                if(success.data.code==200){
                                    that.$message.success('报名成功')
                                }
                            })
                    }else{
                        return false
                    }
                })

            },

            handleCommand(command) {
                this.sign=command
            },

        }
    }
</script>

<style scoped>

    a {
        text-decoration: none;
        color: inherit;
    }
    .left{
        width: 15%;
        float: left;
    }
    .text {
        font-size: 14px;
    }
    .mycard{
        width: 100%;
        text-align: left;
        margin-top: 20px;
    }
    .box-card {
        margin-left: 10px;
    }
    .right{
        width: 75%;
        margin-left: 5%;
        margin-right: 5%;
        float: right;
    }
    .footer{
        width: 100%;
        height: 50px;
        display: flex;
        bottom: 0px;
        background: #409EFF;
    }
</style>
