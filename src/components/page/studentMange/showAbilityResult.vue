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
      <!--学习行为问题-->
      <div class="top-List">
        <h4>学习行为问题</h4>
        <el-row v-for="(item,index) in studyActiveObj" :key="index">
          <el-col :span="16">
            <el-row>
              <el-col :span="1">{{ index+1 }}、 </el-col>
              <el-col :span="19">{{ item.problem }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">所需时间：</el-col>
              <el-col :span="14">{{ item.hour }} 小时</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">提升分数：</el-col>
              <el-col :span="14">{{ item.score }}分</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!--思维惯性问题-->
      <div class="top-List">
        <h4>思维惯性问题</h4>
        <el-row v-for="(item,index) in thinkActiveObj" :key="index">
          <el-col :span="16">
            <el-row>
              <el-col :span="1">{{ index+1 }}、 </el-col>
              <el-col :span="19">{{ item.problem }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">所需时间：</el-col>
              <el-col :span="14">{{ item.hour }} 小时</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">提升分数：</el-col>
              <el-col :span="14">{{ item.score }}分</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!--学习能力短板-->
      <div class="top-List">
        <h4>学习能力短板</h4>
        <el-row v-for="(item,index) in studyAbilityObj" :key="index">
          <el-col :span="16">
            <el-row>
              <el-col :span="1">{{ index+1 }}、 </el-col>
              <el-col :span="19">{{ item.problem }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">所需时间：</el-col>
              <el-col :span="14">{{ item.hour }} 小时</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">提升分数：</el-col>
              <el-col :span="14">{{ item.score }}分</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!--基础知识短板-->
      <div class="top-List">
        <h4>基础知识短板</h4>
        <el-row v-for="(item,index) in pointObj" :key="index">
          <el-col :span="16">
            <el-row>
              <el-col :span="1">{{ index+1 }}、 </el-col>
              <el-col :span="19">{{ item.problem }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">所需时间：</el-col>
              <el-col :span="14">{{ item.hour }} 小时</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="10">提升分数：</el-col>
              <el-col :span="14">{{ item.score }}分</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div class="top-List">
        <h4>学科提升建议</h4>
        <el-table
          :data="tableDataItem"
          style="width: 100%;margin:20px 0"
          border>
          <el-table-column
            prop="text"
            label="目标提升"
            width="260">
            <template slot-scope="scope">
              <span>{{ tableTextObj[scope.row.sort] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="hour"
            label="所需时间（小时）"
            width="">
          </el-table-column>
          <el-table-column
            prop="score"
            label="提升分数（分）">
          </el-table-column>
        </el-table>
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
        /*学习行为问题*/
        studyActiveObj:[],
        /*思维惯性问题*/
        thinkActiveObj:[],
        /*学习能力短板*/
        studyAbilityObj:[],
        /*基础知识短板*/
        pointObj:[],
        /*提交参数*/
        form: {
          subjectCode:1, //学科code
          gradeCode:11, //学年code
          teacherName: "小丰", //教师名字
          wlSub: 1, //文理科
        },
        tableTextObj:{
          "0":"基础知识短板补齐",
          "1":"学习习惯调整",
          "2":"学习能力提升",
          "3":"学习方法获得",
          "4":"熟化训练",
          "5":"模拟考试",
          "100":"总用时/总提升分数",
        },
        tableDataItem: []

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
          trainingFeedbackId:$this.$route.query.id
        }
        this.$axios
          .post("/feedback/getFeedback", obj)
          .then(res => {
            if(res.code=="000000"){
              $this.editData = res.result;
              $this.form.subjectCode = $this.editData.subjectCode;
              $this.form.gradeCode = $this.editData.gradeCode;
              $this.form.teacherName = $this.editData.teacherName;
              $this.form.wlSub = String($this.editData.artType);
              $this.studyActiveObj = JSON.parse($this.editData.behavioralProblem)
              $this.thinkActiveObj = JSON.parse($this.editData.inertiaProblem)
              $this.pointObj = JSON.parse($this.editData.lackOfKnowledge)
              $this.tableDataItem = JSON.parse($this.editData.promotionSuggestion)
              $this.studyAbilityObj = JSON.parse($this.editData.shortcomingsOfAbility)
            }else{
              this.$message({
                type: 'warning',
                message: "获取训练反馈信息失败"
              });
            }

          })
          .catch(err => {
            console.log(err)
            this.$message({
              type: 'warning',
              message: "获取训练反馈信息失败"
            });
          });
      },
      /*返回*/
      goBack:function(){
        this.$router.push({path: '/abilityResult'})
      },
    },
      mounted() {

      },
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
