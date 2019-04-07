<template>
  <div class="abilityReady-content">
    <el-button type="primary" plain  @click="$router.push({path:'/afterClass/add'})" class="addBtn">新增</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%" :row-class-name="isCenter" :header-cell-style="{'text-align':'center'}">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="教师姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="subjectCode"
        label="学科">
        <template slot-scope="scope">
          {{ subjectsObj[scope.row.subjectCode] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="gradeCode"
        label="学年">
        <template slot-scope="scope">
          {{ gradesObj[scope.row.gradeCode] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="artType"
        label="文理科">
        <template slot-scope="scope">
          <span v-if="scope.row.artType==1">文科</span>
          <span v-if="scope.row.artType==2">理科</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateDate"
        label="提交时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="active"
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="lookInfo(scope.row)">查看</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="editInfo(scope.$index,scope.row)">编辑</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="delOpp(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--弹出框-->
  </div>



</template>
<script>
  import moment from "moment";
  export default {
    components: {
    },
    data() {
      return {
        /*表格(教师列表)*/
        subjectsObj:this.commonSubject,
        gradesObj:this.commonGrond,
        tableData: [],
        /*分页*/
        currentPage:1, //当前页数
        total:20, //数据个数
        pageSize:10, //每页几条
        parInfo:{},//当前用户信息
        id:'',//用户信息
      }
    },
    created() {
      this.id=this.localData.get("tmpStudentInfo").userId;
      this.getTeachingReflections();
      /* this.getGradeList();
       this.getSubjectList()
       this.getTeacherList();*/
      var result = [];
      result.forEach(value=>{
        value.time = moment(value.time).format("YYYY-MM-DD")
        value.subTime = moment(value.subTime).format("YYYY-MM-DD")
      });
      this.tableData=result
    },
    filters:{
    },
    methods: {
      /*获取列表页*/
      getTeachingReflections(){
        var $this = this;
        var obj={
          userId:this.id,
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }
        this.$axios
          .post("/teachingReflection/getTeachingReflections", obj)
          .then(res => {
            if(res.code=="000000"){
              $this.total=res.totalRows;
              var result=res.result || [];
              result.forEach(value=>{
                value.schoolDate = moment(value.schoolDate).format("YYYY-MM-DD HH:mm")
                value.updateDate = moment(value.updateDate).format("YYYY-MM-DD HH:mm")
              });
              $this.tableData=result
            }
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "获取行为习惯列表失败"
            });
          });
      },
      /*分页*/
      handleSizeChange(val) {
        this.pageSize = val;
         this.getTeachingReflections()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
         this.getTeachingReflections()
      },
      /*表格*/
      indexMethod(index) {
        return index +1
      },
      /*查看*/
      lookInfo(val){
        this.$router.push({path: '/afterClass/show',query:{id:val.teachingReflectionId}})
      },
      /*编辑*/
      editInfo(index,row) {
        this.$router.push({path: '/afterClass/add',query: {id:row.teachingReflectionId}})
      },
      //删除
      delOpp(val){
        var $this=this;
        this.$confirm('确认要删除此记录吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj={
            'updateName':'123',
            'teachingReflectionId':val.teachingReflectionId
          }
          this.$axios
            .post("/teachingReflection/deleteTeachingReflection",obj)
            .then(res => {
              if(res.code=="000000"){
                this.getTeachingReflections()
              }else{
                $this.$message.error(res.message||'请求出错');
              }
            }).catch(e=>{
            $this.$message.error(e.message||'请求出错');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //设置表的样式
      isCenter({row, column, rowIndex, columnIndex}){
        return 'isCenter3'
      },
    },
    watch:{
    },

  }
</script>

<style scoped lang="less">
  .abilityReady-content{
    padding-top:20px;
    .addBtn{
      float: right;
      margin: 0 20px 20px 0;}
  }

  .el-pagination{
    text-align: center;
    margin-top:20px;
  }
  .radio-wrap{
    text-align: center;
  }
  .btn-wrap{
    margin-top:26px;
  }
</style>
<style>
  .isCenter3 td{text-align: center;  height:48px;
    line-height:48px;
    padding:0;}
</style>
