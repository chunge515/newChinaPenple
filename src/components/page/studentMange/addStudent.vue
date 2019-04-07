<template>
    <div class="studentList-content">
      <commonTitle>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/studentMange' }">学生管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{id ? "修改学生" :"新增学生"}}</el-breadcrumb-item>
        </el-breadcrumb>
      </commonTitle>
      <!--{{form}}-->
      <el-form ref="form" :model="form" label-width="180px" :rules="rules">
        <el-form-item label="学生姓名" prop="realname">
          <el-input v-model.trim="form.realname" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="学生性别" prop="sex">
          <el-radio-group v-model="form.sex" >
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--<el-form-item label="学号" prop="studentId">
          <el-input v-model.trim="form.studentId" ></el-input>
        </el-form-item>
        <el-form-item label="学生手机号" prop="mobile">
          <el-input v-model.trim="form.mobile"></el-input>
        </el-form-item>-->
        <!--{{schoolItem}}-->
        <el-form-item label="学生学校">
          <el-select v-model="form.provinceId" placeholder="省" class="school-sel" @change="getProvince(false,form.provinceId,'1')">
            <el-option :label="item.areaName" :value="item.areaId" v-for="(item,index) in provinceObj" :key="item.areaId"></el-option>
          </el-select>
          <el-select v-model="form.cityId" placeholder="市/区" class="school-sel" @change="getProvince(false,form.cityId,'2')">
            <el-option :label="item.areaName" :value="item.areaId" v-for="(item,index) in cityObj" :key="item.areaId"></el-option>
          </el-select>
          <el-select v-model="form.countyId" placeholder="区/县" class="school-sel" @change="getSchoolList(false,form.countyId)">
            <el-option :label="item.areaName" :value="item.areaId" v-for="(item,index) in countyObj" :key="item.areaId"></el-option>
          </el-select>
          <el-select v-model="schoolItem" placeholder="学校" class="school-sel" value-key="schoolId">
            <el-option :label="item.schoolName" :value="item" v-for="(item,index) in schoolObj" :key="item.schoolId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生学年" prop="gradeCode">
          <el-select v-model="form.gradeCode" placeholder="请选择学年">
            <el-option
              v-for="item in gradeList"
              :key="item.gradeCode"
              :label="item.gradeName"
              :value="item.gradeCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生年龄" prop="age" >
          <el-input v-model.trim="form.age" type="number"></el-input>
        </el-form-item>

        <el-form-item label="文理科" prop="artType">
          <el-select v-model="form.artType">
            <el-option
              v-for="item in artTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col style="width: 300px;margin-right: 30px;">
            <el-form-item label="最好学科" prop="bestSubjectCode">
            <el-select v-model="form.bestSubjectCode" placeholder="请选择">
              <el-option
                v-for="(item,index) in subjectList"
                :key="index"
                :label="item.subjectName"
                :value="item.subjectCode">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col style="width:600px;">
            <el-form-item label="最好学科分数" prop="bestSubjectMark ">
              <el-input v-model.trim="form.bestSubjectMark" maxlength="10" type="number" placeholder="填写分数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="width: 300px;margin-right: 30px;">
            <el-form-item label="最差学科" prop="worstSubjectCode ">
              <el-select v-model="form.worstSubjectCode" placeholder="请选择">
                <el-option
                  v-for="item in subjectList"
                  :key="item.subjectCode"
                  :label="item.subjectName"
                  :value="item.subjectCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col style="width:600px;">
            <el-form-item label="最差学科分数" prop="worstSubjectMark ">
              <el-input v-model.trim="form.worstSubjectMark" maxlength="10" type="number" placeholder="填写分数"></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <el-form-item label="成绩最差的原因" prop="worstSubjectReason">
          <el-input type="textarea" v-model="form.worstSubjectReason" maxlength="200" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="最近一次成绩总分" prop="recentExamTotalMark">
          <el-input type="number" v-model.trim="form.recentExamTotalMark"></el-input>
        </el-form-item>
        <el-form-item label="学生年级排名" prop="gradeTop" placeholder="填写名次">
          <el-input type="number" v-model.trim="form.gradeTop"></el-input>
        </el-form-item>
        <el-form-item label="学生班级排名" prop="classTop" placeholder="填写名次">
          <el-input type="number" v-model.trim="form.classTop"></el-input>
        </el-form-item>
        <el-form-item label="是否独生子女" prop="isSingle">
          <el-select v-model="form.isSingle" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="周末是否补课" prop="tutorialSubjectCodes">
          <el-checkbox-group
            v-model="form.tutorialSubjectCodes" @change="changeTutorialSubject"><!-- -->
            <el-checkbox
              v-for="(item,index) in subjectList"
              :label="item.subjectCode"
              :key="index" :disabled="item.isD">{{item.subjectName}}</el-checkbox>
            <el-checkbox label="0">不补课</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="平时几点放学" prop="leaveSchoolTime">
          <el-select v-model="form.leaveSchoolTime" placeholder="请选择">
            <el-option
              v-for="item in timeList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="几点开始写作业" prop="doHomeworkTime">
          <el-select v-model="form.doHomeworkTime" placeholder="请选择">
            <el-option
              v-for="item in timeList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="几点休息" prop="restTime">
          <el-select v-model="form.restTime" placeholder="请选择">
            <el-option
              v-for="item in timeList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学习姿势是否端正" prop="rightPosture">
          <el-select v-model="form.rightPosture" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不好的学习习惯有哪些" prop="badStudyHabbits">
          <el-checkbox-group
            v-model="form.badStudyHabbits" @change="changeHabbit"><!-- -->
            <el-checkbox
              v-for="item in habbits"
              :label="item.code"
              :key="item.code" :disabled="item.isD">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="作业是否需要督促" prop="superviseHomework">
          <el-select v-model="form.superviseHomework" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="孩子有哪些兴趣爱好/特长" prop="hobby" placeholder="填写名次">
          <el-input v-model.trim="form.hobby"></el-input>
        </el-form-item>
        <el-row>
          <el-col style="width: 350px;margin-right: 10px;">
            <el-form-item label="身体素质是否良好" prop="healthy">
              <el-radio v-model="form.healthy" label="1">是</el-radio>
              <el-radio v-model="form.healthy" label="0" >否</el-radio>
            </el-form-item>
          </el-col>
          <el-col v-if="!Number(form.healthy || true)" style="width: 300px;">
            <el-input v-model.trim="form.healthyDesc" style="width: 100%;" placeholder="状况问题描述"></el-input>
          </el-col>
        </el-row>

        <el-form-item label="考试成绩" prop="preSubjectExamMarks">
          <el-row class="subjectMarks">
            <el-col v-for="(item,index) in form.preSubjectExamMarks" :key="index">
              <span>{{item.subjectName}}:</span><el-input v-model.trim="item.score" placeholder="填写分数" type="number"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="孩子个性" prop="personality">
          <el-select v-model="form.personality" placeholder="请选择">
            <el-option label="外向" value="1"></el-option>
            <el-option label="内向" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中考您选考哪三科" prop="chooseSubjectCodes">
          <el-checkbox-group
            v-model="form.chooseSubjectCodes">
            <el-checkbox
              v-for="item in middleSubjects"
              :label="item.code"
              :key="item.code">{{item.name}}</el-checkbox>

          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否愿意与父母交流" prop="talkWithParent">
          <el-select v-model="form.talkWithParent" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否叛逆" prop="rebelious">
          <el-select v-model="form.rebelious" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学校教师对孩子评价" prop="teacherAssessment">
          <el-select v-model="form.teacherAssessment" placeholder="请选择">
            <el-option
              v-for="item in teacherAssessments"
              :label="item.name" :value="item.code" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目标学校" prop="dreamSchool" placeholder="">
          <el-input  v-model.trim="form.dreamSchool"></el-input>
        </el-form-item>
        <el-form-item label="目标专业" prop="dreamSpecialty" placeholder="">
          <el-input v-model.trim="form.dreamSpecialty"></el-input>
        </el-form-item>
        <el-form-item label="是否有把握实现目标" prop="dreamActualization">
          <el-select v-model="form.dreamActualization" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对学生初始评价" prop="studentRemark">
          <el-select v-model="form.studentRemark" placeholder="请选择">
            <el-option v-for=" item in firstStuEvaluation" :label="item.name" :value="item.code" :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属书院" prop="bookCollege">
          <span>新国人书院总院</span>
        </el-form-item>
        <el-form-item label="家长手机号" prop="parentMobile">
          <el-input v-model.trim="form.parentMobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark" maxlength="200" style="width: 30%"></el-input>
        </el-form-item>
      </el-form>
      <div class="addBtn" style="text-align:center">
        <el-button type="primary" @click="god('form')">{{id ? "修改学生" :"新增学生"}}</el-button>
      </div>

    </div>


