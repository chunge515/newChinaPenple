<template>
    <div class="content-wrap">
<!--       <commonTitle :ifBack="true">
        增加用户
      </commonTitle> -->
      <breadCrumb :breadcrumb="breadcrumb" />
      <template>
        <el-radio v-model="idItem" label="13">教务</el-radio>
        <el-radio v-model="idItem" label="14">教研</el-radio>
      </template>
      <el-row style="margin:10px 0">
        姓名：<el-input v-model="userName" placeholder="请输入姓名" style="width:200px"></el-input>
      </el-row>
      <el-row v-if="idItem==14">
        学科： <el-select v-model="subjectCode" placeholder="请选择">
        <el-option
          v-for="item in subjectList"
          value-key="item.dataId"
          :label="item.dataName"
          :value="item.dataId">
        </el-option>
      </el-select>
      </el-row>
      <el-row>
        <el-button type="primary" style="margin-top:20px;" @click="addUser">{{textItem}}</el-button>
      </el-row>
    </div>



</template>
<script>
export default {
  props:['breadcrumb'],
  data() {
    return {
      idItem:"",
      userName:"",
      textItem:"添加用户",
      subjectList: [],
      subjectCode: ''
    }
  },
  created() {
    this.getSubjectList();
  },
  filters:{

  },
  methods: {
    getSubjectList(){
      var $this = this;
      this.$axios
        .post("/groupManager/getDataDictionaryList", { dataType: 1 })
        .then(res => {
          $this.subjectList = res.result;
          $this.subjectList.unshift({
            "dataIden":"",
            "dataName":"请选择"
          })
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: "获取学科列表失败"
          });
        });
    },
    /*添加用户*/
    addUser(){
      if(this.checkData()){
        var obj = {
          "userName":this.userName,
          "userType":this.idItem,
          "schoolCode":this.localData.get("userInfo").qualitySchoolCode,
          "schoolName":this.localData.get("userInfo").qualitySchoolName,
        }
        if(this.idItem==14){
          obj.subjectCode = this.subjectCode
        }
        this.$axios
          .post("/agency/user/register", obj)
          .then(res => {
            if(res.httpCode==200){
              this.$message({
                type: 'info',
                message: "添加用户成功"
              });
              // if(this.idItem ==13){
              //   this.$router.push({path: '/schoolAdmin/eduMangeList'})
              // }else if(this.idItem ==14){
              //   this.$router.push({path: '/schoolAdmin/teaResearchList'})
              // }
            }else{
              this.$message({
                type: 'info',
                message: "添加用户失败"
              });


            }

          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "添加用户失败"
            });
          });
      }

    },
    checkData(){
      if(!this.idItem){
        this.$message({type: 'info', message: "请先选择添加人员类型"});
        return false
      }
      if(!this.userName){
        this.$message({type: 'info', message: "请填写用户姓名"});
        return false
      }
      if(this.idItem==14&&!this.subjectCode){
        this.$message({type: 'info', message: "请选择用户学科"});
        return false
      }
      return true
    }
  },
  watch:{
    idItem:function () {
      if(this.idItem==13){
        this.textItem = "添加教务"
      }
      else if(this.idItem==14){
        this.textItem = "添加教研"
      }
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .slt_typesearch{
    width:80px;
  }
  .searchWrap{
    margin-left:20px;
  }
  .nav-list{
    margin:20px;
  }
  .sortSpan{
    cursor: pointer;
    float: right;
  }
  .el-pagination{
    text-align: center;
    margin-top:20px;
  }
  .radio-wrap{
    text-align: center;
  }
  .btn-wrap{
    margin-top:26px;
    text-align: right;
  }
</style>
