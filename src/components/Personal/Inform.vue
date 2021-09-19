<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="考试通知" name="first">
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
                                    disabled
                                    placeholder="请输入标题"></el-input>
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
            <el-card>
                <div class="main">
                    <el-card class="item" v-for="item in publishedTests">
                        <h3>{{item.title}}</h3>
                        <i>过期时间：{{item.overDate}}</i>
                        <el-button style="background: #c5f193;margin: 20px 0px 5px 185px" @click="examination(item)" v-if="item.testId==null">考试</el-button>
                        <el-button style="background: #c5f193;margin: 20px 0px 5px 185px" @click="examinationUpdate(item)" v-else>重做</el-button>
                    </el-card>
                </div>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="其他通知" name="second">其他通知 </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "Inform",
        data(){
            return{
                flag:true,//判断是否重做
                activeName: 'first',
                publishedTests:[],
                dialogFormWritten:false,
                article: {
                    content:'',
                    title:'',
                    overDate:''
                },
            }
        },
        mounted(){
            this.findPublishedTest()
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
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //查找已发布的考试
            findPublishedTest(){
                var _this=this
                this.$axios.post('work/findPublishedTest',{
                    stuId : _this.$store.state.user.id
                })
                    .then(resp => {
                    if (resp && resp.data.code === 200) {
                        _this.publishedTests = resp.data.result
                    }else{
                        this.$alert(resp.data.message)
                    }
                })
            },
            //考试
            examination(row){
                let _this = this
                _this.dialogFormWritten = true
                _this.article=row
                this.flag=false
            },
            //重做
            examinationUpdate(row){
                let _this = this
                _this.dialogFormWritten = true
                _this.article=row
                this.flag=true
            },
            //保存编辑
            saveArticles(){
                let that = this
                if(this.flag){
                    this.$axios.put('/work/studentTestUpdate', {
                        id:that.article.id,
                        content:that.article.content,
                    }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            that.$alert('修改成功')
                            that.dialogFormWritten = false
                            that.clear()
                            that.findPublishedTest()
                        } else {
                            that.$alert(resp.data.message)
                        }
                    })
                }else{
                    this.$axios.put('/work/studentTest', {
                        stuId:that.$store.state.user.id,//学生id
                        stuName:that.$store.state.user.username,
                        testId:that.article.id,//题目id
                        title:that.article.title,
                        content:that.article.content,
                        overDate:that.article.overDate
                    }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            that.$alert('考试成功')
                            that.dialogFormWritten = false
                            that.clear()
                            that.findPublishedTest()
                        } else {
                            that.$alert(resp.data.message)
                        }
                    })
                }

            },

        }
    }
</script>

<style scoped>
    .main{
        min-height: 400px;
    }
    .item{
        float: left;
        margin-left: 60px;
        margin-bottom: 30px;
        background: rgba(182, 250, 242, 0.84);
        width: 26%;
    }
</style>
