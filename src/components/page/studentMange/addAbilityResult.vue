<template>
    <div class="addAbilityReady-content padTop20">
      <!--<commonTitle>-->
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
          <!--<el-breadcrumb-item>人员管理</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>学生管理</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>新增学生</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</commonTitle>-->
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="体验学科" prop="subjectCode">
                  <el-select v-model="form.subjectCode" placeholder="请选择"  value-key="id">
                    <el-option :label="item.subjectName" :value="item.subjectCode" v-for="item in subjectList" :key="item.subjectCode"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="教师姓名" prop="teacherName">
                  <el-input v-model.trim="form.teacherName" maxlength="10"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="学年" prop="gradeCode">
                  <el-select v-model="form.gradeCode" placeholder="请选择学科"  value-key="id">
                    <el-option :label="item.gradeName" :value="item.gradeCode" v-for="item in gradeList" :key="item.gradeCode"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-form-item label="文理科" prop="wlSub">
            <el-radio-group v-model="form.wlSub" >
              <el-radio label="1">文科</el-radio>
              <el-radio label="2">理科</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>


      <h3 style="margin-bottom:20px;">学生出现问题及调整所需时间</h3>
      <!--学习行为问题-->
      <el-row>
        <h4>学习行为问题</h4>
      </el-row>
      <div class="wrongQues-list">
        <el-row v-for="(item,index) in studyActiveObj" style="margin:20px 0;" :key="index">
          <el-col style="width:500px;margin-bottom:10px;">
            <el-col style="width:60px;">
              <label class="el-form-item__label notNull"  style="width:60px;">{{index+1}}、</label>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="studyActiveObj[index].problem" maxlength="50"></el-input>
              </div>
            </el-col>
          </el-col>
          <el-col style="width:220px;">
            <el-col style="width:80px;">
              <label class="el-form-item__label notNull"  style="width:80px;">所需时间</label>
            </el-col>
            <el-col style="width:100px">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="studyActiveObj[index].hour" type="number"></el-input>
              </div>
            </el-col>
            <el-col style="width:40px;">
              <label class="el-form-item__label" style="width:40px;text-align: left">小时</label>
            </el-col>
          </el-col>
          <el-col style="width:180px;">
            <el-col style="width:80px;">
              <label class="el-form-item__label notNull"  style="width:80px;">提升分数</label>
            </el-col>
            <el-col style="width:100px">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="studyActiveObj[index].score" type="number"></el-input>
              </div>
            </el-col>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="studyActiveObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,1)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,1)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--思维惯性问题-->
      <el-row>
        <h4>思维惯性问题</h4>
      </el-row>
      <div class="wrongQues-list">
        <el-row v-for="(item,index) in thinkActiveObj" style="margin:20px 0;" :key="index">
          <el-col style="width:500px">
            <el-col style="width:60px;margin-bottom:10px;">
              <label class="el-form-item__label notNull"  style="width:60px;">{{index+1}}、</label>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="thinkActiveObj[index].problem" maxlength="50"></el-input>
              </div>
            </el-col>
          </el-col>
          <el-col style="width:220px;">
            <el-col style="width:80px;">
              <label class="el-form-item__label notNull"  style="width:80px;">所需时间</label>
            </el-col>
            <el-col style="width:100px">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="thinkActiveObj[index].hour" type="number"></el-input>
              </div>
            </el-col>
            <el-col style="width:40px;">
              <label class="el-form-item__label" style="width:40px;text-align: left">小时</label>
            </el-col>
          </el-col>
          <el-col style="width:180px;">
            <el-col style="width:80px;">
              <label class="el-form-item__label notNull"  style="width:80px;">提升分数</label>
            </el-col>
            <el-col style="width:100px">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="thinkActiveObj[index].score" type="number"></el-input>
              </div>
            </el-col>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="thinkActiveObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,2)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,2)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--学习能力短板-->
      <el-row>
        <h4>学习能力短板</h4>
      </el-row>
      <div class="wrongQues-list">
        <el-row v-for="(item,index) in studyAbilityObj" style="margin:20px 0;" :key="index">
          <el-col style="width:500px">
            <el-col style="width:60px;margin-bottom:10px">
              <label class="el-form-item__label notNull"  style="width:60px;">{{index+1}}、</label>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="studyAbilityObj[index].problem" maxlength="50"></el-input>
              </div>
            </el-col>
          </el-col>
          <el-col style="width:220px;">
            <el-col style="width:80px;">
              <label class="el-form-item__label notNull"  style="width:80px;">所需时间</label>
            </el-col>
            <el-col style="width:100px">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="studyAbilityObj[index].hour" type="number"></el-input>
              </div>
            </el-col>
            <el-col style="width:40px;">
              <label class="el-form-item__label" style="width:40px;text-align: left">小时</label>
            </el-col>
          </el-col>
          <el-col style="width:180px;">
            <el-col style="width:80px;">
              <label class="el-form-item__label notNull"  style="width:80px;">提升分数</label>
            </el-col>
            <el-col style="width:100px">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="studyAbilityObj[index].score" type="number"></el-input>
              </div>
            </el-col>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="studyAbilityObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,3)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,3)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--基础知识短板-->
      <el-row>
        <h4>基础知识短板</h4>
      </el-row>
      <div class="wrongQues-list">
        <el-row v-for="(item,index) in pointObj" style="margin:20px 0;" :key="index">
          <el-col style="width:500px">
            <el-col style="width:60px;margin-bottom:10px">
              <label class="el-form-item__label notNull"  style="width:60px;">{{index+1}}、</label>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <el-input v-model.trim="pointObj[index].problem" maxlength="50"></el-input>
              </div>
            </el-col>
          </el-col>
          <el-col style="width:220px;">
            <el-col style="width:80px;">
              <label class="el-form-item__label notNull"  style="width:80px;">所需时间</label>
            </el-col>
            <el-col style="width:100px">
              <div class="grid-content bg-purple">
                <el-input v-model="pointObj[index].hour" type="number"></el-input>
              </div>
            </el-col>
            <el-col style="width:40px;">
              <label class="el-form-item__label" style="width:40px;text-align: left">小时</label>
            </el-col>
          </el-col>
          <el-col style="width:180px;">
            <el-col style="width:80px;">
              <label class="el-form-item__label notNull"  style="width:80px;">提升分数</label>
            </el-col>
            <el-col style="width:100px">
              <div class="grid-content bg-purple">
                <el-input v-model="pointObj[index].score" type="number"></el-input>
              </div>
            </el-col>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="pointObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,4)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,4)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--学科提升建议-->
      <el-row>
        <h4>学科提升建议</h4>
      </el-row>
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
          <template slot-scope="scope">
            <el-input v-model="scope.row.hour" type="number" @change="changeHour" v-if="scope.$index!=6"></el-input>
            <span v-if="scope.$index==6">{{scope.row.hour}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          label="提升分数（分）">
          <template slot-scope="scope">
            <el-input v-model="scope.row.score" type="number" @change="changeScore" v-if="scope.$index!=6"></el-input>
            <span v-if="scope.$index==6">{{scope.row.score}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="addBtn" style="text-align:center">
        <el-button @click="qxBtn">取消</el-button>
        <el-button type="primary" @click="god">保存</el-button>
      </div>

    </div>


</template>
<script>
export default {
  data() {

    return {
      parInfo:JSON.parse(window.localStorage.getItem("tmpStudentInfo")),//当前用户信息
      editData:"", //编辑信息回显
      isEdit:false, //是否是编辑
      /*筛选条件*/
      stageList: [], //学段
      gradeList: [], //学年
      subjectList: [
        {
          "name": "数学",
          "id": 1
        },
        {
          "name": "语文",
          "id": 2
        }, {
          "name": "英语",
          "id": 3
        }
      ],
      subjectsObj: this.commonSubject,
      gradesObj: this.commonGrond,
      stageCode: "", //学段code
      gradeCode: '', //年级code
      subjectCode: '', //学科code
      descriptionText:"", //描述
      /*学习行为问题*/
      studyActiveObj:[
        {
          problem:"",
          hour:"",
          score:""
        }
      ],
      /*思维惯性问题*/
      thinkActiveObj:[
        {
          problem:"",
          hour:"",
          score:""
        }
      ],
      /*学习能力短板*/
      studyAbilityObj:[
        {
          problem:"",
          hour:"",
          score:""
        }
      ],
      /*基础知识短板*/
      pointObj:[
        {
          problem:"",
          hour:"",
          score:""
        }
      ],

      //教材版本列表
      rules: {
        subjectCode:[
          {required: true, message: '请选择学科'},
        ],
        gradeCode:[
          {required: true, message: '请选择学年'},
        ],
        teacherName: [
          {required: true, message: '请输入老师姓名', trigger: 'blur'},
        ],
        wlSub: [
          {required: false},
        ],
        wrongType: [
          {required: true, message: '请输入做题类型'},
        ],
        allNumber: [
          {required: true, message: '请输入总数量'},
        ],
        wrongNumber: [
          {required: true, message: '请输入错误数量'},
        ],
      },
      /*提交参数*/
      form: {
        subjectCode:"", //学科code
        gradeCode:"", //学年code
        teacherName: "", //教师名字
        wlSub:0, //文理科
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
      tableDataItem: [{
        sort:'0',
        hour: '',
        score: '',
      }, {
        sort:'1',
        hour: '',
        score: '',
      }, {
        sort:'2',
        hour: '',
        score: '',
      }, {
        sort:'3',
        hour: '',
        score: '',
      },{
        sort:'4',
        hour: '',
        score: '',
      },{
        sort:'5',
        hour: '',
        score: '',
      },{
        sort:'100',
        hour: '',
        score: '',
      }]

    }
  },
  created() {
    if(this.$route.query.id){
      this.isEdit = true;
      this.getEditData()
    }
    this.getGradeList();
    this.getSubjectList()
  },
  filters:{
  },
  methods: {
    changeHour:function(){
      var $this = this;
      var num = 0;
      for(var i = 0;i<$this.tableDataItem.length-1;i++){
        num +=Number($this.tableDataItem[i].hour)
      }
      $this.$set($this.tableDataItem[6],"hour",num)
    },
    changeScore:function(){
      var $this = this;
      var num = 0;
      for(var i = 0;i<$this.tableDataItem.length-1;i++){
        num +=Number($this.tableDataItem[i].score)
      }
      $this.$set($this.tableDataItem[6],"score",num)
    },
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
    /*获取学年列表*/
    getGradeList(){
      var $this = this;
      var obj = {
        stageCode:$this.parInfo.stageCode
      }
      this.$ajax.getGradesByStage(obj).then(function (result) {
        if(result.code=="000000"){
          $this.gradeList = result.grades||[];
        }else{
          $this.$message({
            type: 'warning',
            message: "获取学年列表失败"
          });
        }
      })
    },
    /*根据学年获取学科列表*/
    getSubjectList(gradeCode){
      // console.log(gradeCode)
      var $this = this;
      this.$ajax.getSubjectsByGrade().then(function (result) {
        if(result.code=="000000"){
          $this.subjectList = result.subjects||[];
        }else{
          $this.$message({
            type: 'warning',
            message: "获取学科列表失败"
          });
        }
      })
    },
    /*增加*/
    addList:function(index,type){
      var $this = this;
      if(type==1){
        $this.studyActiveObj.push({
          problem:"",
          hour:"",
          score:""
        })
      }else if(type==2){
        $this.thinkActiveObj.push({
          problem:"",
          hour:"",
          score:""
        })
      }else if(type==3){
        $this.studyAbilityObj.push({
          problem:"",
          hour:"",
          score:""
        })
      }else if(type==4){
        $this.pointObj.push({
          problem:"",
          hour:"",
          score:""
        })
      }

    },
    /*减少*/
    removeList:function(index,type){
      var $this = this;
      if(type==1){
        $this.studyActiveObj.splice(index,1)
      }else if(type==2){
        $this.thinkActiveObj.splice(index,1)
      }else if(type==3){
        $this.studyAbilityObj.splice(index,1)
      }else if(type==4){
        $this.pointObj.splice(index,1)
      }

    },
    /*取消*/
    qxBtn:function(){
      this.$router.push({path: '/abilityResult'})
    },
    /*提交*/
    god:function () {
      var $this = this;
      if($this.checkData()){
        // subjectCode:"", //学科code
        //   gradeCode:"", //学年code
        //   teacherName: "", //教师名字
        //   wlSub: "", //文理科
        var obj = {
          "artType": $this.form.wlSub,
          "behavioralProblem": JSON.stringify($this.studyActiveObj),
          "gradeCode":$this.form.gradeCode,
          "inertiaProblem": JSON.stringify($this.thinkActiveObj),
          "lackOfKnowledge": JSON.stringify($this.pointObj),
          "promotionSuggestion": JSON.stringify($this.tableDataItem),
          "shortcomingsOfAbility": JSON.stringify($this.studyAbilityObj),
          "subjectCode": $this.form.subjectCode,
          "teacherName": $this.form.teacherName,
          "userId": $this.parInfo.userId
        }
        var url = "";
        if($this.isEdit){
          url = "/feedback/updateFeedback";
          obj.trainingFeedbackId = $this.editData.trainingFeedbackId;
          obj.updateName = "小丰"
        }else{
          url = "/feedback/addFeedback";
          obj.createName = "小丰"
        }
        this.$axios
          .post(url,obj)
          .then(res => {
            if(res.code=="000000"){
              this.$message({
                type: 'warning',
                message: "保存成功"
              });
              this.$router.push({path:"/abilityResult"})
            }else{
              this.$message({
                type: 'warning',
                message: "保存失败"
              });
            }

          })
          .catch(err => {
            this.$message({
              type: 'warning',
              message: "保存失败"
            });
          });
      }
    },
    /*提交前检查*/
    checkData:function () {
      var $this = this;
      if(!$this.form.subjectCode){
        $this.$message({message: '请填选择体验学科', type: 'warning'});
        return false
      }
      if(!$this.form.teacherName){
        $this.$message({message: '请填写教师名字', type: 'warning'});
        return false
      }
      if(!$this.form.gradeCode){
        $this.$message({message: '请填选择学年', type: 'warning'});
        return false
      }
      // if(!$this.form.wlSub){
      //   $this.$message({message: '请选择文理科', type: 'warning'});
      //   return false
      // }
      /*学习行为问题*/
      for(var i=0;i<$this.studyActiveObj.length;i++){
        if(!$this.studyActiveObj[i].problem||!$this.studyActiveObj[i].hour||!$this.studyActiveObj[i].score){
          $this.$message({message: '请填写学习行为问题', type: 'warning'});
          return false
        }
        if($this.studyActiveObj[i].hour<0||$this.studyActiveObj[i].score<0){
          $this.$message({message: '学习行为问题里的数字必须大于0哦', type: 'warning'});
          return false
        }
      }
      /*思维惯性问题*/
      for(var i=0;i<$this.thinkActiveObj.length;i++){
        if(!$this.thinkActiveObj[i].problem||!$this.thinkActiveObj[i].hour||!$this.thinkActiveObj[i].score){
          $this.$message({message: '请填写思维惯性问题', type: 'warning'});
          return false
        }
        if($this.thinkActiveObj[i].hour<0||$this.thinkActiveObj[i].score<0){
          $this.$message({message: '思维惯性问题里的数字必须大于0哦', type: 'warning'});
          return false
        }
      }
      /*学习能力短板*/
      for(var i=0;i<$this.studyAbilityObj.length;i++){
        if(!$this.studyAbilityObj[i].problem||!$this.studyAbilityObj[i].hour||!$this.studyAbilityObj[i].score){
          $this.$message({message: '请填写学习能力短板', type: 'warning'});
          return false
        }
        if($this.studyAbilityObj[i].hour<0||$this.studyAbilityObj[i].score<0){
          $this.$message({message: '学习能力短板里的数字必须大于0哦', type: 'warning'});
          return false
        }
      }
      /*基础知识短板*/
      for(var i=0;i<$this.pointObj.length;i++){
        if(!$this.pointObj[i].problem||!$this.pointObj[i].hour||!$this.pointObj[i].score){
          $this.$message({message: '请填写基础知识短板', type: 'warning'});
          return false
        }
        if($this.pointObj[i].hour<0||$this.pointObj[i].score<0){
          $this.$message({message: '基础知识短板里的数字必须大于0哦', type: 'warning'});
          return false
        }
      }
      /*学科提升建议*/
      for(var i=0;i<$this.tableDataItem.length;i++){
        if(!$this.tableDataItem[i].hour||!$this.tableDataItem[i].score){
          $this.$message({message: '请填写学科提升建议', type: 'warning'});
          return false
        }
        if($this.tableDataItem[i].hour<0||$this.tableDataItem[i].score<0){
          $this.$message({message: '学科提升建议里的数字必须大于0哦', type: 'warning'});
          return false
        }
      }
      return true
    }
  },
  watch:{
  },
  components: {

  }
}
</script>

<style scoped lang="less">
  /*.el-input{*/
    /*width:30%;*/
  /*}*/
  /*new*/
  .addAbilityReady-content{
    padding-top:20px;
    padding-bottom:20px;
    .icon-1{
      font-size:30px;
      cursor:pointer;
      margin-left:10px;
      vertical-align: -17px;
    }
    .school-sel{
      margin-right:10px;
      margin-bottom:10px;
    }
    .sub-list .icon-1{
      font-size:30px;
      cursor:pointer;
      margin-right:10px;
      vertical-align: -17px;
    }
    .notNull:before{
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }


</style>
<style>
  .isCenter3 td{text-align: center;  height:48px;
    line-height:48px;
    padding:0;}
</style>
