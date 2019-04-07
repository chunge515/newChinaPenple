<template>
    <div class="addAccount">
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
                <!-- <input type="text" v-model="username"> -->
            </p>
             <p>
                <label>手机号<span>*</span></label>
                <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
                <!-- <input type="text" v-model="mobile"> -->
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
                    :value="item.value"
                    change="secRole">
                    </el-option>
                </el-select>
            </p>
        </div>

      <el-button type="primary" plain style="margin-top: 100px; margin-left:25px" @click="addUser">新增账号</el-button>

    </div>
</template>
<script>
export default {
    data(){
        return {
            value:'',
            username:'',
            mobile:'',
            options:[
                {value:'1',label:'服务导师'},
                {value:'2',label:'院长'},
                {value:'3',label:'干预导师'},                
                {value:'4',label:'教学主管'}

            ],
            role:'',
        }
    },
    methods:{
        // 新增用户
        addUser(){
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
            
          this.$axios.post('/management/addAdministrator', {
           "mobile": this.mobile,
            "name": this.username,
            "role": this.role,
            }) .then(res =>{
                if(res.code == '000000'){
                    console.log(res)
                    this.$router.push({path:'/newAccount'})
                }
            })
        },
        // 枚举类型
        selectRole(ev){
            switch (ev)
            {
            case '1':
                this.role = 'SERVICE_TEACHER';
                break;
            case '2':
                this.role = 'ENROLLMENT_DIRECTOR';
                 break;
            case '3':
                this.role = 'INTERVENE_TEACHERE';
                break;
            case '4':
                this.role = 'TEACHING_DIRECTOR';
                 break;
            default:
                console.log(123)
            }
            console.log(this.role)
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


