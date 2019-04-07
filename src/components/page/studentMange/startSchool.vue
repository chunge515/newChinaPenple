<template>
  <div class="padTop20">

    <table>
      <tbody>
      <tr>
        <td colspan="2" class="partname">学生诊断情况</td>
      </tr>
      <tr>
        <td>日期：</td>
        <td>{{(detail.diagnosisDatetime||"").substr(0,10)}}</td>
      </tr>
      <tr>
        <td>诊断学科及分数：</td>
        <td>
          <div v-for="(d,i) in detail.diagnosisSubjectAndScores" :key="i" v-if="d.checked">{{d.subjectName}} 得分：{{d.score}}  满分：{{d.totalScore}}</div>
        </td>
      </tr>
      <tr>
        <td>是否参加干预体验：</td>
        <td>{{detail.partakeExperienceState==1?'是':'否'}}</td>
      </tr>
      <tr>
        <td>诊断考试类型：</td>
        <td>
          <span class="block" v-for="(d,i) in detail.diagnosisExaminationType" :key="i" v-if="d.checked">{{d.code<6 ? d.name:d.value}}</span>
        </td>
      </tr>
      <tr>
        <td>干预教师：</td>
        <td><span class="block" v-for="(d,i) in detail.interventionTutorials" :key="i" v-if="detail.partakeExperienceState==1&&d.checked">{{d.subjectName}} : {{d.teacherName}}</span></td>
      </tr>
      <tr>
        <td colspan="2" class="partname">学生报名情况</td>
      </tr>
      <tr>
        <td>所报学科及课时：</td>
        <td><span class="block" v-for="(d,i) in detail.signUpCourses" :key="i" v-if="d.checked">{{d.subjectName}} : {{d.value}}</span></td>
      </tr>
      <tr>
        <td>是否保分：</td>
        <td>{{detail.hasTargetScore==1 ? '是':'否'}}</td>
      </tr>
      <tr>
        <td>保分学科及分数：</td>
        <td><span class="block" v-for="(d,i) in detail.targetSubjectScores" :key="i" v-if="detail.hasTargetScore==1&&d.checked">{{d.subjectName}} {{d.score}}</span></td>
      </tr>
      <tr>
        <td>是否缴费：</td>
        <td>{{detail.paymentState==1?'是':'否'}}</td>
      </tr>
      <tr>
        <td>缴费金额：</td>
        <td><span v-if="detail.paymentState">{{detail.paymentAmount}}</span></td>
      </tr>
      <tr>
        <td>教学主管：</td>
        <td>{{detail.teachDirectorName}}</td>
      </tr>
      <tr v-show="ready" class="actions">
        <td colspan="2"><el-button type="primary" @click="edit">编辑</el-button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {},
    created() {

    },
    mounted() {
      this.user = this.localData.get('tmpStudentInfo');
      this.getList()
    },
    data() {
      return {
        detail:{},
        user:{},
        ready:false
      }
    },
    methods: {
      getList(){
        this.$axios.post("student/getStudentPaymentRecords",{pageNum:1,pageSize:1,userId:this.user.userId}).then(res=>{
          if(res.code =='000000'){
            if(res.result.length===0){
             this.edit();
              return ;
            }
            this.getDetail(res.result[0].recordId);
            return ;
          }
          this.$message({type:"error",message:"获取数据出错"})
        }).catch(e=>{
          this.$message({type:"error",message:"请求数据出错"})
        })
      },
      getDetail(recordId){
        this.$axios.post("student/getStudentPaymentRecord",{recordId:recordId}).then(res=>{
          if(res.code=="000000"&&res.result){

            res.result.diagnosisExaminationType = JSON.parse(res.result.diagnosisExaminationType);
            res.result.diagnosisSubjectAndScores = JSON.parse(res.result.diagnosisSubjectAndScores);
            res.result.interventionTutorials = JSON.parse(res.result.interventionTutorials);
            res.result.signUpCourses = JSON.parse(res.result.signUpCourses);
            res.result.targetSubjectScores = JSON.parse(res.result.targetSubjectScores);

            this.detail = res.result;
            this.ready=true;
            return
          }
          this.$message({type:"error",message:"获取数据出错"})
        }).catch(e=>{
          this.$message({type:"error",message:"请求数据出错"})
        })
      },
      edit(){
        let recordId = this.detail.recordId||undefined;
        this.$router.push({path:"/startSchool/add",query:{recordId:recordId}});
      }

    },
    computed: {},
    filters: {},
  }
</script>
<style lang="scss" scoped>
  tr{
    td{
      vertical-align: top;
      padding-bottom: 12px;
      line-height: 26px;
      &:first-child{
        text-align: right;
      }
      &:last-child{
        text-align: left;
        padding-left: 5px;
      }
      span.block{
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
    .partname{
      font-weight: bold;
      padding-bottom: 6px;
    }
    &.actions{
      text-align: center;
      td{
        text-align: center;
      }
    }
  }

</style>
<style lang="scss">

</style>
