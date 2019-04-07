<template>
  <div>
    <commonTitle>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>账号权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </commonTitle>
    <p>角色管理</p>
    <el-table :data="tableData" border style="width: 542px">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="role" label="角色" width="180"></el-table-column>
      <el-table-column label="已分配人数" width="180">
        <template slot-scope="scope">
          <span
            class="rolNum"
            @click="roleInfo(scope.$index,scope.row)"
          >{{scope.row.groupByRoleCount}}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" class="userInfo" :show-close="false">
      <el-table :data="userList" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
      </el-table>
      <el-pagination
        v-show="userList"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>
    <!-- <div class="userInfo" v-show="infoShow">
    <p>{{this.teachName}}<span class="close" @click="close">关闭</span></p>
    <el-table :data="userList" border style="width: 542px">
      <el-table-column type="index"  label="序号" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
    </el-table>          
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      userList: [],
      infoShow: false,
      teachName: "",
      dialogVisible: false,
      currentPage:1, //当前页数
      total:20, //数据个数
      pageSize:10, //每页几条
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$axios.post("/management/getRoleStatistic", {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.tableData = res.administrators;
        this.tableData.forEach(item => {
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
        });
      });
    },
    roleInfo(index, item) {
      this.total = item.groupByRoleCount
      this.teachName = item.role;
      this.dialogVisible = true;
      this.infoShow = true;
      let flag;
      switch (item.role) {
        case "服务导师":
          flag = "SERVICE_TEACHER";
          break;
        case "院长":
          flag = "ENROLLMENT_DIRECTOR";
          break;
        case "干预导师":
          flag = "INTERVENE_TEACHERE";
          break;
        case "教学主管":
          flag = "TEACHING_DIRECTOR";
          break;
        default:
          console.log(123);
      }
      this.$axios
        .post("/management/getAdministratorsByRoleId", {
          role: flag
        })
        .then(res => {
          console.log(flag);
          this.userList = res.administrators;
        });
    },
    close() {
      this.infoShow = false;
    },
    // 分页
     // 分页
    sizeChange(val){
      this.pageSize = val;
      this.getInfo()();
    },
    currentChange(val){
      this.currentPage = val;
      this.getInfo()();

    }
  }
};
</script>
<style scoped>
.rolNum {
  color: blue;
  text-decoration: underline;
}
/* .userInfo{
    width: 542px;
    float: left;
    margin-left: 600px;
    border: solid #ccc 1px;
}
.userInfo p{
    text-align: center;
    color: #333;
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px #ccc;
} */
.close {
  float: right;
  margin-right: 20px;
}
.el-pagination{
    width: 450px;
    margin: 0 auto;
    margin-top: 10px;
  }
</style>


