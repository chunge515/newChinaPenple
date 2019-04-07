<!--考试成绩记录表 新增、编辑-->
<template>
  <div class="archiveRecordsDetail padTop20">
    <el-row>
      <el-col :span="18">
        <el-row class="gap-bottom">
          <el-col :span="4">考试时间：</el-col>
          <el-col :span="20">{{info.examinationDate | timeFormat("YYYY-MM-DD HH:mm:ss")}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">考试科目：</el-col>
          <el-col :span="20">{{subjectsObj[info.subjectCode]}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">文理科：</el-col>
          <el-col :span="20" v-if="info.artType==1">文科</el-col>
          <el-col :span="20" v-if="info.artType==2">理科</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">考试类型：</el-col>
          <el-col :span="20">{{info.examinationType}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">年级：</el-col>
          <el-col :span="20">{{gradesObj[info.gradeCode]}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">题目数量：</el-col>
          <el-col :span="20">{{info.paperQuestionNum}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">试卷满分：</el-col>
          <el-col :span="20">{{info.fullScore}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">试卷得分：</el-col>
          <el-col :span="20">{{info.score}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">监考人：</el-col>
          <el-col :span="20">{{info.teacherName}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">试卷难度：</el-col>
          <el-col :span="20">{{info.difficultCode}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">考试范围：</el-col>
          <el-col :span="20">{{info.examinationRange}}</el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">图片：</el-col>
          <el-col :span="20">
            <img :src="item"  v-for="item in info.picture" class="imgBox"  @click="picLook(item)">
          </el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">报告：</el-col>
          <el-col :span="20"><span @click="downPdf()">{{report.name}}</span></el-col>
        </el-row>
        <el-row class="gap-bottom">
          <el-col :span="4">备注说明：</el-col>
          <el-col :span="20">{{info.remark}}</el-col>
        </el-row>
      </el-col>
      <el-col class="text-center" :span="24" style="margin-bottom: 10px;">
        <el-button type="primary" @click="$router.go(-1)" class="addBtn">返回</el-button>
      </el-col>
    </el-row>
   <!-- <el-form ref="form" :model="form" label-width="90px">


      <el-col class="text-center" :span="24">
        <el-button type="default" plain @click="back" class="addBtn">取消</el-button>
        <el-button type="primary" @click="save" class="addBtn">保存</el-button>
      </el-col>

    </el-form>-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    name: "archive-records-add",
    data() {
      return {
        subjectsObj:this.commonSubject,
        gradesObj:this.commonGrond,
        artTypes: [],
        subjects: [],
        grades: [],
        tmpUserInfo: null,
        info:{},
        userId:'',
        report:{},
        dialogVisible: false,
        dialogImageUrl:'',//图片框
      }
    },
    created() {
      this.artTypes = $.extend({},this.subjectTypeObj);
      var query = this.$router.history.current.query;
      this.tmpUserInfo = JSON.parse(localStorage.getItem("tmpStudentInfo"));
      console.log(query)
      this.userId = this.tmpUserInfo.userId;
     /* this.getGrades({stageCode: this.tmpUserInfo.stageCode});
      this.getSubjects();*/
      if(query.id){
        this.getDetail({examinationRecordId: query.id});
      }
    },
    methods: {
      //图片框
      picLook(item){
        this.dialogImageUrl =item;
        this.dialogVisible = true;
      },
      //获取详细信息
      getDetail(obj) {
        var _this = this;
        this.$axios.post("examinationRecord/getExaminationRecord", obj).then(res => {
          if (res.code == "000000") {
           /* res.result.difficultCode = res.result.difficultCode+"";
            res.result.artType = res.result.artType+"";*/
            _this.info = res.result;
            _this.info.picture =JSON.parse(res.result.picture)  ||[];
            _this.report = JSON.parse(res.result.report) ||{};

          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.$message.error(e.message || '请求出错');
        })
      },
      downPdf(){
        window.location.href = this.report.url
       // window.open(this.report.url, '_blank');
      }
    },
    filters: {
      //时间格式化
      timeFormat(v, f) {
        return v && moment(v).format(f) || v || "";
      },
    },
  }
</script>
<style type="text/css" lang="scss">
  .archiveRecordsAdd {

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
    line-height:22px;
    padding-bottom:10px;
    span{
      cursor: pointer;
      color: #1DA4DE;
    }
    .imgBox{
      width:150px;
      height:150px;
      margin:0 10px 10px 0;
    }
  }

  .text-center {
    text-align: center;
  }
</style>
