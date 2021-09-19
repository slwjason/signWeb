<template>
    <div>
        <div style="text-align: left;margin: 20px 0px">
            <router-link :to="{path:'/written'}" > <el-button type="info">返回</el-button></router-link>
        </div>
        <el-card style="margin: 18px 2%;width: 95%;height: 50%">
            <el-table
                    :data="studentTests"
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
                        prop="stuName"
                        label="姓名"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="提交时间"
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
    export default {
        name: "settingStudentTest",
        data(){
            return{
                studentTests:[],
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
            this.findStudentTest()
        },
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            },
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
            //查找学生试卷
            findStudentTest(){
                //试卷模板id
                let testId = this.$router.history.current.query.testId
                this.$axios.post('/work/findStudentTest',{
                    testId:testId
                })
                    .then(res =>{
                        if (res && res.data.code === 200) {
                            this.studentTests= res.data.result
                            this.total = res.data.result.length
                        } else {
                            this.$alert(res.data.message)
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .block{
        text-align: right;
        margin:10px ;
    }
</style>
