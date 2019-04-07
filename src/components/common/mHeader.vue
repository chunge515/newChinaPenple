<template>
  <div class="header">
    <div class="logo">
      新国人书院运营管理平台
      <!--<span>-校长端</span>-->
    </div>
    <!--<div class="schoolName">学校名称</div>-->
    <div class="user-info" v-if="true">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">{{this.name}}</span>
        <el-dropdown-menu slot="dropdown">
          <div id="headDrop">
            <!--<div>-->
            <!--<el-dropdown-item command="userManger">用户管理</el-dropdown-item>-->
            <!--<el-dropdown-item style="position:relative" class="sourceFa">-->
            <!--<i class="el-icon-caret-left"></i><span>课程管理</span>-->
            <!--<ul class="boxSource">-->
            <!--<li>报告解读课</li>-->
            <!--<li>能力训练课</li>-->
            <!--</ul>-->
            <!--</el-dropdown-item>-->
            <!--<el-dropdown-item style="position:relative" class="sourceFa">-->
            <!--<i class="el-icon-caret-left"></i><span>运营管理</span>-->
            <!--<ul class="boxSource">-->
            <!--<li>订单列表</li>-->
            <!--<li>订单流水</li>-->
            <!--</ul>-->
            <!--</el-dropdown-item>-->
            <!--</div>-->

            <el-dropdown-item command="personInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      size="tiny"
      :show-close="false"
      class="passwordBox"
    >
      <el-form :label-position="labelPosition" class="innerbox" label-width="80px" :model="form">
        <el-form-item label="原密码">
          <el-input
            type="password"
            placeholder="请输入6-12位新密码"
            v-model="form.pwd"
            :maxlength="maxlength"
            auto-complete="off"
            class="pwd"
            @blur="pwdT"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            type="password"
            placeholder="请输入6-12位新密码"
            v-model="form.pwd2"
            :maxlength="maxlength"
            auto-complete="off"
            class="pwd"
            @blur="pwdT2"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            type="password"
            placeholder="请再次输入新密码"
            v-model="form.pwd3"
            :maxlength="maxlength"
            auto-complete="off"
            class="pwd"
            @blur="pwdT3"
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="changeP">
        <el-button type="primary" @click="changePwd" class="changeP-b">确 定</el-button>
        <el-button @click="dialogFormVisible = false" class="changeP-b">取 消</el-button>
      </p>
    </el-dialog>
    <!-- 个人信息 -->
    <el-dialog
      title="个人信息"
      :visible.sync="peopleInfo"
      size="tiny"
      :show-close="false"
      class="passwordBox"
    >
      <p class="el-name" style="margin-bottom:30px">
        姓名
        <span class="sp" style="margin-left:66px" v-show="showInfo">{{this.name}}</span>
        <input v-model="name" class="userMessage uM" v-show="!showInfo">
      </p>
      <p class="el-mobile el-name">
        手机号
        <span class="sp" style="margin-left:50px">{{this.mobile}}</span>
        <!-- <input v-model="mobile" class="userMessage" v-show="!showInfo"> -->
        <span class="changeMobile" @click="changeMobile">换绑</span>
      </p>
      <el-button type="primary" plain style="margin-top: 100px; " @click="edit">编辑</el-button>
      <el-button type="primary" plain style="margin-top: 100px; margin-left:25px" @click="save">保存</el-button>
      <!-- 更换手机号 -->
      <div class="chMobile" v-show="flag">
        <div v-show="oldMobileFlag">
          <el-input placeholder="原手机号" v-model="mobile"></el-input>
          <el-input placeholder="请输入验证码" v-model="verCode"></el-input>
          <span class="getVer" @click="getVerCode">{{codeInfo}}</span>
          <br>
          <!-- <input placeholder="原手机号" class="cBorder"><br>
          <input placeholder="请输入验证码" > <span @click="getVerCode">获取验证码</span><br>-->
          <button @click="next">下一步</button>
        </div>

        <div v-show="!oldMobileFlag">
          <el-input placeholder="请输入手机号" v-model="getNewMObile"></el-input>
          <el-input placeholder="请输入验证码" v-model="getNewCode"></el-input>
          <span @click="getVerCodeTwo">{{codeInfo}}</span>
          <br>
          <!-- <input placeholder="请输入手机号" class="cBorder"><br>
          <input placeholder="请输入验证码" > <span @click="getVerCode">获取验证码</span><br>-->
          <button @click="end">完成</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import md5 from "js-md5";

