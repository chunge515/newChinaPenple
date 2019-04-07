<template>
  <div class="content-wrap1">
    <commonTitle>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>家长管理</el-breadcrumb-item>
      </el-breadcrumb>
    </commonTitle>
    <div class="nav-list">
      <el-input placeholder="请输入内容" class="input-with-select searchWrap" v-model="infoText" style="width: 30%;">
        <el-select slot="prepend" placeholder="请选择" v-model="typesearch" class="typeSearch">
          <el-option label="家长姓名" value="1"></el-option>
          <el-option label="手机号" value="2"></el-option>
         <!-- <el-option label="微信号" value="3"></el-option>
          <el-option label="接待人" value="4"></el-option>
          <el-option label="推荐人" value="5"></el-option>-->
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
      </el-input>
      <el-button type="primary" plain style="margin-left: 50px;" @click="$router.push({path:'/addParent'})">新增家长</el-button>
    </div>
    <!--表格-->
    <el-table :data="tableData" v-if="tableData" border style="width: 100%" :row-class-name="isCenter" :header-cell-style="{'text-align':'center'}">
      <el-table-column type="index" :index="indexMethod" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="realname" label="家长姓名" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号">
      </el-table-column>
      <el-table-column prop="relationType" label="身份">
        <template slot-scope="scope">
          {{ relationTypeObj[scope.row.relationType] }}
        </template>
      </el-table-column>

      <el-table-column prop="referrer" label="推广员">
      </el-table-column>
      <el-table-column prop="tutorialName" label="服务导师">
      </el-table-column>
      <el-table-column prop="studentName" label="关联学生">
      </el-table-column>
      <el-table-column prop="active" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="lookInfo(scope.row)">查看</el-button>
          <el-button size="medium" type="primary"look @click="editInfo(scope.$index,scope.row)">编辑</el-button>
         <!-- <el-button size="medium" type="primary" @click="delOpp(scope.row)" v-if="false">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      v-show="tableData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--弹出框-->
    <!--编辑信息-->
    <el-dialog title="编辑家长信息" :visible.sync="dialogChangeInfo" width="40%" center>
      <div class="btn-wrap">
        <edit-parent :id="userId" ref="editInfo"></edit-parent>
        <el-row class="btnBox">
          <el-button @click="dialogChangeInfo=false">取消</el-button>
          <el-button type="primary" @click="editSubit()">确认</el-button>
        </el-row>

      </div>
    </el-dialog>
  </div>



</template>
<script>
  import editParent from './addParent.vue'
  export default {
    components: {
      editParent
    },
    data() {
      return {
        typesearch:'1',
        infoText:'',
        /*表格(教师列表)*/
        tableData: null,
        /*分页*/
        currentPage:1, //当前页数
        total:0, //数据个数
        pageSize:10, //每页几条
        userId:'',//当前用户信息
        dialogChangeInfo:false,//弹框
      }
    },
    created() {
     this.getParList();
     /*  this.getSubjectList()
      this.getTeacherList();*/
    },
    filters:{
    },
    methods: {
      getParList(val){
        var $this = this;
        var obj;
        if(val){
          obj=val
        }else{
          obj={
            pageNum:this.currentPage ,//当前页码
            pageSize:this.pageSize//每页条数 ,
          }
        }
        this.$axios
          .post("/user/getParents", obj)
          .then(res => {
            if(res.code=="000000"){
              $this.total=res.totalRows;
              $this.tableData=res.result || [];
            }
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "获取家长列表失败"
            });
          });
      },
      /*分页*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.getParList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getParList()
      },
      /*表格*/
      indexMethod(index) {
        return index +1
      },
      // 查看
      lookInfo(row) {
      //  window.localStorage.setItem("tmpParentInfo",JSON.stringify(row));
        this.$router.push({path:"/parentMange/Detail",query:{id:row.userId}})
      },
      /*编辑*/
      editInfo(index,row) {
        var that=this;
        that.userId=row.userId;
        that.$router.push({path:'/editParent',query:{id:row.userId}})
      },
      /*编辑确认*/
      editSubit(){
        var a=this.$refs.editInfo.getData();
         a.updateName="123";
        if(a){
          this.$axios
            .post("/user/updateParent",a)
            .then(res => {
              if(res.code=="000000"){
                this.getParList();
                this.dialogChangeInfo = false;

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
        }
      },
      //删除
      delOpp(val){
        this.$confirm('确认要删除该家长吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         console.log(val,"0000")
          var obj={
            'updateName':'123',
            "userId": val.userId
          }
          this.$axios
            .post("/user/deleteParent",obj)
            .then(res => {
              if(res.code=="000000"){
                this.$message({
                  type: 'info',
                  message: "删除成功"
                });
                this.getParList()
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
      /*点击搜索按钮*/
      searchBtn(){
        this.currentPage = 1;
        var obj={
          pageNum:1,
          pageSize:this.pageSize
        }
        if(this.infoText!=""){
          if(this.typesearch=="1"){
            obj.realname=this.infoText
          }
          if(this.typesearch=="2"){
            obj.mobile=this.infoText
          }
         /* if(this.typesearch=="3"){
            obj.wechatId=this.infoText
          }
          if(this.typesearch=="4"){
            obj.receptionist=this.infoText
          }
          if(this.typesearch=="5"){
            obj.referrer=this.infoText
          }*/
        }
        this.getParList(obj)
        //this.getTeacherList()
      },
      //设置表的样式
      isCenter({row, column, rowIndex, columnIndex}){
        return 'isCenter3'
      },
    },
    watch:{
      radio: function () {
        this.getTeacherList();
      }
    },

  }
</script>

<style scoped>
  .btnBox{
    text-align: center;
  }
  .typeSearch{
    width:110px;
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
  }
</style>
<style>
  .isCenter3 td{text-align: center;  height:48px;
    line-height:48px;
    padding:0;}
</style>
