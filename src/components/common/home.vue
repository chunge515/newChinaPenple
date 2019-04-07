<template>
    <div style="height:100%;">
        <!--<div  style="height:100%;" v-if="userInfo.userType==15||userInfo.userType==11||userInfo.userType==12">-->
            <!--<el-header class="globHeader">-->
                <!--<mHead></mHead>-->
            <!--</el-header>-->
            <!--<div class="contentBox">-->

                <!--<router-view></router-view>-->

            <!--</div>-->
        <!--</div>-->
        <el-container class="wrapper">
            <el-header>
                <mHead></mHead>
            </el-header>
            <el-container>
                <el-aside style="width:201px">
                    <vSidebar></vSidebar>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
import mHead from "./mHeader.vue";
// import vHead from "./header.vue";
import vSidebar from "./sidebar.vue";
export default {
    data(){
        return {
            // userInfo: this.localData.get("userInfo") //用户登录后保存用户信息
        }
    },
    components: {
        mHead,
        // vHead,
        vSidebar
    }
};
</script>
<style type="text/css">
.el-header {
    background-color: rgb(67, 74, 80);
    line-height: 60px;
}
.wrapper {
    position: relative;
    height: 100%;
}
.wrapper > .el-container {
    position: absolute;
    bottom: 0px;
    top: 60px;
    width: 100%;
}
.el-main{
    background: #f3f7fd;
    padding: 0px 20px;
}
.contentBox{
    padding: 0px 50px;
    height: calc( 100% - 60px);
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
}
</style>