var setInt
export default {
  data() {
    return {
      maxlength: 12,
      minlength: 6,
      labelPosition: "left",
      userInfo: this.localData.get("userInfo"), //用户登录后保存用户信息
      name: "",
      mobile: "",
      getNewMObile: "",
      dialogFormVisible: false,
      peopleInfo: false,
      administratorId: "",
      showInfo: true,
      flag: false,
      oldPwd: "",
      verCode: "",
      newVerCode: "",
      getNewCode: "",
      oldMobileFlag: true,
      codeFlag:1,
      codeInfo:'获取验证码',
      form: {
        pwd: "",
        pwd3: "",
        pwd2: ""
      },
      userPassword:'',
    };
  },
  computed: {
    username() {
      //                let username = localStorage.getItem('ms_username');
      //                return username ? username : this.name;
      return "测试";
    }
  },
  created() {
    this.getUserInfo();
    this.isUser();

  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        // localStorage.clear();
        // if (location.hostname == "localhost") {
        //   window.location.href = "#/login";
        // } else {
        //   window.location.href =
        //     location.protocol + "//" + location.hostname + "/org/index.html";
        // }
        localStorage.clear();
        this.$router.push({path:"/login"})
      }
      if (command == "personInfo") {
        this.peopleInfo = true;
      }
      if (command == "changePwd") {
        this.form = {};
        this.dialogFormVisible = true;
      }

      if (command == "userManger") {
        this.$router.push({ path: "/schoolAdmin/studentList" });
      }

      if (command == "myCourse") {
        this.$router.push({ path: "/classPlan" });
      }
      if (command == "newCourse") {
        this.$router.push({ path: "/courseTime" });
      }
      if (command == "InfoNotice") {
        this.$router.push({ path: "/inform" });
      }
      if (command == "warningList1") {
        this.$router.push({ path: "/warningList1" });
      }

      if (command == "courseRecommend") {
        this.$router.push({ path: "/commendClassList" });
      }
      if (command == "orderManage") {
        this.$router.push({ path: "/orderManage" });
      }

      if (command == "classPlan2") {
        this.$router.push({ path: "/classPlan2" });
      }
      if (command == "courseTrack") {
        this.$router.push({ path: "/courseTrack" });
      }
      if (command == "classTrack") {
        this.$router.push({ path: "/classTrack" });
      }
      if (command == "teaMessageList") {
        this.$router.push({ path: "/teaMessageList" });
      }
      if (command == "warningList") {
        this.$router.push({ path: "/warningList" });
      }
    },
    changePwd() {
      if (this.form.pwd2.length < 6) {
        this.$message("您新密码太短");
        return;
      }
      if (this.form.pwd2 != this.form.pwd3) {
        this.$message("两次输入密码不一致");
        return;
      }
      this.$axios
        .post("/management/modifyPassword", {
          administratorId: this.administratorId,
          newPassword: this.form.pwd2,
          oldPassword: this.form.pwd
        })
        .then(res => {
          if (res.code == "000000") {
            this.dialogFormVisible = false;
            this.oldPwd = this.form.pwd2;
            localStorage.setItem("userPwd", this.oldPwd);
            this.$notify({
              title: "成功",
              message: res.message,
              type: "success"
            });
            this.$router.push({path:'/login'})
          }else{
            this.$message(res.message);
          }
        });
    },
    // 校验密码
    pwdT() {

    },
    pwdT2() {
      if (this.form.pwd2 && this.form.pwd2.length < 6) {
        this.$message("您新密码太短");
        return;
      }
    },
    pwdT3() {
      if (this.form.pwd2 != this.form.pwd3) {
        this.$message("两次输入密码不一致");
        return;
      }
    },
    // 获取用户信息
    getUserInfo() {
        console.log(111,localStorage.getItem("uid"))

      // this.oldPwdNum = localStorage.getItem("newPwdNum")
      console.log(this.oldPwd);
      this.administratorId = localStorage.getItem("uid");
      this.$axios
        .post("/management/getAdministrator", {
          administratorId: this.administratorId
        })
        .then(res => {
          this.name = res.administrator.name;
          this.mobile = res.administrator.mobile;
          this.administratorId = res.administrator.id;
          // this.oldPwd = localStorage.setItem("userPwd",);
        });
    },
    isUser(){
        if(localStorage.getItem("uid") == null){
            this.$router.push({path:'/login'})
        }
    },
    edit() {
      this.showInfo = false;
    },
    save() {
      this.showInfo = true;
      this.peopleInfo = false;
      this.codeInfo = '发送验证码';
      this.verCode='';
    },
    changeMobile() {
      this.flag = true;
    },
    // 下一步
    next() {

      window.clearInterval(setInt)
      this.$axios
        .post("/management/bindMobileOldMobileComfirmValidateCode", {
          "oldMobile": this.mobile,
          "validateCode": this.verCode
        })
        .then(res => {
          if (res.code == "000000") {
            this.oldMobileFlag = false;
            this.codeInfo = '发送验证码';
          }else{
              this.$message("验证码错误");
              this.verCode=''
              this.codeInfo = '重新发送';

          }
        });
    },
    // 完成换绑
    end() {
      window.clearInterval(setInt)
      this.$axios
        .post("/management/bindMobileNewMobileConfirmValidateCode", {
            "newMobile": this.getNewMObile,
            "oldMobile": this.mobile,
            "validateCode": this.getNewCode
        })
        .then(res => {
          if (res.code == "000000") {
            this.flag = false;
            this.oldMobileFlag = true;
            this.verCode='';
            this.codeInfo = '发送验证码';
          }else{
              this.$message("验证码错误");
            this.verCode='';
            this.codeInfo = '重新发送';
          }
        });

    },
    open() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    // 获取验证码
    getVerCode() {
      this.$axios
        .post("/management/bindMobileOldMobileSendValidateCode", {
          "oldMobile": this.mobile
        })
        .then(res => {
          if (res.code == "000000") {
              this.sendTimer();
          }else{
            this.$message(res.message)
          }
        });
    },
    // 第二次获取验证码
    getVerCodeTwo() {
      this.$axios
        .post("/management/bindMobileNewMobileSendValidateCode", {
          "oldMobile": this.mobile,
          "newMobile": this.getNewMObile,
        })
        .then(res => {
          if (res.code == "000000") {
              this.sendTimer()
              this.verCode='获取验证码'
          }
        });
    },

    // 验证码60s
    sendTimer(){
        var that = this
        console.log(1111)
            var time = 60;
            setInt = setInterval(function(){
            //   that.isOvertime = true;
            that.codeFlag = 2;
            that.codeInfo = '已发送'+time+"s";
            time--;
            console.log(time)
            if(time < 0){
            that.codeFlag = 3
            that.codeInfo = '重新发送';
            window.clearInterval(setInt);
          }
        },1000)
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
  /* padding-left: 50px; */
  padding-right: 65px;

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
.passwordBox {
  line-height: 18px;
}
.innerbox {
  padding-left: 20px;
}
.boxSource {
  display: none;
  position: absolute;
  background: #fff;
  width: 100px;
  text-align: center;
  top: 0px;
  right: 101%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  min-width: 150px;
  border-radius: 5px;
  overflow: hidden;
}

#headDrop .sourceFa:hover .boxSource {
  display: block;
  color: #000;
  background-color: #fff;
}

