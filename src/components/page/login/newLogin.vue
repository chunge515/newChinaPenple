<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="login-logo">
        <b>新国人书院后台管理系统</b>
      </div>
      <div class="login-box-body">
        <p class="login-box-msg"></p>
        <form class="margin-bottom">
          <div class="form-group has-feedback">
            <input type="text" placeholder="请输入账号或手机号" class="form-control" v-model="account">
            <!-- <span class="glyphicon glyphicon-envelope form-control-feedback"></span> -->
            <span class="help-block"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" placeholder="请输入密码" class="form-control" v-model="pwd">
            <!-- <span class="glyphicon glyphicon-lock form-control-feedback"></span> -->
            <span class="help-block"></span>
          </div>
          <!-- <div class="form-group has-feedback">
            <span class="help-block errorinfo" @click="rePwd">忘记密码?</span>
          </div>-->

          <el-button type="text" @click="dialogVisible = true">忘记密码?</el-button>

          <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-input placeholder="原手机号" class="el-input1" v-model="olMobile"></el-input>
            <br>
            <el-input placeholder="请输入验证码" v-model="verCode"></el-input>
            <span class="newPw" @click="rePwd">{{codeInfo}}</span>
            <br>
            <el-input placeholder="请输入新密码" class="el-input3" v-model="newPwd"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="newPwdt">提交</el-button>
            </span>
          </el-dialog>

          <!-- <el-popover
          placement="bottom"
          width="200"
          trigger="click"
            >
          <el-input  placeholder="原手机号" class="el-input1" v-model="olMobile"></el-input><br>
          <el-input  placeholder="请输入验证码" v-model="verCode"></el-input><span class="newPw"  @click="rePwd">{{codeInfo}}</span><br>  
          <el-input  placeholder="请输入新密码" class="el-input3" v-model="newPwd" ></el-input>
          <el-button @click="newPwdt">提交</el-button>
          <el-button slot="reference" form-group has-feedback>
            <span class="help-block errorinfo " >忘记密码?</span>
          </el-button>
          
          </el-popover>-->
          <!-- <el-button @click="newPwdt" class="sub">提交</el-button> -->
          <div class="row">
            <div class="col-xs-12">
              <button type="button" class="btn btn-primary btn-block btn-flat" @click="loginInfo">登录</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: "",
      pwd: "",
      olMobile: "",
      newPwd: "",
      verCode: "",
      codeInfo: "获取验证码",
      dialogVisible: false
    };
  },
  methods: {
    loginInfo() {
      // 校验用户密码格式
       let reg = /^1[3-9][0-9\d{8}$]/
      if (!reg.test(this.account)){ 
        this.$message("请输入正确的手机号")
        return
      }
      if(this.account.length !== 11){
        this.$message('手机号码为11位')
        return;
      }
      if (!this.account) {
        this.$message.error("请输入账号或手机号");
        return;
      }
      if (!this.pwd) {
        this.$message.error("请输入密码");
        return;
      }
      if (this.pwd.length < 6 || this.pwd.length > 16) {
        this.$message.error("密码为6-16位");
        return;
      }
     
      // 登录
      this.$axios

        .post("/management/login", {
          mobile: this.account,
          password: this.pwd
        })
        .then(res => {
          console.log(res);
          if (res.code == "000000") {
            this.$router.push({ path: "/parentMange" });
            localStorage.setItem("uid", res.administratorId);
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 重置密码
    rePwd() {
      this.$axios
        .post("/management/sendResetPasswordSms", {
          mobile: this.olMobile
        })
        .then(res => {
          if (res.code == "000000") {
            if (this.olMobile != "") {
              this.$message(res.message);
              this.sendTimer();
            }
          } else {
            this.$message(res.message);
          }
        });
      // }
    },
    // 新密码
    newPwdt() {
      this.$axios
        .post("/management/resetPassword", {
          mobile: this.olMobile,
          newPassword: this.newPwd,
          validateCode: this.verCode
        })
        .then(res => {
          if (res.code == "000000") {
            this.$message("重置密码成功");
            this.dialogVisible = false;
            // localStorage.setItem("newPwdNum",this.newPwd)
          }
        });
    },
    sendTimer() {
      var that = this;
      console.log(1111);
      var time = 60;
      var sendTimer22 = setInterval(function() {
        //   that.isOvertime = true;
        that.codeFlag = 2;
        that.codeInfo = "已发送" + time + "s";
        time--;
        console.log(time);
        if (time < 0) {
          that.codeFlag = 3;
          that.codeInfo = "重新发送";
          clearInterval(sendTimer22);
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../../../static/img/login.jpg) repeat-x;
  background-size: cover;
}
.login-box {
  margin: 0 auto 7%;
  padding-top: 7%;
  width: 360px;
}
.login-logo b {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
}
.login-logo {
  font-size: 35px;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 300;
}
.login-box-body {
  background: #fff;
  padding: 20px;
  border-top: 0;
  color: #666;
}
.login-box-msg {
  margin: 0;
  text-align: center;
  padding: 0 20px 20px;
}
.margin-bottom {
  margin-bottom: 20px;
}
.has-feedback {
  position: relative;
}
.form-group {
  margin-bottom: 15px;
  text-align: right;
}
.form-control:not(select) {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.form-control {
  box-shadow: none;
  border-color: #d2d6de;
}
.form-control {
  display: block;
  /* width: 100%; */
  width: 306px;
  height: 34px;
  /* padding:6px 0 6px 12px ; */
  padding-left: 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
}
.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  pointer-events: none;
  color: #777;
}
.glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.row {
  height: 34px;
  width: 320px;
}
.btn-block {
  display: block;
  width: 100%;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.newPw {
  position: relative;
  top: -36px;
  left: 242px;
  /* background: #ccc; */
  height: 33px;
  display: inline-block;
  line-height: 33px;
  cursor: pointer;
}
.newPw:hover{
  color:blue
}
el-input {
  margin-top: 0;
}
.el-input1 {
  margin-bottom: 15px;
}
.el-input3 {
  margin-top: -11px;
  margin-bottom: 30px;
}
.el-button {
  margin-bottom: 20px;
}
.margin-bottom {
  position: relative;
}
/* .sub{
  position: absolute;
} */
</style>





