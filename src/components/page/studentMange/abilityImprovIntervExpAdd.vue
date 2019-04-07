<template>
  <div class="abilityImprovInterEx padTop20">
    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item
        prop="bookType"
        :rules="[{required:false, type:'string', max:15, message:'最多15个字', trigger:'blur'}]"
        label="教材版本:">
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.trim="form.bookType" maxlength="15"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="体验科目:" prop="subjectCode" :rules="[{required:true,message:'请选择体验科目'}]">
        <el-select v-model="form.subjectCode" placeholder="请选择测评科目">
          <el-option v-for="subj in subjects" :label="subj.subjectName" :value="subj.subjectCode"
                     :key="subj.subjectCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文理科:" prop="artType">
        <el-radio v-for="(v,k) in artTypes" :key="k" v-model="form.artType" :label="k">{{v}}</el-radio>
      </el-form-item>

      <el-form-item label="体验时间:" prop="experienceTime" :rules="[{required:true,message:'体验时间不能为空'}]">
        <el-date-picker
          v-model="form.experienceTime"
          format="yyyy-MM-dd HH:mm"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="学年:" prop="gradeCode" :rules="[{required:true,message:'请选择学年'}]">
        <el-select v-model="form.gradeCode" placeholder="请选择学年">
          <el-option v-for="subj in grades" :label="subj.gradeName" :value="subj.gradeCode"
                     :key="subj.gradeCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="receptionist"
        :rules="[{required:false, type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
        label="接待人:">
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.trim="form.receptionist" maxlength="10"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item
        prop="interventionTeacher"
        :rules="[{required:false, type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
        label="干预教师:">
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.trim="form.interventionTeacher" maxlength="10"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item
        prop="interventionLeader"
        :rules="[{required:false, type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
        label="干预组长:">
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.trim="form.interventionLeader" maxlength="10"></el-input>
        </el-col>
      </el-form-item>
      <el-col class="text-center" :span="24">
        <el-button type="default" plain @click="back" class="addBtn">取消</el-button>
        <el-button type="primary" @click="save" class="addBtn">保存</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "ability-improv-interv-exp-add",
    data() {
      return {
        artTypes: [],
        tmpUserInfo: null,
        subjects: [],
        grades: [],
        readys: 2,
        form: {
          userId:"",
          bookType: "",
          subjectCode: "",
          experienceTime: "",
          gradeCode: "",
          receptionist: "",
          interventionTeacher: "",
          interventionLeader: "",
          artType:"0"
        }
      }
    },
    created() {
      this.artTypes = $.extend({},this.subjectTypeObj);
      this.tmpUserInfo = JSON.parse(localStorage.getItem("tmpStudentInfo"));
      this.form.userId = this.tmpUserInfo.userId;
      this.getGrades({stageCode: this.tmpUserInfo.stageCode});
      this.getSubjects({});
      var query = this.$router.history.current.query;
      if (query.id) {
        this.getDetail({experienceRegistrationId : query.id});
      }
    },
    methods: {
      //获取详细信息
      getDetail(obj) {
        var _this = this;
        this.$axios.post("registration/getRegistration", obj).then(res => {
          if (res.code == "000000") {
            res.result.artType = res.result.artType+"";
            _this.form = res.result;
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取学科
      getSubjects(obj) {
        var _this = this;
        this.$ajax.getSubjectsByGrade(obj).then(res => {
          if (res.code === "000000") {
            _this.subjects = res.subjects;
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.subjects = [];
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取学年
      getGrades(obj) {
        var grades = localStorage.getItem("tmpgrades");
        if (grades) {
          this.grades = JSON.parse(grades);
          return;
        }
        var _this = this;
        this.$ajax.getGradesByStage(obj).then(res => {
          if (res.code === "000000") {
            _this.grades = res.grades;
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.grades = [];
          _this.$message.error(e.message || '请求出错');
        })
      },
      /*
     * 回退按钮
     * */
      back(force) {
        if (force) {
          this.$router.go(-1);
          return;
        }
        this.$confirm("编辑的内容将不会被保存，是否继续？", "警告", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1)
        }).catch(e => {

        })
      },
      /*
      * 点击保存
      * */
      save() {
        var _this = this;
        this.$refs.form.validate(valid => {
          if (valid) {
            _this.$confirm("是否保存现有编辑内容？", "警告", {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (_this.form.experienceRegistrationId) {
                _this.postEdit(_this.form);
              } else {
                _this.postData(_this.form);
              }
            }).catch(e => {})
          }
        })
      },
      //保存新建内容
      postData(obj) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        obj.createName = "null";
        this.$axios.post("registration/addRegistration", obj).then(res => {
          if (res.code === "000000") {
            _this.$message.success(res.message);
            _this.back(true);
          } else {
            _this.$message.error(res.message || '请求出错');
          }
          loading.close();
        }).catch(e => {
          loading.close();
          _this.$message.error(e.message || '请求出错');
        })
      },
      //更改提交保存
      postEdit(obj) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        obj.updateName = "null";
        this.$axios.post("registration/updateRegistration", obj).then(res => {
          if (res.code === "000000") {
            _this.$message.success(res.message);
            _this.back(true);
          } else {
            _this.$message.error(res.message || '请求出错');
          }
          loading.close();
        }).catch(e => {
          loading.close();
          _this.$message.error(e.message || '请求出错');
        })
      },
    }
  }
</script>
<style type="text/css" lang="scss">
  .abilityImprovInterEx {

    .el-form-item__label {
      width: 100px !important;
    }
    .el-form-item__content {
      margin-left: 100px !important;
    }

  }
</style>
<style scoped lang="scss">
  .mst-no-padding {
    padding: 0 !important;
  }

  .text-center {
    text-align: center;
  }
</style>
