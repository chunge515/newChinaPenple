<template>
    <div class="header">
        <div class="logo">新国人书院管理系统
            <!--<span>-校长端</span>-->
        </div>
        <div class="schoolName">学校名称</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    小丰
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!--<el-dialog title="修改密码" :visible.sync="dialogFormVisible" size="tiny" :show-close=false class="passwordBox">-->
            <!--<el-form :label-position="labelPosition" class="innerbox" label-width="80px" :model="form">-->
                <!--<el-form-item label="新密码">-->
                    <!--<el-input type="password" placeholder="请输入6-12位新密码" v-model="form.pwd" :maxlength="maxlength" auto-complete="off" class="pwd"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="确认密码">-->
                    <!--<el-input type="password" placeholder="请再次输入新密码" v-model="form.pwd2" :maxlength="maxlength" auto-complete="off" class="pwd"></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<p class="changeP">-->
                <!--<el-button type="primary" @click="changePwd" class="changeP-b">确 定</el-button>-->
                <!--<el-button @click="dialogFormVisible = false" class="changeP-b">取 消</el-button>-->
            <!--</p>-->
        <!--</el-dialog>-->
    </div>
</template>
<script>
import md5 from "js-md5";
export default {
    data() {
        return {
            maxlength: 12,
            minlength: 6,
            labelPosition: "left",
            userInfo: this.localData.get("userInfo"), //用户登录后保存用户信息
            name: "linxin",
            dialogFormVisible: false,
            form: {
                pwd: "",
                pwd2: ""
            }
        };
    },
    computed: {
        username() {
            //                let username = localStorage.getItem('ms_username');
            //                return username ? username : this.name;
            return "测试";
        }
    },
    methods: {
        handleCommand(command) {
            if (command == "loginout") {
                localStorage.clear();
                if (location.hostname == "localhost") {
                    window.location.href = "#/login";
                } else {
                    window.location.href =
                        location.protocol +
                        "//" +
                        location.hostname +
                        "/org/index.html";
                }
            }
            if (command == "changePwd") {
                this.form = {};
                this.dialogFormVisible = true;
            }
        },
        changePwd() {
            if (this.form.pwd.length < 6) {
                this.$message("您新密码太短");
                return;
            }
            if (this.form.pwd != this.form.pwd2) {
                this.$message("两次输入密码不一致");
                return;
            }
            this.$axios
                .post("/authorize/resetUserPwd",
                    {
                        userId: this.userInfo.userId,
                        userName: this.userInfo.userName,
                        userPassword: md5(this.form.pwd)
                    }
                )
                .then(res => {
                    if (res.httpCode == "200") {
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: "成功",
                            message: "重置密码成功",
                            type: "success"
                        });
                    }
                });
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
}
.header .logo {
    float: left;
    width: 290px;
    text-align: center;
}
.header .schoolName {
    float: left;
    font-size: 14px;
}
.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}
.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}
.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.changeP {
    height: 25px;
}

.changeP .changeP-b {
    float: right;
}

.changeP .changeP-b:nth-child(1) {
    margin-left: 10px;
}
.pwd {
    width: 250px;
}
.passwordBox{
    line-height: 18px;
}
.innerbox{
    padding-left: 20px;
}
</style>
