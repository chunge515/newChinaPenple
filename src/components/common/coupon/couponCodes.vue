<!-- 优惠券列表页的优惠码 -->
<template>
  <div class="couponCodes">
      <table class="form">
        <tr>
          <td class="td_l">绑定类型：</td>
          <td class="td_r"><el-radio v-for="(r,i) in bindType" v-model="form.bindType" :label="r.val" :key="i">{{r.txt}}</el-radio></td>
          <td class="td_l">兑换码：</td>
          <td class="td_r">
            <el-input v-model.trim="form.code" type="text" @keyup.enter.native="pageNumChange(1)" placeholder="按回车搜索"></el-input>
          </td>
        </tr>
        <tr>
          <td class="td_l">使用标识：</td>
          <td class="td_r"><el-radio v-for="(r,i) in usedFlag" v-model="form.usedFlag" :label="r.val" :key="i">{{r.txt}}</el-radio></td>
          <td class="td_l">导出：</td>
          <td class="td_r"><el-radio v-for="(r,i) in exportFlag" v-model="form.exportFlag" :label="r.val" :key="i">{{r.txt}}</el-radio></td>
        </tr>
      </table>
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
          {{trans('bindType',scope.row.bindType)}}
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
          {{trans('exportFlag',scope.row.exportFlag&&1||0)}}
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
      :current-page="form.pageNo"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="form.total">
    </el-pagination>

  </div>
</template>

<script>
  export default {
    name: "coupon-codes",
    props: ["couponid"],
    data() {
      return {
        grades:[],
        subjects:[],
        bindType: [{val: '', txt: '全部'}, {val: 0, txt: '未绑定'}, {val: 1, txt: '系统自动绑定'}, { val: 2, txt: '自己领取绑定'}, {val: 3, txt: '输入优惠码绑定'}],
        usedFlag: [{val: '', txt: '全部'}, {val: 0, txt: '没有使用'}, {val: 1, txt: '已使用'}, {val: 2, txt: '已过期'}],
        exportFlag: [{val: '', txt: '全部'}, {val: 0, txt: '未导出'}, {val: 1, txt: '已导出'}],
        form: {
          bindType: "",
          code: "",
          usedFlag: "",
          exportFlag: '',
          pageNo: 1,
          pageSize: 10,
          total:0,
        },
        datas: null,

      }
    },
    mounted() {
      this.prepareData()
    },
    methods: {
      //翻译绑定类型、使用类型、导出类型
      trans(type,code){
        var c = code;
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
        if(this.form.bindType !=="")ex.push("bindType="+this.form.bindType);
        if(this.form.usedFlag !=="")ex.push("usedFlag="+(this.form.usedFlag ));
        if(this.form.code !=="")ex.push("code="+encodeURIComponent(this.form.code ));
        if(this.form.exportFlag !== "")ex.push("exportFlag="+(this.form.exportFlag ? true:false));
        if(ex.length>0){
          ex.unshift("")
        }

        this.$axios.get(this.promotionURL+"admin/promotion/couponCodePage?pageNo="+this.form.pageNo+"&pageSize="+this.form.pageSize+"&couponId="+this.couponid+ex.join("&")).then(res=>{
          if(res.message==="Success"){
            _this.datas=res.result.list;
            _this.form.pageNo = res.result.pageNo;
            _this.form.pageSize = res.result.pageSize;
            _this.form.total = res.result.totalCount;
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
      pageSizeChange(size){
        this.form.pageNo =1;
        this.form.pageSize = size;
        this.getList()
      },
      pageNumChange(page){
        this.form.pageNo = page;
        this.getList()
      },
    },
    watch: {
      couponid: function (ne) {
        this.form = {bindType: "", code: "", usedFlag: "", exportFlag: '', pageNo: 1, pageSize: 10};
        this.datas = null;
        if(!ne){
          return ;
        }
        this.getList()
      },
      "form.bindType":function () {
        this.form.pageNo =1;
        this.getList()
      },
      "form.usedFlag":function () {
        this.form.pageNo =1;
        this.getList()
      },
      "form.exportFlag":function () {
        this.form.pageNo =1;
        this.getList()
      },

    }
  }
</script>

<style scoped lang="scss">

  table {

    width: 100%;
    border-collapse: collapse;
    &.form{
      margin-bottom: 20px;
    }
    input {
      height: 40px;
      line-height: 40px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
    td {
      border: 1px solid #eee;
      padding: 10px 5px;
    }
    .el-radio {
      margin-right: 15px;
    }
  }
  .el-pagination{
    padding-top: 10px;
    text-align: center;
  }
</style>
<style lang="scss">
  .couponCodes{
    .el-pagination__editor{
      .el-input__inner{
        border: 1px solid #C0C4CC !important;
      }
    }
  }

</style>
