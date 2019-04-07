import {
  Message
} from 'element-ui'
import axios from 'axios';
import Promise from "promise"

// 超时时间
axios.defaults.timeout = 20000;
axios.defaults.params = {
  requestId: Math.random()
}
// http请求拦截器
axios.interceptors.request.use(config => {
  let user = localData.get('web-user');
  if (user && user.token) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.token = user.token;
    config.headers.openId = user.openId;
  }
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(response => {
  // 响应成功
  switch (response.data.httpCode) {
    case '500':
      Message.error({
        message: response.data.message
      })
      break
    case "20002":
      Message.error({
        message: '用户或密码不正确'
      })
      break
    case "40001":
      Message.error({
        message: '未知请求'
      })
      break
    case "40002":
      Message.error({
        message: '参数丢失'
      })
      break
    case "40003":
      Message.error({
        message: '参数类型错误'
      })
      break
    case "40004":
      Message.error({
        message: '状态错误'
      })
      break
    case "40005":
      Message.error({
        message: '资源不存在'
      })
      break
    case "40006":
      Message.error({
        message: '资源被使用'
      })
      break
    case "40007":
      Message.error({
        message: '资源重复'
      })
      break
    case "40008":
      Message.error({
        message: '请求达到上限'
      })
      break
    case "40010":
      Message.error({
        message: '该年级尚有班级没有相关学科的任课老师,请完善信息.'
      })
      break
    case "40301":
      Message.error({
        message: '认证失败'
      })
      break
    case "40302":
      Message.error({
        message: '无操作权限'
      })
      break
    case "40304":
      Message.error({
        message: '签名错误'
      })
      break
    case "40305":
      Message.error({
        message: '资源锁定'
      })
      break
    case "40101":
      Message.error({
        message: '用户重复登录'
      })
      break
    case "600002":
      Message.error({
        message: '账号异地登录,请重新登录'
      });
      window.location.href = 'index.html'
      break
    case "600003":
      Message.error({
        message: 'token过期,请重新登录'
      });
      window.location.href = 'index.html'
      break
  }
  return response.data;
}, error => {
  console.log(error)
  // if (error.response) {
  //   switch (error.response.status) {
  //     case 401:
  //       // 返回 401 清除token信息并跳转到登录页面
  //       store.commit(types.LOGOUT);
  //       router.replace({
  //         path: 'login',
  //         query: {redirect: router.currentRoute.fullPath}
  //       })
  //   }
  // }

  if (!error.response) {
    Message.error({
      message: error.message
    })
  }

  return Promise.reject(error) // 返回接口返回的错误信息
})

export var $regexp = ({
  isMobile: value => /^1[3-9]\d{9}$/.test(value),
  isCode: value => /^\d{6}$/.test(value)
})

export var dataParse = (value) => {
  let time = new Date(parseInt(value));

  function minTen(num) {
    return num > 9 ? num : '0' + num;
  }

  return time.getFullYear() + "-" + minTen(time.getMonth() + 1) + "-" + minTen(time.getDate()) + " " + minTen(time.getHours()) + ":" + minTen(time.getMinutes());
}

export var localData = {
  get(name) {
    if (!name) return null;
    return JSON.parse(localStorage.getItem(name));
  },
  set(name, obj) {
    if (!name) return;
    localStorage.setItem(name, JSON.stringify(obj));
  },
  delete(name) {
    localStorage.removeItem(name);
  }
};
//解析试题结束
export let $$user = () => localData.get('webTeacherUser') || {};
let teacherId = () => $$user().userId;
let filterSend = (send) => {
  return Object.assign(send, {
    userId: teacherId()
  })
}
/*图片*/


//前后空格去除
export let Trim=(str)=>
 {
   return str.replace(/(^\s*)|(\s*$)/g, "");
 }
//会话缓存
export var sessionData = {
  get(name) {
    if (!name) return null;
    return JSON.parse(sessionStorage.getItem(name));
  },
  set(name, obj) {
    if (!name) return;
    sessionStorage.setItem(name, JSON.stringify(obj));
  },
  delete(name) {
    sessionStorage.removeItem(name);
  }
};
/*图片*/
export var strToUrl = (str) => {
  if (!str || typeof str != "string") return "";
  str = str.toString();
  //如果已经是html格式  直接返回
  if (/<img\b[^>]*>|<audio\b[^>]*>/.test(str)) return str;
  return str.replace(/http:\/\/.*?\.(mp3|jpg|jpeg|png|gif)/ig, function (w) {
    if (/mp3$/i.test(w)) {
      return '<audio src=' + w + ' controls />'
    } else {
      return '<img style=max-width:100%;vertical-align:middle;  src=' + w + ' />'
    }
  }).replace(/\n/g, '<br />').replace(/\\n/g, '<br />')
};

let qiniuURL,qiniuUpURL; //七牛域名
let baseURL; //接口域名
let qiniuSpaceURL; //七牛空间域名
let staticUrl; //静态测评PC端做题页面域名
let staticPath="";//静态测评开发测试正式环境路径不同
let promotionURL; //亿家教接口，优惠券优惠码相关

if (location.hostname == 'localhost' || location.protocol == "file:" || /^192\.168\./.test(location.hostname)) {
  // baseURL = "http://diagnosismanagertest.e-eduwisdom.com/";
  //baseURL = "http://lantian.e-edusky.com/";
  // baseURL = "http://192.168.1.142:8085/assessment/";
  // qiniuURL = "ompdata.e-eduspace.com/";
  // qiniuSpaceURL = "omp-xinguoren/"
  // qiniuUpURL = "http://up-z1.qiniu.com/";
   baseURL = "http://omptest.xinguoren.cn/assessment/";
  qiniuURL = "conferencetest.e-eduspace.com/";
  qiniuSpaceURL = "wisdom-conference-test"
  qiniuUpURL = "http://up-z1.qiniu.com/";

  promotionURL = "http://210.12.22.136:33060/promotion/"
  staticUrl = "http://statictest.xinguoren.cn/"
  staticPath = "bookCollege/";
}else if(location.hostname == 'omp.xinguoren.cn'){
  //线上
  baseURL = "/assessment/";
  qiniuURL = "ompdata.e-eduspace.com/";
  qiniuSpaceURL = "omp-xinguoren/"
  qiniuUpURL = "http://up-z1.qiniu.com/";
  staticUrl = "http://static.xinguoren.cn/"
  promotionURL = "http://promotion.e-eduspace.com/promotion/"
}else {
  //测试
  if(location.hostname==="omptest.xinguoren.cn"){
    staticUrl = "http://statictest.xinguoren.cn/"
  }else{ //开发
    staticUrl = "http://staticdev.xinguoren.cn/"
  }
  staticPath = "bookCollege/";

  // omp.xinguoren.cn
  //开发、测试 使用
  baseURL = "/assessment/";
  qiniuURL = "conferencetest.e-eduspace.com/";
  qiniuSpaceURL = "wisdom-conference-test/"
  qiniuUpURL = "http://up-z1.qiniu.com/";
  promotionURL = "http://210.12.22.136:33060/promotion/"
}
export {
  baseURL,qiniuURL,qiniuUpURL,qiniuSpaceURL,staticUrl,staticPath, promotionURL,
} ;

// export  var baseURL = (() => {
//   if (location.hostname == 'localhost') {
//     return 'http://diagnosismanagertest.e-eduwisdom.com/';
//     // return 'http://demo.e-eduwisdom.com/';
//   } else if (location.protocol == "file:") {
//     return 'http://diagnosismanagertest.e-eduwisdom.com/'
//   } else {
//     return location.protocol + '//' + location.hostname + '/';
//   }
// })();
axios.defaults.baseURL = baseURL;
export var $axios = axios;

/*
* 所有请求里面的 appKey 和 token 可以不传
* */
export var $ajax = {
  /*
  * 省市县
  * obj:{
  * parentId:"",  默认0(查询省)/省id(查询市)/市id(查询区),
  * appKey:"",
  * token:""}
   */
  getAreas(obj){
    obj = obj||{};
    if(!obj.parentId)obj.parentId = "0";
    return axios.post( "area/getAreas", obj)
  },
  /*
  * 获取教材版本
  * obj:{
  * gradeCode: "11",
  " subjectCode": "1"
  * appKey:"",
  * token:""}
   */
  getBooktypes(obj){
    return axios.post("bookType/getBookTypes", obj)
  },
  /*
  * 根据学段查询年级
  * obj:{
  " stageCode": "1"  为空表示查询所有学段，有值表示当前学段
  * appKey:"",
  * token:""}
  * */
  getGradesByStage(obj) {
    //所有学年
    if (!obj.stageCode) {
      return new Promise((reso, rej) => {
        if (allGrades) {
          return   reso(JSON.parse(allGrades))
        }
        axios.post("grade/getGrades", obj).then(res=>{
          if(res.code=="000000"){
            allGrades = JSON.stringify(res)
          }
          reso(res)
        }).catch(e=>{
          rej(e)
        })
      })
    } else {
      return axios.post("grade/getGrades", obj)
    }

  },
  /*
  * 根据地区查询学校
  * obj:{
  " areaId": "110000"  必传
  * appKey:"",
  * token:""}
  * */
  getSchools(obj){
    return axios.post("school/getSchools", obj)
  },
  /*
  * 根据学年查询学科
  * obj:{
  " gradeCode": "11"  必传，不传查询所有学科
  * appKey:"",
  * token:""}
  * */
  getSubjectsByGrade(obj){
    if(!obj || !obj.gradeCode){
      return $ajax.getAllSubjects({});
    }
    return axios.post("subject/getCourses", obj)
  },
  /*
  * 根据学年查询学科
  * obj:{
  * appKey:"",
  * token:""}
  * */
  getAllSubjects(obj) {
    return new Promise((reso, rej) => {
      if(AllSubjects){
        return reso(JSON.parse(AllSubjects));
      }
      axios.post("subject/getSubjects", obj || {}).then((res,a,b) => {
        console.log(res,a,b)
        if (res.code == "000000") {
          AllSubjects = JSON.stringify(res);
        }
        reso(res);
      }).catch(e => {
        rej(e);
      })
    });
  },
  /*
  * 根据学段
  * obj:{
  * appKey:"",
  * token:""}
  * */
  getStages(obj){
    return new Promise(function (res,rej) {
      setTimeout(function () {
        res(commonStages);
      },1)
    })
  },

}
//已商定写死学段
var commonStages = {
  code:"000000",
  stages:[
    {
      stageCode:null,
      stageName:"请选择"
    },
    {
      stageCode:"1",
      stageName:"小学"
    },
    {
      stageCode:"2",
      stageName:"初中"
    },
    {
      stageCode:"3",
      stageName:"高中"
    },
  ]
}
//学科缓存（防止请求多服务挂掉）
var AllSubjects;
//所有学年
var allGrades;

export var subjectTypeObj = {
  '0': '暂无分类',
  '1': '文科',
  '2': '理科',
};
export var commonGrond = {
  '11': '一年级',
  '12': '二年级',
  '13': '三年级',
  '14': '四年级',
  '15': '五年级',
  '16': '六年级',
  '21': '七年级',
  '22': '八年级',
  '23': '九年级',
  '31': '高一',
  '32': '高二',
  '33': '高三',
  '24': '中考'
};
export var relationTypeObj = {
  '0': '妈妈',//0:母亲;1:父亲;2:其他亲属
  '1': '爸爸',
  '2': '其他亲属',
};
export var commonPayObj = {
  '1': '5万以内',//0:母亲;1:父亲;2:其他亲属
  '2': '10万以内',
  '3': '20万以内',
  '4': '20万以上',
};
export var commenFirstParent={
  '0': '意向强烈',
  '1': '意向不强烈',
}
export var commenstuTime={
  "1":'5点-6点',
  "2":'6点-7点',
  "3":'7点-8点',
  "4":'8点-9点',
  "5":'9点-10点'
}//
export var commeHabbits={
  "0":'无',
  "1":'抖腿',
  "2":'转笔',
  "3":'听音乐',
  "4":'跑神',
  "5":'打瞌睡'
}
export var commeBadHabits={
  "1":'专注力差',
  "2":'不愿意动笔',
  "3":'转笔',
  "4":'书写字迹潦草',
  "5":'抖腿',
  "6":'握笔姿势不正确',
  "7":'教师提问反应缓慢',
  "8":'坐姿不正确',
  "9":'玩手机',
  "10":'说话声音过大/过小',
  "11":'做作业慢'
}
export var commeBackState={
  "1":'不满意',
  "2":'一般',
  "3":'满意'
}
export var commeDifficulty={
  "1":'容易',
  "2":'适中',
  "3":'难'
}
export var commeAccept={
  "1":'勉强接受',
  "2":'可以接受',
  "3":'能够较好接受'
}
export var commeThink={
  "1":'老师讲的多',
  "2":'一样多',
  "3":'我思考的多写的多'
}
export var commeEffect={
  "1":'效果不明显',
  "2":'一般',
  "3":'非常有用'
}
export var commonSubject = {
  '1': '语文',
  '2': '数学',
  '4': '物理',
  '3': '英语',
  '5': '化学',
  '6': '生物',
  '7': '历史',
  '8': '地理',
  '9': '政治',
  '10': '科学',
  '11': '信息技术',
  '12': '品德与生活',
  '13': '品德与社会',
  '14': '思想品德',
  '15': '心理学',
  '16': '习惯趣谈'
};
export var commonStage = {
  '1': '小学',
  '2': '初中',
  '3': '高中'
}
export var commonArtType = {
  '0': '文科',
  '1': '理科',
  '2': '无'
}
export var commonPayChannel = {
  '0': '全部',
  '1': '支付宝',
  '2': '微信'
}
export var comPayChannel = {
  '0': "支付宝Web",
  '1': "支付宝APP",
  '2': "支付宝二维码",
  '3': "微信二维码",
  '4': "微信APP",
  '5': "微信公众号",

}
export var commonBusinessType = {
  '0': '全部',
  '1': '学业质量提升平台',
  '2': '案例重构教学平台'
}

export var commonOrderState = {
  '0': '全部',
  '1': '待支付',
  '2': '已支付',
  '3': '已取消'
}

export var commonOrderStateStu = {
  // '0': '所有订单',
  '1': '待付款',
  '2': '已付款',
  '3': '已取消'
}
export var commonCourseTyle = {
  // '0': '所有类型',
  '0': '报告解读课',
  '1': '能力训练课',
}
//优惠券类型
export var couponTypes = [{val: '', txt: '全部'}, {val: 1, txt: '普通优惠券'}, {val: 2, txt: '打折扣券'}, {
  val: 3,
  txt: '满减券'
}, {val: 4, txt: '新人注册优惠券'}, {val: 5, txt: '每日登录赠送代金券'}];
//产品类型
export var productTypes = [{val: '', txt: "全部", isDel: true}, {val: "0", txt: "直播类", isDel: false}, {
  val: "1",
  txt: "录播类",
  isDel: false
}, {val: "3", txt: "测评类", isDel: false}
  // ,{val:"5",txt:"教辅书",isDel:false}
];
//优惠券固定类型
export var fixTypes = [{val: '', txt: '全部'}, {val: 0, txt: '固定日期范围'}, {val: 1, txt: '固定时间范围'}, {val: 2, txt: '固定天数'}]
//状态类型
export var commonStates = [{val: '', txt: '全部'}, {val: 0, txt: '未上架'}, {val: 1, txt: '已上架'}, {val: 2, txt: '已下架'}];
//优惠券限制条件
export var couponLimits = [{val: 0, txt: '最低价格'}, {val: 1, txt: '学科'}, {val: 2, txt: '学年'}, {val: 3, txt: '产品类型'}];
//线上线下
export var onLineFlags=[{val:'',txt:'全部'},{val:0,txt:'线下'},{val:1,txt:'线上'}];
  //界面显示
export var homeShows=[{val:'',txt:'全部'},{val:0,txt:'否'},{val:1,txt:'是'}];
  //有限库存
export var inventoryFlags=[{val:'',txt:'全部'},{val:0,txt:'无限'},{val:1,txt:'有限'}];

export var repeatFlags=[{val:'',txt:'全部'},{val:0,txt:'不可'},{val:1,txt:'可以'}];
export var restrictFlags = [{val:'',txt:'全部'},{val:0,txt:'无'},{val:1,txt:'有'}];





export var dateFormat1 = (row, column, cellValue, index) => {
  console.log(row);
  console.log(column);
  const daterc = row[column.property];
  console.log(daterc);
  let time = new Date(parseInt(daterc));

  function minTen(num) {
    return num > 9 ? num : "0" + num;
  }
  let timeFormat = time.getFullYear() + "-" + minTen(time.getMonth() + 1) + "-" + minTen(time.getDate()) + " " + minTen(time.getHours()) + ":" + minTen(time.getMinutes());
  return timeFormat;
}

export var payType1 = (row, column, cellValue, index) => {
  console.log(row);
  console.log(column);
  const daterc = row[column.property];
  console.log(daterc);
  return commonPayChannel[daterc + 1]
}
export var payType2 = (row, column, cellValue, index) => {
  console.log(row);
  console.log(column);
  const daterc = row[column.property];
  console.log(daterc);
  return comPayChannel[daterc]
}
export var productType1 = (row, column, cellValue, index) => {
  console.log(row);
  console.log(column);
  const daterc = row[column.property];
  console.log(daterc);
  return commonBusinessType[daterc + 1]
}

export var commonOrderState1 = (row, column, cellValue, index) => {
  console.log(row);
  console.log(column);
  const daterc = row[column.property];
  console.log(daterc);
  return commonOrderState[daterc]
}
/*试题*/
const resolve = (questions, option) => {

  let type = questions.type;
  try {
    if (type == 6) {
      for (let typeList of questions.typeList) {
        for (let list of typeList.list) {
          list.stem = strToUrl(list.stem);
          for (let componentQuestions of list.componentQuestions) {
            resolveOneQuestion(componentQuestions, type, option);
          }
        }
      }
    } else {
      questions.typeList.map(item => {
        item.list.map(question => {
          resolveOneQuestion(question, type, option)
        })
      })
    }
  } catch (e) {
    console.log(e)
    console.log('类型' + type + '解析有问题')
  }
  return questions;

}
export var resolveQuestion = (questions, option = {
  type: 1
}) => {
  for (let value of questions) {
    resolve(value, option);
  }
  return questions;
}
const resolveOneQuestion = (temp, questionType, option) => {
  function filterStrToObj(str) {
    let temp = parseJSON(strToUrl(str));
    if (Array.isArray(temp)) {
      for (let item of temp) {
        item.optionValue = (item.optionValue);
      }
    }
    return temp || [];
  }

  temp.stem = strToUrl(temp.stem);
  temp.quesOption = filterStrToObj(temp.quesOption);
  temp.quesAnalyze = filterStrToObj(temp.quesAnalyze);
  temp.answer = filterStrToObj(temp.answer);
  temp.userAnswerResul = parseJSON(strToUrl(temp.userAnswerResul));
  if (option.type == 1) {
    //判卷   默认
    temp.isLock = false;
    if (temp.type == 2) {
      //多选题    自己计算分数
      temp.teacherScore = temp.score * computeRight(temp.answer, temp.userAnswerResul);
    } else {
      temp.teacherScore = '';
    }
  } else if (option.type == 2) {
    //查看
    temp.teacherScore = '' + temp.studentGetScore;
    temp.isLock = true;
  }
  return temp;
}

export const parseJSON = (str) => {
  try {
    return (eval("(" + str + ")"));
  } catch (e) {
    return str;
  }
};
