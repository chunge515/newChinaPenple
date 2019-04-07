<template>
    <div class="addAbilityReady-content padTop20">
      <!--<commonTitle>-->
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
          <!--<el-breadcrumb-item>人员管理</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>学生管理</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>新增学生</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</commonTitle>-->
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="体验学科" prop="subjectCode">
                  <el-select v-model="form.subjectCode" placeholder="请选择">
                    <el-option :label="item.subjectName" :value="item.subjectCode" v-for="item in subjectList" :key="item.subjectCode"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="教师姓名" prop="teacherName">
                  <el-input v-model.trim="form.teacherName" maxlength="10"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="学年" prop="gradeCode">
                  <el-select v-model="form.gradeCode" placeholder="请选择学科"  value-key="gradeCode">
                    <el-option :label="item.gradeName" :value="item.gradeCode" v-for="item in gradeList" :key="item.gradeCode"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-form-item label="文理科" prop="artType">
            <el-radio-group v-model="form.artType" >
              <el-radio label="1">文科</el-radio>
              <el-radio label="2">理科</el-radio>
            </el-radio-group>
          </el-form-item>


      <!--干预流程反思-->
      <!--teacherStep:"导师未做到的步骤", //导师未做到的步骤-->
      <!--reason:"未做到的原因", //未做到的原因-->
      <!--stuUpPart:"学生有进步的部分", //学生有进步的部分-->
      <!--stuImprovePart:"学生未提高的部分", //学生未提高的部分-->
      <!--teaUpPart:"导师有进步的部分", //导师有进步的部分-->
      <!--teaImprovePart:"导师未提高的部分", //导师未提高的部分-->
      <!--teaChange:"导师改进方案", //导师改进方案-->
      <!--stuChange:"学生改进方案", //学生改进方案-->
      <!--text:"备注" //备注-->
      <!--素材及内容描述-->
      <div class="description-list">
        <!--干预流程反思-->
        <h4>干预流程反思</h4>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="导师未做到的步骤" prop="teacherNotDoneProcedure">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.teacherNotDoneProcedure"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="未做到的原因" prop="teacherNotDoneReason">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.teacherNotDoneReason"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <!--干预结果反思-->
        <h4>干预结果反思</h4>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="学生有进步的部分" prop="studentIncreasedSection">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.studentIncreasedSection"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="学生未提高的部分" prop="studentIncreasingSection">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.studentIncreasingSection"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="导师有进步的部分" prop="teacherIncreasedSection">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.teacherIncreasedSection"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="导师未提高的部分" prop="teacherIncreasingSection">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.teacherIncreasingSection"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <!--改进方案-->
        <h4>改进方案</h4>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="导师改进方案" prop="teacherImprovePlan">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.teacherImprovePlan"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="学生改进方案" prop="studentImprovePlan">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.studentImprovePlan"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:20px 0;">
          <el-col :span="24">
            <div class="grid-content bg-purple mr-purple">
              <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.remark"
                maxlength="200">
              </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="addBtn" style="text-align:center">
        <el-button @click="qxBtn">取消</el-button>
        <el-button type="primary" @click="god('form')">保存</el-button>
      </div>
      </el-form>
    </div>


