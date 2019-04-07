<template>
  <div>
    <!--<commonTitle>-->
      <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
        <!--<el-breadcrumb-item>人员管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item to="/studentMange">学生管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>学生查看</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</commonTitle>-->
    <div class="showAbilityReady-content padTop20" >
      <!--顶部基础数据-->
      <div class="top-List">
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">体验学科：</el-col>
              <el-col :span="14">{{subjectsObj[form.subjectCode]}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">文理科：</el-col>
              <el-col :span="14" v-if="form.wlSub==1">文科</el-col>
              <el-col :span="14" v-if="form.wlSub==2">理科</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">教师姓名：</el-col>
              <el-col :span="14">{{ form.teacherName }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">试卷满分：</el-col>
              <el-col :span="14">{{ form.paperScore }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">学生得分：</el-col>
              <el-col :span="14">{{ form.studentScore }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">学年：</el-col>
              <el-col :span="14">{{ gradesObj[form.gradeCode] }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">试卷总题数：</el-col>
              <el-col :span="14">{{ form.quesNum }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">答错题数：</el-col>
              <el-col :span="14">{{ form.wrongNum }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!--错误题型及数量-->
      <div class="top-List">
        <h4>错误题型及数量</h4>
        <el-row v-for="(item,index) in wrongTypeObj" :key="1">
          <el-col :span="8">
            <el-row>
              <el-col :span="10">错误题型：</el-col>
              <el-col :span="14">{{ item.wrongType }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">总数量：</el-col>
              <el-col :span="14">{{ item.total }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">错误数量：</el-col>
              <el-col :span="14">{{ item.wrongTotal }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!--错误知识点（按照错误次数排序）-->
      <div class="top-List">
        <h4>错误知识点（按照错误次数排序）</h4>
        <el-row v-for="(item,index) in WrongPointObj" :key="2">
          <el-col :span="16">
            <el-row>
              <el-col :span="5">知识点名称：</el-col>
              <el-col :span="18">{{ item.name }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">错误次数：</el-col>
              <el-col :span="14">{{ item.total }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!--试卷分析出的答题习惯问题-->
      <div class="top-List">
        <h4>试卷分析出的答题习惯问题</h4>
        <el-row v-for="(item,index) in paperAnsQuesObj" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="4">问题{{ index+1 }}：</el-col>
              <el-col :span="18">{{ item.quesText }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!--试卷分析出的学习能力问题-->
      <div class="top-List">
        <h4>试卷分析出的学习能力问题</h4>
        <el-row v-for="(item,index) in paperAnsStudyObj" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="4">问题{{ index+1 }}：</el-col>
              <el-col :span="18">{{ item.quesText }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!--干预体验课方案-->
      <div class="top-List">
        <h4>干预体验课方案</h4>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="4">素材及内容描述：</el-col>
              <el-col :span="18">{{ descriptionText }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--准备体验的错误知识点-->
        <el-row v-for="(item,index) in readyWrongObj" :key="3">
          <el-col :span="24">
            <el-row>
              <el-col :span="4">准备体验的错误知识点{{ index+1 }}：</el-col>
              <el-col :span="18">{{ item.wrongPoint }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--所解决的学习习惯问题-->
        <el-row v-for="(item,index) in soleHabitObj" :key="4">
          <el-col :span="24">
            <el-row>
              <el-col :span="4">所解决的学习习惯问题{{ index+1 }}：</el-col>
              <el-col :span="18">{{ item.habitText }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--所解决的学习能力问题-->
        <el-row v-for="(item,index) in soleAbilityObj" :key="5">
          <el-col :span="24">
            <el-row>
              <el-col :span="4">所解决的学习能力问题{{ index+1 }}：</el-col>
              <el-col :span="18">{{ item.abilityText }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--底部基础数据-->
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">所需时间：</el-col>
              <el-col :span="14">{{ form.time }}小时</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">对应提高分数：</el-col>
              <el-col :span="14">{{ form.improveScore }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">出门考题量：</el-col>
              <el-col :span="14">{{ form.examQuesNum }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">达标分数：</el-col>
              <el-col :span="14">{{ form.upScore }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="addBtn" style="text-align:center">
        <el-button @click="goBack" type="primary">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "goBack",
    data() {
      return {
        subjectsObj:this.commonSubject,
        gradesObj:this.commonGrond,
        descriptionText:"素材及内容描述素材及内容描述", //描述
        /*错误题型及数量参数*/
        wrongTypeObj:[],
        /*错误知识点*/
        WrongPointObj:[],
        /*试卷分析出的答题习惯问题*/
        paperAnsQuesObj:[],
        /*试卷分析出的学习能力问题*/
        paperAnsStudyObj:[],
        /*准备体验的错误知识点*/
        readyWrongObj:[],
        /*所解决的学习习惯问题*/
        soleHabitObj:[],
        /*所解决的学习能力问题*/
        soleAbilityObj:[],
        /*提交参数*/
        form: {
          subjectCode:1, //学科code
          gradeCode:11, //学年code
          teacherName: "小丰", //教师名字
          wlSub: 1, //文理科
          paperScore: "100", //试卷满分
          studentScore: "88", //学生分数
          quesNum: "5", //试卷总题数
          wrongNum: "10", //答错题数
          time:"10", //所需时间
          improveScore:"20", //对应提高分数
          examQuesNum:"30", //出门考题量
          upScore:"60", //达标分数
        }
      };
    },
    created() {
      this.getEditData()
    },
    methods: {
      /*编辑回显*/
      getEditData:function(){
        var $this = this;
        var obj = {
          trainingPreparationId:$this.$route.query.id
        }
        this.$axios
          .post("/preparation/getPreparation", obj)
          .then(res => {
            if(res.code=="000000"){
              $this.editData = res.result
              $this.form.subjectCode = $this.editData.subjectCode;
              $this.form.gradeCode = $this.editData.gradeCode;
              $this.form.teacherName = $this.editData.teacherName;
              $this.form.wlSub = String($this.editData.artType);
              $this.form.paperScore = $this.editData.fullScore;
              $this.form.studentScore = $this.editData.score;
              $this.form.quesNum = $this.editData.paperQuestionNum;
              $this.form.wrongNum = $this.editData.wrongQuestionNum;
              var program = JSON.parse($this.editData.program)
              $this.form.time = program.time;
              $this.form.improveScore = program.score;
              $this.form.examQuesNum = program.total;
              $this.form.upScore = program.complianceScore;
              $this.descriptionText = program.description;
              $this.readyWrongObj = [];
              $this.soleHabitObj = [];
              $this.soleAbilityObj = [];
              /*准备体验的错误知识点*/
              for(var i = 0;i<program.wrongKnowledgePoint.length;i++){
                $this.readyWrongObj[i] = {
                  wrongPoint:program.wrongKnowledgePoint[i]
                }
              }
              /*所解决的学习习惯问题*/
              for(var i = 0;i<program.learningHabits.length;i++){
                $this.soleHabitObj[i] = {
                  habitText:program.learningHabits[i]
                }
              }
              /*所解决的学习能力问题*/
              for(var i = 0;i<program.learningAbility.length;i++){
                $this.soleAbilityObj[i] = {
                  abilityText:program.learningAbility[i]
                }
              }
              $this.paperAnsQuesObj = [];
              $this.paperAnsStudyObj =[];
              var answeringHabit = JSON.parse($this.editData.answeringHabit);
              var learningAbility = JSON.parse($this.editData.learningAbility);
              /*试卷分析出的答题习惯问题*/
              for(var i = 0;i<answeringHabit.length;i++){
                $this.paperAnsQuesObj[i] = {
                  quesText:answeringHabit[i]
                }
              }
              /*试卷分析出的学习能力问题*/
              for(var i = 0;i<learningAbility.length;i++){
                $this.paperAnsStudyObj[i] = {
                  quesText:learningAbility[i]
                }
              }
              /*错误题型及数量参数*/
              $this.wrongTypeObj = JSON.parse($this.editData.wrongQuestionsType)
              /*错误知识点*/
              $this.WrongPointObj = JSON.parse($this.editData.wrongKnowledgePoint)
            }else{
              this.$message({
                type: 'warning',
                message: "获取训练准备信息失败"
              });
            }

          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'warning',
              message: "获取训练准备信息失败"
            });
          });
      },
      /*返回*/
      goBack:function(){
        this.$router.push({path: '/abilityReady'})
      },
    },
      mounted() {

      },
  }
</script>
<style type="text/css" lang="scss" scoped>
  .showAbilityReady-content{
    padding-bottom:100px;
    .addBtn{
      margin-top:20px;
    }
    h4{
      margin:20px 0;
    }
    .top-List{
      border-bottom:1px solid #999;
    }
    .el-row {
      .el-row {
        padding-bottom: 26px;
      }
    }
  }

</style>
