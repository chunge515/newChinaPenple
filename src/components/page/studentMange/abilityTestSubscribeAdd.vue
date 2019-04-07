<!-- 学习能力平测预约表 新增/编辑 -->
<template>
  <div class="padTop20 addAbilityTestSubscribe">
    <el-form v-if="form" ref="form" :model="form" label-width="80px">
      <el-col :span="12">

        <el-form-item
          prop="bookType"
          :rules="[{required:false, type:'string', max:15, message:'最多15个字', trigger:'blur'}]"
          label="教材版本:">
          <el-col :span="10" class="mst-no-padding">
            <el-input v-model.trim="form.bookType" maxlength="15"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="测评科目:" prop="subjectCode" :rules="[{required:true,message:'请选择测评科目'}]">
          <el-select v-model="form.subjectCode" placeholder="请选择测评科目">
            <el-option v-for="subj in subjects" :label="subj.subjectName" :value="subj.subjectCode"
                       :key="subj.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文理科:" prop="artType">
          <el-radio v-for="(v,k) in artTypes" :key="k" v-model="form.artType" :label="k">{{v}}</el-radio>
        </el-form-item>
        <el-form-item label="测评时间:" prop="evaluationTime" :rules="[{required:true,message:'测评时间不能为空'}]">
          <el-date-picker
            v-model="form.evaluationTime"
            format="yyyy-MM-dd HH:mm"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="学年" prop="gradeCode" :rules="[{required:true,message:'请选择测评科目'}]">
          <el-select v-model="form.gradeCode" placeholder="请选择学年">
            <el-option v-for="subj in grades" :label="subj.gradeName" :value="subj.gradeCode"
                       :key="subj.code"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item
          label="推荐人:"
          prop="referrer"
          :rules="[{required:false, type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
        >
          <el-col :span="10" class="mst-no-padding">
            <el-input v-model.trim="form.referrer" maxlength="10"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item
          prop="receptionist"
          :rules="[{required:false, type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
          label="接待人:">
          <el-col :span="10" class="mst-no-padding">
            <el-input v-model.trim="form.receptionist" maxlength="10"></el-input>
          </el-col>
        </el-form-item>-->
        <el-form-item
          prop="issuer"
          :rules="[{required:false, type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
          label="报告出具人:">
          <el-col :span="10" class="mst-no-padding">
            <el-input v-model.trim="form.issuer" maxlength="10"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          prop="interpreter"
          :rules="[{required:false, type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
          label="报告解读人:">
          <el-col :span="10" class="mst-no-padding">
            <el-input v-model.trim="form.interpreter" maxlength="10"></el-input>
          </el-col>
        </el-form-item>


      </el-col>
      <el-col :span="12">

        <el-col :span="24">
          <div class="gap-bottom">日常考试成绩：</div>
        </el-col>
        <el-row
          v-for="(record,ri) in form.score"
          :key="record.key">
          <el-col :span="12">
            <el-form-item
              :label="record.name+':'"
              :prop="'score.'+ri+'.score'"
              :rules="[
                { type: 'integer', message: '成绩必须为数字',required:false, transform:function(v) {
                  return record.fullScore =='' && v=='' ? 0 :   parseFloat(v)
                }},
                { type: 'integer', min: 0, max: parseFloat(record.fullScore)||0, message: '学生成绩介于0~满分',trigger:'blur'},
                {type:'integer',required :false}
              ]"
            >
              <el-col>
                <el-input v-model.number="record.score"></el-input>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="满分:"
              :prop="'score.'+ri+'.fullScore'"
              :rules="[
                { type: 'integer', message: '分数必须为数字值',required:false,transform:function(v) {
                  return v=='' ? 0 :   parseFloat(v)
                }},
                 { type: 'integer', min: 0, message: '满分不能小于0',trigger:'blur'}
              ]">
              <el-col>
                <el-input v-model.number="record.fullScore"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="text-center" :span="24">
        <el-button type="default" plain @click="back" class="addBtn">取消</el-button>
        <el-button type="primary" @click="save" class="addBtn">保存</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        //当前学生信息
        tmpUserInfo: null,
        loading: null, //锁屏
        subjects: [],
        grades: [],
        form: {
          subjectCode: "",
          bookType: '',
          evaluationTime: "",
          gradeCode: "",
         // referrer: "",推荐人
          //receptionist: "",接待人
          userId: "",
          issuer: "",
          interpreter: "",
          artType:"0",
          score: [
            {
              name: "月考成绩",
              fullScore: "",
              score: "",
              type: 1
            },
            {
              name: "期中成绩",
              fullScore: "",
              score: "",
              type: 2 //期中
            },
            {
              name: "期末成绩",
              fullScore: "",
              score: "",
              type: 3
            },
          ]
        }
      }
    },
    created() {
      this.artTypes = $.extend({},this.subjectTypeObj);
      this.tmpUserInfo = JSON.parse(localStorage.getItem("tmpStudentInfo"));
      this.form.userId = this.tmpUserInfo.userId;
      this.getGrades({stageCode: this.tmpUserInfo.stageCode});
      this.getSubjects();
      var query = this.$router.history.current.query;
      if (query && query.id) {
        this.getDetail({evaluationAppointmentId: query.id})
      }
    },
    filters: {},
    methods: {
      //获取能力测评预约详情
      getDetail(obj) {
        var _this = this;
        this.$axios.post("appointment/getAppointment", obj).then(res => {
          if (res.code == "000000") {
            res.result.artType = res.result.artType+"";
            res.result.score = JSON.parse(res.result.score);
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
              if (_this.form.evaluationAppointmentId) {
                _this.postEdit(_this.form);
              } else {
                _this.postForm(_this.form);
              }
            }).catch(e => {
            })
          }
        })
      },
      //新增方法
      postForm(data) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var posts = $.extend({}, data);
        posts.score = JSON.stringify(data.score);
        posts.createName = "null"
        _this.$axios.post("appointment/addAppointment", posts).then(res => {
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
        });
      },
      //编辑方法
      postEdit(data) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var posts = $.extend({}, data);
        posts.score = JSON.stringify(data.score);
        posts.updateName = "null"
        this.$axios.post("appointment/updateAppointment", posts).then(res => {
          if (res.code == "000000") {
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
      }
    }

  }
</script>
<style type="text/css" lang="scss">
  .addAbilityTestSubscribe {

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

  .gap-bottom {
    padding-bottom: 22px;
  }

  .text-center {
    text-align: center;
  }

</style>
