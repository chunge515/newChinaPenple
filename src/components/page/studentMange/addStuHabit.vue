<template>
    <div class="addHabit padTop20">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="上课教师" prop="teacherName">
            <el-input v-model.trim="ruleForm.teacherName" placeholder="请输入真实姓名" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="学科" prop="subjectCode">
            <el-select v-model="ruleForm.subjectCode" placeholder="请选择学科">
              <el-option :label="val.subjectName" :value="val.subjectCode" v-for="val in subjects" :key="val.subjectCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="上课日期" prop="schoolDate">
            <el-date-picker
              v-model="ruleForm.schoolDate"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="记录人" prop="recordName">
            <el-input v-model.trim="ruleForm.recordName" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文理科" prop="artType">
            <el-radio-group v-model="ruleForm.artType" >
              <el-radio label="1">文科</el-radio>
              <el-radio label="2">理科</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="habitTitle">记录内容</el-col>
      </el-row>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-checkbox-group v-model="checkList" class="checkBox">
            <el-row :gutter="20" v-for="(val,index) in habitList" :key="index" style="margin-bottom: 20px;">
              <el-col :span="4"><el-checkbox :label="val.behaviourName" @change="checkOpp(val,index)"></el-checkbox></el-col>
              <el-col :span="8">
                <label  class="el-form-item__label" :class="{'notNull':!dataModel[index].isDis}" style="width: 80px;">记录时间</label>
                <el-date-picker
                  v-model="dataModel[index].recordDate"
                  :disabled="dataModel[index].isDis"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </el-col>
              <el-col :span="12">
                <label  class="el-form-item__label" style="width: 80px; float:left;">备注</label>
                <el-input type="textarea" v-model="dataModel[index].remark" :disabled="dataModel[index].isDis" maxlength="100"></el-input>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-col>
        <el-col :span="20" class="habitTitle">其他补充</el-col>
      </el-row>
      <el-row v-for="(item,index) in stuOtherAry" :key="index" :gutter="20" class="stuOtherBox">
        <el-row  style="margin:10px;">
          <el-col :span="16">
            <el-input type="textarea" v-model="item.suppleRemark"></el-input>
          </el-col>
          <el-col style="width:100px;padding: 0;">
            <div class="grid-content bg-purple-light">
              <span v-if="stuOtherAry.length==index+1"><i class="el-icon-circle-plus-outline icon-1" @click="addList(index)"></i><span class="icon-name"></span></span>
              <span v-if="index!=0"><i class="el-icon-remove-outline icon-1" @click="removeList(index)"></i><span class="icon-name"></span></span>
            </div>
          </el-col>
        </el-row>

        <el-row style="margin:10px;">
          <el-col :span="9">
            <div class="imgShow" v-if="!item.isShow">
              图片: <span class="el-upload--picture-card">
            <img :src="item.imageUrl" class="avatar">
            <i class="el-icon-circle-close" @click="delImg(item)"></i>
          </span>

            </div>

            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :data="postData"
              accept="image/jpeg,image/gif,image/png"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :on-success="handleAvatarSuccess.bind(null, {'index':index,'data':item})"
              :file-list="item.imgList" v-else>
              <el-button size="medium" type="primary">添加图片</el-button>
            </el-upload>
          </el-col>
          <el-col :span="9">
            <label  class="el-form-item__label notNull" style="width: 80px;">记录时间</label>
            <el-date-picker
              v-model="item.recordDate"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-col :span="9">
          <div class="imgShow" v-if="!item.isV">
            视频: <span class="el-upload--picture-card" style="width:300px;height: 178px;">
            <!--<video  :src="item.videoUrl" class="avatar" controls="controls">您的浏览器不支持视频播放</video>-->
            <img src="/static/img/video.png" alt="" @click="seeVideo(item)">
            <i class="el-icon-circle-close" @click="delVideo(item)"></i>
          </span>

          </div>

          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :data="postData"
            :on-remove="handleRemove"
            :on-success="handleVideoSuccess.bind(null, {'index':index,'data':item})"
            :before-upload="beforeUploadVideo"
            :on-progress="uploadVideoProcess"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="item.videoList" v-else>
            <el-button size="medium " type="primary">添加视频</el-button>
          </el-upload>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="20" style="text-align: center;margin-bottom: 20px;" >
          <el-button  @click="goCancel()">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-col>

      </el-row>
      <!--视频播放弹框-->
      <el-dialog title="视频播放" :visible.sync="tkCkplay" :modal= false :before-close="clearShowVideo">
        <div class="ckplayer" style="height: 500px;"></div>
      </el-dialog>


    </div>