#headDrop {
  min-width: 150px;
  text-align: center;
  border-radius: 5px;
  padding: 0px;
  border: none;
}

#headDrop > li:first-child {
  border-radius: 5px 5px 0px 0px;
}

#headDrop > li:last-child {
  border-radius: 0px 0px 5px 5px;
}

.boxSource li {
  background-color: #fff;
  color: #000;
  border-bottom: 1px solid #dedede;
  line-height: 40px;
}
.boxSource li:last-child {
  border: none;
}
.boxSource li:hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}

.sourceFa > i {
  position: absolute;
  left: 20px;
  top: 12px;
  font-size: 14px;
}
.el-dialog__body{
    position: relative;
}
</style>

<style type="text/css">
#headDrop .el-dropdown-menu__item {
  border-bottom: 1px solid #dedede;
  line-height: 40px;
}

.el-dropdown-menu.el-popper {
  padding: 0px;
}

#headDrop > .el-dropdown-menu__item:last-child {
  border: none;
}
.el-name {
  color: #000 !important;
}
.sp {
  color: #777 !important;
}
.userMessage {
  display: inline-block;
  width: 110px;
  height: 30px;
  margin-left: 39px;
}
.uM {
  margin-left: 65px !important;
}
.changeMobile {
  display: inline-block;
  margin-left: 50px;
  color: blue;
  cursor: pointer;
}
.chMobile {
  /* border: solid #000 1px; */
  width: 350px;
  height: 200px;
  position: absolute;
  top: 60px;
  right: 50px;
  background: #eee;
}
.chMobile > div {
  margin: 0 auto;
  width: 222px;
  padding-top: 30px;
}
.chMobile input {
  padding-left: 5px;
  width: 220px;
  height: 30px;
  margin-bottom: 5px;
}
.chMobile button {
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  width: 70px;
}
.chMobile span {
  position: relative;
  top: -29px;
  left: 134px;
}
.getVer{
  cursor: pointer;
}
.getVer:hover{
  color:blue;
}
</style>
