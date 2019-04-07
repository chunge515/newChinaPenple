<template>
    <div class="auditionBox padTop20">
      <el-form ref="form" :model="form" label-width="205px" :rules="rules">
      <el-row>
        <el-col :span="8" >
          <el-form-item label="预约到场时间：" prop="appointmentDatetime">
            <el-date-picker
              v-model="form.appointmentDatetime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="timestamp"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8"  >
          <el-form-item label="是否进行测评：" prop="hasAssessment" >
            <el-select v-model="form.hasAssessment" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否进行家长测评：" prop="parentAssessment">
            <el-select v-model="form.parentAssessment" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一次试听干预导师：" prop="serviceTutorial">
            <el-select v-model="form.serviceTutorial" placeholder="请选择" value-key="id">
              <el-option
                v-for="item in serviceTutorials"
                :label="item.name"
                :value="item"
                :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否完成一次试听：" prop="hasComplete ">
            <el-select v-model="form.hasComplete" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户意向等级：" prop="intentionLevel"><!--intentionLevels-->
            <el-select v-model="form.intentionLevel" placeholder="请选择">
              <el-option v-for="(item,index) in intentionLevels"
                         :label="item"
                         :value="item"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="测评结果：" prop="assessmentResult">
            <el-row class="subjectMarks">
              <el-col v-for="(item,index) in form.assessmentResult" :key="index">
                <span>{{item.subjectName}}:</span><el-input v-model.trim="item.score" placeholder="填写分数" type="number"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <!--auditionFeedbackState-->
            <el-row>
              <el-col style="width: 350px; margin-right: 10px;">
                <el-form-item label="一次试听反馈：" prop="auditionFeedbackState">
                <el-select v-model="form.auditionFeedbackState" placeholder="请选择">
                  <el-option v-for="(item,index) in auditionFeedbackStates"
                             :label="item.name"
                             :value="item.code"
                             :key="index"></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col style="width: 300px;" v-if="form.auditionFeedbackState==1">
                  <el-input v-model="form.auditionFeedbackReason"></el-input>
              </el-col>
            </el-row>
        </el-col>
        <el-col :span="24">
          <el-form-item label="一次试听科目及内容：" prop="auditionSubjectCode"><!--auditionSubjectCode-->
            <el-select v-model="form.auditionSubjectCode" placeholder="请选择" >
              <el-option
                v-for="(item,index) in subjectList"
                :label="item.subjectName"
                :value="item.subjectCode"
                :key="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="auditionContent"><!--auditionSubjectCode-->
            <el-input v-model.trim="form.auditionContent" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="方案咨询结果记录：" prop="schemeAdviceResult">
            <el-input v-model.trim="form.schemeAdviceResult" maxlength="1000" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
            <h5>一次试听学生反馈</h5>
          <el-row>
            <el-col :span="12">
              <el-form-item label="干预训练素材难度：" prop="studentFeedbackDifficulty">
                <el-select v-model="form.studentFeedbackDifficulty" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in studentFeedbackDifficultys"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对干预训练方法接受程度：" prop="studentFeedbackAccept">
                <el-select v-model="form.studentFeedbackAccept" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in studentFeedbackAccepts"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上课过程中：" prop="studentFeedbackThink">
                <el-select v-model="form.studentFeedbackThink" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in studentFeedbackThinks"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="本次干预效果：" prop="studentFeedbackEffect">
                <el-select v-model="form.studentFeedbackEffect" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in studentFeedbackEffects"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
                <!--<el-input v-model.trim="form.studentFeedbackEffect" maxlength="10"></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：" prop="studentFeedbackRemark">
                <el-input v-model.trim="form.studentFeedbackRemark"  maxlength="1000" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-col>
        <el-col :span="24">
          <h5>一次试听教师评价</h5>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学生的学习习惯：" prop="teacherAssessmentStudyHabit">
                <el-select v-model="form.teacherAssessmentStudyHabit" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentStudyHabits"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生对干预方法的适应程度：" prop="teacherAssessmentMethodAdapt">
                <el-select v-model="form.teacherAssessmentMethodAdapt" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentMethodAdapts"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学生有哪些不好的习惯：" prop="teacherAssessmentBadHabits">
                <el-checkbox-group
                  v-model="form.teacherAssessmentBadHabits">
                  <el-row>
                    <el-col :span="6" v-for="(item,index) in teacherAssessmentBadHabitList" :key="index">
                      <el-checkbox
                        :label="item.code">{{item.name}}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生的学习方法：" prop="teacherAssessmentStudyMethod">
                <el-select v-model="form.teacherAssessmentStudyMethod" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentStudyMethods"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生的思维能力：" prop="teacherAssessmentThinkAbility">
                <el-select v-model="form.teacherAssessmentThinkAbility" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentThinkAbilitys"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="知识掌握情况：" prop="teacherAssessmentMasterKnowledge">
                <el-select v-model="form.teacherAssessmentMasterKnowledge" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentMasterKnowledges"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：" prop="teacherAssessmentRemark">
                <el-input v-model.trim="form.teacherAssessmentRemark" maxlength="1000" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      </el-form>
      <div class="addBtn" style="text-align:center">
        <el-button type="primary" @click="god('form')">保存</el-button>
      </div>
    </div>