</template>
<script>
export default {
  data() {

    return {
      parInfo:this.localData.get("tmpStudentInfo"),//当前用户信息
      /*筛选条件*/
      stageList: [], //学段
      gradeList: [], //学年
      subjectList: [],
      subjectsObj: this.commonSubject,
      gradesObj: this.commonGrond,
      stageCode: "", //学段code
      gradeCode: '', //年级code
      subjectCode: '', //学科code
      //教材版本列表
      rules: {
        subjectCode:[
          {required: true, message: '请选择学科'},
        ],
        gradeCode:[
          {required: true, message: '请选择学年',trigger: 'blur'},
        ],
        teacherName: [
          {required: true, message: '请输入老师姓名', trigger: 'blur'},
        ],
        artType:[
          {required: false, message: '请选择文理', trigger: 'blur'},
        ],
        teacherNotDoneProcedure: [
          { required: true, message: '请填写导师未做到的步骤', trigger: 'blur' }
        ],
        teacherNotDoneReason: [
          { required: true, message: '请填写未做到的原因', trigger: 'blur' }
        ],
        studentIncreasedSection: [
          { required: true, message: '请填写学生有进步的部分', trigger: 'blur' }
        ],
        studentIncreasingSection: [
          { required: true, message: '请填写学生未提高的部分', trigger: 'blur' }
        ],
        teacherIncreasedSection:[
          { required: true, message: '请填写导师有进步的部分', trigger: 'blur' }
        ],
        teacherIncreasingSection: [
          { required: true, message: '请填写导师未提高的部分', trigger: 'blur' }
        ],
        teacherImprovePlan: [
          { required: true, message: '请填写导师改进方案', trigger: 'blur' }
        ],
        studentImprovePlan: [
          { required: true, message: '请填写学生改进方案', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请填写备注', trigger: 'blur' }
        ],


      },
      /*提交参数*/
      form: {
        subjectCode:"", //学科code
        gradeCode:"", //学年code
        teacherName: "", //教师名字
        artType: 0, //文理科
        teacherNotDoneProcedure:"", //导师未做到的步骤
        teacherNotDoneReason:"", //未做到的原因
        studentIncreasedSection:"", //学生有进步的部分
        studentIncreasingSection:"", //学生未提高的部分
        teacherIncreasedSection:"", //导师有进步的部分
        teacherIncreasingSection:"", //导师未提高的部分
        teacherImprovePlan:"", //导师改进方案
        studentImprovePlan:"", //学生改进方案
        remark:"" //备注
      },
      id:""
    }
  },
  created() {
    this.getGradeList();
    this.getSubjects();
    this.id=this.$route.query.id;
    if(this.id){//
      this.$axios
        .post("/teachingReflection/getTeachingReflection", {"teachingReflectionId":this.id,})
        .then(res => {
          if(res.code=="000000"){
            var result=res.result || null;
            if(result){
              this.form=result;
              this.form.artType=String(result.artType)
            }
            //$this.$router.push({path:'/afterClass'})
          }else{
            $this.$message.error(res.message||'请求出错');
          }
        }).catch(e=>{
        $this.$message.error(e.message||'请求出错');
      })
    }
    // this.getGradeList();
    // this.getSubjectList()
    // this.getStudentList();
  },
  filters:{
  },
  methods: {
    //编辑获取信息

    /*根据学年获取学科列表*/
    /*获取学年列表*/
    getGradeList(){
      var $this = this;
      var obj = {
        stageCode:$this.parInfo.stageCode
      }
      this.$ajax.getGradesByStage(obj).then(function (result) {
        if(result.code=="000000"){
          $this.gradeList = result.grades||[];
        }else{
          $this.$message({
            type: 'warning',
            message: "获取学年列表失败"
          });
        }
      })
    },
    //获取学科
    getSubjects(){
      var _this = this;
      this.$ajax.getSubjectsByGrade().then(res=>{
        if(res.code==="000000"){
          _this.subjectList = res.subjects;
        }else{
          _this.$message.error(res.message||'请求出错');
        }
      }).catch(e=>{
        _this.subjects = [];
        _this.$message.error(e.message||'请求出错');
      })
    },
    /*取消*/
    qxBtn:function(){
      this.$router.push({path: '/afterClass'})
    },
    /*提交*/
    /*
  "userId": "string"
}
}*/
    god:function (formName) {
      var $this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj=this.form;
          obj.userId=$this.parInfo.userId;
          if($this.id){
            obj.updateName="123"
            obj.teachingReflectionId=$this.id;
            this.$axios
              .post("/teachingReflection/updateTeachingReflection", obj)
              .then(res => {
                if(res.code=="000000"){
                  $this.$router.push({path:'/afterClass'})
                }else{
                  $this.$message.error(res.message||'请求出错');
                }
              }).catch(e=>{
              $this.$message.error(e.message||'请求出错');
            })
          }else{
            obj.createName ='123';
            this.$axios
              .post("/teachingReflection/saveTeachingReflection", obj)
              .then(res => {
                if(res.code=="000000"){
                  $this.$router.push({path:'/afterClass'})
                }else{
                  $this.$message.error(res.message||'请求出错');
                }
              }).catch(e=>{
              $this.$message.error(e.message||'请求出错');
            })
          }

        } else {
          this.$message.warning('请将信息填写完整');
          return false;
        }
      });

    },
  },
  watch:{
  },
  components: {

  }
}
</script>

<style scoped lang="less">
  /*.el-input{*/
    /*width:30%;*/
  /*}*/
  /*new*/
  .addAbilityReady-content{
    padding-top:20px;
    padding-bottom:500px;
    .icon-1{
      font-size:30px;
      cursor:pointer;
      margin-left:10px;
      vertical-align: -17px;
    }
    .school-sel{
      margin-right:10px;
      margin-bottom:10px;
    }
    .sub-list .icon-1{
      font-size:30px;
      cursor:pointer;
      margin-right:10px;
      vertical-align: -17px;
    }
    .notNull:before{
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }

  }


</style>
<style>
  .isCenter3 td{text-align: center;  height:48px;
    line-height:48px;
    padding:0;}
/*  .isCenter3 td:last-child{text-align: left}*/
  .mr-purple .el-form-item__label{
    width:136px !important;}
  .mr-purple .el-form-item__content{
    margin-left:136px !important;
  }
</style>
