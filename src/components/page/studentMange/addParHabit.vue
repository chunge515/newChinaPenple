<template>
    <div class="addParent addHabit">
      <!--<el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            课程名称：<el-input v-model="className" placeholder="请输入内容" style="width:60%"></el-input>
          </div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>

      </el-row>-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :class="{'editInput':isEdit}">
        <el-form-item label="上课教师" prop="teaName">
          <el-input v-model.trim="ruleForm.name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="学科" prop="subject">
          <el-select v-model="ruleForm.role" placeholder="请选择身份">
            <el-option label="爸爸" value="shanghai"></el-option>
            <el-option label="妈妈" value="beijing"></el-option>
            <el-option label="其他亲属" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课日期" prop="data">
          <el-date-picker
            v-model="ruleForm.data"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="记录人" prop="inputName">
          <el-input v-model.trim="ruleForm.inputName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"  v-if="!isEdit">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"  v-if="!isEdit">新增家长</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      /*筛选条件*/

      ruleForm: {
        name: '',
        tel:'',
        weChat:'',
        role: '',//角色
        desc: '',
        inputName:'',//录入人
      },
      rules: {
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 0, max: 10, message: '不能输入超过10个字符', trigger: 'blur' }
        ],
        tel:[
          {required: true,validator: checkPhone, trigger: 'blur'}
        ],
        weChat:[
          { required: true, message: '请输入微信号', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ],
        desc: [
          { max: 1000, message: '不能输入超过1000个字符', trigger: 'blur' }
        ],
        inputName:[
          { required: true, message: '请输入录入人姓名', trigger: 'blur' },
        ]
      },
      isEdit:false,// 是否是编辑
    }
  },
  created() {
    var a=this.parentInfo;
    console.log(a,"-----")
    if(JSON.stringify(a)){
      this.isEdit=true;
      this.ruleForm={
          name: a.name,
          tel:a.telphone,
          weChat:a.wechat,
          role:a.role,
          desc:'后台返回',
      };

    }
  },
  filters:{
  },
  methods: {
    getData(){
      var flag=false
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
         flag=true
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      if(flag){
        return this.ruleForm
      }
    },
    submitForm(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
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
    }
  },
  props:['parentInfo'],
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
  .addHabit{
    padding-top:20px;
  }
</style>
