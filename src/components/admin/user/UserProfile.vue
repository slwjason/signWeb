<template>
  <div>
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-row>
          <el-col :span="16">
            <el-form-item label="学号" label-width="120px" prop="number">
              <el-input v-model="selectedUser.number" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="用户名" label-width="120px" prop="username">
              <el-input v-model="selectedUser.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="昵称" label-width="120px" prop="name">
              <el-input v-model="selectedUser.nickName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>



<!--        <el-upload-->
<!--                class="avatar-uploader"-->
<!--                :action="url"-->
<!--                :show-file-list="false"-->
<!--                :on-success="handleAvatarSuccess"-->
<!--                :before-upload="beforeAvatarUpload">-->
<!--          <img v-if="imageUrl" :src="imageUrl" class="avatar" >-->
<!--          <i v-else class="el-icon-plus avatar-uploader-icon" ></i>-->
<!--        </el-upload>-->
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
          <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="selectedUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-button type="warning" @click="resetPassword(selectedUser)">重置密码</el-button>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds">
              <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.name_zh}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <bulk-registration @onSubmit="listUsers()"></bulk-registration>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="users"
        stripe
        :default-sort = "{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          v-if="false"
          width="100">
        </el-table-column>
        <el-table-column
                prop="number"
                label="学号"
                fit>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          fit>
        </el-table-column>

        <el-table-column
          prop="nickName"
          label="昵称"
          fit>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="手机号"
          fit>
        </el-table-column>
        <el-table-column
                prop="photo"
                label="照片"
                v-if="false"
                fit>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          show-overflow-tooltip
          fit>
        </el-table-column>
        <el-table-column
          label="状态"
          sortable
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click="editUser(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="deleteUser(scope.row)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
<!--        <el-button>取消选择</el-button>-->
<!--        <el-button>批量删除</el-button>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import BulkRegistration from './BulkRegistration'
export default {
  name: 'UserProfile',
  components: {BulkRegistration},
  data () {
    return {
      token: {},
      //这是根据你创建空间时所选择的地区
      url: 'https://up-z2.qiniup.com',
      // 这是七牛云空间的外链默认域名

      // url:'http://127.0.0.1:3000/upload',
      imageUrl: '',
      // 这是七牛云空间的外链默认域名
      qiniuaddr: 'qrabc1ft9.hn-bkt.clouddn.com',
      users: [],
      roles: [],
      dialogFormVisible: false,
      selectedUser: {},
      selectedRolesIds: []
    }
  },
  mounted () {
    this.listUsers()
    this.listRoles()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
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

    //查找用户
    listUsers () {
      var _this = this
      this.$axios.get('/users/findUser').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.users = resp.data.result
        }
      })
    },
    //查找角色
    listRoles () {
      var _this = this
      this.$axios.get('/roles/findRole').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.roles = resp.data.result
        }
      })
    },
    // 改变用户状态
    commitStatusChange (value, user) {
      console.log(value)
      if (user.username !== 'admin') {
        this.$axios.put('/users/status', {
          id: user.id,
          status: value
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            if (value) {
              this.$message('用户 [' + user.username + '] 已启用')
            } else {
              this.$message('用户 [' + user.username + '] 已禁用')
            }
          }
        })
      } else {
        user.status = true
        this.$alert('不能禁用管理员账户')
      }
    },
    //表单提交
    onSubmit (user) {
      let _this = this
      // 根据视图绑定的角色 id 向后端传送角色信息
      let roles = []
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roles.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roles[j].id) {
            roles.push(_this.roles[j])
          }
        }
      }
      this.$axios.put('/users/update', {
        id: user.id,
        username: user.username,
        nickName: user.nickName,
        phone: user.phone,
        email: user.email,
        photo:_this.imageUrl,
        number:user.number,
        roles: roles
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('用户信息修改成功')
          this.dialogFormVisible = false
          // 修改角色后重新请求用户信息，实现视图更新
          this.listUsers()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    //修改用户
    editUser (user) {
      this.dialogFormVisible = true
      this.imageUrl = user.photo
      let roleIds = []
        this.$axios.put('/users/findRoleByUser', {
        id: user.id,
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          user.roles = resp.data.result;
          this.selectedUser = user
          if( user.roles.length>0){
            for (let i = 0; i < user.roles.length; i++) {
              roleIds.push(user.roles[i].rid)
            }

            this.selectedRolesIds = roleIds
          }else{

            this.selectedRolesIds=roleIds
          }
        }
      })



    },
    //删除用户
    deleteUser (user) {
     return  this.$confirm('此操作将永久删除该内容, 是否继续?', '系统提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios.put('users/delete', {
          id: user.id,
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 修改角色后重新请求用户信息，实现视图更新
            this.listUsers()
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        });

      });

    },
    //密码重置
    resetPassword (user) {
      this.$axios.put('/users/reset', {
        id: user.id,
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('密码已重置为 123')
        }
      })
    }
  }
}
</script>

<style >

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
