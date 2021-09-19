<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span style="font-weight: bold;font-size: 20px">新闻动态</span>
      <span style="color: #409EFF;font-size: 10px;cursor: pointer;">更多</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
    </div>
    <div class="block" v-for="item in news" :key="item.id">
      <el-timeline >
        <el-timeline-item :timestamp="item.newsTime" placement="top">
          <el-card class="card" style="cursor: pointer">
            <div class="left_img">
              <el-image :src="item.photo" alt="" :preview-src-list="item.srcList" class="img" ></el-image>
            </div>
            <div class="right_content"  @click="detailNews">
              <h4 style="margin:5px"> {{item.title}}</h4>
              <hr style="border: 1px solid #ccc">
              <p>{{item.content}}</p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="page" >
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
</template>

<script>
export default {
  name: 'UpdateCard',
  //入口函数，获得cookie信息
  mounted() {
    this.findNews();
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
      news:[],
    }
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
    findNews(){
        this.$axios
            .get('home/findNews').then(successResponse =>{
              if(successResponse.data.code===200){
                this.news = successResponse.data.result
                this.total=this.news.length
                if(this.news.length>0){
                  //查看大图
                  for (let i = 0; i <this.news.length ; i++) {
                      this.news[i].srcList = new Array()
                      this.news[i].srcList.push(this.news[i].photo)
                  }
                }

              }

        })
    },
    //详情
    detailNews(){

    }
  }
}
</script>

<style scoped>
  .page{
    text-align: right;
    margin:10px ;
  }
  .header{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .box-card {
    margin-top: 5px;
    width: 988px;
    height: 1050px;
    text-align: left;
  }
  .card:after{
    content:"";display:block;clear:both;
  }
  .left_img{
    background: #2c3e50;
    width: 200px;
    height: 110px;
    float: left;
    margin-bottom: 5px;
  }
  .right_content{
    width: 588px;
    float: right;
  }
  h4{
    margin-top:0px ;
  }
  p{
    height: 78px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
</style>
