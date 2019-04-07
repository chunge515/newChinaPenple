<template>
  <div class="editAuditionBox padTop20">
    <div class="stu-body">
      <el-row v-if="tmpUserInfo">
        <el-col :span="8">
          <el-row>
            <el-col :span="9">预约到场时间：</el-col>
            <el-col :span="15">{{auditionRecordObj.appointmentDatetime }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">是否进行测评：</el-col>
            <el-col :span="15">{{auditionRecordObj.hasAssessment=="0"?"否":"是"}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">是否进行家长测评：</el-col>
            <el-col :span="15">{{auditionRecordObj.parentAssessment=="0"?"否":"是"}}</el-col>
          </el-row>
        </el-col>

        <el-col :span="8">
          <el-row>
            <el-col :span="9">一次试听干预导师：</el-col>
            <el-col :span="15">{{auditionRecordObj.serviceTutorialName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">是否完成一次试听：</el-col>
            <el-col :span="15">{{auditionRecordObj.hasComplete=="0"?"否":"是"}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="3">测评结果：</el-col>
            <el-col :span="21">
              <span v-for="(item,index) in auditionRecordObj.assessmentResult" :key="index" v-if="item.score" style="margin-right: 10px">{{item.subjectName}}：{{item.score}}</span>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12">
          <el-row>
            <el-col :span="6">用户意向等级：</el-col>
            <el-col :span="18">{{auditionRecordObj.intentionLevel}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">一次试听反馈：</el-col>
            <el-col :span="18" v-if="auditionRecordObj.auditionFeedbackState!='1'">{{commeBackState[auditionRecordObj.auditionFeedbackState]}}</el-col>
            <el-col :span="18" v-else>{{auditionRecordObj.auditionFeedbackReason}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="3">一次试听科目及内容：</el-col>
            <el-col :span="21">
              <p>{{commonSubject[auditionRecordObj.auditionSubjectCode] }}</p>
              <p>{{auditionRecordObj.auditionContent}}</p>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="24">
          <el-row>
            <el-col :span="3">方案咨询结果记录：</el-col>
            <el-col :span="21">{{auditionRecordObj.schemeAdviceResult}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24"><h5>一次试听学生反馈</h5></el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">干预训练素材难度：</el-col>
            <el-col :span="18">{{commeDifficulty[auditionRecordObj.studentFeedbackDifficulty]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">对干预训练方法接受程度：</el-col>
            <el-col :span="18">{{commeAccept[auditionRecordObj.studentFeedbackAccept] }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">上课过程中：</el-col>
            <el-col :span="18">{{commeThink[auditionRecordObj.studentFeedbackThink]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">本次干预效果：</el-col>
            <el-col :span="18">{{commeEffect[auditionRecordObj.studentFeedbackEffect]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="3">备注：</el-col>
            <el-col :span="21">{{auditionRecordObj.studentFeedbackRemark}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24"><h5>一次试听教师评价</h5></el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">学生的学习习惯：</el-col>
            <el-col :span="18">{{commeHabit[auditionRecordObj.teacherAssessmentStudyHabit]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">学生对干预方法的适应程度：</el-col>
            <el-col :span="16">{{commeTeaAdapt[auditionRecordObj.teacherAssessmentMethodAdapt]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="4">学生有哪些不好的习惯：</el-col>
            <el-col :span="20"><span v-for="(item,index) in auditionRecordObj.teacherAssessmentBadHabits" :key="index">{{commeBadHabits[item]}}</span></el-col>
          </el-row><!---->
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="9">学生的学习方法：</el-col>
            <el-col :span="15">{{commeStudyMethod[auditionRecordObj.teacherAssessmentStudyMethod]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="9">学生的思维能力：</el-col>
            <el-col :span="15">{{commeAbility[auditionRecordObj.teacherAssessmentThinkAbility]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="9">知识掌握情况：</el-col>
            <el-col :span="15">{{commeKnowledge[auditionRecordObj.teacherAssessmentMasterKnowledge]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="3">备注：</el-col>
            <el-col :span="15">{{auditionRecordObj.teacherAssessmentRemark}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="addBtn">
        <el-button type="primary" @click="go()">编辑</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from "moment"
  export default {
    data() {
      return {
        //当前学生的信息
        tmpUserInfo:null,
        auditionRecordObj:{},
        type:'',
        commeHabit:{
          "1":'较好',
          "2":'一般',
          "3":'较差'
        },
        commeAdapt:{
          "1":'较好',
          "2":'一般',
          "3":'较差'
        },
        commeTeaAdapt:{
          "1":'非常适应',
          "2":'一般',
          "3":'勉强适应'
        },
        commeStudyMethod:{
          "1":'未掌握有效的学习方法',
          "2":'有方法但是一般',
          "3":'有有效的学习方法'
        },
        commeAbility:{
          "1":'需教师多次引导',
          "2":'需教师适当引导',
          "3":'思维敏捷,反应较快'
        },
        commeKnowledge:{
          "1":'基础知识掌握一般解决复杂问题有困难',
          "2":'基础知识扎实但解决复杂问题有困难',
          "3":'基础知识扎实能解决复杂问题'
        },
      };
    },
    props: {},
    methods: {
      //获取试听记录
      getStudentAuditionRecords(){
        var $this=this;
        var obj={
          studentId:$this.tmpUserInfo.userId,
          auditionNumber:1
        }
        this.$axios
          .post("/student/getStudentAuditionRecords",obj)
          .then(res => {
            if(res.code=="000000"){
              var result=res.result || [];
              if(result.length>0){
                var obj=result[0];
                obj.appointmentDatetime =  moment(obj.appointmentDatetime).format("YYYY-MM-DD HH:mm:ss");
                obj.assessmentResult = JSON.parse(obj.assessmentResult);
                obj.teacherAssessmentBadHabits = JSON.parse(obj.teacherAssessmentBadHabits);

                $this.auditionRecordObj=obj;
              }else{
                $this.$router.push({path:'/editAudition/add'})
              }

              // this.$router.push({path:"/studentMange"})
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
      },
      go(){
        this.localData.set('auditionRecordObj',this.auditionRecordObj)
        this.$router.push({path:'/editAudition/add',query:{edit:1}})
      },

    },
    mounted() {
      var $this=this;
      $this.tmpUserInfo = $this.localData.get('tmpStudentInfo');
      $this.getStudentAuditionRecords()

    },
    watch:{
      "$route": "getStudentAuditionRecords"
    },
    filters: {
      sexFilter(v) {
        switch (v) {
          case 0:
            return "女";
          case 1:
            return "男";
          default:
            return "";
        }
      },
      isF(v){
        switch (v) {
          case "0":
            return "否";
          case "1":
            return "是";
          default:
            return "未知";
        }
      },
      timeFilter(v,f){
        return v&&moment(v).format(f)||v;
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  .subBook{
    padding-right: 20px;
  }
  .stu-body {
    .el-row {
      .el-row {
        padding-bottom: 26px;
      }
    }
  }

  .childs {
    border-top: 1px solid #d6e1f1;
  }

  .routers {
    border-left: 1px solid #d6e1f1;
    border-right: 1px solid #d6e1f1;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    padding: 0 !important;
    ul {
      padding: 0;
    }
    li {
      border-bottom: 1px solid #d6e1f1;;
      padding: 16px 10px;
      cursor: pointer;
      &.active {
        background-color: #1DA4DE;
        color: #ffffff;
      }
    }
  }
</style>
<style type="text/css" lang="scss">
  .editAuditionBox{
    h5{
      font-size: 18px;
      font-weight: normal;
      line-height:40px;
      color: #f00;
      // border-bottom: 1px solid #ccc;
      margin-bottom:30px;
    }
    span{
      margin-right:10px;}
    .addBtn{
      margin-bottom:20px;
      text-align: center;
    }
  }
</style>
