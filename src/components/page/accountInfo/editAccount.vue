<template>
    <div>
        <commonTitle>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>账号管理</el-breadcrumb-item>
                <el-breadcrumb-item>新建账号</el-breadcrumb-item>
            </el-breadcrumb>
        </commonTitle>
        <div>
            <p>
                <label>用户姓名 <span>*</span></label>
                <el-input v-model="username" placeholder="请输入姓名"></el-input>
            </p>
             <p>
                <label>手机号<span>*</span></label>
                <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
            </p>
             <p>
                <label>所属书院<span>*</span></label><span>新国人书院总院</span>
            </p>
            <p>
                <label class="sch">关联角色<span>*</span></label>
                <el-select v-model="value" placeholder="请选择" @change="selectRole">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </p>
        </div>

      <el-button type="primary" plain style="margin-top: 100px; margin-left:25px" @click="addUser">保存</el-button>
      <el-button type="primary" plain style="margin-top: 100px; margin-left:25px" @click="cancel">取消</el-button>


    </div>
</template>
<script>
export default {
    data(){
        return {
            value:'',
            username:'',
            mobile:'',
            tableData:[],
            administratorId:'',
            options:[
                {value:'SERVICE_TEACHER',label:'服务导师'},
                {value:'ENROLLMENT_DIRECTOR',label:'院长'},
                {value:'INTERVENE_TEACHERE',label:'干预导师'},                
                {value:'TEACHING_DIRECTOR',label:'教学主管'}

            ],
            role:'',
        }
    },
    created(){
        this.getInfo();
    },
    methods:{
        addUser(){
            // 校验信息
             if(!this.username){
                this.$message(('请输入用户名'));
                    return;
                }
            const reg = /^1[3-9][0-9]\d{8}$/
            if (reg.test(this.mobile)) {
                } else {
            this.$message(('请输入正确的手机号'));
                return;
            }
            // console.log(this.role)
          this.$axios.post('/management/modifyAdministrator', {
            "administratorId": this.administratorId,
            "mobile": this.mobile,
            "name": this.username,
            "role": this.role
            }) .then(res =>{
                if(res.code == '000000'){
                    this.$router.push({path:'/newAccount'})
                }
            })
        },
        // 取消
        cancel(){
            this.$router.push({path:'/newAccount'})
        },
        selectRole(ev){
            this.role = ev
        },
        // 初始化信息
        getInfo(){
            this.tableData = this.$route.query.user
            this.username = this.tableData.name;
            this.mobile = this.tableData.mobile;
            this.value = this.tableData.role;
            this.administratorId = this.tableData.id
            switch (this.tableData.role)
                  {
                  case '服务导师':
                      this.tableData.role = 'SERVICE_TEACHER';
                      break;
                  case '院长':
                      this.tableData.role = 'ENROLLMENT_DIRECTOR';
                      break;
                  case '干预导师':
                      this.tableData.role = 'INTERVENE_TEACHERE';
                      break;
                  case '教学主管':
                      this.tableData.role = 'TEACHING_DIRECTOR';
                      break;
                  default:
                      console.log(123)
                  }
                  this.role = this.tableData.role
        }
    }
}
</script>
<style scoped>
p{
    margin-bottom: 20px;
}
label{
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 40px;
    color: #000;
}
label>span{
    color: #f00;
}
.sch{
    margin-right: 35px;
}
.el-input{
    width: 213px;
}
</style>


