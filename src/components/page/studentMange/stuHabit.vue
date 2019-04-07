<template>
  <div class="habitBox padTop20">
    <el-button type="primary" plain  @click="$router.push({path:'/habit/add',query:{type:type}})" class="addBtn">新增</el-button>
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
        prop="schoolDate"
        label="上课日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="上课教师">
      </el-table-column>

      <el-table-column
        prop="subjectCode"
        label="学科">
        <template slot-scope="scope">
          {{ subjectsObj[scope.row.subjectCode] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="recordName"
        label="记录人">
      </el-table-column>
      <el-table-column
        prop="recordName"
        label="文理">
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
        tableData: [],
        /*分页*/
        currentPage:1, //当前页数
        total:20, //数据个数
        pageSize:10, //每页几条
        parInfo:{},//当前用户信息
        id:'',//用户id
        type:null,//用户类型
      }
    },
    created() {
     this.type=this.$route.query.type;
     this.id=this.localData.get("tmpStudentInfo").userId;
     this.getHabitList()
    },
    filters:{
    },
    methods: {
      /*获取行为习惯表*/
      getHabitList(){
        this.type=this.$route.query.type;
        var $this = this;
        var obj={
          userId:this.id,
          userType: this.$route.query.type,
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }
        this.$axios
          .post("/behaviourRecord/getBehaviourRecords", obj)
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
        this.getHabitList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getHabitList()
      },
      /*表格*/
      indexMethod(index) {
        return index +1
      },
      /*查看*/
      lookInfo(val){
      this.$router.push({path:'/habit/show',query:{type:this.type,id:val.behaviourRecordId}})
      },
      /*编辑*/
      editInfo(index,row) {
        this.$router.push({path:'/habit/add',query:{type:this.type,isEdit:1,id:row.behaviourRecordId}})
      },
      //删除
      delOpp(val){
        this.$confirm('确认要删除此记录吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj={
            updateName:'123',
            behaviourRecordId:val.behaviourRecordId
          }
          this.$axios
            .post("/behaviourRecord/deleteBehaviourRecord",obj)
            .then(res => {
              if(res.code=="000000"){
                this.getHabitList()
              }else{
                this.$message.error(res.result);
              }
            })
            .catch(err => {
              this.$message({
                type: 'info',
                message: "更新家长信息失败"
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*评级确认按钮*/

      //设置表的样式
      isCenter({row, column, rowIndex, columnIndex}){
        return 'isCenter3'
      },
    },
    watch:{
      radio: function () {
        this.getTeacherList();
      },
      // 如果路由有变化，会再次执行该方法
      "$route": "getHabitList"

    },

  }
</script>

<style scoped lang="less">
  .habitBox{
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
 /* .isCenter3 td:last-child{text-align: left}*/
</style>