</template>
<script>
  import {genUpToken} from "../../../../static/js/qiniuToken.js";
export default {
  data() {
    return {
      /*筛选条件*/
      uploadUrl:this.qiniuUpURL,//上传地址
      postData:{}, //七牛上传参数
      subjects:[],//学科集合
      ruleForm: {
        teacherName: '',
        subjectCode:'',
        schoolDate:'',
        recordName:'',//录入人
        artType:0//文理
      },
      dataModel:[],
      habitList:[],
      checkList:[],//选中列表
      rules: {
        teacherName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 0, max: 10, message: '不能输入超过10个字符', trigger: 'blur' }
        ],
        schoolDate:[
          { required: true, message: '请填写日期', trigger: 'blur' },
        ],
        subjectCode: [
          { required: true, message: '请选择学科', trigger: 'change' }
        ],
        recordName:[
          { required: true, message: '请输入记录人姓名', trigger: 'blur' },
          { max: 10, message: '不能输入超过10个字符', trigger: 'blur' },
        ],
        artType:[
          {required: false, message: '请选择文理', trigger: 'blur'},
        ]
      },
      stuOtherAry:[//其他补充
        {
          suppleRemark:'',
          recordDate:'',
          imgList:[],
          videoList:[],
          videoUrl:'',
          imageUrl:'',
          "isShow":true,
          "isV":true
        }
      ],
      videoFlag:false,
      videoUploadPercent:0,
      userType:null,//用户类型
      id:'',//用户id
      infoId:'',
      tkCkplay:false,//视频播放
    }
  },
  created(){

var $this=this;
    this.userType=$this.$route.query.type;
    $this.id=$this.localData.get("tmpStudentInfo").userId;
    $this.gethabitList();
    $this.infoId=$this.$route.query.id
  },
  mounted() {
    this.getToken();
    this.getSubjects()
  },
  filters:{
  },
  methods: {
    //编辑进来获取的信息
    getBehaviourRecord(id){
      var $this=this;
      this.$axios
        .post("/behaviourRecord/getBehaviourRecord", {"behaviourRecordId": id})
        .then(res => {
          if(res.code=="000000"){
            var result=res.result || [];
            this.ruleForm={
                teacherName:result.teacherName,
                subjectCode:result.subjectCode,
                schoolDate:result.schoolDate,
                recordName:result.recordName,//录入人
                artType:String(result.artType),//录入人
            };
            var ary=[],ary2=[];
            var arr=JSON.parse(result.recordDetail) || [];
            /*"behaviourCode":$this.habitList[index].behaviourCode,
               "behaviourName":$this.habitList[index].behaviourName,*/
            if(arr.length>0){
              arr.forEach(val=>{
                ary.push(val.behaviourName);
                $this.habitList.forEach((val2,index)=>{
                  if(val2.behaviourName==val.behaviourName){
                    $this.dataModel[index]={
                      recordDate:val.recordDate,
                      remark:val.remark,
                      isDis:false
                    }
                  }
                })
              })
             this.checkList=ary;

            }
            var arr2=JSON.parse(result.suppleDetail) || [];
            if(arr2.length>0){
              arr2.forEach(val=>{
                if(val.imageUrl){
                  this.$set(val,"isShow",false)
                }else{
                  this.$set(val,"isShow",true)
                }
                if(val.videoUrl){
                  this.$set(val,"isV",false)
                }else{
                  this.$set(val,"isV",true)
                }
                ary2.push(
                  {
                    suppleRemark:val.suppleRemark,
                    recordDate:val.recordDate,
                    imgList:[],
                    videoList:[],
                    imageUrl:val.imageUrl,
                    videoUrl:val.videoUrl,
                    isV:val.isV,
                    isShow:val.isShow,

                  },
                )
              })
              $this.stuOtherAry=ary2
            }
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.message||'请求出错');
        });
    },
    //获取学科
    getSubjects(){
      var _this = this;
      this.$ajax.getSubjectsByGrade().then(res=>{
        if(res.code==="000000"){
          _this.subjects = res.subjects;
        }else{
          _this.$message.error(res.message||'请求出错');
        }
      }).catch(e=>{
        _this.subjects = [];
        _this.$message.error(e.message||'请求出错');
      })
    },
    /*获取行为习惯的列表*/
    gethabitList(){
      this.$axios
        .post("/behaviourRecord/getSeowonUserBehaviours", {"userType": this.userType})
        .then(res => {
          if(res.code=="000000"){
            var result=res.result || [];
            this.habitList=result;
            var len=this.habitList.length;
            for (var i = 0; i < len; i ++) {
              var item = {recordDate: '',remark: '',isDis:true};
              this.dataModel.push(item);
            }
            var a =this.$route.query.isEdit;
            if(a){
              this.getBehaviourRecord(this.infoId)
            }
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.message||'请求出错');
        });
    },
    checkOpp(val,index){
      var a=this.checkList.indexOf(val.behaviourName);
      if(a>=0){
        this.$set(this.dataModel[index],'isDis',false)
      }else{
        this.$set(this.dataModel[index],'isDis',true)
      }
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
    //保存提交信息
    submitForm(formName) {
      var $this=this;
      var ary=[],ary2=[];
      var flag=false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag=true
        } else {
          this.$message.warning('请将基本信息填写完整');
          return false;
        }
      });
      if(flag){
        var obj=this.ruleForm;
        obj.userId=this.id;
        obj.userType=this.userType;
      if($this.checkList.length>0){
        var index,isF=true,arrys=[];
        this.habitList.forEach(val2=>{
          arrys.push(val2.behaviourName)
        })
        $this.checkList.forEach(val=>{
          index=arrys.indexOf(val)
          console.log(index,"indexc")
          if(index>-1){
            console.log(this.dataModel[index].recordDate,"--asas");
           if(this.dataModel[index].recordDate==""){
             isF=false
           }else{
             ary.push({
               "behaviourCode":$this.habitList[index].behaviourCode,
               "behaviourName":$this.habitList[index].behaviourName,
               "userType":$this.userType,
               "recordDate":this.dataModel[index].recordDate,
               "remark":this.dataModel[index].remark
             })
           }
          }
        })
        if(!isF){
          this.$message.warning('每条选中的记录时间都是必填哦!');
          return false
        }else{
          obj.recordDetail=JSON.stringify(ary);
        }
      }else{
         obj.recordDetail ="[]";
      }
      if($this.stuOtherAry.length>0){
        var flag2=true
         $this.stuOtherAry.forEach(val=>{
           console.log(val,"hahhaha")
           if(val.suppleRemark!="" || val.imageUrl!="" || val.videoUrl!=""){
             if(val.recordDate=="" ||val.recordDate==null){
               this.$message.warning('每条填写的补充内容的时间都是必填哦!');
               flag2=false;
               return false
             }else{
               ary2.push({
                 suppleRemark:val.suppleRemark,
                 recordDate:val.recordDate,
                 imageUrl:val.imageUrl,
                 videoUrl:val.videoUrl,
               })
             }
             }else if(val.recordDate!="" && val.recordDate!=null){
             this.$message.warning('不能只填写时间哦!');
              flag2=false;
              return false
              }else{
             return false
           }
         })
        obj.suppleDetail=JSON.stringify(ary2);
       }
       if(!flag2){return false}
        console.log(obj,"提交数据");
       /*id:'',//用户id
      infoId:''*/
       if($this.infoId){
         obj.behaviourRecordId=$this.infoId;
         obj.updateName ='123';
         this.$axios
           .post("/behaviourRecord/updateBehaviourRecord", obj)
           .then(res => {
             if(res.code=="000000"){
              $this.$router.push({path:'/habit',query:{type:$this.userType}})
             }else{
               $this.$message.error(res.message||'请求出错');
             }
           }).catch(e=>{
           $this.$message.error(e.message||'请求出错');
         })
       }else{
         obj.createName="123";
         this.$axios
           .post("/behaviourRecord/addBehaviourRecord", obj)
           .then(res => {
             if(res.code=="000000"){
               $this.$router.push({path:'/habit',query:{type:$this.userType}})
             }else{
               $this.$message.error(res.message||'请求出错');
             }
           }).catch(e=>{
           $this.$message.error(e.message||'请求出错');
         })
       }

      }
    },
    /*resetForm(formName) {
      this.$refs[formName].resetFields();
    },*/
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //图片上传限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||'image/gif'||'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 图片 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //视频上传限制
    beforeUploadVideo(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb','video/m3u8'].indexOf(file.type) == -1) {
        this.$message.error('请上传正确的视频格式');
        return false;
      }
      if (!isLt20M) {
        this.$message.error('上传视频大小不能超过20MB哦!');
        return false;
      }
    },
    //上传视频
    handleVideoSuccess(obj,res, file) {
      console.log(obj,res, file,"-----")
      //获取上传图片地址
      if(res.key){
        var url= "http://"+ this.qiniuURL + res.key;
        var index = this.stuOtherAry.indexOf(obj.data)
        this.$set(this.stuOtherAry[index],'videoUrl',url)
        console.log(this.stuOtherAry,"----------")
       /* this.videoForm.videoUploadId = res.data.uploadId;
        this.videoForm.Video = res.data.uploadUrl;*/
      }else{
        this.$message.error('视频上传失败，请重新上传！');
      }
    },
    //上传图片
    handleAvatarSuccess(obj,res, file) {
      if(res.key){
        var url= "http://"+ this.qiniuURL + res.key;
        var index = this.stuOtherAry.indexOf(obj.data)
        this.$set(this.stuOtherAry[index],'imageUrl',url)
        console.log(this.stuOtherAry,"----------")
        /* this.videoForm.videoUploadId = res.data.uploadId;
         this.videoForm.Video = res.data.uploadUrl;*/
      }else{
        this.$message.error('图片上传失败，请重新上传！');
      }
    },
    uploadVideoProcess(event, file, fileList){
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    //添加
    addList(index){
        var $this = this;
        var curObj=$this.stuOtherAry[index];
        if(curObj.suppleRemark=="" || curObj.recordDate==""){
          this.$message.warning('请将补充信息及时间填写完整再增加');
          return;
        }
        $this.stuOtherAry.push(
            {
              suppleRemark:'',
              recordDate:'',
              imgList:[],
              videoList:[],
              videoUrl:'',
              imageUrl:'',
              isV:true,
              isShow:true
            })

    },
    //删除
    removeList(index){
      var $this=this;
      $this.stuOtherAry.splice(index,1)
      /*
      *     font-size: 30px;
    cursor: pointer;
    margin-left: 10px;
    vertical-align: -17px;*/

    },
    //取消按钮
    goCancel(){
      this.$confirm('编辑的预约表不被保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {

      });
    },
    //编辑删除图片
    delImg(item){
      item.imageUrl="";
      this.$set(item,"isShow",true)
    },
    //删除视频
    delVideo(item){
      item.videoUrl="";
      this.$set(item,"isV",true)
    },
    /*ckPlayer视频播放*/
    initPlayer(obj){
      // console.log(obj)
      var url = ""
      if(obj.videoUrl){
        url = obj.videoUrl
      }
      obj = obj || {};
      var newVideoObject = {
        container: ".ckplayer", //容器的ID
        variable: "player",
        config: "",
        loaded: "loadedHandler", //当播放器加载后执行的函数
        drag: "start", //拖动的属性
        autoplay: true, //是否自动播放
        loop: false, //循环播放
        seek: 0,
        video: url//"http://qiniureste.e-eduspace.com/06263d7d29b4464b8143897e4d1256a5.m3u8"// obj.url
      };
      var _this = this;
      if (_this.player) {
        // _this.player.removeChild();
        _this.player = null;
      }
      _this.player = new ckplayer(newVideoObject);
      window.loadedHandler = function() {
        _this.player.addListener("error", function(e) {
          console.error(e);
        }); //监听视频加载出错
      };
    },
    /*点击播放视频*/
    seeVideo(item){
      this.tkCkplay = true;
      var _this = this;
      setTimeout(function() {
        _this.initPlayer(item);
      }, 100);
    },
    /*关闭视频弹框*/
    clearShowVideo(done) {
      this.player.videoPause()
      this.player = null;
      done();
    },
  },
  watch:{
    radio: function () {
      this.getTeacherList();
    },
    userType:function () {},
    id:function () {}

  },
  props:['parentInfo'],
  components: {

  }
}
</script>

