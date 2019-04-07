import Vue from 'vue'
import Router from 'vue-router'

let version = 70;  //改变菜单权限后，请手动改变此版本号，页面会自动退出账号。

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/oldLogin',
    component: resolve => require(['../components/page/login/index.vue'], resolve)
  },
    // 登录页面
    {
      path: '/login',
      component: resolve => require(['../components/page/login/newLogin.vue'], resolve)
    },
    {
      path: '/addParentInfomation',
      component: resolve => require(['../components/page/addParentInfomation/addParentInfomation.vue'], resolve)
    },
    {
      path: '/addParentInfo',
      component: resolve => require(['../components/page/addParentInfomation/addParentInfo.vue'], resolve)
    },
    {
    path: '/home',
    component: resolve => require(['../components/common/home.vue'], resolve),
    children: [
      //家长管理
      {
        path: '/parentMange',
        component: resolve => require(['../components/page/parentMange/parentList.vue'], resolve),

      },
      {
        path: '/addParent',
        component: resolve => require(['../components/page/parentMange/addParent.vue'], resolve)
      },
      {
        path: '/editParent',
        component: resolve => require(['../components/page/parentMange/editParent.vue'], resolve)
      },
      {
        path:'/parentMange/Detail',
        component: resolve => require(['../components/page/parentMange/parentDetail.vue'], resolve)
      },
      {
        //家长调查问卷提交数据查询列表
        path:"/parentFeedbacks",
        component: resolve => require(['../components/page/parentMange/parentFeedbacks.vue'],resolve)
      },
      //学生管理
      {
        path: '/studentMange',
        component: resolve => require(['../components/page/studentMange/studentList.vue'], resolve)
      },

      //增加学生
      {
        path: '/addStudent',
        component: resolve => require(['../components/page/studentMange/addStudent.vue'], resolve)
      },
      //学生查看详情模块路由（一会写）
      {
        path:'/studentDetail',
        component: resolve => require(['../components/page/studentMange/studentDetail.vue'], resolve),
        keepAlive:true,
        children: [
              {
                path: '/addParHabit',
                component: resolve => require(['../components/page/studentMange/addParHabit.vue'], resolve)
              },
            {
              path: '/habit/add',
              component: resolve => require(['../components/page/studentMange/addStuHabit.vue'], resolve)
            },
              {
                path: '/habit',
                component: resolve => require(['../components/page/studentMange/stuHabit.vue'], resolve)
              },
          {
            path: '/habit/show',
            component: resolve => require(['../components/page/studentMange/showHabit.vue'], resolve)
          },
              {
                path: '/schoolAdmin/teacherList',
                component: resolve => require(['../components/page/schoolAdmin/teacherList.vue'], resolve),
                meta: { title: '校管理员教师列表' }
              },
              {
                path: '/abilityTestSubscribe',
                component: resolve => require(['../components/page/studentMange/abilityTestSubscribe.vue'], resolve),
                meta: { title: '学习能力平测预约表' }
              },
              {
                path: '/abilityTestSubscribe/make',
                component: resolve => require(['../components/page/studentMange/abilityTestSubscribeAdd.vue'], resolve),
                meta: { title: '学习能力平测预约表' } //新增、编辑
              },
          {
                path: '/abilityTestSubscribe/view',
                component: resolve => require(['../components/page/studentMange/abilityTestSubscribeView.vue'], resolve),
                meta: { title: '学习能力平测预约表' } //查看
              },
              {
                path: '/abilityImprovIntervExp',
                component: resolve => require(['../components/page/studentMange/abilityImprovIntervExp.vue'], resolve),
                meta: { title: '学习能力提升干预体验登记表' }
              },
              {
                path: '/abilityImprovIntervExp/make',
                component: resolve => require(['../components/page/studentMange/abilityImprovIntervExpAdd.vue'], resolve),
                meta: { title: '学习能力提升干预体验登记表' } //新增、编辑
              },
              {
                path: '/abilityImprovIntervExp/view',
                component: resolve => require(['../components/page/studentMange/abilityImprovIntervExpView.vue'], resolve),
                meta: { title: '学习能力提升干预体验登记表' } //查看
              },//auditionRecord
              {
                path: '/editAudition/add',
                component: resolve => require(['../components/page/studentMange/auditionRecord.vue'], resolve),
                meta: { title: '试听记录表' } //查看
              },//editAudition.vue
              {
                path: '/editAuditionT/add',
                component: resolve => require(['../components/page/studentMange/auditionRecord2.vue'], resolve),
                meta: { title: '二次试听记录表' } //查看
              },
              {
                path: '/editAuditionB/add',
                component: resolve => require(['../components/page/studentMange/auditionRecord3.vue'], resolve),
                meta: { title: '二次试听记录表' } //查看
              },
              {
                path: '/editAudition',
                component: resolve => require(['../components/page/studentMange/editAudition.vue'], resolve),
                meta: { title: '查看试听记录表' } //查看
              },
              {
                path: '/editAuditionT',
                component: resolve => require(['../components/page/studentMange/editAudition2.vue'], resolve),
                meta: { title: '查看试听记录表' } //查看
              },
              {
                path: '/editAuditionB',
                component: resolve => require(['../components/page/studentMange/editAudition3.vue'], resolve),
                meta: { title: '查看试听记录表' } //查看
              },
              {
                path: '/startSchool',
                component: resolve => require(['../components/page/studentMange/startSchool.vue'], resolve),
                meta: { title: '入学登记表' } //查看
              },
              {
                path: '/startSchool/add',
                component: resolve => require(['../components/page/studentMange/startSchoolAdd.vue'], resolve),
                meta: { title: '入学登记表添加' } //查看
              },
              {
                path: '/archiveRecords',
                component: resolve => require(['../components/page/studentMange/archiveRecords.vue'], resolve),
                meta: { title: '考试成绩记录表' }
              },
              {
                path: '/archiveRecords/make',
                component: resolve => require(['../components/page/studentMange/archiveRecordsAdd.vue'], resolve),
                meta: { title: '考试成绩记录表' } //新增、编辑
              },
              {
                path: '/archiveRecords/detail',
                component: resolve => require(['../components/page/studentMange/archiveRecordsDetail.vue'], resolve),
                meta: { title: '考试成绩记录表' } //新增、编辑
              },
              {
                path: '/schoolAdmin/eduMangeList',
                component: resolve => require(['../components/page/schoolAdmin/eduMangeList.vue'], resolve),
                meta: { title: '校管理员教务列表' }
              },
              {
                path: '/schoolAdmin/teaResearchList',
                component: resolve => require(['../components/page/schoolAdmin/teaResearchList.vue'], resolve),
                meta: { title: '校管理员教研列表' }
              },
              /*学习能力干预训练准备表列表*/
              {
                path: '/abilityReady',
                component: resolve => require(['../components/page/studentMange/abilityReady.vue'], resolve)
              },
              /*学习能力干预训练准备表(新增/编辑)*/
              {
                path: '/abilityReady/add',
                component: resolve => require(['../components/page/studentMange/addAbilityReady.vue'], resolve)
              },
              /*学习能力干预训练准备表(查看)*/
              {
                path: '/abilityReady/show',
                component: resolve => require(['../components/page/studentMange/showAbilityReady.vue'], resolve)
              },
              /*学习能力干预训练反馈表列表*/
              {
                path: '/abilityResult',
                component: resolve => require(['../components/page/studentMange/abilityResult.vue'], resolve)
              },
              /*学习能力干预训练反馈表(新增/编辑)*/
              {
                path: '/abilityResult/add',
                component: resolve => require(['../components/page/studentMange/addAbilityResult.vue'], resolve)
              },
              /*学学习能力干预训练反馈表查看)*/
              {
                path: '/abilityResult/show',
                component: resolve => require(['../components/page/studentMange/showAbilityResult.vue'], resolve)
              },
              /*干预导师课后反思表列表*/
              {
                path: '/afterClass',
                component: resolve => require(['../components/page/studentMange/afterClass.vue'], resolve)
              },
              /*干预导师课后反思表新增/编辑)*/
              {
                path: '/afterClass/add',
                component: resolve => require(['../components/page/studentMange/addAfterClass.vue'], resolve)
              },
              /*干预导师课后反思表列表查看*/
              {
                path: '/afterClass/show',
                component: resolve => require(['../components/page/studentMange/showAfterClass.vue'], resolve)
              },
        ]
      },
      // 优惠券列表
      {
        path:"/coupon",
        component:resolve=>require(['../components/page/coupon/list.vue'],resolve),
        meta:{
          title:"优惠券列表"
        }
      },
      {
        path:"/couponCode",
        component:resolve=>require(['../components/page/coupon/couponCode.vue'],resolve),
        meta:{
          title:"优惠码列表"
        }
      },
      // 账号管理
      {
        path: '/newAccount',
        component: resolve => require(['../components/page/accountInfo/newAccount.vue'], resolve)
      },
      // 账号管理
      {
        path: '/newAccount',
        component: resolve => require(['../components/page/accountInfo/newAccount.vue'], resolve)
      },
      // 新增账号
      {
        path: '/addAccount',
        component: resolve => require(['../components/page/accountInfo/addAccount.vue'], resolve)
      },
       // 新增账号
       {
        path: '/editAccount',
        component: resolve => require(['../components/page/accountInfo/editAccount.vue'], resolve)
      },
       // 角色管理
       {
        path: '/userAccount',
        component: resolve => require(['../components/page/accountInfo/userAccount.vue'], resolve)
      },
    ]
  }]
});
router.beforeEach((to, from, next) => {
  next()
})
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   //判断登录
//   if (window.localStorage.getItem('userInfo') == null || window.localStorage.getItem('authList') == null) {
//     if (to.path == '/login') {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     console.log(to.path);
//
//     if(window.localStorage.getItem('version')&&window.localStorage.getItem('version')!=version){
//       localStorage.clear();
//       next('/login')
//     }else if (JSON.parse(localStorage.getItem('authList')).some(function(path) {
//         return to.path == path;
//       })) {
//       next()
//     }else if (to.path == '/login') {
//       var firstUrl = JSON.parse(window.localStorage.getItem('firstUrl'));
//       next(firstUrl);
//     }else if (to.path == '/errorR') {
//       next()
//     } else {
//       next('/errorR')
//     }
//     window.localStorage.setItem('version',version);
//   }
// })


export default router;
