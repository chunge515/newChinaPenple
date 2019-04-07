<template>
  <!--家长信息录入-->
  <div class="add-parent">
    <header>家长信息录入</header>
    <div class="form-con">
      <el-form ref="parentForm" label-position="top":model="submitDetail" :rules="rules1">
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="submitDetail.parentName" placeholder="请输入真实姓名">
            <i v-if="submitDetail.parentName!=''" @click="clearParentName" slot="suffix" class="el-input__icon el-icon-circle-close"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="submitDetail.phone" placeholder="请输入手机号码">
            <i v-if="submitDetail.phone!=''" @click="clearPhone" slot="suffix" class="el-input__icon el-icon-circle-close"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wechatNum">
          <el-input v-model="submitDetail.wechatNum" placeholder="请输入微信号">
            <i v-if="submitDetail.wechatNum!=''" @click="clearWechatNum" slot="suffix" class="el-input__icon el-icon-circle-close"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-select v-model="submitDetail.identity" placeholder="请选择身份">
            <el-option
              v-for="item in identityList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input v-model="submitDetail.studentName" placeholder="请输入真实姓名">
            <i v-if="submitDetail.studentName!=''" @click="clearStudentName" slot="suffix" class="el-input__icon el-icon-circle-close"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="学校" prop="schoolName">
          <el-input v-model="submitDetail.schoolName" placeholder="请输入学校名称">
            <i v-if="submitDetail.schoolName!=''" @click="clearSchoolName" slot="suffix" class="el-input__icon el-icon-circle-close"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="学年" prop="grade">
          <el-select v-model="submitDetail.grade" placeholder="请选择学年">
            <el-option
              v-for="item in gradeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="submitDetail.remarks" type="textarea" :rows="5">
          </el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :data="postData"
            accept="image/jpeg,image/gif,image/png"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="推荐人"  style="display: flex;">
          <span style="margin-left: 1rem;">{{submitDetail.recommendName}}</span>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" @click="addParent" type="primary">录入家长</el-button>
        </el-form-item>
      </el-form>


    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {genUpToken} from "../../../../static/js/qiniuToken.js";
  export default {
    name: "addParentInfomation",
    data() {
      var checkUserPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error("联系电话不能为空"));
        } else if (!/^1[3-9][0-9]\d{8}$/.test(value)) {
          callback(new Error("联系电话格式不正确"));
        } else {
          callback();
        }
      };
      return {
        submitDetail: {
          parentName: '',//家长姓名
          phone: '',//手机号
          wechatNum: '',//微信号
          identity: '',//身份
          studentName: '',//学生姓名
          schoolName: '',//学校名称
          grade: '',//学年
          remarks: '',//备注

          imageUrl:[],//图片地址

          recommendName: '推荐人姓名',//推荐人姓名
        },

        dialogImageUrl: '',
        dialogVisible: false,
        uploadUrl:this.qiniuUpURL,//上传地址
        postData:{}, //七牛上传参数
        fileList:[],//文件路径

        identityList: [
          {
            label: '爸爸',
            value: '爸爸1'
          },
          {
            label: '妈妈',
            value: '爸爸2'
          },
          {
            label: '其他亲属',
            value: '爸爸3'
          },
        ],//身份列表
        gradeList: [
          {
            label: '爸爸',
            value: '爸爸1'
          },
          {
            label: '妈妈',
            value: '爸爸2'
          },
          {
            label: '其他亲属',
            value: '爸爸3'
          },
        ],//学年列表

        rules1:{
          phone:[{required: true,validator:checkUserPhone,trigger:'blur'}],
          studentName: [
            { required: true, message: '请输入学生姓名', trigger: 'change' }
          ],
          grade: [
            { required: true, message: '请学则学年', trigger: 'change' }
          ],
        }
      }
    },
    mounted() {

    },
    created() {
      this.getToken();
    },
    filters:{
    },
    methods: {
      //录入家长
      addParent() {
        var _this = this;
        _this.$alert('您所输入的家长信息已经是我们的用户，请勿重复录入。', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
          center: true
        }).then(() => {

        }).catch(() => {

        })

        _this.$refs["parentForm"].validate(valid => {
          if (valid) {
            //提交
            _this.$alert('家长信息录入成功！ 点击确定录入下一份信息。', '失败', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success',
              center: true
            }).then(() => {

            }).catch(() => {

            })

          }else {


            _this.$alert('上传失败。请重新提交。', '失败', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'error',
              center: true
            }).then(() => {

            }).catch(() => {

            })


          }
        })
      },

      //尾部清除
      clearParentName() {
        var _this = this;
        _this.submitDetail.parentName = '';
      },
      clearPhone() {
        var _this = this;
        _this.submitDetail.phone = '';
      },
      clearWechatNum() {
        var _this = this;
        _this.submitDetail.wechatNum = '';
      },
      clearStudentName() {
        var _this = this;
        _this.submitDetail.studentName = '';
      },
      clearSchoolName() {
        var _this = this;
        _this.submitDetail.schoolName = '';
      },

      //删除图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
        var url="http://"+ this.qiniuURL + file.response.key;
        console.log(url);
        var index=this.submitDetail.imageUrl.indexOf(url);
        if(index>-1){this.submitDetail.imageUrl.splice(index,1)}
      },
      //点击图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传图片
      handleAvatarSuccess(res, file) {
        console.log(res)
        //this.course.imageUrl = URL.createObjectURL(file.raw);
        this.submitDetail.imageUrl.push("http://"+ this.qiniuURL + res.key);
        console.log(this.submitDetail.imageUrl)
      },
      /*获取七牛图片token*/
      getToken(){
        var token;
        var policy = {};
        var bucketName = this.qiniuSpaceURL;
        var AK ='5Nt5ZRgLSrIj8ywvVjqCZvep3dg-Zu9H0321EDiH';
        var SK = '2RekRSQxy72knJjTd4vZZsuqyndLkUijmci7pdUG';
        var deadline = Math.round(new Date().getTime() / 1000) + 3600;
        policy.scope = bucketName;
        policy.deadline = deadline;
        token=genUpToken(AK, SK, policy);
        this.postData.token=token;
      },
    }
  }