<style scoped lang="less">
  .addHabit{
    .el-checkbox{
      line-height: 40px;
      width:100%;
    }
    .checkBox{
      .notNull:before{
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
      .el-textarea{
        float: left;
        width:300px;
      }
    }
    .habitTitle{
      line-height: 40px; font-size: 16px;
      margin-bottom: 10px;
      text-indent: 10px;
      color: #1DA4DE;
    }
    .stuOtherBox{
      .el-col{
        margin-bottom: 10px;
        .notNull:before{
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
        }
      }
      .icon-1{
        font-size: 30px;
        cursor: pointer;
        margin-left: 10px;
        vertical-align: -28px;
      }

    }
    .imgShow{
      span{
        display: inline-block;
        position: relative;
        width:80px;
        height:80px;
        line-height:80px;
        img{
          width:100%;
          height:100%;
        }
        i{
          position: absolute;
          right:0;
          top:0;
          cursor: pointer;
        }
      }
    }

  }
</style>
<style lang="less">
  .addHabit{
    .el-checkbox__label {
      white-space: normal;
    }
    .el-upload{
      float: left;
    }
    .el-upload-list{
      margin-left:110px;
      height:36px;
      line-height: 36px;
    }
    .el-upload-list__item{
      height:36px;
      line-height: 36px;
    }
    .el-upload-list__item:first-child{
      margin-top:0;
    }
  }

</style>

