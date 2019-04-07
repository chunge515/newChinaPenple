<template>
  <div class="auditionBox padTop20">
    <el-form ref="form" :model="form" label-width="205px" :rules="rules">
      <el-row>
        <el-col :span="24" >
          <el-form-item label="预约三次试听时间：" prop="appointmentDatetime">
            <el-date-picker
              v-model="form.appointmentDatetime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="timestamp"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!--<el-col :span="8" >
          <el-form-item label="方案订制状态：" prop="schemeMakeState">&lt;!&ndash;schemeMakeStates&ndash;&gt;
            <el-select v-model="form.schemeMakeState" placeholder="请选择">
              <el-option label="已完成" value="1"></el-option>
              <el-option label="未完成" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"  >
          <el-form-item label="方案制定导师：" prop="schemeTutorialName" >
            <el-input v-model.trim="form.schemeTutorialName" type="text"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <el-form-item label="是否完成三次试听：" prop="hasComplete">
            <el-select v-model="form.hasComplete" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="三次试听干预导师：" prop="serviceTutorial">
            <el-select v-model="form.serviceTutorial" placeholder="请选择" value-key="id">
              <el-option
                v-for="item in serviceTutorials"
                :label="item.name"
                :value="item"
                :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户意向等级：" prop="intentionLevel"><!--intentionLevels-->
            <el-select v-model="form.intentionLevel" placeholder="请选择">
              <el-option v-for="(item,index) in intentionLevels"
                         :label="item"
                         :value="item"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-row>

            <el-col style="width: 350px; margin-right: 10px;">
              <el-form-item label="切单情况：" prop="cutListState">
                <el-select v-model="form.cutListState" placeholder="请选择">
                  <el-option v-for="(item,index) in cutListStates"
                             :label="item.name"
                             :value="item.code"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width: 300px;" v-if="form.cutListState>1">
              <el-input v-model="form.cutListReason"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <!--<el-col :span="24">
          &lt;!&ndash;auditionFeedbackState&ndash;&gt;
          <el-row>
            <el-col style="width: 350px; margin-right: 10px;">
              <el-form-item label="三次试听反馈：" prop="auditionFeedbackState">
                <el-select v-model="form.auditionFeedbackState" placeholder="请选择">
                  <el-option v-for="(item,index) in auditionFeedbackStates"
                             :label="item.name"
                             :value="item.code"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width: 300px;" v-if="form.auditionFeedbackState==1">
              <el-input v-model="form.auditionFeedbackReason"></el-input>
            </el-col>
          </el-row>
        </el-col>-->
        <el-col :span="24">
          <el-form-item label="三次试听科目及内容：" prop="auditionSubjectCode"><!--auditionSubjectCode-->
            <el-select v-model="form.auditionSubjectCode" placeholder="请选择" >
              <el-option
                v-for="(item,index) in subjectList"
                :label="item.subjectName"
                :value="item.subjectCode"
                :key="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="auditionContent"><!--auditionSubjectCode-->
            <el-input v-model.trim="form.auditionContent" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否报名" prop="signUpState">
          <el-select v-model="form.signUpState" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" v-if="form.signUpState=='1'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="报名学科">
                <el-checkbox-group v-model="signUpSubjectCodes">
                  <el-checkbox
                    v-for="(item,index) in subjectList"
                    :label="item.subjectCode" :key="index" >{{item.subjectName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="报名课时" prop="signUpCourseTimes"><!--auditionSubjectCode-->
                    <el-input v-model.trim="form.signUpCourseTimes" type="number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开课日期时间" prop="courseBeginDatetime"><!--auditionSubjectCode-->
                    <el-date-picker
                      v-model="form.courseBeginDatetime"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      value-format="timestamp"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴费金额" prop="paymentAmount">
                <el-input v-model.trim="form.paymentAmount" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" >
              <el-form-item label="缴费日期：" prop="paymentDatetime">
                <el-date-picker
                  v-model="form.paymentDatetime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy - MM - dd "
                  value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否签署协议：" prop="hasProtocol">
                <el-select v-model="form.hasProtocol" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="form.hasProtocol=='1'">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="协议编号" prop="protocolNumber">
                    <el-input v-model.trim="form.protocolNumber" type="text" placeholder="填写协议编号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="确认协议是否到账：" prop="protocolAccount">
                    <el-select v-model="form.protocolAccount" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-col>
          </el-row>
        </el-col>


        <el-col :span="24">
          <el-form-item label="享受折扣/优惠套餐：" prop="discountPackage">
            <el-input v-model.trim="form.discountPackage" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="其他备注信息：" prop="remark">
            <el-input v-model.trim="form.remark" type="textarea" placeholder="填写备注信息"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <h5>三次试听学生反馈</h5>
          <el-row>
            <el-col :span="12">
              <el-form-item label="干预训练素材难度：" prop="studentFeedbackDifficulty">
                <el-select v-model="form.studentFeedbackDifficulty" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in studentFeedbackDifficultys"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对干预训练方法接受程度：" prop="studentFeedbackAccept">
                <el-select v-model="form.studentFeedbackAccept" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in studentFeedbackAccepts"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上课过程中：" prop="studentFeedbackThink">
                <el-select v-model="form.studentFeedbackThink" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in studentFeedbackThinks"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="本次干预效果：" prop="studentFeedbackEffect">
                <el-select v-model="form.studentFeedbackEffect" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in studentFeedbackEffects"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
                <!--<el-input v-model.trim="form.studentFeedbackEffect" maxlength="10"></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：" prop="studentFeedbackRemark">
                <el-input v-model.trim="form.studentFeedbackRemark"  maxlength="1000" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-col>
        <el-col :span="24">
          <h5>三次试听教师评价</h5>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学生的学习习惯：" prop="teacherAssessmentStudyHabit">
                <el-select v-model="form.teacherAssessmentStudyHabit" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentStudyHabits"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生对干预方法的适应程度：" prop="teacherAssessmentMethodAdapt">
                <el-select v-model="form.teacherAssessmentMethodAdapt" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentMethodAdapts"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学生有哪些不好的习惯：" prop="teacherAssessmentBadHabits">
                <el-checkbox-group
                  v-model="teacherAssessmentBadHabits">
                  <el-row>
                    <el-col :span="6" v-for="(item,index) in teacherAssessmentBadHabitList" :key="index">
                      <el-checkbox
                        :label="item.code">{{item.name}}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生的学习方法：" prop="teacherAssessmentStudyMethod">
                <el-select v-model="form.teacherAssessmentStudyMethod" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentStudyMethods"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学生的思维能力：" prop="teacherAssessmentThinkAbility">
                <el-select v-model="form.teacherAssessmentThinkAbility" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentThinkAbilitys"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="知识掌握情况：" prop="teacherAssessmentMasterKnowledge">
                <el-select v-model="form.teacherAssessmentMasterKnowledge" placeholder="请选择" >
                  <el-option
                    v-for="(item,index) in teacherAssessmentMasterKnowledges"
                    :label="item.name"
                    :value="item.code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：" prop="teacherAssessmentRemark">
                <el-input v-model.trim="form.teacherAssessmentRemark" maxlength="1000" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <div class="addBtn" style="text-align:center">
      <el-button type="primary" @click="god('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import moment from "moment"
  export default {
    components: {},
    props: {},
    created() {
      //this.type=this.$route.query.type;
      this.getAdministratorsByRoleId();
      this.getSubjectList();
      this.edit=this.$route.query.edit;
      if(this.edit){
        var obj= this.localData.get('auditionRecordObjT')
        obj.appointmentDatetime=moment(obj.appointmentDatetime, 'YYYY-MM-DD HH:mm:ss').valueOf();
        obj.courseBeginDatetime=moment(obj.courseBeginDatetime, 'YYYY-MM-DD HH:mm:ss').valueOf();
        obj.paymentDatetime=moment(obj.paymentDatetime, 'YYYY-MM-DD HH:mm:ss').valueOf();
        obj.serviceTutorial={
          id:obj.serviceTutorialCode,
          name:obj.serviceTutorialName,
        }
        this.signUpSubjectCodes=obj.signUpSubjectCodes;
        this.form=obj
      }
    },
    mounted() {
    },
    data() {
      return {
        editObj:{},
        edit:'',
        type: "",
        subjectList: [],//学科列表
        serviceTutorials: [],//干预导师列表
        cutListStates:[
          {code: '1', name: '意向强烈，已报名'},
          {code: '2', name: '意向强烈，未报名'},
          {code: '3', name: '无意向，未报名'},
        ],
        intentionLevels: ['A', 'B', 'C'],
        auditionFeedbackStates: [
          {code: '1', name: '不满意'},
          {code: '2', name: '一般'},
          {code: '3', name: '满意'},
        ],
        studentFeedbackDifficultys: [
          {code: '1', name: '易'},
          {code: '2', name: '适中'},
          {code: '3', name: '难'},
        ],
        studentFeedbackAccepts: [
          {code: '1', name: '勉强接受'},
          {code: '2', name: '可以接受'},
          {code: '3', name: '能够较好接受'},
        ],
        studentFeedbackThinks: [
          {code: '1', name: '老师讲的多'},
          {code: '2', name: '一样多'},
          {code: '3', name: '我思考的多写的多'},
        ],
        studentFeedbackEffects: [//
          {code: '1', name: '效果不明显'},
          {code: '2', name: '一般'},
          {code: '3', name: '非常有用'},
        ],
        teacherAssessmentStudyHabits: [
          {code: '1', name: '差'},
          {code: '2', name: '一般'},
          {code: '3', name: '较好'},
        ],
        teacherAssessmentMethodAdapts:[
          {code: '1', name: '非常适应'},
          {code: '2', name: '一般'},
          {code: '3', name: '勉强适应'},
        ],
        teacherAssessmentBadHabitList: [
          {code: '1', name: '专注力差'},
          {code: '2', name: '不愿意动笔'},
          {code: '3', name: '转笔'},
          {code: '4', name: '书写字迹潦草'},
          {code: '5', name: '抖腿'},
          {code: '6', name: '握笔姿势不正确'},
          {code: '7', name: '教师提问反应缓慢'},
          {code: '8', name: '坐姿不正确'},
          {code: '9', name: '玩手机'},
          {code: '10', name: '说话声音过大/过小'},
          {code: '11', name: '做作业慢'},
        ],
        teacherAssessmentStudyMethods: [
          {code: '1', name: '未掌握有效的学习方法'},
          {code: '2', name: '有方法但是一般'},
          {code: '3', name: '有有效的学习方法'},
        ],
        teacherAssessmentThinkAbilitys: [//
          {code: '1', name: '需教师多次引导'},
          {code: '2', name: '需教师适当引导'},
          {code: '3', name: '思维敏捷,反应较快'},
        ],
        teacherAssessmentMasterKnowledges: [
          {code: '1', name: '基础知识掌握一般解决复杂问题有困难'},
          {code: '2', name: '基础知识扎实但解决复杂问题有困难'},
          {code: '3', name: '基础知识扎实能解决复杂问题'},
        ],
        signUpSubjectCodes: [],//报名学科
        teacherAssessmentBadHabits: [],//学生哪些不好的习惯
        form: {
          remark:'',//其他备注
          discountPackage:'',//享受折扣优惠
          protocolAccount:'',//确认协议是否到账
          hasProtocol:'',//是否签署协议
          protocolNumber:'',//协议编号
          paymentAmount:'',//缴费金额
          paymentDatetime:'',//缴费日期
          courseBeginDatetime:'',//开课日期时间
          signUpCourseTimes:"",//报名课时
          cutListState:'',//切单情况
          cutListReason:'',//未落单原因
          appointmentDatetime: '',//预约时间
          schemeMakeState:'',//方案定制状态
          schemeTutorialName:'',//定制导师
          hasAssessment: '',//是否进行测评
          serviceTutorial: null,//试听干预导师
          hasComplete: '',//是否完成一次试听
          signUpState:'',//是否报名
          auditionFeedbackReason: '',//不满意描述
          auditionSubjectCode: '',//试听科目
          auditionContent: '',//试听内容
          studentFeedbackDifficulty: '',//干预训练难度
          studentFeedbackAccept: '',//接受程度
          studentFeedbackThink: '',//上课过程中
          studentFeedbackEffect: '',///干预效果
          studentFeedbackRemark: '',//试听学生反馈备注
          teacherAssessmentStudyHabit: '',//学生学习习惯
          teacherAssessmentMethodAdapt:"",
          teacherAssessmentStudyMethod: '',//学生学习的方法
          teacherAssessmentThinkAbility: '',//学生的思维能力
          teacherAssessmentMasterKnowledge: '',//知识掌握情况
          teacherAssessmentRemark: '',//教师备注
          intentionLevel:'',//用户意向等级

          //
        },
        rules: {
          signUpState: [
            {required: true, message: "请选择是否报名", trigger: 'change'},
          ],
          cutListState: [
            {required: true, message: "请选择切单情况", trigger: 'change'},
          ],
          schemeTutorialName:[
            {required: true, message: "请填写方案制定导师", trigger: 'blur'},
          ],
          schemeMakeState:[
            {required: true, message: "请选择方案定制状态", trigger: 'change'},
          ],
          appointmentDatetime: [
            {required: true, message: "请填写预约到场时间", trigger: 'change'},
          ],
          hasAssessment: [
            {required: true, message: "请选择是否进行测评"},
          ],
          serviceTutorial: [
            {required: true, message: "请选择三次试听干预导师"},
          ],
          hasComplete: [
            {required: true, message: "请选择是否完成三次试听"},
          ],
          intentionLevel: [
            {required: true, message: "请选择用户意向等级"},
          ],
          /*auditionFeedbackState:[
            {required: true, message: "请选择三次试听反馈"},
          ],*/
          auditionSubjectCode:[
            {required: true, message: "三次试听科目"},
          ],
          auditionContent:[
            {required: true, message: "三次试听内容"},
          ],
          studentFeedbackDifficulty:[
            {required: true, message: "干预训练素材难度"},
          ],
          studentFeedbackAccept:[
            {required: true, message: "对干预训练方法接受程度"},
          ],
          studentFeedbackThink:[
            {required: true, message: "上课过程中"},
          ],
          studentFeedbackEffect:[
            {required: true, message: "本次干预效果"},
          ],
          teacherAssessmentStudyHabit:[
            {required: true, message: "学生的学习习惯"},
          ],
          teacherAssessmentMethodAdapt:[
            {required: true, message: "学生对干预方法的适应程度"},
          ],
          teacherAssessmentStudyMethod:[
            {required: true, message: "学生的学习方法"},
          ],
          teacherAssessmentThinkAbility:[
            {required: true, message: "学生的思维能力"},
          ],
          teacherAssessmentMasterKnowledge:[
            {required: true, message: "知识掌握情况"},
          ],

        }
      }
    },
    methods: {
      //获取干预导师的列表
      getAdministratorsByRoleId(){
        var $this=this;
        this.$axios
          .post("/management/getAdministratorsByRoleId", {  "role": "INTERVENE_TEACHERE"})
          .then(res => {
            console.log(res)
            $this.serviceTutorials=res.administrators ||[];
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: err
            });
          });
      },
      //获取学科列表
      /*根据获取学科列表*/
      getSubjectList(){
        // console.log(gradeCode)
        // this.
        var $this = this;
        var obj={
          dataType: 1,
        }
        this.$ajax.getSubjectsByGrade(obj).then(function (result) {
          if(result.code=="000000"){
            var subjects = result.subjects||[];
            var ary=[];
            subjects.forEach(val=>{//$this.subjectList
              if(val.subjectCode<=9){
                ary.push(val)
              }
            })
            $this.subjectList=ary;
            // $this.preSubjectExamMarks=ary;
            //console.log($this.subjectList,$this.form.preSubjectExamMarks,"===")
          }else{
            $this.$message({
              type: 'warning',
              message: "获取学科列表失败"
            });
          }
        })
      },
      god:function (formName) {
        var $this = this;
        var tmpStudentInfo=$this.localData.get('tmpStudentInfo');
        $this.$refs[formName].validate((valid) => {
          if (valid) {
            /*if ($this.form.auditionFeedbackState == "1" && $this.form.auditionFeedbackReason == "") {
              $this.$message({message: '请填写不满意原因', type: 'warning'});
              return false
            }*/
            if ($this.form.signUpState == "1") {
              if($this.signUpSubjectCodes.length<=0){
                $this.$message({message: '请选择报名学科', type: 'warning'});
                return false
              }
              if($this.form.signUpCourseTimes==""){
                $this.$message({message: '请填写报名课时', type: 'warning'});
                return false
              }
              if($this.form.paymentAmount==""){
                $this.$message({message: '请填写缴费金额', type: 'warning'});
                return false
              }
              if($this.form.paymentDatetime==""){
                $this.$message({message: '请填写缴费日期', type: 'warning'});
                return false
              }
              if($this.form.hasProtocol==""){
                $this.$message({message: '请选择是否签署协议', type: 'warning'});
                return false
              }
              if($this.form.hasProtocol=='1'){
                if($this.form.protocolNumber==""){
                  $this.$message({message: '请填写协议编号', type: 'warning'});
                  return false
                }
                if($this.form.protocolAccount==""){
                  $this.$message({message: '请选择确认协议是否到账', type: 'warning'});
                  return false
                }
              };
            }
            var obj=JSON.parse(JSON.stringify($this.form));
            obj.teacherAssessmentBadHabits=JSON.stringify($this.teacherAssessmentBadHabits);
            obj.serviceTutorialCode= $this.form.serviceTutorial.id;
            obj.serviceTutorialName= $this.form.serviceTutorial.name;
            obj.signUpSubjectCodes=JSON.stringify($this.signUpSubjectCodes)
            obj.auditionNumber=3;
            obj.studentId=tmpStudentInfo.userId;
            if($this.$route.query.edit){//
              obj.updateName="123";//               if()
              this.$axios
                .post("/student/updateStudentAuditionRecord",obj)
                .then(res => {
                  if(res.code=="000000"){
                    this.$message({
                      type: 'success',
                      message: "保存成功"
                    });
                     this.$router.push({path:"/editAuditionB"})
                  }else{
                    this.$message({
                      type: 'warning',
                      message: res.message
                    });
                  }
                })
                .catch(err => {
                  this.$message({
                    type: 'info',
                    message: "保存失败"
                  });
                });

            }else{
              obj.createName="123";
              this.$axios
                .post("/student/addStudentAuditionRecord",obj)
                .then(res => {
                  if(res.code=="000000"){
                    this.$message({
                      type: 'success',
                      message: "保存成功"
                    });
                     this.$router.push({path:"/editAuditionB"})
                  }else{
                    this.$message({
                      type: 'warning',
                      message: res.message
                    });
                  }
                })
                .catch(err => {
                  this.$message({
                    type: 'info',
                    message: "保存失败"
                  });
                });
            }

            //
          }
        })
      }
    },
    computed: {},
    filters: {},
  }
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
  .auditionBox{
    max-width:1200px;
    .subjectMarks{
      width:1000px;
      .el-col{
        margin-bottom: 20px;
        width:300px;
        span{
          margin-right:20px;}
        .el-input{
          width:200px;
        }
      }
    }
    h5{
      font-size: 18px;
      font-weight: normal;
      line-height:40px;
      color: #f00;
      // border-bottom: 1px solid #ccc;
      margin-bottom:30px;
    }
    .addBtn{
      margin-bottom:20px;
    }
  }
</style>
