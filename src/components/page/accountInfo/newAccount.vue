<template>
  <div class="newAccount">
    <commonTitle>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>账号权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </commonTitle>
    <el-button
      type="primary"
      plain
      style="margin-bottom: 20px;"
      @click="$router.push({path:'/addAccount'})"
    >新建账号</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="所属书院">新国人书院总院</el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column prop="status" label="使用状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='ON'">启用</span>
          <span v-if="scope.row.status=='OFF'">禁用</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="relationType" label="身份">
        <template slot-scope="scope">
          {{ relationTypeObj[scope.row.relationType] }}
        </template>
      </el-table-column>-->

      <!-- <el-table-column prop="referrer" label="推广员">
      </el-table-column>
      <el-table-column prop="tutorialName" label="服务导师">
      </el-table-column>
      <el-table-column prop="studentName" label="关联学生">
      </el-table-column>-->
      <el-table-column prop="active" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="edit(scope.$index,scope.row)">编辑</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="disable(scope.$index,scope.row)"
          >
          {{scope.row.forbid}}

          </el-button>
          <!-- <el-button size="medium" type="primary" @click="delOpp(scope.row)" v-if="false">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <!--分页-->
    <el-pagination
      v-show="tableData"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage:1, //当前页数
      total:20, //数据个数
      pageSize:10, //每页几条
      forbid: "禁用",
      flag: true,
    };
  },
  created() {
    this.getUser();
    this.getUserList();
  },
  methods: {
    addUser() {
      this.$axios.post("/management/login", {
        mobile: 1860318011198,
        password: 1860318011198
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    // 获取管理员列表
    getUserList() {
      var _this=this;
      this.$axios
        .post("/management/getAdministratorPage", {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          if(res.totalRows !== null){
            this.total=res.totalRows
          }
          // this.total=res.totalRows;
         res.result.forEach(item => {
            switch (item.role) {
              case "SERVICE_TEACHER":
                item.role = "服务导师";
                break;
              case "ENROLLMENT_DIRECTOR":
                item.role = "院长";
                break;
              case "INTERVENE_TEACHERE":
                item.role = "干预导师";
                break;
              case "TEACHING_DIRECTOR":
                item.role = "教学主管";
                break;
              default:
                console.log(123);

            }
          
            switch (item.status)
            {
              case "ON":
                    item.forbid='禁用'
                    break
              case "OFF":
                     item.forbid='启用' ;
            }
            // this.forbid="禁用"? this.forbid="启用":this.forbid="禁用"
           
          });
          _this.tableData = res.result;
           console.log( res.result,_this.tableData)
        });
    },
    // 获取管理员信息
    getUser() {
      this.$axios
        .post("/management/getAdministrator", {
          administratorId: ""
        })
        .then(res => {});
    },
    // 编辑用户
    edit(index, item) {
      this.$router.push({ path: "/editAccount", query: { user: item } });
    },
    // 禁用
    disable(index, item) {
      console.log(item);
      let sta;
      switch (item.status) {
        case "ON":
          sta = "OFF";
          break;
        case "OFF":
          sta = "ON";
          break;
      }
      console.log(sta);
      this.$axios
        .post("/management/disableAdministrator", {
          administratorId: item.id,
          status: sta
        })
        .then(res => {
          if (res.code == "000000") {
          //  item.status = !sta;
            this.getUserList();
          }
        });
    },
    // 分页
    sizeChange(val){
      this.pageSize = val;
      this.getUserList();
    },
    currentChange(val){
      this.currentPage = val;
      this.getUserList();

    }
  }
};
</script>
<style lang="less" scoped>
.newAccount{
  .el-pagination{
    width: 450px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
</style>



