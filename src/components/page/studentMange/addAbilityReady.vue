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
                  <el-select v-model="form.subjectCode" placeholder="请选择"  value-key="subjectCode">
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
                  <el-select v-model="form.gradeCode" placeholder="请选择学科"  value-key="gradeCode">
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

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="试卷满分" prop="paperScore">
                  <el-input v-model.trim="form.paperScore" type="number"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="学生得分" prop="studentScore">
                  <el-input v-model.trim="form.studentScore" type="number"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="试卷总题数" prop="quesNum">
                  <el-input v-model.trim="form.quesNum" type="number"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="答错题数" prop="wrongNum">
                  <el-input v-model.trim="form.wrongNum" type="number"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>

      <!--错误题型及数量-->
      <el-row>
        <h4>错误题型及数量</h4>
      </el-row>
      <div class="wrongQues-list">
        <el-row v-for="(item,index) in wrongTypeObj" style="margin:20px 0;" :key="index">
          <el-col style="width:120px;">
            <label class="el-form-item__label notNull"  style="width:120px;">错误题型</label>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="wrongTypeObj[index].wrongType" maxlength="10"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <label  class="el-form-item__label notNull"  style="width:100px;">总数量</label>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="wrongTypeObj[index].total" type="number"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <label class="el-form-item__label notNull"  style="width:100px;">错误数量</label>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="wrongTypeObj[index].wrongTotal" type="number"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="wrongTypeObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,1)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,1)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--错误知识点（按照错误次数排序-->
      <el-row>
        <h4>错误知识点（按照错误次数排序）</h4>
      </el-row>
      <div class="WrongPoint-list">
        <el-row v-for="(item,index) in WrongPointObj" style="margin:20px 0;" :key="index">
          <el-col style="width:120px;">
            <label class="el-form-item__label notNull"  style="width:120px;">知识点名称</label>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="WrongPointObj[index].name" maxlength="50"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <label  class="el-form-item__label notNull"  style="width:100px;">错误次数</label>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="WrongPointObj[index].total" type="number"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="WrongPointObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,2)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,2)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--试卷分析出的答题习惯问题-->
      <el-row>
        <h4>试卷分析出的答题习惯问题</h4>
      </el-row>
      <div class="paperAns-list">
        <el-row v-for="(item,index) in paperAnsQuesObj" style="margin:20px 0;" :key="index">
          <el-col style="width:120px;">
            <label class="el-form-item__label notNull"  style="width:120px;">问题{{ index+1 }}</label>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="paperAnsQuesObj[index].quesText" maxlength="100"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="paperAnsQuesObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,3)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,3)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--试卷分析出的学习能力问题-->
      <el-row>
        <h4>试卷分析出的学习能力问题</h4>
      </el-row>
      <div class="paperAns-list">
        <el-row v-for="(item,index) in paperAnsStudyObj" style="margin:20px 0;" :key="index">
          <el-col style="width:120px;">
            <label class="el-form-item__label notNull"  style="width:120px;">问题{{ index+1 }}</label>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="paperAnsStudyObj[index].quesText" maxlength="100"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="paperAnsStudyObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,4)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,4)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--干预体验课方案-->
      <!--素材及内容描述-->
      <div class="description-list">
        <el-row style="margin:20px 0;">
          <el-col style="width:120px;">
            <label class="el-form-item__label"  style="width:120px;">素材及内容描述</label>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="descriptionText"
                maxlength="600">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--准备体验的错误知识点-->
      <div class="description-list">
        <el-row style="margin:20px 0;" v-for="(item,index) in readyWrongObj" :key="index">
          <el-col style="width:180px;">
            <label class="el-form-item__label notNull"  style="width:180px;">准备体验的错误知识点{{ index+1 }}</label>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="readyWrongObj[index].wrongPoint" maxlength="100"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="readyWrongObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,5)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,5)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--所解决的学习习惯问题-->
      <div class="soleHabit-list">
        <el-row style="margin:20px 0;" v-for="(item,index) in soleHabitObj" :key="index">
          <el-col style="width:180px;">
            <label class="el-form-item__label notNull"  style="width:180px;">所解决的学习习惯问题{{ index+1 }}</label>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="soleHabitObj[index].habitText" maxlength="100"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="soleHabitObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,6)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,6)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--所解决的学习能力问题-->
      <div class="soleAbility-list">
        <el-row style="margin:20px 0;" v-for="(item,index) in soleAbilityObj" :key="index">
          <el-col style="width:180px;">
            <label class="el-form-item__label notNull"  style="width:180px;">所解决的学习能力问题{{ index+1 }}</label>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-input v-model.trim="soleAbilityObj[index].abilityText" maxlength="100"></el-input>
            </div>
          </el-col>
          <el-col style="width:100px;">
            <div class="grid-content bg-purple-light">
              <span v-if="soleAbilityObj.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index,7)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index,7)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>
      </div>


      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="所需时间" prop="time">
                <el-input v-model.trim="form.time" type="number" style="width:70%"></el-input>
                <span>小时</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="对应提高分数" prop="improveScore">
                <el-input v-model.trim="form.improveScore" type="number"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="出门考题量" prop="examQuesNum">
                <el-input v-model.trim="form.examQuesNum" type="number"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="达标分数" prop="upScore">
                <el-input v-model.trim="form.upScore" type="number"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>



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
      /*错误题型及数量参数*/
      wrongTypeObj:[
        {
          wrongType:"",
          total:"",
          wrongTotal:""
        }
      ],
      /*错误知识点*/
      WrongPointObj:[
        {
          name:"",
          total:""
        }
      ],
      /*试卷分析出的答题习惯问题*/
      paperAnsQuesObj:[
        {
          quesText:""
        }
      ],
      /*试卷分析出的学习能力问题*/
      paperAnsStudyObj:[
        {
          quesText:""
        }
      ],
      /*准备体验的错误知识点*/
      readyWrongObj:[
        {
          wrongPoint:""
        }
      ],
      /*所解决的学习习惯问题*/
      soleHabitObj:[
        {
          habitText:""
        }
      ],
      /*所解决的学习能力问题*/
      soleAbilityObj:[
        {
          abilityText:""
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
        paperScore: [
          {required: true, message: '请输入试卷分数'},
        ],
        studentScore: [
          {required: true, message: '请输入学生分数'},
        ],
        quesNum: [
          {required: true, message: '请输入试卷总题数'},
        ],
        wrongNum: [
          {required: true, message: '请输入答错题数'},
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
        time: [
          {required: true, message: '请输入所需时间'},
        ],
        improveScore: [
          {required: true, message: '请输入对应提高分数'},
        ],
        examQuesNum: [
          {required: true, message: '请输入出门考题量'},
        ],
        upScore: [
          {required: true, message: '请输入达标分数'},
        ]
      },
      /*提交参数*/
      form: {
        subjectCode:"", //学科code
        gradeCode:"", //学年code
        teacherName: "", //教师名字
        wlSub: 0, //文理科
        paperScore: "", //试卷满分
        studentScore: "", //学生分数
        quesNum: "", //试卷总题数
        wrongNum: "", //答错题数
        time:"", //所需时间
        improveScore:"", //对应提高分数
        examQuesNum:"", //出门考题量
        upScore:"", //达标分数
      }
    }
  },
  created() {
    if(this.$route.query.id){
      this.isEdit = true;
      this.getEditData()
    }
    this.getGradeList();
    this.getSubjectList()
    // this.getStudentList();
  },
  filters:{
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
        $this.wrongTypeObj.push({
          wrongType:"",
          total:"",
          wrongTotal:""
        })
      }else if(type==2){
        $this.WrongPointObj.push( {
          name:"",
          total:"1"
        })
      }else if(type==3){
        $this.paperAnsQuesObj.push({
          quesText:""
        })
      }else if(type==4){
        $this.paperAnsStudyObj.push({
          quesText:""
        })
      }else if(type==5){
        $this.readyWrongObj.push({
          wrongPoint:""
        })
      }else if(type==6){
        $this.soleHabitObj.push(  {
          habitText:""
        })
      }else if(type==7){
        $this.soleAbilityObj.push(  {
          abilityText:""
        })
      }

    },
    /*减少*/
    removeList:function(index,type){
      var $this = this;
      if(type==1){
        $this.wrongTypeObj.splice(index,1)
      }else if(type==2){
        $this.WrongPointObj.splice(index,1)
      }else if(type==3){
        $this.paperAnsQuesObj.splice(index,1)
      }else if(type==4){
        $this.paperAnsStudyObj.splice(index,1)
      }else if(type==5){
        $this.readyWrongObj.splice(index,1)
      }else if(type==6){
        $this.soleHabitObj.splice(index,1)
      }else if(type==7){
        $this.soleAbilityObj.splice(index,1)
      }

    },
    /*取消*/
    qxBtn:function(){
      this.$router.push({path: '/abilityReady'})
    },
    /*提交*/
    god:function () {
      var $this = this;
      if($this.checkData()){
        console.log($this.form)
        var obj = {
          "answeringHabit": "",
          "artType": $this.form.wlSub,
          "fullScore": $this.form.paperScore,
          "gradeCode": $this.form.gradeCode,
          "learningAbility": "",
          "paperQuestionNum": $this.form.quesNum,
          "program": "",
          "score": $this.form.studentScore,
          "subjectCode": $this.form.subjectCode,
          "teacherName": $this.form.teacherName,
          "userId": $this.parInfo.userId,
          "wrongKnowledgePoint": JSON.stringify($this.WrongPointObj),
          "wrongQuestionNum": $this.form.wrongNum,
          "wrongQuestionsType": JSON.stringify($this.wrongTypeObj)
        }
        var answeringHabit = [];
        var learningAbility = [];
        for(var i =0;i<$this.paperAnsQuesObj.length;i++){
          answeringHabit[i]= $this.paperAnsQuesObj[i].quesText
        }
        for(var i =0;i<$this.paperAnsStudyObj.length;i++){
          learningAbility[i]= $this.paperAnsStudyObj[i].quesText
        }
        var a1 = [];
        var a2 = [];
        var a3 = [];
        for(var i =0;i<$this.readyWrongObj.length;i++){
          a1[i]= $this.readyWrongObj[i].wrongPoint
        }
        for(var i =0;i<$this.soleHabitObj.length;i++){
          a2[i]= $this.soleHabitObj[i].habitText
        }
        for(var i =0;i<$this.soleAbilityObj.length;i++){
          a3[i]= $this.soleAbilityObj[i].abilityText
        }
        var program = {
          description:$this.descriptionText||null,
          wrongKnowledgePoint:a1,
          learningHabits:a2,
          learningAbility:a3,
          time:$this.form.time,
          score:$this.form.improveScore,
          total:$this.form.examQuesNum,
          complianceScore:$this.form.upScore,
        };
        obj.answeringHabit = JSON.stringify(answeringHabit);
        obj.learningAbility = JSON.stringify(learningAbility);
        obj.program = JSON.stringify(program);

        var url = "";
        if($this.isEdit){
          url = "/preparation/updatePreparation";
          obj.trainingPreparationId = $this.editData.trainingPreparationId;
          obj.updateName = "小丰"
        }else{
          url = "/preparation/addPreparation";
          obj.createName = "小丰"
        }
        console.log(JSON.stringify(obj))
        this.$axios
          .post(url,obj)
          .then(res => {
            if(res.code=="000000"){
              this.$message({
                type: 'warning',
                message: "保存成功"
              });
              this.$router.push({path:"/abilityReady"})
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
      if(!$this.form.paperScore){
        $this.$message({message: '请选填写试卷分数', type: 'warning'});
        return false
      }
      if($this.form.paperScore<0){
        $this.$message({message: '试卷分数必须大于0哦', type: 'warning'});
        return false
      }
      if(!$this.form.studentScore){
        $this.$message({message: '请填写学生分数', type: 'warning'});
        return false
      }
      if($this.form.studentScore<0){
        $this.$message({message: '学生分数必须大于0哦', type: 'warning'});
        return false
      }
      if(Number($this.form.paperScore)<Number($this.form.studentScore)){
        $this.$message({message: '学生分数不能大于试卷分数哦', type: 'warning'});
        return false
      }
      if(!$this.form.quesNum){
        $this.$message({message: '请填写试卷总题数', type: 'warning'});
        return false
      }
      if($this.form.quesNum<0){
        $this.$message({message: '试卷总题数必须大于0哦', type: 'warning'});
        return false
      }
      if(!$this.form.wrongNum){
        $this.$message({message: '请填写答错题数', type: 'warning'});
        return false
      }
      if($this.form.wrongNum<0){
        $this.$message({message: '答错题数必须大于0哦', type: 'warning'});
        return false
      }
      if(Number($this.form.quesNum)<Number($this.form.wrongNum)){
        $this.$message({message: '答错题数不能大于试卷总题数哦', type: 'warning'});
        return false
      }
      /*错误题型及数量*/
      for(var i=0;i<$this.wrongTypeObj.length;i++){
        if(!$this.wrongTypeObj[i].wrongType||!$this.wrongTypeObj[i].total||!$this.wrongTypeObj[i].wrongTotal){
          $this.$message({message: '请填写错误题型及数量', type: 'warning'});
          return false
        }
        if($this.wrongTypeObj[i].total<0||$this.wrongTypeObj[i].wrongTotal<0){
          $this.$message({message: '错误题型及数量里面的数字必须大于0哦', type: 'warning'});
          return false
        }
        if(Number($this.wrongTypeObj[i].total)<Number($this.wrongTypeObj[i].wrongTotal)){
          $this.$message({message: '错误数量不能大于总数量哦', type: 'warning'});
          return false
        }
      }
      /*错误知识点*/
      for(var i=0;i<$this.WrongPointObj.length;i++){
        if(!$this.WrongPointObj[i].name||!$this.WrongPointObj[i].total){
          $this.$message({message: '请填写错误知识点', type: 'warning'});
          return false
        }
        if($this.WrongPointObj[i].total<0){
          $this.$message({message: '错误知识点里面的数字必须大于0哦', type: 'warning'});
          return false
        }
      }
      /*试卷分析出的答题习惯问题*/
      for(var i=0;i<$this.paperAnsQuesObj.length;i++){
        if(!$this.paperAnsQuesObj[i].quesText){
          $this.$message({message: '请填写试卷分析出的答题习惯问题', type: 'warning'});
          return false
        }
      }
      /*试卷分析出的学习能力问题*/
      for(var i=0;i<$this.paperAnsStudyObj.length;i++){
        if(!$this.paperAnsStudyObj[i].quesText){
          $this.$message({message: '请填写试卷分析出的学习能力问题', type: 'warning'});
          return false
        }
      }
      /*准备体验的错误知识点*/
      for(var i=0;i<$this.readyWrongObj.length;i++){
        if(!$this.readyWrongObj[i].wrongPoint){
          $this.$message({message: '请填写准备体验的错误知识点', type: 'warning'});
          return false
        }
      }
      /*所解决的学习习惯问题*/
      for(var i=0;i<$this.soleHabitObj.length;i++){
        if(!$this.soleHabitObj[i].habitText){
          $this.$message({message: '请填写所解决的学习习惯问题', type: 'warning'});
          return false
        }
      }
      /*所解决的学习能力问题*/
      for(var i=0;i<$this.soleAbilityObj.length;i++){
        if(!$this.soleAbilityObj[i].abilityText){
          $this.$message({message: '请填写所解决的学习能力问题', type: 'warning'});
          return false
        }
      }
      if(!$this.form.time){
        $this.$message({message: '请填写所需时间', type: 'warning'});
        return false
      }
      if($this.form.time<0){
        $this.$message({message: '所需时间必须大于0哦', type: 'warning'});
        return false
      }
      if(!$this.form.improveScore){
        $this.$message({message: '请填对应提高分数', type: 'warning'});
        return false
      }
      if($this.form.improveScore<0){
        $this.$message({message: '所对应提高分数必须大于0哦', type: 'warning'});
        return false
      }
      if(!$this.form.examQuesNum){
        $this.$message({message: '请填写出门考题量', type: 'warning'});
        return false
      }
      if($this.form.examQuesNum<0){
        $this.$message({message: '出门考题量必须大于0哦', type: 'warning'});
        return false
      }
      if(!$this.form.upScore){
        $this.$message({message: '请填达标分数', type: 'warning'});
        return false
      }
      if($this.form.upScore<0){
        $this.$message({message: '达标分数必须大于0哦', type: 'warning'});
        return false
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
/*  .isCenter3 td:last-child{text-align: left}*/
</style>
