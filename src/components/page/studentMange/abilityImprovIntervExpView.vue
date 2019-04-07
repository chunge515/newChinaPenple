<!-- 学习能力提升干预体验登记表 -->
<template>
  <div class="padTop20">

    <el-row v-if="form">
      <el-col :span="12">
        <el-row class="gap-bottom">
          <el-col :span="8">教材版本：</el-col>
          <el-col :span="16">{{form.bookType}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="8">体验科目：</el-col>
          <el-col :span="16">{{form.subjectName}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="8">文理科：</el-col>
          <el-col :span="16">{{subjectTypeObj[form.artType] || ""}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="8">体验时间：</el-col>
          <el-col :span="16">{{form.experienceTime  | timeFilter("YYYY-MM-DD HH:mm")}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="8">学年：</el-col>
          <el-col :span="16">{{form.gradeName}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="8">接待人：</el-col>
          <el-col :span="16">{{form.receptionist }}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="8">干预教师：</el-col>
          <el-col :span="16">{{form.interventionTeacher }}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="8">干预组长：</el-col>
          <el-col :span="16">{{form.interventionLeader }}</el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-col class="text-center" :span="24">
      <el-button type="primary" @click="back" class="addBtn">返回
      </el-button>
    </el-col>

  </div>
</template>

<script>
  import moment from "moment"

  export default {
    name: "ability-improv-interv-exp",
    data() {
      return {
        grades: [],
        subjects: [],
        tmpUserInfo: null,
        form: null,
        readys: 2,
      }
    },
    created() {
      this.tmpUserInfo = JSON.parse(localStorage.getItem("tmpStudentInfo"));
      var _this = this;
      this.getGrades({stageCode: _this.tmpUserInfo.stageCode}, {
        done: function () {
          _this.initDetail();
        }
      });
      this.getSubjects({}, {
        done: function () {
          _this.initDetail();
        }
      });
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      initDetail() {
        this.readys--;
        if (this.readys > 0) return;
        var query = this.$router.history.current.query;
        this.getDetail({experienceRegistrationId: query.id});
      },
      //获取能力测评预约详情
      getDetail(obj) {
        var _this = this;
        this.$axios.post("registration/getRegistration", obj).then(res => {
          if (res.code == "000000") {
            for (var i = 0; i < _this.subjects.length; i++) {
              if (_this.subjects[i].subjectCode == res.result.subjectCode) {
                res.result.subjectName = _this.subjects[i].subjectName;
                break;
              }
            }
            for (var i = 0; i < _this.grades.length; i++) {
              if (_this.grades[i].gradeCode == res.result.gradeCode) {
                res.result.gradeName = _this.grades[i].gradeName;
                break;
              }
            }
            _this.form = res.result;
          } else {
            _this.$message.error(res.message || '请求出错');
            _this.form = null;
          }
        }).catch(e => {
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取学科
      getSubjects(obj, cfg) {
        var _this = this;
        this.$ajax.getSubjectsByGrade(obj).then(res => {
          if (res.code === "000000") {
            _this.subjects = res.subjects;
            cfg.done()
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.subjects = [];
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取学年
      getGrades(obj, cfg) {
        //缓存里有
        var grades = localStorage.getItem("tmpgrades");
        if (grades) {
          this.grades = JSON.parse(grades);
          cfg.done();
          return;
        }
        var _this = this;
        this.$ajax.getGradesByStage(obj).then(res => {
          if (res.code === "000000") {
            _this.grades = res.grades;
            cfg.done()
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.grades = [];
          _this.$message.error(e.message || '请求出错');
        })
      },
    },
    filters: {
      timeFilter(v, f) {
        return v && moment(v).format(f) || v;
      }
    },
  }
</script>

<style scoped lang="scss">
  .text-center {
    text-align: center;
  }

  .gap-bottom {
    padding-bottom: 22px;
  }

</style>
