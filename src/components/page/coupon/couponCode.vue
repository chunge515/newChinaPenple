<template>
    <div class="studentList-content">
      <commonTitle>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>优惠码列表</el-breadcrumb-item>
        </el-breadcrumb>
      </commonTitle>
      <div class="nav-list" v-show="datas">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span>优惠券Code:</span>
              <el-input v-model.trim="couponCodeText" @keyup.enter.native="pageNumChange(1)" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :span="12" style="line-height:40px;">
            <div class="grid-content bg-purple-light">
              <span>线上线下:</span>
              <el-radio-group v-model="onLineFlag">
                <el-radio :label="item.val" v-for="(item,i) in onLineFlags" :key="i">{{ item.txt }}</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:20px 0;">
          <el-col :span="12" style="line-height:40px;">
            <div class="grid-content bg-purple">
              <span>绑定类型:</span>
              <el-radio-group v-model="bindType">
                <el-radio :label="item.val" v-for="item in bindTypes" :key="item.val">{{ item.txt }}</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="12" style="line-height:40px;">
            <div class="grid-content bg-purple-light">
              <span>兑换码:</span>
              <el-input v-model="couponCode" @keyup.enter.native="pageNumChange(1)" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="line-height:40px;">
            <div class="grid-content bg-purple">
              <span>使用标识:</span>
              <el-radio-group v-model="usedFlag">
                <el-radio :label="item.val" v-for="item in usedFlags" :key="item.val">{{ item.txt }}</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="12" style="line-height:40px;">
            <div class="grid-content bg-purple-light">
              <span>导出:</span>
              <el-radio-group v-model="exportFlag">
                <el-radio :label="item.val" v-for="item in exportFlags" :key="item.val">{{ item.txt }}</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin:16px 0;text-align: right">
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </div>
      <!--表格-->
      <el-table
        header-cell-class-name="text-center"
        :data="datas"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="couponId"
          width="80"
          label="优惠券ID">
        </el-table-column>
        <el-table-column
          prop="couponName"
          label="优惠券名称">
        </el-table-column>
        <el-table-column
          prop="code"
          width="80"
          label="兑换码">
        </el-table-column>
        <el-table-column
          width="100"
          label="绑定类型">
          <template slot-scope="scope">
            {{trans('bindTypes',scope.row.bindType)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="bindTime"
          width="160"
          label="绑定时间">
        </el-table-column>
        <el-table-column
          width="70"
          label="导出">
          <template slot-scope="scope">
            {{trans('exportFlags',scope.row.exportFlag&&1||0)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="expirationTime"
          width="160"
          label="过期时间">
        </el-table-column>
        <el-table-column
          width="80"
          label="面值">
          <template slot-scope="scope">
            {{scope.row.faceValue/100}}元
          </template>
        </el-table-column>
        <el-table-column
          label="限制条件">
          <template slot-scope="scope">
            <div v-for="(r,i) in scope.row.restrictConditions" :key="i">条件：{{i+1}}，值：{{transCondition(r)}}，说明：{{r.description}}</div>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        v-show="datas"
        @size-change="pageSizeChange"
        @current-change="pageNumChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!--弹出框-->
    </div>



</template>
<script>
  import moment from "moment";
export default {
  data() {
    return {
      subjects:[],
      grades:[],
      /*筛选条件*/
      couponCodeText:"", //优惠卷Code
      couponCode:"", //兑换码
      onLineFlag:"", //线上线下
      bindType:'',
      bindTypes: [{val: '', txt: '全部'}, {val: 0, txt: '未绑定'}, {val: 1, txt: '系统自动绑定'}, { val: 2, txt: '自己领取绑定'}, {val: 3, txt: '输入优惠码绑定'}],
      usedFlag:'',
      usedFlags: [{val: '', txt: '全部'}, {val: 0, txt: '没有使用'}, {val: 1, txt: '已使用'}, {val: 2, txt: '已过期'}],
      exportFlag:'',
      exportFlags: [{val: '', txt: '全部'}, {val: 0, txt: '未导出'}, {val: 1, txt: '已导出'}],

      /*表格(教师列表)*/
      datas: null,
      /*分页*/
      currentPage:1, //当前页数
      total:null, //数据个数
      pageSize:10, //每页几条
    }
  },
  created() {
    this.prepareData();
  },
  filters:{

  },
  methods: {
    //翻译绑定类型、使用类型、导出类型
    trans(type,code){
      var c = code;
      if(!type)return ;
      this[type].forEach(v=>{
        if(v.val===code){
          c = v.txt;
          return ;
        }
      });
      return c;
    },
    transCondition(v){
      var b = "";
      if(v.type===0){ //最低价格
        b= "最低"+(v.restrictValue/100)+"元";
      }else if(v.type===1){ //学科
        this.subjects.forEach(t=>{
          if(t.subjectCode==v.restrictValue){
            b = t.subjectName;
            return false;
          }
        })
      }else if(v.type===2){
        this.grades.forEach(t=>{
          if(t.gradeCode==v.restrictValue){
            b = t.gradeName;
            return false;
          }
        })
      }else if(v.type===3){
        this.productTypes.forEach(t=>{
          if(t.val===v.restrictValue){
            b = t.txt;
            return false;
          }
        })
      }
      return b;
    },
    //准备数据字典
    prepareData(){
      var _this = this;
      this.$axios.all([this.$ajax.getGradesByStage({}),this.$ajax.getAllSubjects()]).then((a,b)=>{
        let arr;
        if(a[0].code =="000000"){
          arr = a[0].grades;
          console.log(arr)
          _this.grades = arr;
        }
        if(a[1].code =="000000"){
          arr = a[1].subjects;
          _this.subjects = arr;
        }
        _this.getList()
      })
    },
    getList() {
      let _this = this;
      let ex = [];
      if(this.onLineFlag!=="")ex.push("onLineFlag="+this.onLineFlag);
      if(this.couponCodeText)ex.push("couponId="+this.couponCodeText);
      if(this.bindType !=="")ex.push("bindType="+this.bindType);
      if(this.usedFlag !=="")ex.push("usedFlag="+(this.usedFlag ));
      if(this.couponCode !=="")ex.push("code="+encodeURIComponent(this.couponCode ));
      if(this.exportFlag !== "")ex.push("exportFlag="+(this.exportFlag ? true:false));
      if(ex.length>0){
        ex.unshift("")
      }

      this.$axios.get(this.promotionURL+"admin/promotion/couponCodePage?pageNo="+this.currentPage+"&pageSize="+this.pageSize+ex.join("&")).then(res=>{
        if(res.message==="Success"){
          _this.datas=res.result.list;
          _this.pageNo = res.result.pageNo;
          _this.pageSize = res.result.pageSize;
          _this.total = res.result.totalCount;
          return
        }
        _this.$message({
          message: "获取列表失败",
          type: 'error'
        });
      }).catch(e=>{
        _this.$message({
          message: "请求失败",
          type: 'error'
        });
      })
    },
    //设置表的样式
    isCenter({row, column, rowIndex, columnIndex}){
      return 'isCenter3'
    },
    /*分页*/
    pageSizeChange(val) {
      this.pageSize = val;
      this.currentPage =1;
        this.getList()
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getList()
    },
    exportExcel(){
      if(!this.couponCodeText){
        this.$message({type:"warning",message:"请输入优惠券code"});
        return
      }
      let _this = this;
      window.open(_this.promotionURL+"admin/promotion/exportExcel?couponId="+_this.couponCodeText);
      /*this.$axios.get(this.promotionURL+"admin/promotion/exportExcel?couponId="+this.couponCodeText).then(res=>{
        if(res.length > 100){
          window.open(_this.promotionURL+"admin/promotion/exportExcel?couponId="+_this.couponCodeText);
        }else{
          _this.$message({type:"error",message:"导出失败"});
        }
      }).catch(e=>{
        _this.$message({type:"error",message:"导出请求失败"});
      })*/
    },
  },
  watch:{
    onLineFlag:function () {
      this.currentRoute=1;
      this.getList()
    },
    usedFlag:function () {
      this.currentRoute=1;
      this.getList()
    },
    exportFlag:function () {
      this.currentRoute=1;
      this.getList()
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .studentList-content .el-input{
    width:50%;
  }
  .slt_typesearch{
    width:80px;
  }
  .searchWrap{
    margin-left:20px;
  }
  .nav-list{
    /*margin:20px;*/
  }
  .sortSpan{
    cursor: pointer;
    float: right;
  }
  .el-pagination{
    text-align: center;
    margin-top:20px;
  }
  .radio-wrap{
    text-align: center;
  }
  .btn-wrap{
    margin-top:26px;
    text-align: right;
  }
  /*new*/
  .studentList-content .school-sel{
    margin-right:10px;
    margin-bottom:10px;
  }
  .studentList-content .sub-list .icon-1{
    font-size:30px;
    cursor:pointer;
    margin-right:10px;
    vertical-align: -17px;
  }
  .studentList-content .nameSpan{
    color:#409EFF;
    cursor:pointer;
    text-decoration: underline;
  }
</style>
<style>
  .isCenter3 td{text-align: center;  height:48px;
    line-height:48px;
    padding:0;}
  .isCenter3 td:last-child{text-align: left}
</style>
