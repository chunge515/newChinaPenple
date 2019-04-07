<template>
  <div class="content-wrap1">
    <commonTitle>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>推广信息反馈</el-breadcrumb-item>
      </el-breadcrumb>
    </commonTitle>
    <div class="nav-list">
      <el-input placeholder="请输入内容" class="input-with-select searchWrap" v-model.trim="infoText" style="width: 30%;">
        <el-select slot="prepend" placeholder="请选择" v-model="typesearch" class="typeSearch">
          <el-option label="姓名" value="childRealName"></el-option>
          <el-option label="家长手机号" value="tel"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
      </el-input>
      <div class="types">
        <el-radio v-model="listType" label="1">学生测评</el-radio>
        <el-radio v-model="listType" label="2">家长测评</el-radio>
        <el-radio v-model="listType" label="3">运营活动</el-radio>
      </div>

    </div>
    <!--表格-->
    <el-table :data="tableData" v-if="tableData" border style="width: 100%" :row-class-name="isCenter"
              :header-cell-style="{'text-align':'center'}">
      <el-table-column type="index" :index="indexMethod" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="childRealName" label="学生姓名" :key="Math.random()">
      </el-table-column>
      <el-table-column prop="childGrade" label="年级" :key="Math.random()">
      </el-table-column>
      <el-table-column prop="childSex" label="性别" width="80" :key="Math.random()">
      </el-table-column>
      <el-table-column prop="isSingle" label="独生子女" width="100" :key="Math.random()" v-if="listType != 3">
      </el-table-column>
      <el-table-column prop="relation" label="亲子关系" width="110" :key="Math.random()" v-if="listType != 3">
      </el-table-column>
      <el-table-column prop="tel" label="家长手机号" width="120" :key="Math.random()">
      </el-table-column>
      <el-table-column label="提交时间" width="160" :key="Math.random()">
        <template slot-scope="scope">
          {{ scope.row.createDate | dateFormater}}
        </template>
      </el-table-column>
      <el-table-column label="预约时间" :key="Math.random()">
        <template slot-scope="scope">
          {{ scope.row.appointDateTime | timelen}}
        </template>
      </el-table-column>
      <el-table-column label="兑换码" :key="Math.random()">
        <template slot-scope="scope">
          {{ scope.row.coupon }}
        </template>
      </el-table-column>
      <el-table-column prop="spreadManTel" label="推广员手机" width="120" :key="Math.random()">
      </el-table-column>
      <el-table-column prop="spreadMan" label="推广员名称" width="120" :key="Math.random()">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="90" v-if="listType != 3" :key="Math.random()">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="lookInfo(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination v-show="tableData"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>

    <el-dialog title="详情" :visible.sync="dialogChangeInfo" v-if="dialogChangeInfo" class="parentfeedbackdetail" center>
      <div class="btn-wrap">
        <el-row>
          <el-col :span="8" class="block">
            <el-col :span="10">学生姓名：</el-col>
            <el-col :span="14">{{itemData.childRealName}}</el-col>
          </el-col>
          <el-col :span="8" class="block">
            <el-col :span="10">性别：</el-col>
            <el-col :span="14">{{itemData.childSex}}</el-col>
          </el-col>
          <el-col :span="8" class="block">
            <el-col :span="10">年级：</el-col>
            <el-col :span="14">{{itemData.childGrade}}</el-col>
          </el-col>
          <el-col :span="8" class="block">
            <el-col :span="10">预约时间：</el-col>
            <el-col :span="14">{{itemData.appointDateTime|timelen}}</el-col>
          </el-col>
          <el-col :span="8" class="block">
            <el-col :span="10">预约类型：</el-col>
            <el-col :span="14"> {{ listTypes[listType] }}</el-col>
          </el-col>
          <el-col :span="8" class="block">
            <el-col :span="10">兑换码：</el-col>
            <el-col :span="14">{{itemData.coupon}}</el-col>
          </el-col>
          <el-col :span="8" class="block">
            <el-col :span="10">独生子女：</el-col>
            <el-col :span="14">{{itemData.isSingle}}</el-col>
          </el-col>
          <el-col :span="8" class="block">
            <el-col :span="10">亲子关系：</el-col>
            <el-col :span="14">{{itemData.relation}}</el-col>
          </el-col>
          <el-col :span="8" class="block">
            <el-col :span="10">家长手机号：</el-col>
            <el-col :span="14">{{itemData.tel}}</el-col>
          </el-col>

          <el-col :span="8" class="block">
            <el-col :span="10">时间：</el-col>
            <el-col :span="14">{{itemData.createDate | dateFormater}}</el-col>
          </el-col>

          <el-col :span="8" class="block" v-show="listType==1">
            <el-col :span="10">学科：</el-col>
            <el-col :span="14">{{itemData.subjectCodeStr }}</el-col>
          </el-col>

          <el-col :span="8" class="block" v-show="listType==1">
            <el-col :span="10">年级：</el-col>
            <el-col :span="14">{{itemData.childGrade }}</el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="24" class="text-center block">测评报告</el-col>
            <div v-for="ro in reportOrder" :key="ro.key" v-if="listType==2">
              <el-col :span="24" class="resultTitle block" v-if="itemData[ro.analysis]">根据{{ro.name}}，我们分析为：</el-col>
              <el-col :span="24" class="resultCont " v-if="itemData[ro.analysis]"
                      v-html="boldTxt(itemData[ro.analysis])"></el-col>
              <el-col :span="24" class="resultTitle block" v-if="itemData[ro.suggest]">根据{{ro.name}}，我们建议为：</el-col>
              <el-col :span="24" class="resultCont " v-if="itemData[ro.suggest]"
                      v-for="(sugg,i) in stringArray(itemData[ro.suggest])" :key="i" v-html="boldTxt(sugg)"></el-col>
            </div>
          </el-col>
          <el-col :span="24" v-if="listType ==1">
            <iframe :src="iframePath" height="100%"
                    style="border: none;height: 100%;width: 100%;min-height: 1400px"></iframe>
          </el-col>
        </el-row>
        <el-row class="btnBox">
          <el-button @click="dialogChangeInfo=false">关闭</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {

    data() {
      return {
        listTypes: {"1": "学生测评", "2": "家长测评", "3": "运营活动"},
        listType: '1',
        typesearch: 'childRealName',
        infoText: '',
        /*表格(教师列表)*/
        tableData: null,
        //当前展示详情的数据
        itemData: {},
        /*分页*/
        currentPage: 1, //当前页数
        total: 0, //数据个数
        pageSize: 10, //每页几条
        dialogChangeInfo: false,
        //问卷报告和建议顺序
        reportOrder: [
          {name: "父母期望问卷", key: "expectList", analysis: "expectScoreResult", suggest: "expectScoreProjectList"},
          {name: "家庭教养方式问卷", key: "upbringingList", analysis: "upbringingResult", suggest: "upbringingProjectList"},
          {name: "亲子关系问卷", key: "parenthoodList", analysis: "parenthoodResult", suggest: "parenthoodProjectList"},
          {name: "教育投入问卷", key: "injectList", analysis: "injectResult", suggest: "injectProject"},
          {name: "自主学习问卷", key: "autonomicList", analysis: "autonomicResult", suggest: "autonomicProjectList"}
        ],
        iframePath: "http://statictest.xinguoren.cn/bookCollege/#/reportDetail?code=20cf6ed63169469b8dc40dd72164ed04",

      }
    },
    created() {
      this.getParList();

    },
    filters: {
      timelen(v) {
        return v && v.substring(0, 10) || "";
      },
      dateFormater(v) {
        if (!v) return "";
        var time = new Date(v);
        return time.getFullYear() + "-" + ("0" + (time.getMonth() + 1)).substr(-2) + "-" + ("0" + time.getDate()).substr(-2) + " " + ("0" + time.getHours()).substr(-2) +
          ":" + ("0" + time.getMinutes()).substr(-2) + ":" + ("0" + time.getSeconds()).substr(-2);
      }
    },
    methods: {
      getParList(val) {
        var $this = this;
        var obj;
        if (val) {
          obj = val
        } else {
          obj = {
            type: this.listType,
            pageNum: this.currentPage,//当前页码
            pageSize: this.pageSize//每页条数 ,
          }
        }
        this.$axios
          .post("/parentTest/getParentTests", obj)
          .then(res => {
            if (res.code == "000000") {
              $this.total = res.totalRows;
              $this.tableData = res.result || [];
            } else {
              this.$message({
                type: 'error',
                message: "获取家长反馈列表失败"
              });
              $this.tableData = [];
            }
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: "获取家长反馈列表失败"
            });
          });
      },
      //获取查询条件
      getSearchCondition() {
        var obj = {
          type: this.listType,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        if (this.infoText) {
          if (this.typesearch == "tel" && !/^\d{1,11}$/.test(this.infoText)) {
            this.$message({
              type: 'error',
              message: "请输入合法的部分或完整的手机号"
            });
            return false;
          }
          obj[this.typesearch] = this.infoText;
        }
        return obj;
      },
      /*分页*/
      handleSizeChange(val) {
        var obj = this.getSearchCondition();
        if (!obj) return;
        obj.pageSize = val;
        this.pageSize = val;
        this.getParList(obj)
      },
      handleCurrentChange(val) {
        var obj = this.getSearchCondition();
        if (!obj) return;
        this.currentPage = val;
        obj.pageNum = val;
        this.getParList(obj)
      },
      /*表格*/
      indexMethod(index) {
        return index + 1
      },

      /*点击搜索按钮*/
      searchBtn() {
        var obj = this.getSearchCondition();
        if (!obj) return;
        obj.pageNum = 1;
        this.currentPage = 1;
        this.getParList(obj)
      },
      //设置表的样式
      isCenter({row, column, rowIndex, columnIndex}) {
        return 'isCenter3'
      },
      //字体加粗加颜色
      boldTxt(s) {
        if (!s) return "";
        return s.replace(/【/g, "<span style=\"color:#c62c2c;font-weight:bold;\">【").replace(/】/g, '】</span>');
      },
      //建议
      stringArray(s) {
        if (!s) return [];
        try {
          return JSON.parse(s);
        } catch (e) {
          return [];
        }
      },
      //查看详情
      lookInfo(tmp) {
        this.itemData = tmp;
        this.dialogChangeInfo = true;
        if(this.listType==1){
          this.iframePath = this.staticUrl+this.staticPath+"#/reportDetail?code=" + this.itemData.evaluationRecordId + "&isMgr=1" //+tmp.id;
        }
      }
    },
    watch: {
      listType: function () {
        this.handleCurrentChange(1);
      }
    },

  }
</script>

<style scoped lang="scss">
  .text-center {
    text-align: center;
  }

  .btn-wrap {
    margin-top: -10px;
    .block {
      padding: 8px 0;
    }
    .resultTitle {
      font-weight: bold;
    }
    .resultCont {
      line-height: 24px;
      text-indent: 2em;
    }
  }

  .btnBox {
    text-align: center;
  }

  .typeSearch {
    width: 120px;
  }

  .searchWrap {
    margin-left: 20px;
  }

  .nav-list {
    margin: 20px;
  }

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }

  .isCenter3 td:last-child {
    text-align: center
  }

  .types {
    display: inline-block;
    padding-left: 30px;
  }
</style>
<style>
  .parentfeedbackdetail .el-dialog {
    min-width: 860px;
    width: 80%;
  }

  .isCenter3 td {
    text-align: center;
    height: 48px;
    line-height: 48px;
    padding: 0;
  }

</style>
