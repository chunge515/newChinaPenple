<template>
   <div>
     <commonTitle>
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item>人员管理</el-breadcrumb-item>
         <el-breadcrumb-item to="/parentMange">家长管理</el-breadcrumb-item>
         <el-breadcrumb-item>查看家长</el-breadcrumb-item>
       </el-breadcrumb>
     </commonTitle>
     <div class="parentInfo">
       <el-row>
         <el-col :span="4">家长姓名</el-col>
         <el-col :span="20">{{parentInfo.realname}}</el-col>
       </el-row>
       <el-row>
         <el-col :span="4">手机号</el-col>
         <el-col :span="20">{{parentInfo.mobile}}</el-col>
       </el-row>
       <el-row>
         <el-col :span="4">关联孩子</el-col>
         <el-col :span="20">{{parentInfo.studentName || "无"}}</el-col>
       </el-row>
       <el-row>
         <el-col :span="4">与孩子的关系</el-col>
         <el-col :span="20">{{relationTypeObj[parentInfo.relationType]}}</el-col>
       </el-row>
       <el-row>
         <el-col :span="4">父母双方谁的陪伴较多</el-col>
         <el-col :span="20">{{relationTypeObj[parentInfo.whoAccompanyStudent]}}</el-col>
       </el-row>
       <el-row>
         <el-col :span="4">是否与孩子发生过争吵 </el-col>
         <el-col :span="20">{{parentInfo.quarrelWithChild | isF}}</el-col>
       </el-row>
       <el-row>
         <el-col :span="4">中考您希望孩子选哪三科</el-col>
         <el-col :span="20"><span v-for="item in parentInfo.hopeChildSubject"> {{ commonSubject[item] }}</span></el-col>
       </el-row>
       <el-row>
         <el-row>
           <el-col :span="4">家长是否接送孩子上学</el-col>
           <el-col :span="20">{{parentInfo.accompanyStudentToSchool | isF}}</el-col>
         </el-row>
         <el-row>
           <el-col :span="4">家长会一般谁参加</el-col>
           <el-col :span="20">{{relationTypeObj[parentInfo.whoAttendParentMeeting]}}</el-col>
         </el-row>
         <el-row>
           <el-col :span="4">每年教育支出</el-col>
           <el-col :span="20">{{commonPayObj[parentInfo.educationCostEveryYear]}}</el-col>
         </el-row>
         <el-row>
           <el-col :span="4">对家长初始评价</el-col>
           <el-col :span="20">{{commenFirstParent[parentInfo.parentRemark]}}</el-col>
         </el-row>
         <el-row>
           <el-col :span="4">推广员</el-col>
           <el-col :span="20">{{parentInfo.referrer || "无"}}</el-col>
         </el-row>
         <el-row>
           <el-col :span="3">服务导师</el-col>
           <el-col :span="20">{{parentInfo.tutorialName}}</el-col>
         </el-row>
         <el-col :span="4">备注</el-col>
         <el-col :span="20">{{parentInfo.remark}}</el-col>
       </el-row>
     </div>
     <div class="btn">
       <el-row>
         <el-button @click="goback()">返回</el-button>
       </el-row>
     </div>
     <el-dialog :visible.sync="dialogVisible">
       <img width="100%" :src="dialogImageUrl" alt="">
     </el-dialog>
   </div>
</template>

<script>
    export default {
        name: "parentDetail",
      data(){
        return{
          userId:null,
          dialogVisible: false,
          dialogImageUrl:'',//图片框
          parentInfo:{},
        }
      },
      methods:{
          //图片查看
        picLook(item){
          this.dialogImageUrl =item;
          this.dialogVisible = true;
        },
          //获取家长信息
        getParentInfo(){
          var _this = this;
          this.$axios.post("user/getParent", {userId: _this.userId}).then(res => {
            if (res.code == "000000") {
              _this.parentInfo = res.result;
            } else {
              _this.$message.error(res.message || '请求出错');
            }
          }).catch(e => {
            _this.$message.error(e.message || '请求出错');
          })
        },
        goback(){
          this.$router.push({path:"/parentMange"})
        }
      },
      created(){
       // this.tmpParentInfo = JSON.parse(localStorage.getItem("tmpParentInfo"));
        this.userId=this.$route.query.id;
        this.getParentInfo();
      },
      filters: {
        isF(v) {
          switch (v) {
            case "0":
              return "否";
            case "1":
              return "是";
            default:
              return "";
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .parentInfo{
    padding: 20px 10px;
    width: 70%;
  .el-row {
      padding-bottom: 30px;
    .el-col:first-child{
      min-width:192px;
    }
   }
  }
  .btn{
    padding: 30px 200px;
    .el-button{
      width:100px;
    }
  }
  .pic{
    width:120px;
    height:120px;
    margin:0 10px 10px 0;
  }
</style>
