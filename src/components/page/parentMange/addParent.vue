<template>
    <div class="addParent">
      <commonTitle v-if="!isEdit">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/parentMange' }">家长管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增家长</el-breadcrumb-item>
        </el-breadcrumb>
      </commonTitle>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px"  label-position="left" class="demo-ruleForm" :class="{'editInput':isEdit}">
        <el-form-item label="家长姓名" prop="realname">
          <el-input v-model.trim="ruleForm.realname" placeholder="请输入真实姓名" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="家长手机号" prop="mobile">
          <el-input v-model.trim="ruleForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="与学生关系" prop="relationType">
          <el-select v-model="ruleForm.relationType" placeholder="请选择">
            <el-option v-for="item in nexusList"
                       :label="item.name"
                       :value="item.code"
                       :key="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父母双方谁的陪伴较多" prop="whoAccompanyStudent">
          <el-select v-model="ruleForm.whoAccompanyStudent" placeholder="请选择">
            <el-option v-for="item in nexusList"
                       :label="item.name"
                       :value="item.code"
                       :key="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否与孩子发生过争吵" prop="quarrelWithChild">
          <el-select v-model="ruleForm.quarrelWithChild" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中考您希望孩子选哪三科" prop="hopeChildSubject">
          <el-checkbox-group
            v-model="ruleForm.hopeChildSubject">
            <el-checkbox
            v-for="item in middleSubjects"
            :label="item.code"
            :key="item.code">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="家长是否接送孩子上学" prop="accompanyStudentToSchool">
          <el-select v-model="ruleForm.accompanyStudentToSchool" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家长会一般谁参加" prop="whoAttendParentMeeting">
          <el-select v-model="ruleForm.whoAttendParentMeeting" placeholder="请选择">
            <el-option v-for="item in nexusList"
                       :label="item.name"
                       :value="item.code"
                       :key="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每年教育支出" prop="educationCostEveryYear">
          <el-select v-model="ruleForm.educationCostEveryYear" placeholder="请选择">
            <el-option v-for="item in payList"
                       :label="item.label"
                       :value="item.value"
                       :key="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对家长的初始评价" prop="parentRemark">
          <el-select v-model="ruleForm.parentRemark" placeholder="请选择">
            <el-option v-for="item in firstParentEvaluation"
                       :label="item.label"
                       :value="item.value"
                       :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务导师" prop="tutorial">
          <el-select v-model="ruleForm.tutorial" placeholder="请选择" value-key="id">
            <el-option v-for="item in tutorialList"
                       :label="item.name"
                       :value="item"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"  v-if="!isEdit">新增家长</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      var $this=this;
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        else {
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
              if(res.result.length>0){
                callback(new Error('该家长号已存在'));
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
      }
        else {
          return callback(new Error('请输入正确的手机号'));
        }
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
      ruleForm: {
        realname: '',
        mobile:'',
        relationType: '',//角色
        remark: '',
        whoAccompanyStudent:'',//父母谁陪伴的多
        quarrelWithChild:'',//是否与孩子争吵
        hopeChildSubject:[],//选三科
        whoAttendParentMeeting:'',//家长会谁参加
        accompanyStudentToSchool:'',//家长是否接送孩子
        educationCostEveryYear:'',//教育支出
        parentRemark:'',//对家长的初始评价
        tutorial:null,//服务导师

      },
      nexusList:[
        {code:'0',name:'妈妈'},
        {code:'1',name:'爸爸'},
        {code:'2',name:'其他亲属'},
      ],
      payList:[
        {value:'1',label:'5万以内'},
        {value:'2',label:'10万以内'},
        {value:'3',label:'20万以内'},
        {value:'4',label:'20万以上'},
      ],
      firstParentEvaluation:[
        {value:'0',label:'意向强烈'},
        {value:'1',label:'意向不强烈'},
      ],
      tutorialList:[],//导师列表
      middleSubjects:[
        {code:'4',name:'物理'},
        {code:'5',name:'化学'},
        {code:'6',name:'生物'},
        {code:'7',name:'历史'},
        {code:'9',name:'政治'},
        {code:'8',name:'地理'},
      ],
      rules: {
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 0, max: 10, message: '不能输入超过10个字符', trigger: 'blur' }
        ],
        mobile:[
          {required: true,validator: checkPhone, trigger: 'blur'}
        ],
        relationType: [
           { required: true, message: '请选择与学生关系', trigger: 'change' }
         ],
        remark: [
          { max: 1000, message: '不能输入超过1000个字符', trigger: 'blur' }
        ],
        hopeChildSubject:[
          {validator: checkSub, trigger: 'change' }
        ] ,
         parentRemark:[
          { required: true, message: '请选择对家长的初始评价', trigger: 'change' },
        ],
       tutorial: [
          {required:true, message: '请选择服务导师', }
        ],
       /* */
      },
      isEdit:false,// 是否是编辑
    }
  },
  created() {
    this.getAdministratorsByRoleId();
  },
  filters:{
  },
  methods: {
    //获取服务导师的列表
    getAdministratorsByRoleId(){
      var $this=this;
      this.$axios
        .post("/management/getAdministratorsByRoleId", {  "role": "SERVICE_TEACHER"})
        .then(res => {
          console.log(res)
          $this.tutorialList=res.administrators ||[];
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: err
          });
        });
    },
    submitForm(formName) {
      var $this=this;
      console.log($this.ruleForm.tutorial,"===")
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj=JSON.parse(JSON.stringify($this.ruleForm))
          obj.tutorialCode=$this.ruleForm.tutorial.id;
          obj.tutorialName=$this.ruleForm.tutorial.name;
          obj.hopeChildSubject=JSON.stringify(obj.hopeChildSubject)
          delete obj.tutorial;
          this.$axios
            .post("/user/addParent", obj)
            .then(res => {
              if(res.code=="000000"){
              this.$router.push({path:'/parentMange'})
              }else{
                $this.$message.error(res.message||'请求出错');
              }
            })
            .catch(err => {
              this.$message({
                type: 'info',
                message: err
              });
            });
        } else {
          this.$message.warning('请将信息填写完整');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch:{
    radio: function () {
      this.getTeacherList();
    },

  },

  components: {

  }
}
</script>

<style scoped lang="less">

  .editInput{
    .el-input,.el-textarea{
      width:100%;
    }
  }
  .pic {
     width: 80px;
     height: 80px;
    margin:0 10px 10px 0;
  }


</style>
<style lang="less">
  .addParent{
  .el-input,.el-textarea{
    width:30%;
  }
    .el-input--suffix{
      width:100%;
    }
  }
</style>
