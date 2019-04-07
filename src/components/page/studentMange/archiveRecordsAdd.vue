<!--考试成绩记录表 新增、编辑-->
<template>
  <div class="archiveRecordsAdd padTop20">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="考试时间:" prop="examinationDate" :rules="[{required:true,message:'考试时间不能为空'}]">
        <el-date-picker
          v-model="form.examinationDate"
          format="yyyy-MM-dd HH:mm"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="考试科目:" prop="subjectCode" :rules="[{required:true,message:'请选择考试科目'}]">
        <el-select v-model="form.subjectCode" placeholder="请选择考试科目">
          <el-option v-for="subj in subjects" :label="subj.subjectName" :value="subj.subjectCode" :key="subj.subjectCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文理科:" prop="artType" >
        <el-radio v-for="(v,k) in artTypes" :key="k" v-model="form.artType" :label="k">{{v}}</el-radio>
      </el-form-item>

      <el-form-item
        prop="examinationType"
        :rules="[{required:true,  message:'该项必填'}]"
        label="考试类型:">
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.trim="form.examinationType"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="年级:" prop="gradeCode" :rules="[{required:true,message:'请选择年级'}]">
        <el-select v-model="form.gradeCode" placeholder="请选择年级">
          <el-option v-for="subj in grades" :label="subj.gradeName" :value="subj.gradeCode" :key="subj.gradeCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="题目数量:"
        prop="paperQuestionNum"
        :rules="[{required:true,  message:'该项必填'},
                { type: 'number', message: '题目数量必须为数字',required :true},
                { type: 'number', min:0, message: '题目数量必须大于0',trigger:'blur',required :true}
              ]"
      >
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.number="form.paperQuestionNum"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item
        label="试卷满分:"
        prop="fullScore"
        :rules="[{required:true,  message:'该项必填'},
                { type: 'number', message: '分数必须为数字',required :true},
                { type: 'number', min:0, message: '分数必须大于0',trigger:'blur',required :true}
              ]"
      >
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.number="form.fullScore"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item
        label="试卷得分:"
        prop="score"
        :rules="[{required:true,  message:'该项必填'},
                { type: 'number', message: '分数必须为数字'},
                { type: 'number', min:0, max:  parseFloat(form.fullScore)||0, message: '得分必须介于0~满分',trigger:'blur'}
              ]"
      >
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.number="form.score"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item
        prop="teacherName"
        :rules="[{required:true,  message:'该项必填'},
        { type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
        label="监考人:">
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.trim="form.teacherName" maxlength="10"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item
        prop="difficultCode"
        :rules="[{type:'string', required:true, message:'该项必填'},
        { type:'string', max:10, message:'最多10个字', trigger:'blur'}]"
        label="试卷难度:">
        <el-col :span="5" class="mst-no-padding">
          <el-input v-model.trim="form.difficultCode" maxlength="10"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item
        prop="examinationRange"
        :rules="[
        {required:true, type:'string', message:'该项必填'},
        {type:'string', max:100,message:'最多100个字', trigger:'blur'}
        ]"
        label="考试范围:">
        <el-col :span="24" class="mst-no-padding">
          <el-input type="textarea" :rows="4" maxlength="100" v-model.trim="form.examinationRange"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item  label="上传图片:">
        <el-col :span="15" class="mst-no-padding">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :data="postData"
          accept="image/jpeg,image/gif,image/png"
          list-type="picture-card"
          :file-list="fileList2"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess" multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="上传文件:">
        <el-col :span="15" class="mst-no-padding">
          <el-upload
            class="upload-demo pdfBox"
            accept=".pdf"
            :data="postData"
            :limit="1"
            :on-exceed="handleExceed"
            :action="uploadUrl"
            :on-remove="handleRemove2"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :file-list="fileList"><!--,.doc,.txt,.xls,.docx,.xlsx-->
            <el-input placeholder="只能上传pdf文件，且不超过5MB" style="width: 70%;float:left;margin-right: 10px;"></el-input>
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-col>
      </el-form-item>

      <el-form-item
        prop="remark"
        :rules="[
        {required:false, type:'string',  message:'该项必填'},
        {type:'string',max:100,message:'最多100个字', trigger:'blur'}
        ]"
        label="备注说明:">
        <el-col :span="15" class="mst-no-padding">
          <el-input type="textarea" :rows="4" v-model.trim="form.remark" maxlength="100"></el-input>
        </el-col>
      </el-form-item>

      <el-col class="text-center" :span="24">
        <el-button type="default" plain @click="back" class="addBtn">取消</el-button>
        <el-button type="primary" @click="save" class="addBtn">保存</el-button>
      </el-col>

    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {genUpToken} from "../../../../static/js/qiniuToken.js";
  export default {
    name: "archive-records-add",
    data() {
      return {
        artTypes: [],
        subjects: [],
        grades: [],
        tmpUserInfo: null,
        form: {
          examinationDate: "",
          subjectCode: '',
          gradeCode: '',
          artType: "0",
          examinationType: "",
          paperQuestionNum: "",
          fullScore: "",
          score: "",
          teacherName: "",
          difficultCode: "",
          examinationRange: "",
          remark: "",
          createName:"createName",
          picture:[],//图片地址
          report:{}
        },

        dialogImageUrl: '',
        dialogVisible: false,
        uploadUrl:this.qiniuUpURL,//上传地址
        postData:{}, //七牛上传参数
        fileList:[],//文件路径
        fileList2:[],//图片路径
      }
    },
    created() {
      this.getToken();
      this.artTypes = $.extend({},this.subjectTypeObj);
      var query = this.$router.history.current.query;
      this.tmpUserInfo = JSON.parse(localStorage.getItem("tmpStudentInfo"));
      this.form.userId = this.tmpUserInfo.userId;
      this.getGrades({stageCode: this.tmpUserInfo.stageCode});
      this.getSubjects();
      if(query.id){
        this.getDetail({examinationRecordId: query.id});
      }
    },
    methods: {
      //删除图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
        var url="";
        if(file.response){
          url="http://"+ this.qiniuURL + file.response.key;
        }else{
          url=file.url;
        }
        var index=this.form.picture.indexOf(url);
        if(index>-1){this.form.picture.splice(index,1)}

      },
      //点击图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传图片
      handleAvatarSuccess(res, file) {
        var that=this;
        //this.course.picture = URL.createObjectURL(file.raw);
        console.log(that.form.picture,'dada')
        that.form.picture.push("http://"+ this.qiniuURL + res.key);
      },
      //文件
      handleRemove2(file, fileList) {
        console.log(file, fileList);
        this.form.report={};
      },
      handleSuccess(res, file){
        console.log(res,file,"dsd")
        this.form.report={
          name:file.name,
          url:"http://"+ this.qiniuURL + res.key
        };
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      //图片上传限制
      beforeUpload(file) {
        console.log(file,"dsds")
       const isJPG = file.type === 'application/pdf';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传文件只能是pdf 格式!');
        }
        if (!isLt5M) {
          this.$message.error('文件大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
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
      //获取学科
      getSubjects(obj) {
        var _this = this;
        this.$ajax.getSubjectsByGrade(obj).then(res => {
          if (res.code === "000000") {
            _this.subjects = res.subjects;
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.subjects = [];
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取学年
      getGrades(obj) {
        var grades = localStorage.getItem("tmpgrades");
        if (grades) {
          this.grades = JSON.parse(grades);
          return;
        }
        var _this = this;
        this.$ajax.getGradesByStage(obj).then(res => {
          if (res.code === "000000") {
            _this.grades = res.grades;
          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.grades = [];
          _this.$message.error(e.message || '请求出错');
        })
      },
      /*
      * 回退按钮
      * */
      back(force) {
        if (force) {
          this.$router.go(-1);
          return;
        }
        this.$confirm("编辑的内容将不会被保存，是否继续？", "警告", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1)
        }).catch(e => {

        })
      },
      /*
      * 点击保存
      * */
      save() {
        var _this = this;
        this.$refs.form.validate(valid => {
        //  console.log("form valid ", valid)
          if (valid) {
            _this.$confirm("是否保存现有编辑内容？", "警告", {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var obj=JSON.parse(JSON.stringify(_this.form));
             obj.picture=JSON.stringify(obj.picture);
             obj.report=JSON.stringify(obj.report);
              if (_this.form.examinationRecordId) {
                _this.postEdit(obj);
              } else {
                _this.submitData(obj);
              }

            }).catch(e => {
            })
          }
        })
      },
      //保存新建内容
      submitData(obj) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post("examinationRecord/addExaminationRecord", obj).then(res => {
          if (res.code === "000000") {
            _this.$message.success(res.message);
            _this.back(true);
          } else {
            _this.$message.error(res.message || '请求出错');
          }
          loading.close();
        }).catch(e => {
          loading.close();
          _this.$message.error(e.message || '请求出错');
        })
      },
      //更改提交保存
      postEdit(obj) {
        var _this = this;
        var loading = _this.$loading({
          lock: true,
          type: "Loading",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.post("examinationRecord/updateExaminationRecord", obj).then(res => {
          if (res.code === "000000") {
            _this.$message.success(res.message);
            _this.back(true);
          } else {
            _this.$message.error(res.message || '请求出错');
          }
          loading.close();
        }).catch(e => {
          loading.close();
          _this.$message.error(e.message || '请求出错');
        })
      },
      //获取详细信息
      getDetail(obj) {
        var _this = this;
        this.$axios.post("examinationRecord/getExaminationRecord", obj).then(res => {
          if (res.code == "000000") {
            res.result.difficultCode = res.result.difficultCode+"";
            res.result.artType = res.result.artType+"";
            _this.form = res.result;
            _this.form.picture =JSON.parse(res.result.picture)  ||[];
            _this.form.report = JSON.parse(res.result.report) ||{};
            if(JSON.stringify(_this.form.report)!="{}"){
              _this.fileList.push(_this.form.report )
            }
            _this.form.picture.forEach(val=>{
              _this.fileList2.push({
                url:val
              })
            })

          } else {
            _this.$message.error(res.message || '请求出错');
          }
        }).catch(e => {
          _this.$message.error(e.message || '请求出错');
        })
      },
    }
  }
</script>
<style type="text/css" lang="scss">
  .archiveRecordsAdd {
    .pdfBox{
      position: relative;
      .el-upload-list{
        width:70%;
        height:40px;
        position: absolute;
        left:0;
        top:0;
        padding:0 10px;
        box-sizing:border-box;
      }
      .el-upload-list__item-name{
        background-color: #fff;
      }
    }

    .el-form-item__label {
      width: 100px !important;
    }
    .el-form-item__content {
      margin-left: 100px !important;
    }

  }
</style>
<style scoped lang="scss">
  .mst-no-padding {
    padding: 0 !important;
  }

  .gap-bottom {
    padding-bottom: 22px;
  }

  .text-center {
    text-align: center;
  }
</style>
