<template>
    <div>
        <el-row style="margin: 18px 0px 0px 18px ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
            <el-breadcrumb-item>工作管理</el-breadcrumb-item>
            <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
        </el-breadcrumb>
        </el-row>
        <el-card style="margin: 18px 2%;width: 95%">
            <el-table
                    :data="news"
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
                        prop="content"
                        label="内容"
                        fit>
                </el-table-column>

                <el-table-column
                        prop="newsTime"
                        label="发布时间"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="photo"
                        label="图片"
                        v-if="false"
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
                                @click="detailNews(scope.row)"
                                type="text"
                                size="small">
                            详情
                        </el-button>
                        <el-button
                                @click="editNews(scope.row)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click="deleteNews(scope.row)"
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
    export default {
        name: "newsManagement",
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            }
        },
        data(){
            return{
                news:[],
            }
        },
        mounted(){
            this.listNews()
        },
        methods:{
            //查找用户
            listNews () {
                var _this = this
                this.$axios.get('/home/findNews').then(resp => {
                    if (resp && resp.data.code === 200) {
                        _this.news = resp.data.result
                    }
                })
            },
        },
    }
</script>

<style scoped>

</style>
