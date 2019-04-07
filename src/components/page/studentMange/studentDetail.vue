<template>
  <div>
    <commonTitle>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item to="/studentMange">学生管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生查看</el-breadcrumb-item>
      </el-breadcrumb>
    </commonTitle>
    <div class="stu-body">
      <el-row v-if="tmpUserInfo">
        <el-col :span="8">
          <el-row>
            <el-col :span="9">学生姓名：</el-col>
            <el-col :span="15">{{tmpUserInfo.realname }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">学生性别：</el-col>
            <el-col :span="15">{{tmpUserInfo.sex| sexFilter }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">学生年级：</el-col>
            <el-col :span="15">{{commonGrond[tmpUserInfo.gradeCode]}}</el-col>
          </el-row>
        </el-col>

        <el-col :span="8">
          <el-row>
            <el-col :span="9">学校：</el-col>
            <el-col :span="15">{{tmpUserInfo.schoolName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">家长手机号：</el-col>
            <el-col :span="15">{{tmpUserInfo.parentMobile}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">年龄：</el-col>
            <el-col :span="15">{{tmpUserInfo.age}}</el-col>
          </el-row>
        </el-col>

        <el-col :span="8">
          <el-row>
            <el-col :span="9">所属书院：</el-col>
            <el-col :span="15">{{tmpUserInfo.seowonName}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">文理科：</el-col>
            <el-col :span="15">{{subjectTypeObj[tmpUserInfo.artType]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">是否独生子女：</el-col>
            <el-col :span="15">{{tmpUserInfo.isSingle=="0"?"否":"是"}}</el-col>
          </el-row>
        </el-col>

        <el-col :span="8">
          <el-row>
            <el-col :span="9">最好学科：</el-col>
            <el-col :span="15">{{commonSubject[tmpUserInfo.bestSubjectCode] }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">最好学科分数：</el-col>
            <el-col :span="15">{{tmpUserInfo.bestSubjectMark }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">最差学科：</el-col>
            <el-col :span="15">{{commonSubject[tmpUserInfo.worstSubjectCode] }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">最差学科分数：</el-col>
            <el-col :span="15">{{tmpUserInfo.worstSubjectMark}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="16">
          <el-row>
            <el-col :span="5">成绩最差原因：</el-col>
            <el-col :span="15">{{tmpUserInfo.worstSubjectReason}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">最近一次成绩总分：</el-col>
            <el-col :span="15">{{tmpUserInfo.recentExamTotalMark}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">学生年级排名：</el-col>
            <el-col :span="15">{{tmpUserInfo.gradeTop}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">学生班级排名：</el-col>
            <el-col :span="15">{{tmpUserInfo.classTop}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">周末补课情况：</el-col>
            <el-col :span="15"><span v-for="(item,index) in tmpUserInfo.tutorialSubjectCodes" :key="index">{{commonSubject[item]}}、</span></el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">平时晚上几点放学：</el-col>
            <el-col :span="15">{{commenstuTime[tmpUserInfo.leaveSchoolTime]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">几点开始写作业：</el-col>
            <el-col :span="15">{{commenstuTime[tmpUserInfo.doHomeworkTime]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">几点休息：</el-col>
            <el-col :span="15">{{commenstuTime[tmpUserInfo.restTime]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">学习姿势是否端正：</el-col>
            <el-col :span="15">{{tmpUserInfo.rightPosture | isF}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">不好的学习习惯：</el-col>
            <el-col :span="15"><span v-for="(item,index) in tmpUserInfo.badStudyHabbits" :key="index">{{commeHabbits[item]}}、</span></el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">孩子有哪些兴趣爱好/特长：</el-col>
            <el-col :span="15">{{tmpUserInfo.hobby}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">作业是否需要督促：</el-col>
            <el-col :span="15">{{tmpUserInfo.superviseHomework | isF}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">孩子个性：</el-col>
            <el-col :span="15" v-if="tmpUserInfo.personality=='1'">外向</el-col>
            <el-col :span="15"v-if="tmpUserInfo.personality=='0'">内向</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">是否愿意与父母交流：</el-col>
            <el-col :span="15">{{tmpUserInfo.talkWithParent | isF}}</el-col>
          </el-row>
        </el-col><el-col :span="8">
        <el-row>
          <el-col :span="9">身体素质是否良好：</el-col>
          <el-col :span="15" v-if="tmpUserInfo.healthy">是</el-col>
          <el-col :span="15" v-else>{{tmpUserInfo.healthyDesc}}</el-col>
        </el-row>
      </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">是否叛逆：</el-col>
            <el-col :span="15">{{tmpUserInfo.rebelious | isF}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">考试成绩：</el-col>
            <el-col :span="15"><span v-for="item in tmpUserInfo.preSubjectExamMarks" :key="item.subjectCode" v-if="item.score || item.score=='0'">{{item.subjectName}}（{{item.score}}）、</span></el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">中考选哪三科：</el-col>
            <el-col :span="15"><span v-for="(item,index) in tmpUserInfo.chooseSubjectCodes" :key="index">{{commonSubject[item]}}、</span></el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
        <el-row>
          <el-col :span="9">目标学校：</el-col>
          <el-col :span="15">{{tmpUserInfo.dreamSchool}}</el-col>
        </el-row>
      </el-col>
        <el-col :span="8">
        <el-row>
          <el-col :span="9">目标专业：</el-col>
          <el-col :span="15">{{tmpUserInfo.dreamSpecialty}}</el-col>
        </el-row>
      </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">是否有把握实现目标：</el-col>
            <el-col :span="15">{{tmpUserInfo.dreamActualization | isF}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="9">对学生初始评价：</el-col>
            <el-col :span="15">{{commenFirstParent[tmpUserInfo.studentRemark]}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :span="3">备注：</el-col>
            <el-col :span="15">{{tmpUserInfo.remark}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="childs" :gutter="24">
        <el-col :span="4" class="routers">
          <ul>
            <li v-for="item in routers" :class="{'active':item.index == activeIndex}" v-if="item.i==item.index"
                @click="changeList(item,item.query)" :key="item.i">{{item.name}}
            </li>
          </ul>
        </el-col>
        <el-col :span="20">
          <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import moment from "moment"
  export default {
    name: "goBack",
    data() {
      return {
        activeIndex: 1, //当前被选中的下标
        readys: 2, //提前请求数
        routers: [],
        stages: [],
        grades: [],
        //当前学生的信息
        tmpUserInfo:null,
      };
    },
    props: {},
    methods: {
      //获取学生详情
      getStudentInfo(cfg) {
        var _this = this;
        this.$axios.post("user/getStudent", {userId: _this.tmpUserInfo.userId}).then(res => {
          if (res.code == "000000") {
            localStorage.setItem("tmpStudentInfo", JSON.stringify(res.result));
            var obj=res.result;
            console.log('111')
            obj.tutorialSubjectCodes=JSON.parse(obj.tutorialSubjectCodes) ||[]
            obj.badStudyHabbits=JSON.parse(obj.badStudyHabbits)||[]
            obj.chooseSubjectCodes=JSON.parse(obj.chooseSubjectCodes) ||[]
            obj.preSubjectExamMarks=JSON.parse(obj.preSubjectExamMarks) ||[];
            _this.tmpUserInfo = obj;
            console.log(obj.tutorialSubjectCodes,"===")
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取学段
      getStages(obj, cfg) {
        var _this = this;
        this.$ajax.getStages().then(res => {
          if (res.code == "000000") {
            _this.stages = res.stages;
          } else {
            _this.$message.error(res.message || '请求出错');
          }
          cfg && cfg.done && cfg.done();
        }).catch(e => {
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取学年
      getGrades(obj, cfg) {
        var _this = this;
        this.$ajax.getGradesByStage(obj).then(res => {
          if (res.code == "000000") {
            localStorage.setItem("tmpgrades",JSON.stringify(res.grades));
            _this.grades = res.grades;
          } else {
            _this.$message.error(res.message || '请求出错');
          }
          cfg && cfg.done && cfg.done();
        }).catch(e => {
          _this.$message.error(e.message || '请求出错');
        })
      },
      //点击左侧路由实现跳转
      changeList(val, data) {
        this.activeIndex = val.index;
        if (data) {
          this.$router.push({path: val.path, query: data});
        } else {
          this.$router.push({path: val.path});
        }
      },
      //通过路由下标跳转
      jumpByI(i, data) {
        var val;
        for (var j = 0; j < this.routers.length; j++) {
          if (this.routers[j].i == i) {
            val = this.routers[j];
            break;
          }
        }
        this.changeList(val || this.routers[0], data || val.query);
      },
      //初始化路由和学生信息
      initStudent(val) {
        this.readys--;
        if (this.readys > 0) return;
        var _this = this;
        _this.getStudentInfo();
        if (val.activeIndex) {
          _this.activeIndex = val.activeIndex;
        } else {
          _this.changeList(val, val.query)
        }
      }
    },
    mounted() {
      this.tmpUserInfo = JSON.parse(localStorage.getItem("tmpStudentInfo"));
      delete this.tmpUserInfo.courses
      var routers = [
        {
          i: 1,
          name: "学习能力测评预约表",
          index: 1,   //被选中的左侧栏序号
          path: "/abilityTestSubscribe",
        },
        {
          i: 2,
          name: "学习能力提升干预体验登记表",
          index: 2,
          path: "/abilityImprovIntervExp",
        },
        {
          i: 3,
          name: "学习能力干预训练准备表",
          index: 3,
          path: "/abilityReady",
        },
        {
          i: 4,
          name: "学生行为习惯记录表",
          index: 4,
          path: "/habit",
          query: {type: 2}
        },
        {
          i: 5,
          name: "一次试听记录表",
          index: 5,
          path: "/editAudition",
        },
        {
          i: 6,
          name: "二次试听记录表",
          index: 6,
          path: "/editAuditionT",
        },
        {
          i: 7,
          name: "三次试听记录表",
          index: 7,
          path: "/editAuditionB",
          query:{type:3}
        },
        {
          i: 8,
          name: "入学登记表",
          index: 8,
          path: "/startSchool",
        },
        {
          i: 6001,
          name: "添加学生",
          index: 6,
          path: '/addStuHabit'
        },
      ];
      this.routers = routers;
      var _this = this;
      var val = {};
      var current = _this.$router.history.current;
      for (var j = 0; j < routers.length; j++) {
        if (current.path.indexOf(routers[j].path) >= 0) {
          val.activeIndex = routers[j].index;
          val.i = routers[j].i;
          if (current.query && routers[j].query && current.query.type == routers[j].query.type) {
            break;
          } else if (!current.query) {
            break;
          }
        }
      }
      if (val.activeIndex==null) val = routers[0];
      this.getGrades({stageCode: _this.tmpUserInfo.stageCode}, {
        done: function () {
          _this.initStudent(val);
        }
      });
      this.getStages(null, {
        done: function () {
          _this.initStudent(val);
        }
      });
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
            return "";
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
