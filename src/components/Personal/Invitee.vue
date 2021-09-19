<template>
  <el-card>
      <div class="user" v-for="item in users.slice((currentPage-1)*PageSize,currentPage*PageSize)" :key="item.id" >
          <div class="img" >
              <img
                      :src="item.photo"
              />
          </div>
          <div class="right" style="">
                <span style="margin-left: 20px">{{item.username}}</span>
                <span class="gender" style="margin-left: 10px;margin-right: 50px">
                    <i class="el-icon-male" v-if="item.gender==0"></i>
                    <i class="el-icon-female" v-else></i>
                </span>
                <span style=""><el-button style="height: 30px;" @click="material(item)">个人质料</el-button></span>
                <span style="flex: 1;text-align: right"><el-button style="height: 30px;" @click="yaoqin(item)">邀请</el-button></span>
          </div>
      </div>
      <div class="block" >
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="pageSizes"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  :page-size="PageSize"
          >
          </el-pagination>
      </div>
      <el-dialog
              title="个人质料"
              :visible.sync="dialogForm"
              @close="clear"
              width="50%">
          <el-form :model="loginForm"  label-position="left"
                   label-width="0px">
              <el-row>
                  <el-col :span="16">
                      <el-form-item>
                          学号:{{loginForm.number}}
                      </el-form-item>

                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="16" >
                      <el-form-item>
                      用户名:{{loginForm.username}}
                      </el-form-item>
                  </el-col>

              </el-row>
              <el-row>
                  <el-col :span="16" >
                      <el-form-item>
                    昵称:{{loginForm.nickName}}
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-form-item>
                  头像:<img v-if="loginForm.photo" :src="loginForm.photo" class="avatar" >
              </el-form-item>
              <el-row>
                  <el-col :span="16">
                      <el-form-item>
                      电话号码:{{loginForm.phone}}
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="16">
                      <el-form-item>
                      邮箱:{{loginForm.email}}
                      </el-form-item>
                  </el-col>
              </el-row>

          </el-form>
      </el-dialog>
      <el-dialog
              title="设置邀请码"
              :visible.sync="dialogFormInvitee"
              @close="clear"
              width="50%">
          <el-form :model="inviteeForm"  label-position="left" :rules="rules"
                   label-width="0px">
              <el-row>
                  <el-col :span="16">
                      <el-form-item>
                          邀请人:{{this.$store.state.user.username}}
                      </el-form-item>

                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="16" >
                      <el-form-item>
                          被邀请人:{{inviteeForm.username}}
                      </el-form-item>
                  </el-col>

              </el-row>
              <el-row>
                  <el-col :span="16" >
                      <el-form-item label="邀请码:" label-width="120px" prop="code">
                          <el-input type="text" v-model="inviteeForm.code"
                                    auto-complete="off" placeholder="邀请码"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col>
                      <el-form-item label="过期时间:" label-width="120px">
                          <el-date-picker
                                  v-model="inviteeForm.overDate"
                                  type="datetime"
                                  placeholder="选择日期时间"
                                  align="right"
                                  :picker-options="pickerOptions">
                          </el-date-picker>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-form-item style="width: 100%;">
                  <el-button type="primary" style="width: 100%;background: olivedrab;border: none" v-on:click="submit">邀请</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>
  </el-card>
</template>

<script>
    export default {
        name: "Invitee",
        data(){
            return{
                //表单效验
                rules:{
                    code:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator:function(rule,value,callback){
                                if(/^[0-9]*$/.test(value) == false || /^\d{6}$/.test(value) == false){
                                    callback(new Error("请输入正确的6位数字"));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur'
                        },
                    ]
                },
                //时间控件
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                dialogForm:false,
                dialogFormInvitee:false,
                // 默认每页显示的条数（可修改）
                PageSize:5,
                users:[],
                //邀请表单
                inviteeForm:{

                    code:'',
                    overDate:''
                },
                //个人信息
                loginForm:{},
                // 默认显示第几页
                currentPage:1,
                // 个数选择器（可修改）
                pageSizes:[5,10,15,20],
                //总数
                total:0,
            }
        },
        mounted(){
            this.findALlUser()
        },
        methods:{
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
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage=1
            },
            // 显示第几页
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage=val
            },
            //查找所有用户
            findALlUser(){
                this.$axios.get('/users/findUser')
                .then(successResponse => {
                    if(successResponse.data.code==200){
                        this.users = successResponse.data.result
                        this.total = successResponse.data.result.length
                    }


                })
            },
            //显示个人质料
            material(item){
                this.dialogForm = true
                this.loginForm = item
            },
            //邀请
            yaoqin(item){
                let that = this
                that.dialogFormInvitee=true
                that.inviteeForm = item
            },
            //提交
            submit(){
                let that = this
                var flag = true //判断数添加还是修改，如果第一次邀请调用添加方法，验证码过期后再一次邀请调用修改方法
                //邀请方法
                function addCode(flag){
                    that.dialogFormInvitee=false
                    if(flag){
                        //添加
                        that.$axios.post('/invitee/addCode',{
                            invitee:that.$store.state.user.id,//邀请人
                            inviteename:that.$store.state.user.username,
                            invitees:that.inviteeForm.id,//被邀请人
                            inviteesname:that.inviteeForm.username,
                            code:that.inviteeForm.code,
                            overDate:that.common.formatDate(that.inviteeForm.overDate,'yyyy-MM-dd hh:mm:ss')
                        })
                            .then(success=>{
                                if(success.data.code==200){
                                    that.$message.success('邀请成功')
                                }
                            })
                    }else{
                        //添加
                        that.$axios.post('/invitee/updateCode',{
                            invitee:that.$store.state.user.id,
                            invitees:that.inviteeForm.id,
                            code:that.inviteeForm.code,
                            overDate:that.common.formatDate(that.inviteeForm.overDate,'yyyy-MM-dd hh:mm:ss')
                        })
                            .then(success=>{
                                if(success.data.code==200){
                                    that.$message.success('邀请成功')
                                }
                            })
                    }

                }
                //判断当前用户是否邀请过这个人，如果邀请过了并且邀请码还未过期不能再次邀请
                that.$axios.post('/invitee/isSignByInvitee',{
                    invitee:that.$store.state.user.id,
                    invitees:that.inviteeForm.id,
                })
                    .then(success=>{
                        if(success.data.code==200){
                            console.log(new Date(that.inviteeForm.overDate).getTime()-(new Date().getTime())>0)
                            //判断邀请码是否过期，过期了才可以重复邀请
                            if(new Date(that.inviteeForm.overDate).getTime()-(new Date().getTime())<0){
                                that.$message.info('已经邀请过了！验证码过期了才能重复邀请哦')
                                that.dialogFormInvitee=false
                            }else{
                                flag=false
                                addCode(flag);
                            }


                        }else{
                            flag=true
                            addCode(flag);
                        }
                    })

            }
        }
    }
</script>

<style scoped>
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .block{
        text-align: right;
        margin:10px ;
    }
    .user{

        width: 100%;
        height: 50px;
        display: flex;
        border-bottom: 1px solid #ccc;
        padding: 5px;
    }
    .user>.img{
        display: inline-block;
        width: 50px;
        height: 50px;
        vertical-align:middle
    }
    .user>.img>img{
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .user>.right{
        width: 100%;
        height: 50px;
        line-height: 50px;
        vertical-align:middle;
        display: flex
    }
</style>
