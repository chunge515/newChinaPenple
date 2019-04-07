<template>
  <div class="new-coupon">
    <el-form ref="newcpnform">
      <table class="table table-bordered">
        <tbody>
        <tr>
          <td class="td_l">优惠券名称:</td>
          <td colspan="5" class="td_r"><input type="text" v-model="form.name"></td>
        </tr>
        <tr>
          <td class="td_l">优惠券类型:</td>
          <td colspan="5" class="td_r">
            <el-radio v-for="r in couponTypes" :key="r.val" :label="r.val" v-if="r.val!==''" v-model="form.type">{{r.txt}}</el-radio>
          </td>
        </tr>
        <tr>
          <td class="td_l">{{form.type ==2 ? "折扣":"面值"}}:</td>
          <td class="td_r" style="width: 20%;"><input type="number" v-model.number.trim="form.faceValue" step="0.01"
                                                      class="form-control"></td>
          <td class="td_l">库存限制:</td>
          <td class="td_r" style="width: 20%;">
            <el-radio v-for="(l,i) in inventoryFlags" :label="l.val" :key="i" v-if="l.val!==''" v-model="form.inventoryFlag">{{l.txt}}</el-radio>
          </td>
          <td class="td_l">总量:</td>
          <td class="td_r" style="width: 20%;"><el-input type="number" v-model.number.trim="form.amount" step="1" min="1" :disabled="form.inventoryFlag==0"></el-input></td>
        </tr>
        <tr>
          <td class="td_l">时间类型:</td>
          <td colspan="5" class="td_r"><el-radio v-for="(t,i) in fixTypes" v-if="t.val!==''" :key="i" :label="t.val" v-model="form.fixType">{{t.txt}}</el-radio>
          </td>
        </tr>
        <tr v-show="form.fixType!=2">
          <td class="td_l">开始时间:</td>
          <td class="td_r"><el-date-picker
            v-model="form.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker></td>
          <td class="td_l">结束时间:</td>
          <td colspan="3" class="td_r"><el-date-picker
            v-model="form.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker></td>
        </tr><!---->
        <tr v-show="form.fixType==2">
          <td class="td_l">持续天数：</td>
          <td class="td_r" colspan="5"><input type="number" step="1" min="1" v-model="form.expireDay"></td>
        </tr>
        <tr>
          <td class="td_l">线上线下:</td>
          <td class="td_r"><el-radio v-for="(l,i) in onLineFlags" v-if="l.val !== ''" :label="l.val" :key="i" v-model="form.onLineFlag">{{l.txt}}</el-radio></td>
          <td class="td_l">重复购买:</td>
          <td class="td_r"><el-radio v-for="(l,i) in repeatFlags" v-if="l.val !== ''" :label="l.val" :key="i" v-model="form.repeatFlag">{{l.txt}}</el-radio></td>
          <td class="td_l">界面显示:</td>
          <td class="td_r"><el-radio v-for="(l,i) in homeShows" v-if="l.val !== ''" :label="l.val" :key="i" v-model="form.homeShow">{{l.txt}}</el-radio></td>
        </tr>
        <tr>
          <td class="td_l">有无限制:</td>
          <td class="td_r"><el-radio v-for="(l,i) in restrictFlags" v-if="l.val !== ''" :label="l.val" :key="i" v-model="form.restrictFlag">{{l.txt}}</el-radio></td>
          <td class="td_l">限制条件:</td>
          <td colspan="3" class="td_r" style="width:50%">
            <el-row class="limits" v-show="form.restrictFlag==1">
              <el-col :span="12" class="flexed">
                <span>类型:</span>
                <el-select class="flex2" v-model="tmprestrictConditions.type" @change="resetLimit" placeholder="请选择">
                  <el-option
                    v-for="item in couponLimits"
                    :key="item.val"
                    :label="item.txt"
                    :value="item.val">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12" class="flexed">
                <span>值:</span>
                <el-input class="flex2" type="number" step="0.01" v-model.number.trim="tmprestrictConditions.restrictValue" v-if="tmprestrictConditions.type==0"></el-input>
                <el-select class="flex2" v-model="tmprestrictConditions.restrictValue"  v-if="tmprestrictConditions.type==1" placeholder="请选择">
                  <el-option
                    v-for="(item,i) in subjects"
                    :key="i"
                    :label="item.subjectName"
                    :value="item.subjectCode">
                  </el-option>
                </el-select>
                <el-select class="flex2" v-model="tmprestrictConditions.restrictValue"  v-if="tmprestrictConditions.type==2" placeholder="请选择">
                  <el-option
                    v-for="(g,i) in grades"
                    :key="i"
                    :label="g.gradeName"
                    :value="g.gradeCode">
                  </el-option>
                </el-select>

                <el-select class="flex2" v-model="tmprestrictConditions.restrictValue"  v-if="tmprestrictConditions.type==3" placeholder="请选择">
                  <el-option  v-if="item.val!=''"
                    v-for="item in productTypes"
                    :key="item.val"
                    :label="item.txt"
                    :value="item.val">
                  </el-option>
                </el-select>

              </el-col>
              <el-col :span="24"  class="flexed top10">
                <span>描述:</span>
                <el-input class="flex2" v-model.trim="tmprestrictConditions.description"></el-input>
                <el-button @click="addLimit()">添加</el-button>
              </el-col>
              <el-col :span="24">
                <div class="boxer" v-for="(b,i) in form.restrictConditions" :key="i">
                  <i class="close" @click="delLimit(i)">X</i>
                  <div>类型：{{transLimitVal(b.type,null)}}</div>
                  <div>值：{{transLimitVal(b.type,b.restrictValue)}}</div>
                  <div>描述：{{b.description}}</div>
                </div>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td class="td_l">描述:</td>
          <td colspan="5" class="td_r"><textarea name="description " cols="100" rows="4" maxlength="350"
                                                 class="form-control" v-model.trim="form.description"></textarea></td>
        </tr>
        <tr>
          <td class="td_l tip">说明：</td>
          <td colspan="5" style="text-align: left;">
            <div><p class="tip">1）选有库存时，必须填写总量</p>
              <p class="tip">2）选固定天数时，必须填写持续天数,选固定日期范围或者固定时间范围，填写开始日期结束日期</p>
              <p class="tip">
                3）优惠券类型选择打折扣劵时，输入为折扣范围为0.01到9.99,其他类型面值输入为价格，单位为元；选择新人优惠券时，库存为无限库存，线上，不可重复购买，不在界面显示；选每日登陆赠送优惠券时，库存为无限库存，线上，可重复购买，不在界面显示</p>
              <p class="tip">4）选线下时，必须为有限库存,必须填写总量，总量比较大于0,界面不显示</p></div>
          </td>
        </tr>
        <tr>
          <td colspan="6" class="text-center">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="cancel">取消</el-button>
          </td>
        </tr>
        </tbody>
      </table>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "new-coupon",
    data() {
      return {
        grades: [],
        subjects: [],
        fullscreenLoading: false,
        tmprestrictConditions:{
          description:"", //描述
          restrictValue:"", //值
          type:0 ,  //类型
        },
        form: {
          name: "",
          type: 1, //优惠券类型
          faceValue: 0, //面值
          inventoryFlag:0, //库存限制
          amount:0, //总量
          startTime:"",
          endTime:"",
          fixType:0, //时间类型
          expireDay:0, //持续天数
          onLineFlag:0, // 线上线下
          repeatFlag:0, // 重复购买
          homeShow:0, //界面显示
          restrictFlag: 0, //是否有限制
          restrictConditions:[],  //添加的限制条件 {type:"",description:"",restrictValue:""}
          description:"", //当前优惠券的描述
        }
      }
    },
    created() {
      this.prepareData()

    },
    methods: {
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
        })
      },

      //删除限制项
      delLimit(i) {
        this.form.restrictConditions.splice(i, 1)
      },
      //添加限制项
      addLimit() {
       if(!this.tmprestrictConditions.restrictValue||!this.tmprestrictConditions.description){
        return this.$message({type:"warning",message:"请完善限制条件"})
       }
        this.form.restrictConditions.push({type:this.tmprestrictConditions.type,
          restrictValue:this.tmprestrictConditions.type === 0 ? this.tmprestrictConditions.restrictValue*100 :this.tmprestrictConditions.restrictValue,
          description:this.tmprestrictConditions.description});
        this.tmprestrictConditions.type = 0;
        this.resetLimit()
      },
      //点击提交
      sure() {
        if (this.fullscreenLoading) return;
        this.fullscreenLoading = true;
        console.log(this.form);
        var _this = this;
        if(this.validate() !== "ok"){
          return ;
        }
        this.$axios.post(this.promotionURL+"/admin/promotion/addCoupon",Object.assign({},this.form,{faceValue:this.form.faceValue*100})).then(res=>{
          _this.fullscreenLoading = false;
          if(res.code==200){
            _this.$message({
              type:"success",
              message:"添加成功"
            });
            _this.$emit("closed",{reload:true});
            return ;
          }
          _this.$message({
            type:"error",
            message:res.message||""
          })
        }).catch(e=>{
          _this.fullscreenLoading = false;
          _this.$message({
            type:"error",
            message:"添加失败"
          })
        })
      },
      //判断提交表单的合法性
      validate(){
        if(!this.form.name){
          return this.$message({
            type:"warning",
            message:"请填写优惠券名称"
          });
        }
        if(!this.form.faceValue){
          return this.$message({
            type:"warning",
            message:"请填写"+(this.form.type===2 ? "折扣":"面值")
          })
        }
        if(this.form.inventoryFlag===1 && !this.form.amount){
          return this.$message({
            type:"warning",
            message:"请填写总量"
          })
        }else if(this.form.inventoryFlag===0){
          this.form.amount = 0;
        }
        if(this.form.fixType<2&&(!this.form.startTime||!this.form.endTime)){
          return this.$message({
            type:"warning",
            message:"请完善时间范围"
          })
        }else if(this.form.fixType===2&&!this.form.expireDay){
          return this.$message({
            type:"warning",
            message:"请填写持续天数"
          })
        }
        if(this.form.restrictFlag===1&&this.form.restrictConditions.length===0){
          return this.$message({
            type:"warning",
            message:"请添加限制条件"
          })
        }
        if(!this.form.description){
          return this.$message({
            type:"warning",
            message:"请添加描述"
          })
        }
        return "ok";
      },
      //取消新建
      cancel() {
        this.reset();
        this.$emit("closed")
      },
      //重置form内容
      reset() {
        this.resetLimit();
        this.tmprestrictConditions.type = 0;
        this.form =  {
          name: "",
          type: 1, //优惠券类型
          faceValue: 0, //面值
          inventoryFlag:0, //库存限制
          amount:0, //总量
          startTime:"",
          endTime:"",
          fixType:0, //时间类型
          expireDay:0, //持续天数
          onLineFlag:0, // 线上线下
          repeatFlag:0, // 重复购买
          homeShow:0, //界面显示
          restrictFlag: 0, //是否有限制
          restrictConditions:[],  //添加的限制条件 {type:"",description:"",restrictValue:""}
          description:"", //当前优惠券的描述
        };
      },
      //重置限制筛选条件
      resetLimit(){
    //    this.tmprestrictConditions.type = 0;
        this.tmprestrictConditions.restrictValue ="";
        this.tmprestrictConditions.description = "";
      },
      //根据限制类型翻译限制值（code->name）
      transLimitVal(type,value){
        var val = value;
        if(val === null){
          this.couponLimits.forEach(v=>{
            if(v.val == type){
              return val = v.txt;
            }
          });
          return val;
        }
        if(type===0){
          return val/100;
        }else if(type == 1){ //学科
          this.subjects.forEach(v=>{
            if(v.subjectCode == value){
              return val = v.subjectName;
            }
          })
        }else if(type ==2){ //学年
          this.grades.forEach(v=>{
            if(v.gradeCode == value){
              return val = v.gradeName;
            }
          })
        }else if(type==3){
          this.productTypes.forEach(v=>{
            if(v.val == value){
              return val = v.txt;
            }
          })
        }
        return val;
      }
    },
    watch:{
      "form.restrictFlag":function (tmp,old) {
        if(tmp==0){
          this.form.restrictConditions = [];
          this.resetLimit()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .new-coupon {
    .tip {
      color: red;
    }
    table {
      border-collapse: collapse;
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
    .flexed{
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      span{
        display: inline-block;
        line-height: 40px;
      }
      .flex2{
        padding: 0 6px;
        flex: 2;
      }
    }
    .top10{
      margin-top: 10px;
    }
    td {
      border: 1px solid #eee;
      padding: 10px 5px;
    }
    .td_l {
      text-align: center;
      width: 230px;
    }
    .boxer{
      border: 1px solid #ccc;
      border-radius: 5px ;
      box-sizing: border-box;
      padding: 6px;
      position: relative;
      z-index: 1;
      width: 200px;
      display: inline-block;
      margin-top: 10px;
      margin-right: 10px;
      i{
        cursor: pointer;
        user-select: none;
        position: absolute;
        z-index: 10;
        top: 0;
        right: 10px;
        font-style: normal;
      }
    }
    .el-radio {
      margin-right: 15px;
    }
    input{
      padding-left: 10px ;
      padding-right: 10px;
    }
  }
</style>
