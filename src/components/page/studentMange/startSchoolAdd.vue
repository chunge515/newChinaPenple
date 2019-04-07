<template>
  <div class="padTop20 startschooladdpage">
    <el-form ref="form" :model="form" label-width="150px">
      <el-row>
        <el-col class="partname">
          学生诊断情况
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="日期"
              prop="diagnosisDatetime" :rules="[{required:true, message: '请选择日期', trigger: 'blur' }
              ]">
            <el-date-picker
              type="date"
              :picker-options="startDatePicker"
              value-format="yyyy-MM-dd"
              v-model="form.diagnosisDatetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="诊断学科及分数" required>
            <div v-for="(d,i) in form.diagnosisSubjectAndScores" :key="i" class="block subjectscores">
              <el-checkbox class="block" v-model="d.checked">{{d.subjectName}}</el-checkbox>
              <el-form-item label="得分" class="nocont">
                <el-input v-model.number="d.score" type="number" min="0" :disabled="!d.checked"></el-input>
              </el-form-item>
              <el-form-item label="满分">
                <el-input v-model.number="d.totalScore" type="number"  min="0" :disabled="!d.checked"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否参加干预体验" prop="partakeExperienceState" :rules="[{required:true,message:'请选择是否参加干预体验',trigger:'blur'}]">
            <el-select v-model="form.partakeExperienceState">
              <el-option value="" disabled label="请选择"></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="诊断考试类型" required>
            <el-checkbox v-for="(d,i) in form.diagnosisExaminationType" :key="i" v-if="d.code<6" v-model="d.checked">{{d.name}}
            </el-checkbox>
            <div class="block">
              <el-checkbox v-model="form.diagnosisExaminationType[5].checked">
                {{form.diagnosisExaminationType[5].name}}
              </el-checkbox>
              <el-input :disabled="!form.diagnosisExaminationType[5].checked"
                        v-model.trim="form.diagnosisExaminationType[5].value"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="干预导师" required class="interventionTutorials">
            <div class="block" v-for="(il,i) in form.interventionTutorials" :key="i">
              <el-checkbox v-model="il.checked">{{il.subjectName}}</el-checkbox>
              <el-select v-model="il.teacherId" :disabled="!il.checked">
                <el-option v-for="(t,j) in interventionTutorials" :label="t.name" :value="t.id" :key="j"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="partname">
          学生报名情况
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="所报学科及课时" required class="interventionTutorials">
            <div class="block" v-for="(d,i) in form.signUpCourses" :key="i">
              <el-checkbox v-model="d.checked">{{d.subjectName}}</el-checkbox>
              <el-input :disabled="!d.checked" v-model.number="d.value" min="0" type="number" placeholder="填写课时"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否保分" prop="hasTargetScore" :rules="[{required:true,message:'请选择是否保分',trigger:'blur'}]">
            <el-select v-model="form.hasTargetScore">
              <el-option value="" disabled label="请选择"></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="保分学科及分数" class="interventionTutorials">
            <div class="block" v-for="(d,i) in form.targetSubjectScores" :key="i">
              <el-checkbox v-model="d.checked">{{d.subjectName}}</el-checkbox>
              <el-input :disabled="!d.checked" v-model.number="d.score" min="0" type="number" placeholder="填写分数"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否缴费" prop="paymentState" :rules="[{required:true,message:'请选择是否缴费',trigger:'blur'}]">
            <el-select v-model="form.paymentState">
              <el-option value="" disabled label="请选择"></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="缴费金额">
            <el-input type="number" min="0" v-model.number="form.paymentAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="教学主管" prop="teachDirectorCode" :rules="[{required:true,message:'请选择教学主管',trigger:'blur'}]">
            <el-select v-model="form.teachDirectorCode">
              <el-option value="" disabled label="请选择"></el-option>
              <el-option v-for="(d,i) in teachDirectors" :key="i" :label="d.name" :value="d.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="action">
        <el-col :span="24">
          <el-button type="primary" @click="save">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {},
    created() {
      this.student = this.localData.get("tmpStudentInfo");
      this.getinterventionTutorials();
      this.getteachDirectors();
      console.log("query ",this.$route.query)
      if (!this.$route.query.recordId){
        this.getAllSubjects();
        this.form.userId = this.student.userId;
      }else {
        this.getDetail(this.$route.query.recordId)
      }
    },
    mounted() {
    },
    data() {

      return {
        startDatePicker:this.beginTime(),
        student:{},
        interventionTutorials:[], //所有的干预导师
        teachDirectors:[], //所有的教学主管
        subjects: [],
        form: {
          diagnosisDatetime: '',
          diagnosisSubjectAndScores: [], // 诊断学科及分数 ,
          partakeExperienceState: '',
          interventionTutorials: [],  //干预导师
          diagnosisExaminationType: [{code: 1, name: '书院入学测试', checked: false},
            {code: 2, name: '学校期末考试', checked: false}, {code: 3, name: '学校期中考试', checked: false},
            {code: 4, name: '一模考试', checked: false}, {code: 5, name: '二模考试', checked: false},
            {code: 6, name: '其他', value: '', checked: false}],
          signUpCourses: [],
          hasTargetScore: '',
          targetSubjectScores: [],  //保分学科及分数 ,
          paymentState: '',
          teachDirectorCode: "",
          teachDirectorName: '',
          userId:""
        }
      }
    },
    methods: {
      getAllSubjects() {
        this.$ajax.getAllSubjects().then(res => {
          if (res.code == '000000') {
            this.subjects = res.subjects;
            this.manageDatas();
            return
          }
          this.$message({type: "error", message: "获取数据出错"})
        }).catch(e => {
          this.$message({type: "error", message: "请求数据出错"})
        })
      },
      getDetail(recordId) {
        this.$axios.post("student/getStudentPaymentRecord", {recordId: recordId}).then(res => {
          if (res.code == "000000" && res.result) {
            res.result.diagnosisExaminationType = JSON.parse(res.result.diagnosisExaminationType);
            res.result.diagnosisSubjectAndScores = JSON.parse(res.result.diagnosisSubjectAndScores);
            res.result.interventionTutorials = JSON.parse(res.result.interventionTutorials);
            res.result.signUpCourses = JSON.parse(res.result.signUpCourses);
            res.result.targetSubjectScores = JSON.parse(res.result.targetSubjectScores);
            this.form = res.result;
            return
          }
          this.$message({type: "error", message: "获取数据出错"})
        }).catch(e => {
          this.$message({type: "error", message: "请求数据出错"})
        })
      },
      //所有的干预导师
      getinterventionTutorials(){
        this.$axios.post("management/getAdministratorsByRoleId",{role:"INTERVENE_TEACHERE"}).then(res=>{
          this.interventionTutorials = res.administrators;
        }).catch(e=>{
          this.$message({type: "error", message: "请求干预导师出错"})
        })
      },
      //所有的教学主管
      getteachDirectors(){
        this.$axios.post("management/getAdministratorsByRoleId",{role:"TEACHING_DIRECTOR"}).then(res=>{
          this.teachDirectors = res.administrators;
        }).catch(e=>{
          this.$message({type: "error", message: "请求干预导师出错"})
        })
      },
      manageDatas() {
        this.subjects.forEach((v) => {
          if (parseInt(v.subjectCode) < 10) {
            this.form.diagnosisSubjectAndScores.push({
              subjectCode: v.subjectCode,
              subjectName: v.subjectName,
              score: "",
              totalScore: '',
              checked: false
            });
            this.form.interventionTutorials.push({
              subjectCode: v.subjectCode,
              subjectName: v.subjectName,
              teacherName: "",
              teacherId: '',
              checked: false
            });
            this.form.signUpCourses.push({
              subjectCode: v.subjectCode,
              subjectName: v.subjectName,
              value: '',
              checked: false
            });
            this.form.targetSubjectScores.push({
              subjectCode: v.subjectCode,
              subjectName: v.subjectName,
              score: '',
              checked: false
            });
          }
        })
      },
      //根据教师id查询教师名称
      findTeacherName(id,type){
        console.log("find...",id,this[type])
        for(let i=0;i<this[type].length;i++){
          if(this[type][i].id==id){
            return this[type][i].name;
          }
        }
      },
      //验证表单
      validateForm(){
        var flag = false;
        var t;
        for(var i=0;i<this.form.diagnosisSubjectAndScores.length;i++){
          if(this.form.diagnosisSubjectAndScores[i].checked){
            if(isNaN(this.form.diagnosisSubjectAndScores[i].score)||this.form.diagnosisSubjectAndScores[i].score<0||isNaN(this.form.diagnosisSubjectAndScores[i].totalScore)||this.form.diagnosisSubjectAndScores[i].totalScore<0){
              flag = false;
              break;
            }
            flag =true;
          }
        }
        if(!flag){
          this.$message({type: "error", message: "请完善诊断学科及分数"})
          return false;
        }
        flag=false;

        for(i=0;i<this.form.diagnosisExaminationType.length;i++){
          t= this.form.diagnosisExaminationType[i];
          if(t.checked){
            if(t.code<6 || t.value){
              flag=true;
            }else if(t.code==6 && !t.value){
              flag = false;
              break;
            }
          }
        }
        if(!flag){
          this.$message({type: "error", message: "请完善诊断考试类型"})
          return false;
        }

        if(this.form.partakeExperienceState==1){
          flag=false;
          for(i=0;i<this.form.interventionTutorials.length;i++){
            t = this.form.interventionTutorials[i];
            if(t.checked){
              if(t.teacherId){
                t.teacherName = this.findTeacherName(t.teacherId,'interventionTutorials');
                console.log("find teacher ... ",t.teacherName)
                flag=true;
              }else{
                flag=false;
                break;
              }
            }
          }
          if(!flag){
            this.$message({type: "error", message: "请完善干预导师"})
            return false;
          }
        }
        flag=false;

        for(i=0;i<this.form.signUpCourses.length;i++){
          t=this.form.signUpCourses[i];
          if(t.checked){
            if(isNaN(t.value)||t.value <=0){
              flag=false;
              break;
            }else{
              flag=true;
            }
          }
        }
        if(!flag){
          this.$message({type: "error", message: "请完善所报学科及课时"})
          return false;
        }
        flag=false;

        if(this.form.hasTargetScore==1){
          for(i=0;i<this.form.targetSubjectScores.length;i++){
            t = this.form.targetSubjectScores[i];
            if(t.checked){
              if(isNaN(t.score)||t.score<=0){
                flag=false;
                break;
              }else{
                flag=true;
              }
            }
          }
          if(!flag){
            this.$message({type: "error", message: "请完善保分学科及分数"})
            return false;
          }
          flag=false;
        }

        if(this.form.paymentState==1){
          if(isNaN(this.form.paymentAmount)&&this.form.paymentAmount<=0){
            flag=false
            this.$message({type: "error", message: "请输入缴费金额"})
            return false;
          }else{
            flag=true;
          }
        }
        this.form.teachDirectorName = this.findTeacherName(this.form.teachDirectorCode,'teachDirectors');
        return true;
      },
      save() {
        this.$refs.form.validate(valid=>{
          if(!valid)return ;
          if(!this.validateForm()){
            return ;
          }
          console.log('submit ....   ',this.form);
          if(this.form.recordId){
            return this.editForm();
          }
          this.$axios.post("student/addStudentPaymentRecord",Object.assign({},this.form,{diagnosisSubjectAndScores:JSON.stringify(this.form.diagnosisSubjectAndScores),
            interventionTutorials:JSON.stringify(this.form.interventionTutorials),diagnosisExaminationType:JSON.stringify(this.form.diagnosisExaminationType),
            signUpCourses:JSON.stringify(this.form.signUpCourses),targetSubjectScores:JSON.stringify(this.form.targetSubjectScores)
          })).then(res=>{
            if(res.code=='000000'){
              this.$message({type: "success", message: "保存成功"})
              this.$router.go(-1)
              return ;
            }
            this.$message({type: "error", message: "保存失败"})
          }).catch(e=>{
            this.$message({type: "error", message: "保存请求失败"})
          })
        })
      },
      editForm(){
        this.$axios.post("student/updateStudentPaymentRecord",Object.assign({},this.form,{diagnosisSubjectAndScores:JSON.stringify(this.form.diagnosisSubjectAndScores),
          interventionTutorials:JSON.stringify(this.form.interventionTutorials),diagnosisExaminationType:JSON.stringify(this.form.diagnosisExaminationType),
          signUpCourses:JSON.stringify(this.form.signUpCourses),targetSubjectScores:JSON.stringify(this.form.targetSubjectScores)
        })).then(res=>{
          if(res.code=='000000'){
            this.$message({type: "success", message: "保存成功"})
            this.$router.go(-1)
            return ;
          }
          this.$message({type: "error", message: "保存失败"})
        }).catch(e=>{
          this.$message({type: "error", message: "保存请求失败"})
        })
      },
      //日历开始时间
      beginTime(){
        var d = new Date();
        return {
          disabledDate(time){
            return new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime() > time.getTime();
          }
        }
      }

    },
    computed: {},
    filters: {},
  }
</script>
<style lang="scss" scoped>
  .block {
    display: inline-block !important;
    white-space: nowrap;
    .el-input {
      width: 200px;
    }
  }

  .padTop20 {
    .el-form-item {
      display: inline-block !important;
      clear: none;
    }
    .subjectscores {
      width: 260px;
      margin-bottom: 10px;
      .el-checkbox {
        margin-right: 5px;
      }
      .el-input {
        width: 60px;
      }
    }
    .interventionTutorials {
      .el-checkbox {
        margin-right: 5px;
      }
      .block {
        margin-bottom: 20px;
        margin-right: 10px;
      }
    }
    .action {
      text-align: center;
      padding: 20px 0;
    }
    .partname{
      padding-left: 20px;
      padding-bottom: 10px;
      font-weight: bold;
    }
  }
</style>
<style lang="scss">
  .startschooladdpage {
    .el-form-item {
      .el-input__inner[type=number]{
        padding-right: 0;
      }
      .el-form-item {
        label {
          width: 50px !important;
        }

        .el-form-item__content {
          margin-left: 50px !important;
        }
        &.nocont {
          label {
            display: none;
            width: 0 !important;
          }
          .el-form-item__content {
            margin-left: 0px !important;
          }
        }
      }
    }
  }
</style>
