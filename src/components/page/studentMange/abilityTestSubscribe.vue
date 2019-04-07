<!-- 学习能力平测预约表 -->
<template>
  <div class="padTop20">
    <el-button type="primary" plain @click="$router.push({path:'/abilityTestSubscribe/make'})" class="addBtn">新增
    </el-button>
    <el-table
      class="lists"
      :data="tableData"
      border
      style="width: 100%" :row-class-name="isCenter" :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}">
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>

      <el-table-column
        prop="evaluationTime"
        label="测评时间">
        <template slot-scope="scope">
          {{ scope.row.evaluationTime | timeFormat("YYYY-MM-DD HH:mm")}}
        </template>
      </el-table-column>
      <!--<el-table-column
        width="180"
        label="家长联系方式">
        <template slot-scope="scope">
          {{ tmpUserInfo.parentMobile }}
        </template>
      </el-table-column>-->
      <el-table-column
        prop="subjectName"
        label="学科">
      </el-table-column>
      <el-table-column
        prop="artTypeName"
        label="文理科">
      </el-table-column>

      <el-table-column
        prop="bookType"
        label="教材版本">
      </el-table-column>
      <!--<el-table-column
        prop="referrer"
        label="推荐人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="receptionist"
        label="接待人"
        width="180">
      </el-table-column>-->
      <el-table-column
        prop="active"
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="lookInfo(scope.$index,scope.row)">查看
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="editInfo(scope.$index,scope.row)">编辑
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="delOpp(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--弹出框-->
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    components: {},
    data() {
      return {

        subjects: [],
        tableData: [],

        /*分页*/
        pageNum: 1, //当前页数
        total: 0, //数据个数
        pageSize: 10, //每页几条
        //当前学生信息
        tmpUserInfo: {},
      }
    },
    created() {
      this.tmpUserInfo = JSON.parse(localStorage.getItem("tmpStudentInfo"));
      var _this = this;
      this.getSubjects(null, {
        done: function () {
          _this.getList({
            pageNum: _this.pageNum,
            pageSize: _this.pageSize
          })
        }
      });

    },
    filters: {
      //时间格式化
      timeFormat(v, f) {
        return v && moment(v).format(f) || v || "";
      },
    },
    methods: {
      //获取学科
      getSubjects(obj, cfg) {
        var _this = this;
        this.$ajax.getSubjectsByGrade(obj).then(res => {
          if (res.code === "000000") {
            _this.subjects = res.subjects;
            cfg.done && cfg.done();
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.subjects = [];
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取能力预约列表
      getList(obj) {
        if (!obj.userId) obj.userId = this.tmpUserInfo.userId;
        var _this = this;
        this.$axios.post("appointment/getAppointmentList", obj).then(res => {
          if (res.code === "000000") {
            res.result.forEach(v => {
              v.score = JSON.parse(v.score);
              v.subjectName = v.subjectCode;
              for (var i = 0; i < _this.subjects.length; i++) {
                if (_this.subjects[i].subjectCode == v.subjectCode) {
                  v.subjectName = _this.subjects[i].subjectName;
                  break;
                }
              }
              v.artTypeName = this.subjectTypeObj[v.artType]||"";

            });
            _this.total = res.totalRows;
            _this.tableData = res.result;
          } else {
            _this.tableData = [];
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.tableData = [];
          _this.$message.error(e.message || '请求出错');
        })
      },
      /*分页*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNum = 1;
        this.getList({pageSize: val, pageNum: 1});
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      },
      /*表格*/
      indexMethod(index) {
        return index + 1
      },
      /*查看*/
      lookInfo(i, val) {
        this.$router.push("/abilityTestSubscribe/view?id=" + val.evaluationAppointmentId)
      },
      /*编辑*/
      editInfo(index, row) {
        console.log(index, row)
        this.$router.push({path: "/abilityTestSubscribe/make", query: {id: row.evaluationAppointmentId}})
      },
      //删除
      delOpp(i, val) {
        var _this = this;
        this.$confirm('确认要删除此记录吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.postDel({evaluationAppointmentId: val.evaluationAppointmentId,updateName:"小丰"});
        }).catch(() => {
          /* this.$message({
             type: 'info',
             message: '已取消删除'
           });*/
        });
      },
      //删除提交
      postDel(obj) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post("appointment/deleteAppointment", obj).then(res => {
          if (res.code == "000000") {
            _this.$message.success("删除成功");
            _this.getList({
              pageNum: this.pageNum,
              pageSize: this.pageSize
            })
          } else {
            _this.$message.error(res.message || '请求出错');
          }
          loading.close();
        }).catch(e => {
          _this.$message.error(e.message || '请求出错');
          loading.close();
        })
      },
      /*评级确认按钮*/
      /*点击搜索按钮*/
      searchBtn() {
        this.pageNum = 1;
        this.getList({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      },
      //设置表的样式
      isCenter({row, column, rowIndex, columnIndex}) {
        return 'isCenter3'
      },
    },
    watch: {},

  }
</script>

<style scoped lang="scss">
  .lists {
    td {
      text-align: center;
    }
  }

  .addBtn {
    float: right;
    margin: 0 20px 20px 0;
  }

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }


</style>
