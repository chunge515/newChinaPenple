<template>
    <div class="studentList-content">
      <commonTitle>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
          <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        </el-breadcrumb>
      </commonTitle>
      <div class="nav-list">
        <!--<span>学段：</span>
        <el-select v-model="stageCode" placeholder="请选择" @change="getGradeList(false)" style="width:150px;">
          <el-option
            v-for="item in stageList"
            :key="item.stageCode"
            :label="item.stageName"
            :value="item.stageCode">
          </el-option>
        </el-select>-->
        <span>年级：</span>
        <el-select v-model="gradeCode" placeholder="请选择" style="width:150px;">
          <el-option
            v-for="item in gradeList"
            :key="item.gradeCode"
            :label="item.gradeName"
            :value="item.gradeCode">
          </el-option>
        </el-select>

        <!--<span>学科：</span>-->
        <!--<el-select v-model="subjectCode" placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="item in subjectList"-->
            <!--:key="item.dataIden"-->
            <!--:label="item.dataName"-->
            <!--:value="item.dataIden">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-input v-model="infoText" placeholder="请输入信息"></el-input>-->
          <el-input placeholder="请输入内容" class="input-with-select searchWrap" v-model="infoText">
            <el-select slot="prepend" placeholder="请选择" v-model="typesearch" class="slt_typesearch" style="width:100px;">
              <el-option label="学生姓名" value="1"></el-option>
              <el-option label="家长手机号" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
          </el-input>
        <el-button type="primary" @click="searchBtn" style="margin-left:10px;">搜索</el-button>
        <el-button type="primary" @click="goAddStudent">新增学生</el-button>
      </div>
      <!--表格-->
      <el-table
        v-if="tableData"
        :data="tableData"
        border
        style="width: 100%" :row-class-name="isCenter" :header-cell-style="{'text-align':'center'}">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="80">
        </el-table-column>
        <!--<el-table-column
          prop="studentId"
          label="学号"
          width="120">
        </el-table-column>-->
        <el-table-column
          prop="realname"
          label="学生姓名"
          width="80">
          <template slot-scope="scope" >
            <div @click="toDetail(scope.row)"><span class="nameSpan">{{scope.row.realname}}</span></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          >
          <template slot-scope="scope" >
            <div><span v-if="scope.row.sex==0">女</span><span v-if="scope.row.sex==1">男</span></div>
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="mobile"
          label="学生手机号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="stage"
          label="学段"
          width="60">
          <template slot-scope="scope">
            {{ commonStage[scope.row.stageCode] }}
          </template>
        </el-table-column>-->
        <el-table-column
          prop="grade"
          label="年级"
          >
          <template slot-scope="scope">
            {{ gradesObj[scope.row.gradeCode] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="seowonName"
          label="所属书院">
        </el-table-column>
        <el-table-column
          prop="schoolName"
          label="所在学校"
          width="260">
        </el-table-column>
        <el-table-column
          prop="parentName"
          label="关联家长">
        </el-table-column>
        <el-table-column
          prop="parentMobile"
          label="家长手机号">
        </el-table-column>

        <el-table-column
          prop="createDate"
          label="注册时间">
        </el-table-column>
       <!-- <el-table-column
          prop="referrer"
          label="推荐人"
          width="90">
        </el-table-column>
        <el-table-column
          prop="receptionist"
          label="接待人"
          width="90">
        </el-table-column>
        <el-table-column
          prop="createName"
          label="录入人"
          width="120">
        </el-table-column>-->
        <el-table-column
          prop="active"
          label="操作"
          width="100"
          fixed="right">
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="primary"
              @click="editStudent(scope.$index,scope.row)"
              >编辑</el-button>
            <el-button
              size="medium"
              type="primary"
              @click="deleteBtn(scope.$index,scope.row)"
              v-if="false"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        v-show="tableData"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!--弹出框-->


      <!--编辑学生弹出框-->
      <!--<el-dialog title="编辑学生信息" :visible.sync="editStudentTK">
        <div class="content">
          <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="姓名" prop="realname">
              <el-input v-model.trim="form.realname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex" >
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="学号" prop="studentId">
              <el-input v-model.trim="form.studentId" ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model.trim="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="学校">
              <el-select v-model="form.provinceId" placeholder="省" class="school-sel" @change="getProvince(false,form.provinceId,'1')">
                <el-option :label="item.areaName" :value="item.areaId" v-for="(item,index) in provinceObj" :key="item.areaId"></el-option>
              </el-select>
              <el-select v-model="form.cityId" placeholder="市/区" class="school-sel" @change="getProvince(false,form.cityId,'2')">
                <el-option :label="item.areaName" :value="item.areaId" v-for="(item,index) in cityObj" :key="item.areaId"></el-option>
              </el-select>
              <el-select v-model="form.countyId" placeholder="区/县" class="school-sel" @change="getSchoolList(false,form.countyId)">
                <el-option :label="item.areaName" :value="item.areaId" v-for="(item,index) in countyObj" :key="item.areaId"></el-option>
              </el-select>
              <el-select v-model="form.schoolCode" placeholder="学校" class="school-sel" value-key="schoolId">
                <el-option :label="item.schoolName" :value="item" v-for="(item,index) in schoolObj" :key="item.schoolId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学段" prop="stageCode">
              <el-select v-model="form.stageCode" placeholder="请选择学段" @change="getGradeList(true,true)">
                <el-option :label="item.stageName" :value="item.stageCode" v-for="(item,index) in stageListEdit" :key="item.stageCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学年" prop="gradeCode">
              <el-select v-model="form.gradeCode" placeholder="请选择学年">
                <el-option :label="item.gradeName" :value="item.gradeCode" v-for="(item,index) in gradeListEdit" :key="item.gradeCode"></el-option>
              </el-select>
            </el-form-item>
            <div class="sub-list" v-for="(item,index) in form.lfList">
              <el-row>
                <el-col style="width:300px;">
                  <div class="grid-content bg-purple">
                    <el-form-item label="学科" :prop="'lfList.'+index + '.subjectName'" :rules="{required: false, message: '请输入学科', trigger: 'blur' }">
                      <el-input v-model.trim="item.subjectName" style="width:200px;"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col style="width:320px;">
                  <div class="grid-content bg-purple-light">
                    <el-form-item label="教材版本" :prop="'lfList.'+index + '.bookTypeName'" :rules="{required: false,message: '请输入教材版本', trigger: 'blur'}">
                      <el-input v-model.trim="item.bookTypeName" style="width:200px;"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col style="width:100px;">
                  <div class="grid-content bg-purple-light">
                    <span v-if="(index+1)==form.lfList.length"><i class="el-icon-circle-plus-outline icon-1" @click="addSub(index)"></i><span class="icon-name"></span></span>
                    <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeSub(index)"></i><span class="icon-name"></span></span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-form-item label="所属书院">
              <span>{{ form.seowonName }}</span>
            </el-form-item>
            <el-form-item label="家长手机号" prop="parentMobile">
              <el-input v-model.trim="form.parentMobile "></el-input>
            </el-form-item>
            <el-form-item label="家长微信号" prop="parentWechatId">
              <el-input v-model.trim="form.parentWechatId"></el-input>
            </el-form-item>
            <el-form-item label="推荐人" prop="referrer" >
              <el-input v-if="form.enable0" v-model="form.referrer" placeholder="请输入推荐人姓名" maxlength="10" ></el-input>
              <span v-else>{{form.referrer}}</span>
            </el-form-item>
            <el-form-item label="接待人" prop="receptionist" >
              <el-input v-if="form.enable1" v-model="form.receptionist"  placeholder="请输入接待人姓名" maxlength="10"></el-input>
              <span v-else>{{form.receptionist}}</span>
            </el-form-item>
            <el-form-item label="录入人" prop="createName">
              <el-input  v-if="form.enable2" v-model="form.createName" placeholder="请输入录入人姓名" maxlength="10"></el-input>
              <span v-else>{{form.createName}}</span>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="form.remark" maxlength="200"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-wrap">
          <el-row>
            <el-button @click="editClose">取消</el-button>
            <el-button type="primary" @click="editMake">确认</el-button>
          </el-row>

        </div>
      </el-dialog>-->
    </div>



</template>
<script>
  import moment from "moment";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
        const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        this.isTrueParentNum = false;
        if (reg.test(value)) {
         this.tryTel(callback,value)
          // callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
    };
    var checkPhone1 = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
      if (reg.test(value)) {
        // this.tryTel(callback,value)
        this.isStudentTel = true
      } else {
        this.isStudentTel = false
        return callback(new Error('请输入正确的手机号'));
      }
    };

    return {
      /*筛选条件*/
      stageList:[], //学段
      gradeList: [], //学年
      subjectList: [],
      subjectsObj:this.commonSubject,
      gradesObj:this.commonGrond,
      stageObj:this.commonStage,
      stageCode:"", //学段code
      gradeCode: '', //年级code
      subjectCode: '', //学科code
      infoText:null, //信息input
      isSort:false, //筛选判断
      typesearch:"1",
      /*表格(教师列表)*/
      tableData: null,
      /*分页*/
      currentPage:1, //当前页数
      total:null, //数据个数
      pageSize:10, //每页几条
      rules: {
        realname : [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 0, max: 10, message: '长不能输入超过10个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true},
        ],
        // mobile :[
        //   {required: false,validator: checkPhone, trigger: 'blur'}
        // ],
        stageCode : [
          { required: true},
        ],
        gradeCode: [
          { required: true,message:"请选择学年"},
        ],
        parentWechatId:[
          { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, message: '请输入正确的微信号'},
        ],
        parentMobile :[
          {required: false,validator: checkPhone, trigger: 'blur'}
        ],
        mobile :[
          {required: false, validator: checkPhone1,trigger: 'blur'}
        ],
      },
      /*编辑学生弹出框参数*/
      isTrueParentNum:true,
      editStudentTK:false, //编辑学生弹出框
      provinceObj:[], //省列表
      cityObj:[], //市列表
      countyObj:[], //县列表
      schoolObj:[], //学校列表
      stageListEdit:[], //编辑学段列表
      gradeListEdit:[], //编辑学年列表
      isStudentTel:true,
      form:{
        lfList:[
          {
            subjectName:"",
            bookTypeName:""
          }
        ],
        realname :null,
        sex :null,
        studentId :null,
        mobile :null,
        provinceId :null,
        countyId :null,
        cityId :null,
        schoolCode:null,
        schoolName:null,
        stageCode :null,
        gradeCode :null,
        parentWechatId :null,
        parentMobile :null,
        remark :null,
        seowonCode:"110102001",
        seowonName:"新国人书院总院",
        createName:null,  //录入人
        receptionist:null, //接待人
        referrer:null, //推荐人
        courses:[],
        enable0:true,  //推荐
        enable1:true,  //接待
        enable2:true,   //录入
      }

    }
  },
  created() {
    this.getStagesList()
    this.getGradeList();
    this.getStudentList();
  },
  filters:{

  },
  methods: {

    /*验证手机*/
    tryTel:function(callback,value){
      var $this = this;
      var obj = {
        pageNum:1 ,//当前页码
        pageSize:10,//每页条数 ,
        mobile:value
      }
      this.$axios
        .post("/user/getParents", obj)
        .then(res => {
          if(res.code=="000000"){
           // $this.form.createName=null;
           //  $this.form.receptionist=null;
           //  $this.form.referrer=null;
            if(res.result.length==0){
              $this.isTrueParentNum = false;
              if(callback){
                callback(new Error('没有相应的家长手机号码,请重新填写'));
              }
            }else{
              $this.isTrueParentNum = true;
              for(var i=0;i<res.result.length;i++){
                // console.log(res.result[i].createName,"++++")
                if(res.result[i].createName != null && res.result[i].createName != ""){
                  $this.form.createName=res.result[i].createName;
                  $this.form.enable2=false //录入
                }else{$this.form.enable2=true}

                if(res.result[i].receptionist !=null && res.result[i].receptionist !=""){
                  $this.form.receptionist=res.result[i].receptionist;
                  $this.form.enable1=false //接待
                }else{$this.form.enable1=true}

                if(res.result[i].referrer != null && res.result[i].referrer != ""){
                  $this.form.referrer=res.result[i].referrer;
                  $this.form.enable0=false     //推荐
                }else{$this.form.enable0=true}

              }
            }
          }
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: "验证手机失败"
          });
        });

    },
    /*获取学年列表*/
    getGradeList(isTrue,isTrueOne){
      var $this = this;
      $this.gradeCode = "";
      var obj = {
        stageCode:""
      }
      if(isTrue){
        obj.stageCode  = $this.form.stageCode;
      }else{
        obj.stageCode  = $this.stageCode||''
      }
      if(isTrueOne){
        $this.form.gradeCode = ""
      }
      this.$ajax.getGradesByStage(obj).then(function (result) {
        if(result.code=="000000"){
          if(isTrue){
            $this.gradeListEdit = result.grades||[];
          }else{
            $this.gradeList = result.grades||[];
          }
        }else{
          $this.$message({
             type: 'warning',
             message: "获取学年列表失败"
          });
        }
      })
    },
    /*获取学段列表*/
    getStagesList(isTrue){
      // console.log(gradeCode)
      var $this = this;
      this.$ajax.getStages().then(function (result) {
        if(result.code=="000000"){
          if(isTrue){
            $this.stageListEdit = result.stages;
            $this.getGradeList(true)
          }else{
            $this.stageList = result.stages
            // $this.stageList.unshift({
            //   stageCode:null,
            //   stageName:"请选择"
            // })
          }
        }else{
          $this.$message({
            type: 'warning',
            message: "获取学段列表失败"
          });
        }
      })
    },
    /*获取学生列表*/
    getStudentList(){
      var $this = this;
      var obj = {
        "mobile": null,
        "pageNum": $this.currentPage,
        "pageSize": $this.pageSize,
        "realname": null,
        "studentId": null,
        "wechatId": null,
        "stageCode":$this.stageCode||null,
        "gradeCode":$this.gradeCode||null,
        "schoolName":null
      };
      if($this.typesearch&&$this.typesearch==1){
        obj.realname = $this.infoText||null;
      }else if($this.typesearch&&$this.typesearch==2) {
        obj.parentMobile = $this.infoText || null;
      }
      this.$axios
        .post("/user/getStudents", obj)
        .then(res => {
          console.log(res)
          for(var i=0;i<res.result.length;i++){
            console.log(res.result[0])
            res.result[i].createDate =  moment(res.result[i].createDate).format("YYYY-MM-DD HH:mm:ss")
          }
          // console.log(res.result)
          $this.tableData = res.result;
          $this.total = res.totalRows;
        })
        .catch(err => {
          this.$message({
            type: 'warning',
            message: "获取学生列表失败"
          });
        });
    },
    /*表格*/
    indexMethod(index) {
      return index +1
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
              $this.form.schoolCode = null;
            }
          }else if(type=="1"){
            $this.cityObj = result.areas;
            if(!isTrue){
              $this.form.cityId = null;
              $this.countyObj = [];
              $this.form.countyId = null;
              $this.schoolObj = [];
              $this.form.schoolCode = null;
            }

          }else if(type=='2'){
            $this.countyObj = result.areas;
            if(!isTrue){
              $this.form.countyId = null;
              $this.schoolObj = [];
              $this.form.schoolCode = null;
            }
          }else if(type=='3'){
            $this.getSchoolList(code)
          }
          if(isTrue&&type=="0"){
            $this.getProvince(true,$this.form.provinceId,"1")
          }else if(isTrue&&type=="1"){
            if(!$this.form.cityId){
              return false
            }
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
        $this.form.schoolCode = ''
      }
      this.$ajax.getSchools(obj).then(function (result) {
        console.log(result)
        if(result.code=="000000"){
          $this.schoolObj = result.schools||[];
          console.log($this.form.schoolCode,"1234")
          for(var i=0;i<$this.schoolObj.length;i++){
            if($this.form.schoolCode==$this.schoolObj[i].schoolId){
              $this.form.schoolCode = $this.schoolObj[i]
            }
            // $this.form.schoolCode
          }
        }else{
          $this.$message({
            type: 'warning',
            message: "获取省市区县列表失败"
          });
        }
      })
    },
    /*增加学科教材版本*/
    addSub:function (index) {
      var $this = this;
      if(!$this.form.lfList[index].subjectName||!$this.form.lfList[index].bookTypeName){
        $this.$message({
          type: 'warning',
          message: "请先填写本行的学科和教材版本哦"
        });
        return false
      }
      $this.form.lfList.push(
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
      $this.form.lfList.splice(index,1)
    },
    /*编辑学生弹出框*/
    editStudent:function(index,item){
      this.$router.push({path:'/addStudent',query:{id:item.userId}});
    },
    /*编辑学生确认按钮*/
    editMake(){
      var $this = this;
      if($this.checkData()){
        var obj ={
          "cityId": $this.form.cityId||null,
          "countyId": $this.form.countyId||null,
          "courses": null,
          "createName": $this.form.createName, //录入人
          "receptionist":$this.form.receptionist, //接待人
          "referrer":$this.form.referrer, //推荐人
          "gradeCode": $this.form.gradeCode,
          "mobile": $this.form.mobile,
          "parentMobile": $this.form.parentMobile||null,
          "parentWechatId": $this.form.parentWechatId||null,
          "provinceId": $this.form.provinceId||null,
          "realname": $this.form.realname||null,
          "remark": $this.form.remark,
          "schoolCode":null,
          "schoolName": null,
          "seowonCode": $this.form.seowonCode||null,
          "seowonName": $this.form.seowonName||null,
          "sex": $this.form.sex,
          "stageCode": $this.form.stageCode,
          "studentId": $this.form.studentId ,
          "updateName": $this.form.updateName||"小丰",
          "userId": $this.form.userId
        };
        if($this.form.schoolCode){
          obj.schoolCode = $this.form.schoolCode.schoolId
          obj.schoolName = $this.form.schoolCode.schoolName
        }
        // for(var i = 0;i<$this.form.lfList.length;i++){
        //   if(!$this.form.lfList[i].subjectName||!$this.form.lfList[i].bookTypeName){
        //     $this.$message({
        //       type: 'warning',
        //       message: "您还有学科或者教材版本未填写哦"
        //     });
        //     return false
        //   }
        // }
        obj.courses = JSON.stringify($this.form.lfList);
        console.log(obj)


      }
    },
    /*提交前检查*/
    checkData:function(){
      var $this = this;
      if(!$this.form.realname){
        $this.$message({message: '请填写姓名', type: 'warning'});
        return false
      }
      if(!$this.form.sex){
        $this.$message({message: '请选择性别', type: 'warning'});
        return false
      }
      if($this.form.mobile){
        var  reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
        if(!reg.test($this.form.mobile)){
          $this.$message({message: '请输入正确的学生手机号', type: 'warning'});
          return false
        }
      }
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
    /*点击搜索按钮*/
    searchBtn(){
      // if(!this.gradeCode&&!this.subjectCode&&!this.radio&&!this.infoText){
      //   return
      // }
      this.currentPage = 1;
      this.pageSize = 10;
      this.getStudentList()
    },
    /*点击删除*/
    deleteBtn:function(index,item){
      var $this = this;
      console.log(item)
      this.$confirm('确认要删除该学生吗?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          "updateName":"小丰",
          "userId":item.userId
        }
        console.log(obj)
        this.$axios
          .post("/user/deleteStudent", obj)
          .then(res => {
            if(res.code=="000000"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              $this.getStudentList()
            }else{
              this.$message({
                type: 'warning',
                message: "删除失败"
              });
            }
          })
          .catch(err => {
            this.$message({
              type: 'warning',
              message: "删除失败"
            });
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //设置表的样式
    isCenter({row, column, rowIndex, columnIndex}){
      return 'isCenter3'
    },
    /*分页*/
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStudentList()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStudentList()
    },
    /*点击跳转查看学生页面*/
    toDetail(row){
      window.localStorage.setItem("tmpStudentInfo",JSON.stringify(row))
      this.$router.push({path:"/studentDetail"})
    },
    /*跳转新增学生页面*/
    goAddStudent:function () {
      this.$router.push({path: '/addStudent'})
    }
  },
  watch:{
  },
  components: {

  }
}
</script>

<style scoped>
  .studentList-content .el-input{
    width:30%;
  }
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
  /*new*/
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
  .studentList-content .nameSpan{
    color:#409EFF;
    cursor:pointer;
    text-decoration: underline;
  }
</style>
<style>
  .isCenter3 td{text-align: center;  height:48px;
    line-height:48px;
    padding:0;}
  /*.isCenter3 td:last-child{text-align: left}*/
</style>
