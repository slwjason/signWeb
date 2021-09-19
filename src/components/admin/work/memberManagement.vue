<template>

    <div style="text-align: left" >
        <el-dialog
                title="详细信息"
                :visible.sync="dialogForm"
                width="50%"

        >
            <div class="formDiv">
                <el-button @click="printForm" type="success">打印</el-button>
                <el-form :model="memberForm"  label-position="right" id="memberForm"
                         label-width="100px" >
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="学号:" >
                                <div class="content">
                                    {{memberForm.number}}
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="姓名:" >
                                <div class="content">
                                    {{memberForm.username}}
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="昵称:" >
                                <div class="content">
                                    {{memberForm.nickName}}
                                </div>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-image
                            class="avatar"
                            :src="imageUrl"
                            :z-index="zIndex"
                            :preview-src-list="srcList"
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="性别:" >
                                <div class="content">
                                    <span v-if="memberForm.gender">   {{memberForm.gender}}</span>
                                    <span v-else>无</span>

                                </div>

                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="年龄:" >
                                <div class="content">
                                    <span v-if="memberForm.age">   {{memberForm.age}}</span>
                                    <span v-else>无</span>

                                </div>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="班级:" >
                                <div class="content">
                                    <span v-if="memberForm.myClass">   {{memberForm.myClass}}</span>
                                    <span v-else>无</span>

                                </div>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="电话:" >
                                <div class="content">
                                    <span v-if="memberForm.phone">  {{memberForm.phone}}</span>
                                    <span v-else>无</span>

                                </div>

                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="QQ:" >
                                <div class="content">
                                    <span v-if="memberForm.qq">  {{memberForm.qq}}</span>
                                    <span v-else>无</span>

                                </div>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="Email:" >
                                <div class="content">
                                    <span v-if="memberForm.email">  {{memberForm.email}}</span>
                                    <span v-else>无</span>

                                </div>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注:" >
                                <div class="content">
                                    <span v-if="memberForm.remark">  {{memberForm.remark}}</span>
                                    <span v-else>无</span>
                                </div>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="加入时间:" >
                                <div class="content">
                                    <span v-if="memberForm.joinDate">  {{memberForm.joinDate}}</span>
                                    <span v-else>无</span>

                                </div>

                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </el-dialog>
        <el-row style="margin: 18px 0px 0px 18px ">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>工作管理</el-breadcrumb-item>
                <el-breadcrumb-item>成员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <el-button class="add-button" type="success" @click="exportExcel()">导出</el-button>
        <el-card style="margin: 18px 2%;width: 95%">
            <el-table
                    id="table"
                    :data="members.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                    stripe
                    header-row-class-name="tableHeader"
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
                        prop="user"
                        label="user"
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
                        prop="gender"
                        label="性别"
                        fit>

                </el-table-column>

                <el-table-column
                        prop="age"
                        label="年龄"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="myClass"
                        label="班级"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="手机号"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="qq"
                        label="qq"
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
                        label="操作"
                        class-name="setting"
                        width="120">
                    <template slot-scope="scope">
                        <el-button
                                @click="detailSign(scope.row)"
                                type="text"
                                size="small">
                            详细
                        </el-button>
                        <el-button
                                @click="deleteSign(scope.row)"
                                type="text"
                                size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 20px 0 20px 0;float: left">

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
        </el-card>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    export default {
        name: "memberManagement",
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            }
        },
        data(){
          return {
              // 默认每页显示的条数（可修改）
              PageSize:5,
              // 默认显示第几页
              currentPage:1,
              // 个数选择器（可修改）
              pageSizes:[5,10,15,20],
              //总数
              total:0,
              zIndex:200000,
              //默认图片
              imageUrl:'',
              srcList: [

              ],
              dialogForm:false,
              memberForm:{},
              members:[]//成员
          }
        },
        mounted () {
            this.listMembers()

        },
        methods:{
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
            // 打印表单
            printForm(){
                var printBox = document.getElementById('memberForm');
                //拿到打印的区域的html内容
                var newContent =printBox.innerHTML;
                //将旧的页面储存起来，当打印完成后返给给页面。
                var oldContent = document.body.innerHTML;
                //赋值给body
                document.body.innerHTML = newContent;
                //执行window.print打印功能
                window.print();
                // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
                window.location.reload();
                document.body.innerHTML = oldContent;
                return false;
            },
            //详情
            detailSign(row){
                this.imageUrl=''
                this.dialogForm=true
                this.memberForm=row
                if(row.photo!=null) this.imageUrl = row.photo
                // this.memberForm.joinDate =
            },
            //删除
            deleteSign(row){
                return  this.$confirm('此操作将永久删除该成员, 是否继续?', '系统提示',{
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.put('users/delete', {
                        id: row.id,
                    }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            // 修改角色后重新请求用户信息，实现视图更新
                            this.listMembers()
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除!'
                    });

                });

            },
            exportExcel () {
                var tab = document.getElementById("table")

                var wb = XLSX.utils.table_to_book(tab)
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '成员表.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },

            //成员
            listMembers(){
                var _this = this
                this.$axios.post('/users/findMembers',{
                    isJoin:1
                }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        _this.members = resp.data.result
                        this.total = resp.data.result.length
                    }
                })
            },
        }
    }

</script>

<style scoped>
    .block{
        text-align: right;
        margin:10px ;
    }
    .add-button {
        margin: 18px 0 0 10px;
    }
    .content{
        width: 100%;
        border-bottom: 1px solid #ccc;
    }
    #memberForm{
        position: absolute;
        width: 80%;
        height: 100%;
    }
    .avatar{
        position: absolute;
        left: 79%;
        top: 0;
        width: 20%;
        height: 20%;
        border: 1px solid #ccc;
    }
    .formDiv{
        height: 800px;
        overflow: auto;
        /*height: 100%;*/
    }
</style>
