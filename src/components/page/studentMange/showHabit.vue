<template>
  <div>
    <div class="showHabit padTop20">
      <!--顶部基础数据-->
      <div class="top-List">
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">学科：</el-col>
              <el-col :span="14" v-html="switchSubject(form.subjectCode)"></el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">上课教师：</el-col>
              <el-col :span="14">{{ form.teacherName }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">上课日期：</el-col>
              <el-col :span="14">{{form.schoolDate | changeData}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">记录人：</el-col>
              <el-col :span="14">{{form.recordName }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="10">文理：</el-col>
              <!--<el-col :span="14">{{ form.artType==1 ? '文科':'理科'}}</el-col>-->
              <el-col :span="14" v-if="form.wlSub==1">文科</el-col>
              <el-col :span="14" v-if="form.wlSub==2">理科</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-if="recordList.length">
        <h4>学习行为问题</h4>
        <el-row v-for="(item,index) in recordList" :key="index">
          <el-col :span="8">{{item.behaviourName}}</el-col>
          <el-col :span="4">{{item.recordDate| changeData}}</el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="2">备注：</el-col>
              <el-col :span="18">{{item.remark}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-if="suppleList.length">
        <h3 style="margin-bottom:20px;">其他补充</h3>
        <div class="top-List2 suppleBox" v-for="(item,index) in suppleList" :key="index">
          <el-row>
            <el-col :span="24" class="mar20">
             {{item.suppleRemark}}
            </el-col>
            <el-col :span="24">
              <el-row>
                <el-col :span="8">
                  <el-row>
                    <el-col :span="4">图片:</el-col>
                    <el-col :span="20"><img :src="item.imageUrl" class="avatar"> </el-col>
                  </el-row>
                </el-col>
                <el-col :span="8">
                  <el-row>
                    <el-col :span="4">视频:</el-col>
                   <!-- <video src="http://conferencetest.e-eduspace.com/lp-JnS3SzwjLlocpl5zytsUpHTy_?avinfo " type="video/mp4" width="500" height="500"></video>-->
                    <el-col :span="20" v-if="item.videoUrl"><img src="/static/img/video.png" alt="" @click="seeVideo(item)" style="width:300px"> </el-col>
                  </el-row>
                </el-col>
                <el-col :span="8">记录时间：{{item.recordDate| changeData}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="addBtn" style="text-align:center">
        <el-button @click="goBack" type="primary">返回</el-button>
      </div>
    </div>
    <!--视频播放弹框-->
    <el-dialog title="视频播放" :visible.sync="tkCkplay" :modal= false :before-close="clearShowVideo">
      <div class="ckplayer" style="height: 500px;"></div>
    </el-dialog>

  </div>
</template>
<script>
  import moment from "moment";
  export default {
    name: "goBack",
    data() {
      return {
        subjects:[],//学科集合
        subjectsObj:this.commonSubject,
        /*学习行为问题*/
        recordList:[],
        /*其他补充*/
        suppleList:[],

        /*提交参数*/
        form: {
          subjectCode:'', //学科code
          recordName:'',
          teacherName: "", //教师名字
          schoolDate: '', //文理科
        },
        tkCkplay:false
      };
    },
    props: {},
    methods: {
      /*返回*/
      goBack:function(){
        this.$router.go(-1)
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
      getBehaviourRecord(id){
        var $this=this;
        this.$axios
          .post("/behaviourRecord/getBehaviourRecord", {"behaviourRecordId": id})
          .then(res => {
            if(res.code=="000000"){
              var result=res.result || [];
              this.form={
                teacherName:result.teacherName,
                subjectCode:result.subjectCode,
                schoolDate:result.schoolDate,
                recordName:result.recordName,//录入人
                artType:String(result.artType),//录入人
              };
              var ary=[],ary2=[];
              var arr=JSON.parse(result.recordDetail) || [];
              this.recordList=arr;

              var arr2=JSON.parse(result.suppleDetail) || [];
              this.suppleList=arr2;
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(err => {
            this.$message.error(err.message||'请求出错');
          });
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
      switchSubject(value) {
        var name="";
        this.subjects.forEach(val=>{
          if(val.subjectCode==value){
            name=val.subjectName
          }
        })
        return name
      }
    },
    mounted() {
      this.getSubjects();
      var id=this.$route.query.id;
      this.getBehaviourRecord(id)
    },
    filters: {
      changeData: function (value) {
        if (!value) return ''
        return moment(value).format("YYYY-MM-DD HH:mm")
      },
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  .showHabit{
    padding-bottom:20px;
    .addBtn{
      margin-top:20px;
    }
    .suppleBox{
      img{
        width:100px;
      }
    }
    h4{
      margin:20px 0;
    }
    .top-List{
      border-bottom:1px solid #999;
    }
    .top-List2{
      border-top:1px solid #999;
      padding:20px;
    }
    .mar20{
      margin-bottom: 20px;
    }
    .el-row {
      .el-row {
        padding-bottom: 26px;
      }
    }
  }

</style>
