<template>
  <div class="coupons">
    <common-title>优惠券列表</common-title>
    <el-form class="search" :model="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="优惠券类型" :span="12">
            <el-radio v-for="(l,i) in couponTypes" :label="l.val" :key="i" v-model="form.type">{{l.txt}}</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" :span="12">
            <el-radio v-for="(l,i) in commonStates" :label="l.val" :key="i" v-model="form.commonState">{{l.txt}}
            </el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="线上线下" :span="12">
            <el-radio v-for="(l,i) in onLineFlags" :label="l.val" :key="i" v-model="form.onLineFlag">{{l.txt}}
            </el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="界面显示" :span="12">
            <el-radio v-for="(l,i) in homeShows" :label="l.val" :key="i" v-model="form.homeShow">{{l.txt}}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="库存" :span="12">
            <el-radio v-for="(l,i) in inventoryFlags" :label="l.val" :key="i" v-model="form.inventoryFlag">{{l.txt}}
            </el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="固定类型" :span="12">
            <el-radio v-for="(l,i) in fixTypes" :label="l.val" :key="i" v-model="form.fixType">{{l.txt}}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="重复领取" :span="12">
            <el-radio v-for="(l,i) in repeatFlags" :label="l.val" :key="i" v-model="form.repeatFlag">{{l.txt}}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button @click="addCpn()" size="medium" type="primary" class="pullright">添加优惠券</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div class="lists">
      <el-table
        header-cell-class-name="text-center"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="优惠券名称">
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="scope">
            {{forType(scope.row.type)}}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          label="面值">
          <template slot-scope="scope">
            {{scope.row.faceValue/100}}元
          </template>
        </el-table-column>
        <el-table-column
          width="50"
         label="库存">
          <template slot-scope="scope">
            {{scope.row.inventoryFlag&&"有限"||"无限"}}
          </template>
        </el-table-column>
        <el-table-column
          width="110"
          label="固定类型">
          <template slot-scope="s">
            {{forFixType(s.row.fixType)}}
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间">
          <template slot-scope="s">
            {{s.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间">
          <template slot-scope="s">
            {{s.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="持续天数">
          <template slot-scope="s">
            {{s.row.expireDay}}
          </template>
        </el-table-column>
        <el-table-column
          width="70"
          label="总量">
          <template slot-scope="s">
            {{s.row.inventory.totalAmount}}
          </template>
        </el-table-column>
        <el-table-column
          width="70"
          label="使用量">
          <template slot-scope="s">
            {{s.row.inventory.usedCount}}
          </template>
        </el-table-column>
        <el-table-column
          width="70"
          label="绑定量">
          <template slot-scope="s">
            {{s.row.inventory.bindCount}}
          </template>
        </el-table-column>
        <el-table-column
          width="70"
          label="状态">
          <template slot-scope="s">
            {{forCommonState(s.row.commonState)}}
          </template>
        </el-table-column>
        <el-table-column
          width="330"
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="lookInfo(scope.row)">查看</el-button>
            <el-button size="small" type="primary" @click="shelfAct(scope.row)">{{{0:'上架',1:'下架',2:'上架'}[scope.row.commonState]}}</el-button>
            <el-button size="small" type="primary" @click="change(scope.row)">数量和日期</el-button>
            <el-button size="small" type="primary" @click="cpn(scope.row)">优惠码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加优惠券" :visible.sync="shownewcpn"  width="80%" >
      <Newcpn ref="newcpn" @closed="closeNewcpn"></Newcpn>
    </el-dialog>
    <el-dialog title="优惠券详情" :visible.sync="showviewCpn" width="80%" >
      <Viewcpn :detail="detail"></Viewcpn>
    </el-dialog>
    <el-dialog title="追加优惠券数量和过期时间" :visible.sync="showchange" width="80%" >
      <table class="table table-bordered">
        <tbody>
        <tr>
          <td class="td_l">ID:</td>
          <td class="td_r" style="width: 30%;">{{changeForm.id}}</td>
          <td class="td_l">名称:</td>
          <td class="td_r" style="width: 30%;">{{changeForm.name}}</td>
        </tr>
        <tr>
          <td class="td_l">修改类型:</td>
          <td colspan="3" class="td_r">
            <el-radio v-model="changeForm.changeType" :label="1">追加数量</el-radio>
            <el-radio v-model="changeForm.changeType" :label="2">过期时间</el-radio>
          </td>
        </tr>
        <tr v-if="changeForm.changeType===1&&detail.inventoryFlag">
          <td class="td_l">追加数量</td>
          <td class="td_r"><el-input v-model.number.trim="changeForm.amount" type="number" min="0"></el-input></td>
        </tr>
        <tr v-if="changeForm.changeType===2&&detail.fixType===2">
          <td class="td_l">持续天数</td>
          <td class="td_r"><el-input v-model.number.trim="changeForm.amount" type="number" min="0"></el-input></td>
        </tr>
        <tr v-if="changeForm.changeType===2&& detail.fixType !==2">
          <td class="td_l">开始时间:</td>
          <td class="td_r"><el-date-picker
            v-model="changeForm.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker></td>
          <td class="td_l">结束时间:</td>
          <td class="td_r"><el-date-picker
            v-model="changeForm.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker></td>
        </tr>
        <tr>
          <td colspan="4"><span class="tip"></span></td>
        </tr>
        <tr>
          <td colspan="4" class="td_btns text-center"><el-button type="primary" @click="sureChange">确定</el-button><el-button @click="closeChange">取消</el-button></td>
        </tr>
        </tbody>
      </table>
    </el-dialog>

    <el-dialog :title="couponCodeName" width="80%" :visible.sync="showCouponCodes" >
      <CouponCodes :couponid="couponId"></CouponCodes>
    </el-dialog>

    <!--分页-->
    <el-pagination
      v-show="tableData"
      @size-change="pageSizeChange"
      @current-change="pageNumChange"
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import Newcpn from "../../common/coupon/newCoupon"
  import Viewcpn from "../../common/coupon/viewCoupon"
  import CouponCodes from '../../common/coupon/couponCodes'

  export default {
    name: "list",
    data() {
      return {

        form: {
          type: "",
          commonState: "",
          onLineFlag: "",
          homeShow: "",
          inventoryFlag: "",
          fixType: "",
          repeatFlag: ""
        },
        shownewcpn: false, // 是否显示 添加优惠券 弹框
        showchange: false, // 是否显示 追加优惠券数量和过期时间 弹框
        showviewCpn:false, // 是否显示优惠券详情
        showCouponCodes:false, // 是否显示优惠码列表
        detail:{}, //优惠券详情内容
        pageSize: 10,
        pageNum: 1,
        total: 0,
        tableData: [],
        changeForm:{
          changeType:1, //修改类型切换标记
          amount:0,  //追加数量
          startTime:"",
          endTime:"",
          expireDay:"" //追加天数
        },
        couponCodeName:"", //优惠码列表表头,
        couponId:"", //优惠码列表使用的优惠券id,

      }
    },
    created() {
      this.getCouponList();
    },
    computed: {},
    methods: {
      //获取优惠券列表
      getCouponList() {
        var query = {};
        for (let k in this.form) {
          query[k] = this.form[k] === "" ? null : this.form[k];
        }
        query.pageNo = this.pageNum;
        query.pageSize = this.pageSize;
        var _this = this;
        this.$axios.get(this.promotionURL + "admin/promotion/couponPage", {params: query}).then(res => {
          console.log(res)
          if (res.code == 200) {
            res.result.list.forEach(v=>{
              !v.inventory&&console.error("id为 ",v.id,' 的优惠券inventory字段为null，报错了')
            });
            _this.tableData = res.result.list;
            _this.pageNum = res.result.pageNo;
            _this.total = res.result.totalCount;
            return;
          }
          _this.$message({
            message: res.message || "eee",
            type: 'error'
          });
        }).catch(e => {
          _this.$message({
            message: "请求失败",
            type: 'error'
          });
        })
      },
      //改变分页大小
      pageSizeChange(size) {
        this.pageSize = size;
        this.pageNum = 1;
        this.getCouponList();
      },
      //改变当前页码
      pageNumChange(num) {
        this.pageNum = num;
        this.getCouponList();
      },
      //详情
      lookInfo(v) {
        this.showviewCpn = true;
        this.detail = v;
      },
      // 上架 下架
      shelfAct(v) {
        let _this = this;
        this.$axios.get(this.promotionURL+"admin/promotion/changeActiveState?couponId="+v.id+"&commonState="+(v.commonState===1 ? 2:1)).then(res=>{
          if(res.result===true){
            _this.$message({
              message: "修改成功",
              type: 'success'
            });
            _this.getCouponList()
          }else{
            _this.$message({
              message: "状态修改失败",
              type: 'error'
            });
          }
        }).catch(e=>{
          _this.$message({
            message: "请求失败",
            type: 'error'
          });
        })
      },
      //数量和日期
      change(v) {
        this.showchange = true;
        this.detail = v;
      },
      //确定修改 数量/日期
      sureChange(){
        let _this = this;
        let o={
          id:this.detail.id,
          changeType:this.changeForm.changeType,
        }
        if(this.changeForm.changeType===1){
          if(!this.detail.inventoryFlag){
            return this.closeChange()
          }
          o.amount = this.changeForm.amount;
          if(o.amount<1){
            return this.$message({type:"warning",message:"请添加追加的数量"})
          }
        }else{
          o.fixType = this.detail.fixType;
          if(this.detail.fixType===2){
            o.expireDay =  _this.changeForm.amount;
            if(this.changeForm.amount<1){
              return this.$message({type:"warning",message:"请添持续天数"})
            }
          }else{
            o.startTime = this.changeForm.startTime;
            o.endTime = this.changeForm.endTime;
            if(!o.startTime||!o.endTime){
              return this.$message({type:"warning",message:"请添日期范围"})
            }else if(o.startTime < new Date().getTime() || o.endTime <= o.startTime){
              return this.$message({type:"warning",message:"请选择合理的日期范围"})
            }
          }
        }
        this.$axios.post(this.promotionURL+"admin/promotion/updateAddToCoupon",o).then(res=>{
          if(res.message==="Success"){
            _this.$message({
              message: "修改成功",
              type: 'success'
            });
            _this.closeChange();
            _this.getCouponList();
          }else{
            _this.$message({
              message: "请求失败",
              type: 'error'
            });
          }
        }).catch(e=>{
          _this.$message({
            message: "请求失败",
            type: 'error'
          });
        })
      },
      //关闭修改数量和日期弹窗
      closeChange(){
        this.showchange=false;
        this.changeForm={
          id:"",
            name:"",
            changeType:1, //修改类型
            amount:0,  //追加数量
            startTime:"",
            endTime:"",
            expireDay:"" //追加天数
        }
      },
      //优惠码
      cpn(v) {
        this.couponId = v.id;
        this.couponCodeName = v.name+"优惠码列表";
        this.showCouponCodes = true;
      },
      //添加优惠券
      addCpn() {
        this.shownewcpn = true;
      },
      //关闭添加优惠券的框
      closeNewcpn(obj) {
        this.shownewcpn = false;
        if(obj&&obj.reload){
          this.getCouponList();
        }
      },
      //列表翻译类型
      forType(v) {
        for (let i = 0; i < this.couponTypes.length; i++) {
          if (this.couponTypes[i].val === v) {
            return this.couponTypes[i].txt;
          }
        }
        return "全部"
      },
      //翻译固定类型
      forFixType(v){
        for (let i = 0; i < this.fixTypes.length; i++) {
          if (this.fixTypes[i].val === v) {
            return this.fixTypes[i].txt;
          }
        }
        return "全部"
      },
      //上下架状态
      forCommonState(v){
        for (let i = 0; i < this.commonStates.length; i++) {
          if (this.commonStates[i].val === v) {
            return this.commonStates[i].txt;
          }
        }
        return "全部"
      },

    },
    components: {
      Newcpn,
      Viewcpn,
      CouponCodes
    },
    watch: {
      "form.type": function (now, old) {
        this.pageNumChange(1);
      },
      "form.commonState": function (now, old) {
        this.pageNumChange(1);
      },
      "form.onLineFlag": function (now, old) {
        this.pageNumChange(1);
      },
      "form.homeShow": function (now, old) {
        this.pageNumChange(1);
      },
      "form.inventoryFlag": function (now, old) {
        this.pageNumChange(1);
      },
      "form.fixType": function (now, old) {
        this.pageNumChange(1);
      },
      "form.repeatFlag": function (now, old) {
        this.pageNumChange(1);
      },
    }
  }
</script>

<style scoped lang="scss">
  .lists {
    padding-top: 20px;
  }

  .text-center {
    text-align: center;
  }

  .el-button {
    margin-left: 5px;
  }

  .pullright {
    float: right;
  }

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }

  .el-radio {
    margin-right: 15px;
  }


  table {
    border-collapse: collapse;
    width: 100%;
    input {
      height: 40px;
      line-height: 40px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
    textarea {
      width: 100%;
    }
    tr{
      min-height: 60px;
    }
  }
  td {
    border: 1px solid #eee;
    padding: 10px 5px;
  }
  .td_l {
    text-align: center;
    width: 230px;
  }
  .el-radio {
    margin-right: 15px;
  }
  input{
    padding-left: 10px ;
    padding-right: 10px;
  }
</style>
<style lang="scss">
  .coupons {
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__label {
      min-width: 100px;
      text-align: left;
    }
    .text-center {
      text-align: center;
    }
  }
</style>
