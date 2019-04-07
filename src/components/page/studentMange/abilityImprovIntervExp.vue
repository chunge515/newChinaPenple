<!-- 学习能力提升干预体验登记表 -->
<template>
  <div class="abilityImprovIntervExp padTop20" >
    <el-button type="primary" plain @click="$router.push({path:'/abilityImprovIntervExp/make'})" class="addBtn">新增
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
        prop="time"
        label="体检时间"
        width="160">
        <template slot-scope="scope">
          {{scope.row.experienceTime | time("YYYY-MM-DD HH:mm")}}
        </template>
      </el-table-column>

      <el-table-column
        prop="subjectName"
        label="科目">
      </el-table-column>
      <el-table-column
        prop="artTypeName"
        label="文理科">
      </el-table-column>
      <el-table-column
        prop="bookType"
        label="教材版本">
      </el-table-column>
      <el-table-column
        prop="receptionist"
        label="接待人"
        width="160">
      </el-table-column>
      <el-table-column
        prop="interventionTeacher"
        label="干预教师"
        width="160">
      </el-table-column>
      <el-table-column
        prop="interventionLeader"
        label="干预组长"
        width="160">
      </el-table-column>
      <el-table-column
        prop="active"
        label="操作"
        width="280"
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
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import moment from "moment"
  export default {
    name: "ability-improv-interv-exp",
    data() {
      return {
        tmpUserInfo:null,
        subjects:[],
        tableData: [],

        /*分页*/
        pageNum: 1, //当前页数
        total: 0, //数据个数
        pageSize: 10, //每页几条
      }
    },
    created() {
      this.artTypes = $.extend({},this.subjectTypeObj);
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
      //获取列表
      getList(obj) {
        var _this = this;
        obj = obj || {};
        if (!obj.userId) obj.userId = this.tmpUserInfo.userId;
        if (!obj.pageNum) obj.pageNum = this.pageNum;
        if (!obj.pageSize) obj.pageSize = this.pageSize;
        this.$axios.post("registration/getRegistrationList", obj).then(res => {
          if (res.code == "000000") {
            res.result.forEach(v => {
              for (var i = 0; i < _this.subjects.length; i++) {
                if (_this.subjects[i].subjectCode == v.subjectCode) {
                  v.subjectName = _this.subjects[i].subjectName;
                  break;
                }
              }
              v.artTypeName = _this.artTypes[v.artType]||"";
            });
            _this.tableData = res.result;
            _this.total = res.totalRows;
          } else {
            _this.$message.error(res.message || '请求出错');
            _this.form = null;
          }
        }).catch(e => {
          _this.$message.error(res.message || '请求出错');
          _this.form = null;
        })
      },
      /*分页*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList()
      },
      /*表格*/
      indexMethod(index) {
        return index + 1
      },
      /*查看*/
      lookInfo(i,row) {
        this.$router.push({path:"/abilityImprovIntervExp/view",query:{id:row.experienceRegistrationId}})
      },
      /*编辑*/
      editInfo(index, row) {
        this.$router.push({path:"/abilityImprovIntervExp/make",query:{id:row.experienceRegistrationId}})
      },
      //删除
      delOpp(i,v) {
        this.$confirm('确认要删除此记录吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postDel({experienceRegistrationId: v.experienceRegistrationId,updateName:"null"})
        }).catch(() => {});
      },
      postDel(obj) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        obj.updateName = "null";
        this.$axios.post("registration/deleteRegistration", obj).then(res => {
          if (res.code == "000000") {
            _this.$message.success("删除成功");
            _this.getList()
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
        this.currentPage = 1;
        this.pageSize = 10;
        //this.getTeacherList()
      },
      //设置表的样式
      isCenter({row, column, rowIndex, columnIndex}) {
        return 'isCenter3'
      },
    },
    filters: {
      time(v, f) {
        return v&&moment(v).format(f)||"";
      }
    },
  }
</script>

<style scoped lang="scss">
  table td {
    div {
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
