<template>
  <div class="content-wrap userBox">
<!--     <commonTitle>
      教务列表
    </commonTitle> -->
    <div class="nav-list">
      <span>年级：</span>
      <el-select v-model="gradeCode" placeholder="请选择">
        <el-option
          v-for="item in gradeList"
          :key="item.dataIden"
          :label="item.dataName"
          :value="item.dataIden">
        </el-option>
      </el-select>

      <el-input placeholder="请输入内容" class="input-with-select searchWrap" v-model="infoText">
        <el-select slot="prepend" placeholder="请选择" v-model="typesearch" class="slt_typesearch">
          <el-option label="姓名" value="1"></el-option>
          <el-option label="账号" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
      </el-input>
      <!--<el-button type="primary">搜索</el-button>-->

      <!--<span class="sortSpan" @click="sortClick">预警次数排序 <i class="el-icon-caret-top" v-show="!isSort"></i><i class="el-icon-caret-bottom" v-show="isSort"></i></span>-->

      <!--<span style="margin-left:20px;">等级：</span>-->
      <!--<el-radio v-model="radio" label="1">有</el-radio>-->
      <!--<el-radio v-model="radio" label="0">无</el-radio>-->

    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userAccount"
        label="账号">
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
          {{ scope.row.userSex==1?"男" :"女"}}
        </template>
      </el-table-column>
      <el-table-column
        prop="gradeName"
        label="年级">
        <template slot-scope="scope">
          {{ gradesObj[scope.row.gradeIden] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="subjectCode"
        label="学科">
        <template slot-scope="scope">
          {{ subjectsObj[scope.row.subjectCode] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="active"
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="scope.row.isDel==0"  @click="cBtn(scope.$index,scope.row)">启用</el-button>
          <el-button type="primary" :disabled="scope.row.isDel==1"  @click="cBtn(scope.$index,scope.row)">禁用</el-button>
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

  </div>



</template>
<script>
  export default {
    data() {
      return {
        /*筛选条件*/
        gradeList: [],
        subjectList: [],
        subjectsObj:this.commonSubject,
        gradesObj:this.commonGrond,
        gradeCode: '', //年级code
        subjectCode: '', //学科code
        radio: '1', //等级选项
        infoText:"", //信息input
        isSort:false, //筛选判断
        typesearch:"1",
        /*表格(教师列表)*/
        tableData: [],
        /*分页*/
        currentPage:1, //当前页数
        total:20, //数据个数
        pageSize:10, //每页几条
      }
    },
    created() {
      this.getGradeList();
      // this.getSubjectList()
      this.getTeacherList();
    },
    filters:{
    },
    methods: {
      /*获取学年列表*/
      getGradeList(){
        var $this = this;
        this.$axios
          .post("/groupManager/getDataDictionaryList", { dataType: 2 })
          .then(res => {
            $this.gradeList = res.result
            $this.gradeList.unshift({
              "dataIden":"",
              "dataName":"请选择"
            })
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "获取学年列表失败"
            });
          });
      },
      /*获取学生列表*/
      getTeacherList(){
        var $this = this;
        var obj = {
          "pageNum":$this.currentPage,
          "pageSize":$this.pageSize,
          // "userAccount":this.localData.get("userInfo").userAccount||"",
          "userType":13,
          "schoolCode":this.localData.get("userInfo").qualitySchoolCode,
          // "gradeIden":this.localData.get("userInfo").gradeIden||null
          // "isDel":0,
        };
        if($this.gradeCode){obj.gradeIden = Number($this.gradeCode)}
        if($this.typesearch==1&&$this.infoText){obj.userName = $this.infoText}
        if($this.typesearch==2&&$this.infoText){obj.userAccount = $this.infoText}
        // console.log(obj)
        this.$axios
          .post("/agency/user/getAgencyUserList", obj)
          .then(res => {
            // console.log(res.result)
            $this.tableData = res.result.list
            $this.total = res.result.total
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "获取教师列表失败"
            });
          });
      },
      /*分页*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.getTeacherList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTeacherList()
      },
      cBtn(index,item){
        var num = item.isDel;
        if(num==1){
          num =0
        }else{
          num = 1
        }
        var obj ={
          "code":item.code,
          "isDel":num,
        }
        this.$axios
          .post("/agency/user/updateAgencyUserInfoOrPassword", obj)
          .then(res => {
            this.$message({
              type: 'info',
              message: "修改成功"
            });
            this.getTeacherList();
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "修改失败"
            });
          });
      },
      /*表格*/
      indexMethod(index) {
        return index +1
      },
      /*点击搜索按钮*/
      searchBtn(){
        // if(!this.gradeCode&&!this.subjectCode&&!this.radio&&!this.infoText){
        //   return
        // }
        this.currentPage = 1;
        this.pageSize = 10;
        this.getTeacherList()
      }
    },
    watch:{
      radio: function () {
        this.getTeacherList();
      }
    },
    components: {

    }
  }
</script>

<style scoped>
  .slt_typesearch{
    width:80px;
  }
  .searchWrap{
    margin-left:20px;
  }
  .nav-list{
    margin:20px;
  }
  .sortSpan{
    cursor: pointer;
    float: right;
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
    text-align: right;
  }
</style>
<style type="text/css" lang="scss">
  .userBox{
    .nav-list .el-input{
      margin-left:0!important;
    }
  }
</style>
