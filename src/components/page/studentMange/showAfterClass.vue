<template>
  <div>
    <!--<commonTitle>-->
      <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
        <!--<el-breadcrumb-item>人员管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item to="/studentMange">学生管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>学生查看</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</commonTitle>-->
    <div class="showAbilityReady-content padTop20">
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
              <!--<el-col :span="14"> {{ form.artType==1 ? '文科':'理科'}}</el-col>-->
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
              <el-col :span="10">学年：</el-col>
              <el-col :span="14">{{ gradesObj[form.gradeCode] }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <h3 style="margin-bottom:20px;">学生出现问题及调整所需时间</h3>
      <!--干预流程反思-->
      <div class="top-List">
        <h4>干预流程反思</h4>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">导师未做到的步骤 </el-col>
              <el-col :span="18">{{ form.teacherNotDoneProcedure }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">未做到的原因 </el-col>
              <el-col :span="18">{{ form.teacherNotDoneReason }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!--干预结果反思-->
      <div class="top-List">
        <h4>干预结果反思</h4>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">学生有进步的部分 </el-col>
              <el-col :span="18">{{ form.studentIncreasedSection }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">学生未提高的部分 </el-col>
              <el-col :span="18">{{ form.studentIncreasingSection }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">导师有进步的部分 </el-col>
              <el-col :span="18">{{ form.teacherIncreasedSection }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">导师未提高的部分 </el-col>
              <el-col :span="18">{{ form.teacherIncreasingSection }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!--改进方案-->
      <div class="top-List">
        <h4>改进方案</h4>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">导师改进方案 </el-col>
              <el-col :span="18">{{ form.teacherImprovePlan }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">学生改进方案 </el-col>
              <el-col :span="18">{{ form.studentImprovePlan }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="5">备注 </el-col>
              <el-col :span="18">{{ form.remark }}</el-col>
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
        /*提交参数*/
        form: {
          subjectCode:"1", //学科code
          gradeCode:"", //学年code
          teacherName: "小丰", //教师名字
          artType: "", //文理科
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
        id:''
      };
    },
    props: {},
    methods: {
      /*返回*/
      goBack:function(){
        this.$router.go(-1)
      },
    },
      mounted() {
      var $this=this;
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
      }
  }
</script>
<style type="text/css" lang="scss" scoped>
  .showAbilityReady-content{
    padding-bottom:20px;
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
