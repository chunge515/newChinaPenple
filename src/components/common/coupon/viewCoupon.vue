<template>
    <div class="viewCpon">
      <div class="panel-body">
        <table class="table table-bordered" v-show="myInfo.id">
          <tbody>
          <tr>
            <td class="td_l">ID:</td>
            <td class="td_r" style="width:30%">{{myInfo.id}}</td>
            <td class="td_l">名称:</td>
            <td class="td_r" style="width:30%">{{myInfo.name}}</td>
          </tr>
          <tr>
            <td class="td_l">类型:</td>
            <td class="td_r">{{ {1:'普通优惠券',2:'打折扣券',3:'满减券',4:'新人注册优惠券',5:'每日登录赠送代金券'}[myInfo.type]}}</td>
            <td class="td_l">面值:</td>
            <td class="td_r">
              <span v-if="myInfo.type!=2">{{ myInfo.faceValue/100}}元</span>
              <span v-if="myInfo.type===2">{{ myInfo.faceValue/100}}折</span>
            </td>
          </tr>
          <tr>
            <td class="td_l">库存:</td>
            <td class="td_r">{{ {false:'无限',true:'有限'}[myInfo.inventoryFlag]}}</td>
            <td class="td_l">固定类型:</td>
            <td class="td_r">{{ {0:'固定日期范围',1:'固定时间范围',2:'固定天数'}[myInfo.fixType] }}</td>
          </tr>
          <tr>
            <td class="td_l">开始时间:</td>
            <td class="td_r">{{myInfo.startTime}}</td>
            <td class="td_l">结束时间:</td>
            <td class="td_r">{{myInfo.endTime}}</td>
          </tr>
          <tr>
            <td class="td_l">持续天数:</td>
            <td class="td_r">{{myInfo.expireDay}}</td>
            <td class="td_l">数量:</td>
            <td class="td_r">
              {{myInfo.amount}}
              <div v-if="myInfo.inventory">
                <p>总量：{{myInfo.inventory.totalAmount}}</p>
                <p>已使用：{{myInfo.inventory.usedCount}}</p>
                <p>已绑定：{{myInfo.inventory.bindCount}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="td_l">线上线下:</td>
            <td class="td_r">{{ {0:'线下',1:'线上'}[myInfo.onLineFlag]}}</td>
            <td class="td_l">可重复领取:</td>
            <td class="td_r">{{myInfo.repeatFlag?'是':'否'}}</td>
          </tr>
          <tr>
            <td class="td_l">界面显示:</td>
            <td class="td_r">{{myInfo.homeShow?'是':'否'}}</td>
            <td class="td_l">描述:</td>
            <td class="td_r">{{ myInfo.description}}</td>
          </tr>
          <tr>
            <td class="td_l">有无限制条件:</td>
            <td class="td_r">{{myInfo.restrictFlag?'有':'无'}}</td>
            <td class="td_l">限制条件:</td>
            <td class="td_r">
              <div v-for="item in myInfo.restrictConditions" class="boxer">
                <p>类型：{{ {0:'最低价格',1:'学科',2:'学年',3:'产品类型',4:'其他待定'}[item.type]}}</p>
                <p>值：{{transLimitVal(item.type,item.restrictValue)}}{{ item.type===0?"元":''}}</p>
                <p>描述：{{item.description}}</p>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
      name: "view-coupon",
      props:["detail"],
      data(){
          return {
            myInfo:{},
            grades: [],
            subjects: [],
          }
      },
      mounted(){

        this.prepareData()
      },
      methods:{
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
            _this.getDetail()
          })
        },
        //获取详情
        getDetail(){
          let _this = this;
          this.$axios.get(this.promotionURL+"admin/promotion/couponInfo?couponId="+this.detail.id).then(res=>{
            this.myInfo = res.result;
          }).catch(e=>{
            _this.$message({
              type:"error",
              message:"获取详情失败"
            });
          })
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
        },
      },
      watch:{
        "detail.id":function (ne, old) {
          this.myInfo={}
          if(!ne)return ;
          this.getDetail()
        }
      }
    }
</script>

<style scoped lang="scss">
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
</style>
