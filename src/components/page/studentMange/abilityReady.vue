<template>
  <div class="abilityReady-content">
    <el-button type="primary" plain  @click="$router.push({path:'/abilityReady/add'})" class="addBtn">新增</el-button>
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
        prop="createDate"
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
            @click="lookInfo(scope.$index,scope.row)">查看</el-button>
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
        total:1, //数据个数
        pageSize:10, //每页几条
        parInfo:JSON.parse(window.localStorage.getItem("tmpStudentInfo")),//当前用户信息
      }
    },
    created() {
      this.getReadyList()
    },
    filters:{
    },
    methods: {
      /*获取列表*/
      getReadyList:function(){
        var $this = this;
        var obj = {
          "pageNum": $this.currentPage,
          "pageSize": $this.pageSize,
          "userId": $this.parInfo.userId
        }
        this.$axios
          .post("preparation/getPreparationList", obj)
          .then(res => {
            if(res.code=="000000"){
              for(var i=0;i<res.result.length;i++){
                res.result[i].createDate =  moment(res.result[i].createDate).format("YYYY-MM-DD hh:mm:ss")
              }
              $this.tableData = res.result;
              $this.total = res.totalRows;
            }else{
              this.$message({
                type: 'info',
                message: "获取训练准备列表失败"
              });
            }
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "获取训练准备列表失败"
            });
          });
      },
      /*分页*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.getReadyList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getReadyList()
      },
      /*表格*/
      indexMethod(index) {
        return index +1
      },
      /*查看*/
      lookInfo(index,row){
        this.$router.push({path: '/abilityReady/show',query: {id:row.trainingPreparationId}})
      },
      /*编辑*/
      editInfo(index,row) {
        this.$router.push({path: '/abilityReady/add',query: {id:row.trainingPreparationId}})
      },
      /*编辑确认*/
      editSubit(){
        console.log(this.$refs.editInfo.getData());
        console.log("---编辑确认----")
      },
      //删除
      delOpp(val){
        this.$confirm('确认要删除此记录吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            "trainingPreparationId":val.trainingPreparationId,
            "updateName":"小丰"
          }
          console.log(obj)
          this.$axios
            .post("/preparation/deletePreparation", obj)
            .then(res => {
              if(res.code=="000000"){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getReadyList()
              }else{
                this.$message({
                  type: 'warning',
                  message: "删除失败"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: 'warning',
                message: "删除失败"
              });
            });
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
    margin:20px 0;
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
