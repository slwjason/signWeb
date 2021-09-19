<template>
    <div>
        <el-dialog
                title="报名学生信息"
                width="80%"
                :visible.sync="dialogForm"
        >
            <el-form v-model="signForm" style="text-align: left" ref="dataForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="学号" label-width="120px" prop="number">
                            <el-input v-model="signForm.number" autocomplete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户名" label-width="120px" prop="username">
                            <el-input v-model="signForm.username" autocomplete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" label-width="120px" prop="name">
                            <el-input v-model="signForm.gender" autocomplete="off" disabled></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年龄" label-width="120px" prop="name">
                            <el-input v-model="signForm.age" autocomplete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                        <el-form-item label="班级" label-width="120px" prop="name">
                            <el-input v-model="signForm.myClass" autocomplete="off" disabled></el-input>
                        </el-form-item>
                </el-row>
                <el-form-item label="手机号" label-width="120px" prop="phone">
                    <el-input v-model="signForm.phone" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="qq号" label-width="120px" prop="phone">
                    <el-input v-model="signForm.qq" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="120px" prop="email">
                    <el-input v-model="signForm.email" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="理由" label-width="120px" prop="email">
                    <el-input v-model="signForm.reason" autocomplete="off" type="textarea" disabled></el-input>
                </el-form-item>
                <el-form-item label="审核">
                    <el-radio-group v-model="shenhe">
                        <el-radio :label="true">通过</el-radio>
                        <el-radio :label="false">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit(signForm)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="审核"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>

            <el-radio-group v-model="yaoqinmaShenhe">
                <el-radio :label="true">通过</el-radio>
                <el-radio :label="false">不通过</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="yaoqinmaSubmit">确 定</el-button>
  </span>
        </el-dialog>
<!--        面试框-->
        <el-dialog
                title="面试通知"
                :visible.sync="interviewDialog"
                width="50%"
                center>
            <el-form v-model="interviewForm" style="text-align: left"  ref="interviewForm">
                <el-row>

                    <el-form-item label="邮件内容" label-width="120px" prop="content">
                        <el-input v-model="interviewForm.content" autocomplete="off" type="textarea" ></el-input>
                    </el-form-item>
                    <el-form-item label="通知人" label-width="120px" prop="content">
                    <el-select  value-key="id" v-model="interviewForm.signUsers" multiple placeholder="请选择" style="width: 300px" @change='selectAll'>
                        <el-option v-for="item in selectOptions"
                                   :key="item.id"
                                   :label="item.username"
                                   :value="item">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-row>
            </el-form>


            <span slot="footer" class="dialog-footer">
    <el-button @click="interviewDialog = false">取 消</el-button>
    <el-button type="primary" @click="interviewSubmit">确 定</el-button>
  </span>
        </el-dialog>
