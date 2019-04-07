<template>
  <!--家长信息录入-->
  <div class="addParentInfo">
    <header><div>家长信息录入</div></header>
    <div class="form-con">
      <el-form ref="parentForm" label-width="100px" :model="submitDetail" :rules="rules1">
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
          {{submitDetail.grade}}
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
            <p v-if="submitDetail.imageUrl.length<=0">点击添加图片</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="推荐人">
          <span style="margin-left: 10px;">{{submitDetail.recommendName}}</span>
        </el-form-item>
      </el-form>
    </div>
    <footer>
      <el-button class="submit-btn" @click="addParent" type="primary">录入家长</el-button>
    </footer>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {genUpToken} from "../../../../static/js/qiniuToken.js";
  export default {
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
            { required: true, message: '请选择学年', trigger: 'change' }
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
  .addParentInfo {
    width: 100%;
    height:100%;;
    overflow: auto;
    color: #606266;
    /*头部*/
    header {
      width: 100%;
      height:50px;
      line-height:50px;
      background: #5893d4;
      font-size:14px;
      color: white;
      div{
        width:1000px;
        margin:0 auto;
        padding-left:38px;box-sizing: border-box;
        background: url("../../../../static/img/parent.png") left center no-repeat;
      }
    }
    /*表单内容*/
    .form-con {
      width:1000px;margin:0 auto;
      background: #fff;
      height:auto;
      overflow: hidden;
      box-sizing: border-box;
      padding:45px 25px 0;

    }
    .el-upload--picture-card{
      position: relative;
      i{
        color: #fff;
        width:36px; height: 36px;
        background-color: #ffc52a;
        line-height: 36px; border-radius: 50%;
      }
      p{
        position: absolute;
        left:0;
        top:0;
        text-align: center;
        font-size: 14px;
        line-height:210px;
        width:148px;
        height:148px;
      }
    }
    footer{
      width:1000px;
      margin:0 auto;
      border-top:6px solid #f5f5f5;
      height:100px;
      box-sizing: border-box;
      padding:20px 55px;
      background-color: #fff;
      .submit-btn{
        width:170px;
      }
    }
  }

  /*.el-form-item__label {
    padding: 0 !important;
  }
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }*/
</style>
