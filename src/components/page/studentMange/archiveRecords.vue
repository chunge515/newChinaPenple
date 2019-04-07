<!-- 考试成绩记录表 -->
<template>
  <div class="archiveRecords padTop20">
    <el-button type="primary" plain @click="$router.push({path:'/archiveRecords/make'})" class="addBtn">新增
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
        prop="examinationDate"
        label="考试时间"
        width="160">
        <template slot-scope="scope">
          {{scope.row.examinationDate | timeFilter("YYYY-MM-DD HH:mm")}}
        </template>
      </el-table-column>

      <el-table-column
        prop="examinationType"
        label="考试类型"
        width="110">
      </el-table-column>

      <el-table-column
        width="60"
        prop="subjectName"
        label="学科">
      </el-table-column>

      <el-table-column
        width="80"
        prop="artType"
        label="文理科">
        <template slot-scope="scope">
          {{artTypes[scope.row.artType]||""}}
        </template>
      </el-table-column>

      <el-table-column
        prop="paperQuestionNum"
        label="题目数量">
      </el-table-column>

      <el-table-column
        prop="score"
        label="得分"
        width="80">
      </el-table-column>

      <el-table-column
        prop="fullScore"
        label="满分"
        width="80">
      </el-table-column>

      <el-table-column
        prop="teacherName"
        label="监考人"
        width="160">
      </el-table-column>

      <el-table-column
        prop="difficultCode"
        label="试卷难度"
        width="160">
      </el-table-column>

      <!--<el-table-column
        prop="examinationRange"
        label="考试范围"
        width="100">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="default"
            @click="moudelDetail(scope.row,1)">查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="100">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="default"
            @click="moudelDetail(scope.row,2)">查看
          </el-button>
        </template>
      </el-table-column>-->

      <el-table-column
        fixed="right"
        prop="active"
        label="操作"
        width="300">
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

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.dialogVisible"
      width="30%"
      center
      :show-close='false'
    >
      <span>{{dialog.cont}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import moment from "moment"

  export default {
    name: "archive-records",
    data() {
      return {
        subjects: [],
        artTypes:[],
        rangeNames: ["", "考试范围详情", "备注详情"],
        //当前用户信息
        tmpUserInfo: null,
        dialog: {
          dialogVisible: false,
          title: "提示",
          cont: "sss"
        },
        subjectsObj: this.commonSubject,
        tableData: [],
        /*分页*/
        pageNum: 1, //当前页数
        total: 10, //数据个数
        pageSize: 10, //每页几条
      }
    },
    created() {
      this.tmpUserInfo = JSON.parse(localStorage.getItem("tmpStudentInfo"));
      var _this = this;
      _this.artTypes = $.extend({},this.subjectTypeObj);
      this.getSubjects({},{done:function () {
          _this.getList();
        }})
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
      /*分页*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNum = 1;
        this.getList();

      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getList();
      },
      editInfo(i, v) {
        this.$router.push({path: 'archiveRecords/make', query: {id: v.examinationRecordId}})
      },
      delOpp(i,v) {
        this.$confirm("确定要删除此记录？", "警告", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.postDel({examinationRecordId: v.examinationRecordId,updateName:"null"})
        }).catch(e => {
        })
      },
      postDel(obj) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post("examinationRecord/deleteExaminationRecord", obj).then(res => {
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
      //点击查看 考试范围和备注弹框
      moudelDetail(data, type) {
        this.dialog.title = this.rangeNames[type];
        this.dialog.cont = type === 1 ? data.examinationRange : data.remark;
        this.dialog.dialogVisible = true;
      },
      //设置表的样式
      isCenter({row, column, rowIndex, columnIndex}) {
        return 'isCenter3'
      },
      getList(obj) {
        var _this = this;
        obj = obj || {};
        if (!obj.userId) obj.userId = this.tmpUserInfo.userId;
        if (!obj.pageNum) obj.pageNum = this.pageNum;
        if (!obj.pageSize) obj.pageSize = this.pageSize;
        this.$axios.post("examinationRecord/getExaminationRecords", obj).then(res => {
          if (res.code == "000000") {
            res.result.forEach(v => {
              for (var i = 0; i < _this.subjects.length; i++) {
                if (_this.subjects[i].subjectCode == v.subjectCode) {
                  v.subjectName = _this.subjects[i].subjectName;
                  break;
                }
              }
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
      //查看
      lookInfo(i,v){
        this.$router.push({path: 'archiveRecords/detail', query: {id: v.examinationRecordId}})
      }
    },
    filters: {
      timeFilter(v, f) {
        return v && moment(v).format(f) || "";
      }
    },
  }
</script>
<style lang="scss">
  .archiveRecords {
    .el-dialog__header {
      background-color: gray;
      text-align: center;

    }
    .el-dialog__title {
      color: #eeeeee;
    }
  }
</style>
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
    margin:20px 0;
  }
</style>