<!--       通知框 -->
        <el-dialog
                title="通知"
                :visible.sync="informDialog"
                width="50%"
                center>
            <el-form v-model="informForm" style="text-align: left"  ref="informForm">
                <el-row>

                    <el-form-item label="通知内容" label-width="120px" prop="content">
                        <el-input v-model="informForm.content" autocomplete="off" type="textarea" ></el-input>
                    </el-form-item>
                </el-row>
            </el-form>


            <span slot="footer" class="dialog-footer">
    <el-button @click="informDialog = false">取 消</el-button>
    <el-button type="primary" @click="informSubmit">确 定</el-button>
  </span>
        </el-dialog>
        <el-row style="margin: 18px 0px 0px 18px ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
            <el-breadcrumb-item>工作管理</el-breadcrumb-item>
            <el-breadcrumb-item>报名管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-row>
        <el-collapse accordion style="margin-top: 20px">
            <el-collapse-item>
                <template slot="title">
                   直接报名<i class="header-icon el-icon-info"></i>
                </template>
                <div style="margin: 20px 0 20px 0;float: left">
                    <el-button type="success" @click="inform" style="margin-right: 20px">通知</el-button>
                    <router-link :to="{path:'/written'}" > <el-button type="info">笔试</el-button></router-link>
                    <!--        <el-button>批量删除</el-button>-->
                </div>
                <el-card style="margin: 18px 2%;width: 95%">
                    <el-table
                            :data="signs.slice((currentPage-1)*PageSize,currentPage*PageSize)"
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
                                show-overflow-tooltip
                                fit>
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="手机号"
                                show-overflow-tooltip
                                fit>
                        </el-table-column>
                        <el-table-column
                                prop="qq"
                                label="qq"
                                show-overflow-tooltip
                                fit>
                        </el-table-column>
                        <el-table-column
                                prop="createDate"
                                label="报名时间"
                                show-overflow-tooltip
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
                                <span v-if="scope.row.status==0">待审核</span>
                                <span v-if="scope.row.status==1">通过</span>
                                <span v-if="scope.row.status==-1">未通过</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="120">
                            <template slot-scope="scope">
                                <el-button
                                        @click="detailSign(scope.row)"
                                        type="text"
                                        size="small">
                                    详细
                                </el-button>
                                <el-button
                                        @click="editSign(scope.row)"
                                        type="text"
                                        v-if="scope.row.status==0"
                                        size="small">
                                    操作
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
                                <el-button type="success" @click="publishInterview">发布面试</el-button>
                        <!--        <el-button>批量删除</el-button>-->
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
            </el-collapse-item>
            <el-collapse-item title="邀请码报名">
               <el-card  style="margin: 18px 2%;width: 95%">
                   <el-table
                           :data="yaoqinmas"
                           stripe
                           :default-sort = "{prop: 'id', order: 'ascending'}"
                           style="width: 100%"
                           :max-height="tableHeight">
                       <el-table-column
                               type="selection"
                               width="55">
                       </el-table-column>

                       <el-table-column
                               label="序号"
                               width="70px">
                           <template slot-scope="scope">
                               {{scope.$index+1}}
                           </template>
                       </el-table-column>
                       <el-table-column
                               prop="id"
                               label="id"
                               v-if="false"
                               width="100">
                       </el-table-column>
                       <el-table-column
                               prop="inviteesname"
                               label="受邀者"
                               show-overflow-tooltip
                               fit>
                       </el-table-column>
                       <el-table-column
                               prop="inviteename"
                               label="邀请人"
                               show-overflow-tooltip
                               fit>
                       </el-table-column>
                       <el-table-column
                               prop="code"
                               label="邀请码"
                               show-overflow-tooltip
                               fit>
                       </el-table-column>
                       <el-table-column
                               prop="createDate"
                               label="邀请时间"
                               show-overflow-tooltip
                               fit>
                       </el-table-column>
                       <el-table-column
                               prop="overDate"
                               label="过期时间"
                               show-overflow-tooltip
                               fit>
                       </el-table-column>

                       <el-table-column
                               prop="signDate"
                               label="报名时间"
                               show-overflow-tooltip
                               fit>
                           <template slot-scope="scope">
                               <span v-if="scope.row.signDate==null">未报名</span>
                               <span v-else>{{scope.row.signDate}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column
                               label="状态"
                               sortable
                               width="100">
                           <template slot-scope="scope">
                               <span v-if="scope.row.status==0">待审核</span>
                               <span v-if="scope.row.status==1">通过</span>
                               <span v-if="scope.row.status==-1">未通过</span>
                           </template>
                       </el-table-column>
                       <el-table-column
                               label="操作"
                               width="120">
                           <template slot-scope="scope">

                               <el-button
                                       @click="editYqm(scope.row)"
                                       type="text"
                                       v-if="scope.row.signDate!=null&&scope.row.status==0"
                                       size="small">
                                   操作
                               </el-button>
                               <el-button
                                       @click="deleteYqm(scope.row)"
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
                   <div class="block" >
                       <el-pagination
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPageY"
                               :page-sizes="pageSizesY"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="totalY"
                               :page-size="PageSizeY"
                       >
                       </el-pagination>
                   </div>
               </el-card>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>

<script>
    export default {
        name: "signManagement",
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            }
        },
        data(){
            return{

                // 默认每页显示的条数（可修改）
                PageSize:5,
                // 默认显示第几页
                currentPage:1,
                // 个数选择器（可修改）
                pageSizes:[5,10,15,20],
                //总数
                total:0,
                // 默认每页显示的条数（可修改）
                PageSizeY:5,
                // 默认显示第几页
                currentPageY:1,
                // 个数选择器（可修改）
                pageSizesY:[5,10,15,20],
                //总数
                totalY:0,
                //邀请单条数据
                yqItem:{},
                //邀请码审核
                yaoqinmaShenhe:true,
                //审核
                shenhe:true,
                signs:[],
                yaoqinmas:[],
                signForm:{},
                dialogForm:false,
                //邀请码弹框
                centerDialogVisible:false,
                //发布面试弹框
                interviewDialog:false,
                //通知框
                informDialog:false,
                //面试表单
                interviewForm:{
                    content:'',
                    signUsers:[]
                },
                //通知表单
                informForm:{},
                selectOptions: [],
                oldChooseData: [],
                chooseData:[],
                //所有已审核的人
                allInterview:[],

            }
        },
        mounted () {
            this.listSigns()
            this.listYaoqinma()
        },
        methods:{
            //面试框中的select框
            selectAll (val) {
                const allValues = this.selectOptions;
                // 用来储存上一次选择的值，可进行对比
                const oldVal = this.oldChooseData;
                // 若选择全部
                if (val.length>0 && val[0].id=='ALL_SELECT') {

                    this.chooseData = allValues;
                }
                // 取消全部选中， 上次有， 当前没有， 表示取消全选
                if (val.length>0 && val[0].id !=='ALL_SELECT') {
                    // 全选未选，但是其他选项都全部选上了，则全选选上
                    if (val.length === allValues.length - 1) {
                        this.chooseData = [{
                            id:'ALL_SELECT',
                            name:'全选'
                        }].concat(val);
                    }else{
                        this.chooseData = val
                    }
                }
                if(val.length<=0){
                    this.chooseData = [];
                }
                // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
                // 新老数据都有全部选中
                if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
                    const index = val.indexOf('ALL_SELECT');
                    val.splice(index, 1); // 排除全选选项
                    this.chooseData = val;
                }
                // 储存当前选择的最后结果 作为下次的老数据
                this.oldChooseData = this.chooseData;
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
            // 每页显示的条数
            handleSizeChangeY(val) {
                // 改变每页显示的条数
                this.PageSizeY=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPageY=1
            },
            // 显示第几页
            handleCurrentChangeY(val) {
                // 改变默认的页数
                this.currentPageY=val
            },
            //报名表
            listSigns(){
                let _this = this
                this.$axios.get('/work/findSigns').then(resp => {
                    if (resp && resp.data.code === 200) {
                        _this.signs = resp.data.result
                        this.total = resp.data.result.length
                        //筛选报名审核通过的人
                        _this.selectOptions = _this.signs.filter(item => item.status==1)
                        _this.allInterview =  _this.signs.filter(item => item.status==1)
                        //审核通过人数组添加全选option
                        let allSelect = new Object()
                        allSelect.id ='ALL_SELECT'
                        allSelect.username = '全选'
                        this.selectOptions.unshift(allSelect)

                    }
                })
            },
            //邀请码表
            listYaoqinma(){
                var _this = this
                this.$axios.get('/work/findYaoqinma').then(resp => {
                    if (resp && resp.data.code === 200) {
                        _this.yaoqinmas = resp.data.result
                        this.totalY = resp.data.result.length
                    }
                })
            },
            //操作
            editSign(row){
                this.dialogForm = true
                this.signForm = row
                console.log(this.shenhe)
            },
            //邀请码炒作
            editYqm(item){
                this.centerDialogVisible = true
                this.yqItem = item
            },
            onSubmit(sign){
                var _this = this
                var status;
                /*
                * 1代表通过，-1代表不通过
                * */
                if(_this.shenhe==true){
                    status=1
                }else {
                    status=-1
                }
                this.$axios.put('/work/shenhe',{
                    shenhe:status,
                    id:sign.id,
                    uid:sign.user,
                    email:sign.email
                }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        _this.$message.success('审核成功')
                        _this.dialogForm=false
                        _this.listSigns()
                    }
                })
            },
            //邀请码shenhe
            yaoqinmaSubmit(){
                var _this = this
                var status;
                /*
                * 1代表通过，-1代表不通过
                * */
                if(_this.yaoqinmaShenhe==true){
                    status=1
                }else {
                    status=-1
                }
                this.$axios.put('/work/yqmShenhe',{
                    shenhe:status,
                    id:_this.yqItem.id,
                    uid:_this.yqItem.invitees
                }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        _this.$message.success('审核成功')
                        _this.centerDialogVisible=false
                        _this.listYaoqinma()
                    }
                })
            },
            //发布面试
            publishInterview(){
                this.interviewDialog = true;
                this.interviewForm.signUsers=[]
            },
            //提交面试
            interviewSubmit(){
                //对相应的同学发送邮件
                for (let i = 0; i <this.interviewForm.signUsers.length ; i++) {
                    //如果选择了全部，把全部成员选上
                    if (this.interviewForm.signUsers[i].id == 'ALL_SELECT') {
                        this.interviewForm.signUsers = this.allInterview
                        break
                    }
                }
               this.$axios.put('/work/interview',{
                    text:this.interviewForm.content,
                    interviews:this.interviewForm.signUsers
               }).then(res=>{
                   if (res && res.data.code === 200) {
                       this.$alert('发布成功')
                       this.interviewDialog = false
                   }
               })

            },
            //通知
            inform(){
                this.informDialog = true
            },
            //提交通知
            informSubmit(){
                this.$axios.put('/work/inform',{
                    text:this.informForm.content,
                    signs:this.signs
                }).then(res=>{
                    if (res && res.data.code === 200) {
                        this.$alert('发布成功')
                        this.informDialog = false
                    }
                })
            },

        },
    }
</script>

<style scoped>
    .block{
        text-align: right;
        margin:10px ;
    }
</style>