</script>

<style scoped lang="less">
  .add-parent {
    width: 100%;
    height: 100vh;
    /*头部*/
    header {
      width: 100%;
      height: 2.2rem;
      line-height: 2.2rem;
      background: #5893d4;
      font-size: 0.9rem;
      color: white;
      text-align: center;
    }
    /*表单内容*/
    .form-con {
      width: 100%;
      height: calc(100vh - 2.2rem);
      overflow: auto;
      box-sizing: border-box;
      padding: 1.2rem;
      .submit-btn {
        width: 100%;
        margin-top: 2.25rem;
        font-size: 0.8rem;
      }
    }
  }

  .el-form-item__label {
    padding: 0 !important;
  }
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
</style>
<style lang="less">
  .add-parent{
    .form-con .el-form-item {
      margin-bottom: 15px;
    }
    .form-con .el-form-item__label {
      padding: 0 !important;
    }
    .form-con .el-select {
      width: 100%;
    }
    .upload-demo .el-upload-list__item,.upload-demo .el-upload--picture-card{
      width: 5rem !important;
      height: 5rem !important;
    }
    .upload-demo .el-upload--picture-card {
      line-height: 5rem !important;
    }
    .el-dialog__wrapper {
      overflow: hidden;
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
    }
    .el-upload-list__item-actions {
      opacity: 1;
      background: rgba(0,0,0,.2);
    }
    .el-upload-list__item-actions span {
      display: inline-block;
    }
    .el-upload-list__item-status-label {
      display: none !important;
    }
    .el-dialog {
      width: 100% !important;
      margin-top: 0 !important;
      height: 100vh !important;
      overflow: hidden;
    }
    .el-message-box {
      width: 65% !important;
    }
  }
</style>