</template>
<script>
  import moment from "moment"
    export default {
        components: {},
        props: {},
        created() {
          //this.type=this.$route.query.type;
          this.getAdministratorsByRoleId();
          this.getSubjectList();
          this.edit=this.$route.query.edit;
          if(this.edit){
            var obj= this.localData.get('auditionRecordObj')
            obj.appointmentDatetime=moment(obj.appointmentDatetime, 'YYYY-MM-DD HH:mm:ss').valueOf();
            obj.serviceTutorial={
              id:obj.serviceTutorialCode,
              name:obj.serviceTutorialName,
            }
            this.form=obj
          }
        },
        mounted() {
        },
        data() {
            return {
              editObj:{},
              edit:'',
              type: "",
              subjectList: [],//学科列表
              serviceTutorials: [],//干预导师列表
              intentionLevels: ['A', 'B', 'C'],
              auditionFeedbackStates: [
                {code: '1', name: '不满意'},
                {code: '2', name: '一般'},
                {code: '3', name: '满意'},
              ],
              studentFeedbackDifficultys: [
                {code: '1', name: '易'},
                {code: '2', name: '适中'},
                {code: '3', name: '难'},
              ],
              studentFeedbackAccepts: [
                {code: '1', name: '勉强接受'},
                {code: '2', name: '可以接受'},
                {code: '3', name: '能够较好接受'},
              ],
              studentFeedbackThinks: [
                {code: '1', name: '老师讲的多'},
                {code: '2', name: '一样多'},
                {code: '3', name: '我思考的多写的多'},
              ],
              studentFeedbackEffects: [//
                {code: '1', name: '效果不明显'},
                {code: '2', name: '一般'},
                {code: '3', name: '非常有用'},
              ],
              teacherAssessmentStudyHabits: [
                {code: '1', name: '差'},
                {code: '2', name: '一般'},
                {code: '3', name: '较好'},
              ],
              teacherAssessmentMethodAdapts:[
                {code: '1', name: '非常适应'},
                {code: '2', name: '一般'},
                {code: '3', name: '勉强适应'},
              ],
              teacherAssessmentBadHabitList: [
                {code: '1', name: '专注力差'},
                {code: '2', name: '不愿意动笔'},
                {code: '3', name: '转笔'},
                {code: '4', name: '书写字迹潦草'},
                {code: '5', name: '抖腿'},
                {code: '6', name: '握笔姿势不正确'},
                {code: '7', name: '教师提问反应缓慢'},
                {code: '8', name: '坐姿不正确'},
                {code: '9', name: '玩手机'},
                {code: '10', name: '说话声音过大/过小'},
                {code: '11', name: '做作业慢'},
              ],
              teacherAssessmentStudyMethods: [
                {code: '1', name: '未掌握有效的学习方法'},
                {code: '2', name: '有方法但是一般'},
                {code: '3', name: '有有效的学习方法'},
              ],
              teacherAssessmentThinkAbilitys: [//
                {code: '1', name: '需教师多次引导'},
                {code: '2', name: '需教师适当引导'},
                {code: '3', name: '思维敏捷,反应较快'},
              ],
              teacherAssessmentMasterKnowledges: [
                {code: '1', name: '基础知识掌握一般解决复杂问题有困难'},
                {code: '2', name: '基础知识扎实但解决复杂问题有困难'},
                {code: '3', name: '基础知识扎实能解决复杂问题'},
              ],
              form: {
                appointmentDatetime: '',//预约时间
                hasAssessment: '',//是否进行测评
                parentAssessment: '',//是否进行家长测评
                serviceTutorial: {},//试听干预导师
                hasComplete: '',//是否完成一次试听
                assessmentResult: [],//测评结果
                auditionFeedbackReason: '',//不满意描述
                auditionSubjectCode: '',//试听科目
                auditionContent: '',//试听内容
                schemeAdviceResult: '',//方案结果咨询记录
                studentFeedbackDifficulty: '',//干预训练难度
                studentFeedbackAccept: '',//接受程度
                studentFeedbackThink: '',//上课过程中
                studentFeedbackEffect: '',///干预效果
                studentFeedbackRemark: '',//试听学生反馈备注
                teacherAssessmentStudyHabit: '',//学生学习习惯
                teacherAssessmentMethodAdapt:"",
                teacherAssessmentBadHabits: [],//学生哪些不好的习惯
                teacherAssessmentStudyMethod: '',//学生学习的方法
                teacherAssessmentThinkAbility: '',//学生的思维能力
                teacherAssessmentMasterKnowledge: '',//知识掌握情况
                teacherAssessmentRemark: '',//教师备注
                intentionLevel:'',//用户意向等级

                //
              },
              rules: {
                appointmentDatetime: [
                  {required: true, message: "请填写预约到场时间", trigger: 'change'},
                ],
                hasAssessment: [
                  {required: true, message: "请选择是否进行测评"},
                ],
                parentAssessment: [
                  {required: true, message: "请选择是否进行家长测评"},
                ],
                serviceTutorial: [
                  {required: true, message: "请选择一次试听干预导师"},
                ],
                hasComplete: [
                  {required: true, message: "请选择是否完成一次试听"},
                ],
                intentionLevel: [
                  {required: true, message: "请选择用户意向等级"},
                ],
                auditionFeedbackState:[
                  {required: true, message: "请选择一次试听反馈"},
                ],
                auditionSubjectCode:[
                  {required: true, message: "一次试听科目"},
                ],
                auditionContent:[
                  {required: true, message: "一次试听内容"},
                ],
                studentFeedbackDifficulty:[
                  {required: true, message: "干预训练素材难度"},
                ],
                studentFeedbackAccept:[
                  {required: true, message: "对干预训练方法接受程度"},
                ],
                studentFeedbackThink:[
                  {required: true, message: "上课过程中"},
                ],
                studentFeedbackEffect:[
                  {required: true, message: "本次干预效果"},
                ],
                teacherAssessmentStudyHabit:[
                  {required: true, message: "学生的学习习惯"},
                ],
                teacherAssessmentMethodAdapt:[
                  {required: true, message: "学生对干预方法的适应程度"},
                ],
                teacherAssessmentStudyMethod:[
                  {required: true, message: "学生的学习方法"},
                ],
                teacherAssessmentThinkAbility:[
                  {required: true, message: "学生的思维能力"},
                ],
                teacherAssessmentMasterKnowledge:[
                  {required: true, message: "知识掌握情况"},
                ],

              }
            }
        },
        methods: {
          //获取干预导师的列表
          getAdministratorsByRoleId(){
            var $this=this;
            this.$axios
              .post("/management/getAdministratorsByRoleId", {  "role": "INTERVENE_TEACHERE"})
              .then(res => {
                console.log(res)
                $this.serviceTutorials=res.administrators ||[];
              })
              .catch(err => {
                this.$message({
                  type: 'info',
                  message: err
                });
              });
          },
          //获取学科列表
          /*根据获取学科列表*/
          getSubjectList(){
            // console.log(gradeCode)
            // this.
            var $this = this;
            var obj={
              dataType: 1,
            }
            this.$ajax.getSubjectsByGrade(obj).then(function (result) {
              if(result.code=="000000"){
                var subjects = result.subjects||[];
                var ary=[];
                subjects.forEach(val=>{//$this.subjectList
                  if(val.subjectCode<=9){
                    val.isD=false;
                    ary.push(val)
                  }
                })
                $this.subjectList=ary;
                // $this.preSubjectExamMarks=ary;
                if(!$this.$route.query.edit){
                  ary.forEach(val=>{
                    $this.form.assessmentResult.push({
                      score:null,
                      subjectCode:val.subjectCode,
                      subjectName:val.subjectName
                    })
                  })
                }
                //console.log($this.subjectList,$this.form.preSubjectExamMarks,"===")
              }else{
                $this.$message({
                  type: 'warning',
                  message: "获取学科列表失败"
                });
              }
            })
          },
          god:function (formName) {
            var $this = this;
           var tmpStudentInfo=$this.localData.get('tmpStudentInfo');
            $this.$refs[formName].validate((valid) => {
              if (valid) {
                if ($this.form.auditionFeedbackState == "1" && $this.form.auditionFeedbackReason == "") {
                  $this.$message({message: '请填写不满意原因', type: 'warning'});
                  return false
                }
                var flag=true;
                $this.form.assessmentResult.forEach(val=>{
                  console.log(val)
                  if(val.score!="" || val.score!=null){
                    flag=false;
                  }
                })
                if(flag){
                  $this.$message({message: '测评结果至少填写一科', type: 'warning'});
                  return false;
                }

                var obj=JSON.parse(JSON.stringify($this.form));
                obj.assessmentResult=JSON.stringify(obj.assessmentResult)
                obj.teacherAssessmentBadHabits=JSON.stringify(obj.teacherAssessmentBadHabits);
                obj.serviceTutorialCode= $this.form.serviceTutorial.id;
                obj.serviceTutorialName= $this.form.serviceTutorial.name;
                obj.createName="123";
                obj.auditionNumber=1;
                obj.studentId=tmpStudentInfo.userId;
                if($this.$route.query.edit){//
                  obj.updateName="123";//               if()
                  this.$axios
                    .post("/student/updateStudentAuditionRecord",obj)
                    .then(res => {
                      if(res.code=="000000"){
                        this.$message({
                          type: 'success',
                          message: "保存成功"
                        });
                         this.$router.push({path:"/editAudition"})
                      }else{
                        this.$message({
                          type: 'warning',
                          message: res.message
                        });
                      }
                    })
                    .catch(err => {
                      this.$message({
                        type: 'info',
                        message: "保存失败"
                      });
                    });

                }else{
                  obj.createName="123";
                  this.$axios
                    .post("/student/addStudentAuditionRecord",obj)
                    .then(res => {
                      if(res.code=="000000"){
                        this.$message({
                          type: 'success',
                          message: "保存成功"
                        });
                         this.$router.push({path:"/editAudition"})
                      }else{
                        this.$message({
                          type: 'warning',
                          message: res.message
                        });
                      }
                    })
                    .catch(err => {
                      this.$message({
                        type: 'info',
                        message: "保存失败"
                      });
                    });
                }

                //
              }
              })
          }
        },
        computed: {},
        filters: {},
    }
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
.auditionBox{
  max-width:1200px;
  .subjectMarks{
    width:1000px;
    .el-col{
      margin-bottom: 20px;
      width:300px;
      span{
        margin-right:20px;}
      .el-input{
        width:200px;
      }
    }
  }
  h5{
    font-size: 18px;
    font-weight: normal;
    line-height:40px;
    color: #f00;
   // border-bottom: 1px solid #ccc;
    margin-bottom:30px;
  }
  .addBtn{
    margin-bottom:20px;
  }
}
</style>