</template>
<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      var $this=this;
        const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          var obj = {
            pageNum:1 ,//当前页码
            pageSize:10,//每页条数 ,
            mobile:value,
          }
          this.$axios
            .post("/user/getParents", obj)
            .then(res => {
              if(res.code=="000000"){
                if(res.result.length==0){
                  callback(new Error('没有相应的家长手机号码,请重新填写'));
                }else{
                  callback();
                }
              }else{
                callback(new Error('验证手机失败'));
              }
            })
            .catch(err => {
              callback(new Error('验证手机失败'));
            });
         this.tryTel(callback,value)
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
    };
    var checkSub= (rule, value, callback) => {
      if(value.length){
        if(value.length!==3){
          return callback(new Error('必须选择3个科目'));
        }else{
          callback();
        }
      }else{
        callback();
      }
    };
    return {
      /*筛选条件*/
      artTypeList:[
        {code:"0",name:"暂无分类"},
        {code:"1",name:"文"},
        {code:"2",name:"理"},
      ],
      //时间列表
      timeList:[
        {code:"1",name:'5点-6点'},
        {code:"2",name:'6点-7点'},
        {code:"3",name:'7点-8点'},
        {code:"4",name:'8点-9点'},
        {code:"5",name:'9点-10点'},
      ],
      habbits:[
        {code:"1",name:'抖腿',isD:false},
        {code:"2",name:'转笔',isD:false},
        {code:"3",name:'听音乐',isD:false},
        {code:"4",name:'跑神',isD:false},
        {code:"5",name:'打瞌睡',isD:false},
        {code:"0",name:'无',isD:false},
      ],
      middleSubjects:[
        {code:'4',name:'物理'},
        {code:'5',name:'化学'},
        {code:'6',name:'生物'},
        {code:'7',name:'历史'},
        {code:'9',name:'政治'},
        {code:'8',name:'地理'},
      ],
      teacherAssessments:[
        {code:'1',name:'优秀'},
        {code:'2',name:'良好'},
        {code:'3',name:'差'},
      ],
      firstStuEvaluation:[
        {code:'0',name:'意向强烈'},
        {code:'1',name:'意向不强烈'},
      ],
      stageList:[], //学段
      gradeList: [], //学年
      subjectList: [],
      subjectsObj:this.commonSubject,
      gradesObj:this.commonGrond,
      stageCode:"", //学段code
      gradeCode: '', //年级code
      subjectCode: '', //学科code
      isStudentTel:false,
      lfList:[
        {
          subjectName:"",
          bookTypeName:""
        }
      ],

      //教材版本列表
      rules: {
        realname : [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 0, max: 10, message: '长不能输入超过10个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true,message:"请选择性别"},
        ],
     /*   studentId:[
          { required: false, message: '请输入学号', trigger: 'blur' },
        ],*/
        // mobile :[
        //   {required: false,validator: checkPhone, trigger: 'blur'}
        // ],
       /* stageCode : [
          { required: true,message:"请选择学段"},
        ],*/
        gradeCode: [
          { required: true,message:"请选择学年"},
        ],
        age: [
          { required: true,message:"请输入年龄"},
        ],
        artType:[
          { required: true,message:"请输选择文理科"},
        ],
        worstSubjectReason:[
          { required: true,message:"请说明成绩最差原因"},
        ],
        isSingle:[
          { required: true,message:"请选择是否独生子女"},
        ],
        tutorialSubjectCodes:[
          { required: true,message:"请选择周末是否补课"},
        ],
        leaveSchoolTime:[
          { required: true,message:"请选择平时几点放学"},
        ],
        doHomeworkTime:[
          { required: true,message:"请选择几点开始写作业"},
        ],
        restTime:[
          { required: true,message:"请选择几点休息"},
        ],
        rightPosture:[
          { required: true,message:"请选择学习姿势是否端正"},
        ],
        badStudyHabbits:[{ required: true,message:"请选择不好的学习习惯有哪些"},],
        healthy:[
          { required: true,message:"请选择身体素质是否良好"},
        ],
        personality:[
          { required: true,message:"请选择孩子个性"},
        ],
        talkWithParent:[
          { required: true,message:"请选择是否愿意与父母交流"},
        ],
        rebelious:[
          { required: true,message:"请选择是否叛逆"},
        ],
        teacherAssessment:[
          { required: true,message:"请选择学校教师对孩子评价"},
        ],
        studentRemark:[
          { required: true,message:"请选择对学生初始评价"},
        ],
        chooseSubjectCodes:[
          {validator: checkSub, trigger: 'change' }
        ],
         parentMobile :[
          {required: true,validator: checkPhone, trigger: 'blur'}
        ],

        /*mobile :[
          {required: false, validator: checkPhone1,trigger: 'blur'}
        ],*/
        /* createName:[
           {required: true,message: '请输入真实录入人姓名', trigger: 'blur' }
         ],
          parentWechatId:[
           { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, message: '请输入正确的微信号'},
         ],*/
      },


      provinceObj:[], //省列表
      cityObj:[], //市列表
      countyObj:[], //县列表
      schoolObj:[], //学校列表
      schoolItem :null,
      /*提交参数*/
     // isTrueParentNum:false,
      form:{
        realname :null,
        sex :null,
       // studentId :null,
        age:'',//年龄
        artType:'',//文理分科
        bestSubjectCode:'',//最好学科
        bestSubjectMark:'',//最好学科分数
        worstSubjectCode:'',//最差学科code
        worstSubjectMark:'',//最差学科分数
        worstSubjectReason:'',//成绩最差的原因
        recentExamTotalMark:'',//最近一次成绩总分
        gradeTop:'',//学生年级排名
        classTop:'',//学生班级排名
        isSingle:'',//是否独生子女
        tutorialSubjectCodes:[],//周末补课学科
        leaveSchoolTime:'',//平时几点放学
        doHomeworkTime:'',//几点开始写作业
        restTime:'',//几点休息
        rightPosture:'',//学习姿势是否端正
        badStudyHabbits:[],//不好的学习习惯有那些
        superviseHomework:'',//作业是否需要督促
        hobby:'',//孩子有哪些兴趣爱好/特长
        healthy:'',//身体素质是否良好
        healthyDesc:'',//素质不好描述
        preSubjectExamMarks:[],//各科考试成绩
        personality:'',//孩子个性
        chooseSubjectCodes:[],//中考选考三科
        talkWithParent:"",//是否愿意与父母交流
        rebelious:'',//是否叛逆
        dreamSchool:'',//目标学校
        dreamSpecialty:'',//目标专业
        dreamActualization:'',//是否有把握实现目标
        studentRemark :'',//对学生初始评价
        //mobile :null,
        provinceId :null,
        countyId :null,
        cityId :null,
        schoolCode:null,
        schoolName:null,
       // stageCode :null,
        gradeCode :null,
       // parentWechatId :null,
        parentMobile :null,
        remark :null,
        seowonCode:"110102001",
        seowonName:"新国人书院总院",
        //receptionist:null, //接待人
        //referrer:null, //推荐人
        //updateName:"小丰",
       // courses:[],
      },
      id:''

    }
  },
  created() {
     this.getGradeList();
    this.getSubjectList();
    // this.getSubjectList()
    // this.getStudentList();
    //this.getStagesList()

    this.id=this.$route.query.id;
    if(this.id){
      this.getStudentInfo()
    }else{
      this.getProvince(false,"0","0");
    }
  },
  filters:{
  },
  methods: {
    //获取学生详情
    getStudentInfo() {
      var _this = this;
      this.$axios.post("user/getStudent", {userId: _this.id}).then(res => {
        if (res.code == "000000") {
          var obj=res.result;
         obj.tutorialSubjectCodes=JSON.parse(obj.tutorialSubjectCodes);
          obj.badStudyHabbits=JSON.parse(obj.badStudyHabbits);
          obj.chooseSubjectCodes=JSON.parse(obj.chooseSubjectCodes);
          obj.preSubjectExamMarks=JSON.parse(obj.preSubjectExamMarks);
          obj.isSingle=String(obj.isSingle)
          obj.sex=String(obj.sex)
          _this.form=obj;
          if(obj.schoolCode){
            _this.getProvince(true,"0","0");
          }else{
            _this.getProvince(false,"0","0");
          }
        } else {
          _this.$message.error(res.message || '请求出错');
        }
      }).catch(e => {
        _this.$message.error(e.message || '请求出错');
      })
    },
    //周末是否补课
    changeTutorialSubject(){
      var $this=this;

      var subjectCodes=$this.form.tutorialSubjectCodes || [];
      if(subjectCodes.length<=0){
        $this.subjectList.forEach(val=>{
          this.$set(val,'isD',false)
        })
      }
      subjectCodes.forEach(val=>{
        if(val==0){
          $this.form.tutorialSubjectCodes=['0'];
          $this.subjectList.forEach(val=>{
            this.$set(val,'isD',true)
          })
        }
      })
     // console.log($this.form.tutorialSubjectCodes)
    },
    //坏习惯
    changeHabbit(){
      var $this=this;

      var habbitAry=$this.form.badStudyHabbits || [];
      if(habbitAry.length<=0){
        $this.habbits.forEach(val=>{
          this.$set(val,'isD',false)
        })
      }
      habbitAry.forEach(val=>{
        if(val==0){
          $this.form.badStudyHabbits=['0'];
          $this.habbits.forEach(val=>{
            if(val.code!=0){
              this.$set(val,'isD',true)
            }
          })
        }
      })
      //console.log($this.form.badStudyHabbits,"---")
    },
    /*验证手机*/
    tryTel:function(callback,value){
      var $this = this;


    },
    /*获取学段列表*/
    getStagesList(){
      var $this = this;
      this.$ajax.getStages().then(function (result) {
        if(result.code=="000000"){
            $this.stageList = result.stages
        }else{
          $this.$message({
            type: 'warning',
            message: "获取学段列表失败"
          });
        }
      })
    },
    /*获取学年列表*/
    getGradeList(){
      var $this = this;
      $this.form.gradeCode = null;
      var obj = {
        stageCode:$this.form.stageCode
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
    /*获取省*/
    getProvince:function(isTrue,code,type){  //type==0(省) 1市 2县 3学校
      var $this = this;
      var obj = {
        parentId:code||0
      }
      this.$ajax.getAreas(obj).then(function (result) {
        console.log(result)
        if(result.code=="000000"){
          if(type=="0"){
            $this.provinceObj = result.areas;
            if(!isTrue){
              $this.cityObj = [];
              $this.form.cityId = null;
              $this.countyObj = [];
              $this.form.countyId = null;
              $this.schoolObj = [];
              $this.schoolItem = "";
            }
          }else if(type=="1"){
            $this.cityObj = result.areas;
            if(!isTrue){
              $this.form.cityId = null;
              $this.countyObj = [];
              $this.form.countyId = null;
              $this.schoolObj = [];
              $this.schoolItem ="";
            }

          }else if(type=='2'){
            $this.countyObj = result.areas;
            if(!isTrue){
              $this.form.countyId = null;
              $this.schoolObj = [];
              $this.schoolItem = "";
            }
          }else if(type=='3'){
            $this.getSchoolList(isTrue,code)
          }
          if(isTrue&&type=="0"){
            $this.getProvince(true,$this.form.provinceId,"1")
          }else if(isTrue&&type=="1"){
            $this.getProvince(true,$this.form.cityId,"2")
          }else if(isTrue&&type=="2"){
            $this.getSchoolList(true,$this.form.countyId)
          }
        }else{
          $this.$message({
            type: 'warning',
            message: "获取省市区县列表失败"
          });
        }
      })
    },
    /*获取学校列表*/
    getSchoolList:function(isTrue,code){
      var $this = this;
      var obj = {
        areaId: code
      }
      if(!isTrue){
        $this.schoolItem = ''
      }
      this.$ajax.getSchools(obj).then(function (result) {
        console.log(result)
        if(result.code=="000000"){
          $this.schoolObj = result.schools||[];
          if($this.id){
            $this.schoolItem={
              schoolId:$this.form.schoolCode,
              schoolName:$this.form.schoolName,
            }
          }
        }else{
          $this.$message({
            type: 'warning',
            message: "获取省市区县列表失败"
          });
        }
      })
    },
    /*根据获取学科列表*/
    getSubjectList(){
      // console.log(gradeCode)
     // this.
      var $this = this;
      var obj={
        dataType: 1,
      }
      this.$ajax.getSubjectsByGrade(obj).then(function (result) {
        if(result.code=="000000"){
          var subjects = result.subjects||[];
          var ary=[];
          subjects.forEach(val=>{//$this.subjectList
            if(val.subjectCode<=9){
             val.isD=false;
              ary.push(val)
            }
          })
          $this.subjectList=ary;
         // $this.preSubjectExamMarks=ary;
          ary.forEach(val=>{
            $this.form.preSubjectExamMarks.push({
              score:null,
              subjectCode:val.subjectCode,
              subjectName:val.subjectName
            })
          })
          //console.log($this.subjectList,$this.form.preSubjectExamMarks,"===")
        }else{
          $this.$message({
            type: 'warning',
            message: "获取学科列表失败"
          });
        }
      })
    },
    /*增加学科教材版本*/
    addSub:function (index) {
      var $this = this;
      if(!$this.lfList[index].subjectName||!$this.lfList[index].bookTypeName){
        $this.$message({
          type: 'warning',
          message: "请先填写本行的学科和教材版本哦"
        });
        return false
      }
      $this.lfList.push(
        {
          subjectName:"",
          bookTypeName:""
        }
      )
      // $this.lfList.push(
      //   {
      //     bookList:[
      //       {
      //         "name":"人教版"+index,
      //         "id":1
      //       },
      //       {
      //         "name":"北师大版"+ index,
      //         "id":2
      //       }
      //     ],
      //     subjectCode: {},
      //     bookCode: {}
      //   },
      // )
    },
    /*减少学科教材版本*/
    removeSub:function (index) {
      var $this = this;
      $this.lfList.splice(index,1)
    },
    god:function (formName) {
      var $this = this;
      $this.$refs[formName].validate((valid) => {
          if (valid) {
            if($this.form.healthy=="0" && $this.form.healthyDesc==""){
              $this.$message({message: '请填写身体哪里不好', type: 'warning'});
              return false
            }
           var obj=JSON.parse(JSON.stringify($this.form));
            obj.tutorialSubjectCodes=JSON.stringify(obj.tutorialSubjectCodes)
            obj.badStudyHabbits=JSON.stringify(obj.badStudyHabbits)
            obj.chooseSubjectCodes=JSON.stringify(obj.chooseSubjectCodes)
            obj.preSubjectExamMarks=JSON.stringify(obj.preSubjectExamMarks)
            if($this.schoolItem){
              obj.schoolCode = $this.schoolItem.schoolId;
              obj.schoolName = $this.schoolItem.schoolName;
            }
            if(this.id){
              obj.updateName="123";
              this.$axios
                .post("/user/updateStudent", obj)
                .then(res => {
                  if(res.code=="000000"){
                    this.$message({
                      type: 'warning',
                      message: "修改学生成功"
                    });
                    this.$router.push({path:"/studentMange"})
                  }else{
                    this.$message({
                      type: 'warning',
                      message: res.message
                    });
                  }

                })
                .catch(err => {
                  this.$message({
                    type: 'warning',
                    message: "编辑学生信息失败"
                  });
                });
            }else{
              obj.createName="123"
              this.$axios
                .post("/user/addStudent",obj)
                .then(res => {
                  if(res.code=="000000"){
                    this.$message({
                      type: 'success',
                      message: "保存成功"
                    });
                    this.$router.push({path:"/studentMange"})
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
            }

          }
      })
      return;
      if($this.checkData()){
        // for(var i = 0;i<$this.lfList.length;i++){
        //   if(!$this.lfList[i].subjectName||!$this.lfList[i].bookTypeName){
        //     $this.$message({
        //       type: 'warning',
        //       message: "您还有学科或者教材版本未填写哦"
        //     });
        //     return false
        //   }
        // }
        $this.form.courses = JSON.stringify($this.lfList);


      }



    },
    checkData:function () {
      var $this = this;
      if(!$this.form.realname){
        $this.$message({message: '请填写姓名', type: 'warning'});
        return false
      }
      if(!$this.form.sex){
        $this.$message({message: '请选择性别', type: 'warning'});
        return false
      }
      /*if($this.form.mobile){
        if(!$this.isStudentTel){
          $this.$message({message: '请输入正确的学生手机号', type: 'warning'});
          return false
        }
      }*/
      // if(!$this.form.studentId){
      //   $this.$message({message: '请填写学号', type: 'warning'});
      //   return false
      // }
      if(!$this.form.stageCode){
        $this.$message({message: '请选择学段', type: 'warning'});
        return false
      }
      if(!$this.form.gradeCode){
        $this.$message({message: '请选择学年', type: 'warning'});
        return false
      }
      // if(!$this.form.parentMobile){
      //   $this.$message({message: '请填写家长手机号', type: 'warning'});
      //   return false
      // }
      if(!$this.isTrueParentNum&&$this.form.parentMobile){
        $this.$message({message: '您填写的手机号没有匹配的,请重新填写', type: 'warning'});
        return false
      }
      if($this.form.parentWechatId){
        const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
        if (!reg.test($this.form.parentWechatId)) {
          $this.$message({message: '请填写正确的微信号', type: 'warning'});
          return false
        }
      }
      if(!$this.form.createName){
        $this.$message({message: '请填写录入人', type: 'warning'});
        return false
      }
      return true
    },
  },
  components: {

  }
}
</script>

<style scoped>
  /*new*/
  .studentList-content .el-input{
    width:30%;
  }
  .el-input{
    width:30%;
  }
  .studentList-content .school-sel{
    margin-right:10px;
    margin-bottom:10px;
  }
  .studentList-content .sub-list .icon-1{
    font-size:30px;
    cursor:pointer;
    margin-right:10px;
    vertical-align: -17px;
  }
</style>
<style lang="scss">
 .studentList-content{
   .subjectMarks{
     width:1000px;
     .el-col{
       margin-bottom: 20px;
       width:300px;
       span{
         margin-right:20px;}
       .el-input{
         width:200px;
       }
     }
   }
 }
  .isCenter3 td{text-align: center;  height:48px;
    line-height:48px;
    padding:0;}
/*  .isCenter3 td:last-child{text-align: left}*/
</style>
