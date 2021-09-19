<template>
    <div>
        <div style="text-align: left;margin: 20px 0px">
             <router-link :to="{path:'/admin/work/sign'}" > <el-button type="info">返回</el-button></router-link>
        </div>
        <el-card style="margin: 18px 2%;width: 95%;height: 50%">
            <el-table
                    :data="tests"
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
                        prop="title"
                        label="标题"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="overDate"
                        label="过期时间"
                        fit>
                </el-table-column>
                <el-table-column
                        label="状态"
                        sortable
                        width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">已发布</span>
                        <span v-if="scope.row.status==0">待发布</span>
                        <span v-if="scope.row.status==-1">已过期</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="160">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="small">
                        <router-link :to="{path:'/settingStudentTest', query:{testId:scope.row.id}}" >
                                管理
                        </router-link>
                        </el-button>
                        <el-button
                                @click="publishArticles(scope.row)"
                                type="text"
                                size="small">
                            发布
                        </el-button>
                        <el-button
                                @click="updateArticles(scope.row)"
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
                <el-button type="success" @click="addTest">创建试题</el-button>
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
        <el-dialog
                title="编辑器"
                :visible.sync="dialogFormWritten"
                @close="clear"
                width="80%">
            <div>
                <!--      标题    -->
                <el-row>
                    <el-col :span="18">
                        <el-input
                                v-model="article.title"
                                style="margin: 10px 0px;font-size: 18px;"
                                placeholder="请输入标题"></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-date-picker
                                style="margin: 10px 0px;font-size: 18px;"
                                v-model="article.overDate"
                                type="datetime"
                                placeholder="选择过期时间"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <mavon-editor
                        v-model="article.content"
                        style="height: 500px;"
                        ref=md
                        @save="saveArticles"
                        fontSize="16px">
                </mavon-editor>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "writtenManagement",
        data () {
            return {
                dialogFormWritten:false,
                article: {
                    content:'',
                    title:'',
                    overDate:''
                },
                tests:[],
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
                // 默认每页显示的条数（可修改）
                PageSize:5,
                // 默认显示第几页
                currentPage:1,
                // 个数选择器（可修改）
                pageSizes:[5,10,15,20],
                //总数
                total:0,
            }
        },
        mounted(){
            this.findTest()
        },
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            },
        },
        methods:{
            //清除弹框
            clear () {
                this.article = {
                    title:'',
                    content:'',
                    overDate:''
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
            //查找所有笔试
            findTest(){
                this.$axios.get('/work/findTest')
                    .then(res =>{
                        if (res && res.data.code === 200) {
                            this.tests= res.data.result
                            this.total = res.data.result.length
                        } else {
                            this.$alert(res.data.message)
                        }
                    })
            },
            //创建试题
            addTest(){
                this.dialogFormWritten =true
            },
            //保存编辑
            saveArticles(){
                let that = this
                this.$axios.put('/work/addTest', {
                    title:that.article.title,
                    content:that.article.content,
                    overDate:that.common.formatDate(that.article.overDate,'yyyy-MM-dd hh:mm:ss')
                }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        that.$alert('题目添加成功')
                        that.dialogFormWritten = false
                        that.clear()
                        that.findTest()
                    } else {
                        that.$alert(resp.data.message)
                    }
                })
            },
            //编辑
            updateArticles(row){
                this.$axios.post('/work/getTest',{
                    id:row.id
                })
                    .then(res =>{
                        if (res && res.data.code === 200) {
                            this.dialogFormWritten = true
                            this.article= res.data.result[0]
                            this.article.overDate = new Date(res.data.result[0].overDate)
                        } else {
                            this.$alert(res.data.message)
                        }
                    })
            },
            //发布
            publishArticles(row){
                this.$axios.put('/work/publishTest',{
                    id:row.id
                })
                    .then(res =>{
                        if (res && res.data.code === 200) {
                            this.$alert('发布成功')
                            that.findTest()
                        } else {
                            this.$alert(res.data.message)
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
