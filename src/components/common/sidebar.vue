<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="activePath"
       unique-opened router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 登录 -->
      <!-- <el-menu-item index="/parentFeedbacks"><i class="el-icon-menu"></i>登录</el-menu-item> -->

      <el-submenu index="/parentMange">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>人员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/parentMange">家长管理</el-menu-item>
          <el-menu-item index="/studentMange">学生管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/parentFeedbacks"><i class="el-icon-menu"></i>推广信息反馈</el-menu-item>
      <el-submenu index="/coupon">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>优惠券码</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/coupon">优惠券列表</el-menu-item>
          <el-menu-item index="/couponCode">优惠码列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 账号管理 -->
      <el-submenu index="/accountMange" v-show="role">

        <template slot="title">
          <i class="el-icon-location"></i>
          <span>账号权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/newAccount">账号管理</el-menu-item>
          <el-menu-item index="/userAccount">角色管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activePath:"/parentMange",
      userId:'',
      role:false
    };
  },
  created() {
    this.getUserInfo()

  },
  methods:{
    getUserInfo(){
      this.userId = localStorage.getItem("uid")
      this.$axios.post('/management/getAdministrator',{
        'administratorId':this.userId
      }).then(res =>{
        if(res.administrator.role =='ENROLLMENT_DIRECTOR'|| res.administrator.role =='TEACHING_DIRECTOR'){
          this.role = true;
        }
      })
    }
  },
  mounted() {
    var matched = this.$router.history.current.matched;
    var hovers=[
      {
        match:"/studentMange",
        name:"学生",
        childs:["/studentMange",'/addStudent','/studentDetail']
      },
      {
        match:"/parentMange",
        name:"家长",
        childs:['/parentMange','/addParent']
      },
      {
        match:"/parentFeedbacks",
        name:"家长调查问卷",
        childs:['/parentFeedbacks']
      },{
        match:"/coupon",
        name:"优惠券码",
        childs:["/coupon"]
      },{
        match:"/couponCode",
        name:"优惠券码",
        childs:['/couponCode']
      },
      {
        match:"/newAccount",
        name:"创建账号",
        childs:['/newAccount']
      },
      {
        match:"/editAccount",
        name:"编辑账号",
        childs:['/editAccount']
      },
       {
        match:"/userAccount",
        name:"角色管理",
        childs:['/userAccount']
      }
    ];
    var got = false;
    for(var i=0;i<hovers.length;i++) {
      for (var j = 0; j < matched.length; j++) {
        for (var k = 0; k < hovers[i].childs.length; k++) {
          if (hovers[i].childs[k] == matched[j].path) {
            this.activePath = hovers[i].match;
            got = true;
            break;
          }
        }
        if (got) {
          break;
        }
      }
      if (got) {
        break;
      }
    }
  },
  computed: {

  },
  components: {

  }
};

</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 201px;
  left: 0;
  top: 0px;
  bottom: 0;
  background: #2e363f;
}

.sidebar>ul {
  height: 100%;
}

</style>
