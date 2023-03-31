<template>
  <div id="Container" class="wh_100 flex_column">
    <el-container>
      <el-aside width="25rem">
        <div class="login-box">
          <img src="@/assets/校园.png" alt="">
          <el-menu :default-active="activeRouter" :router="true" active-text-color="#6C33FE">
            <el-menu-item v-for="item in navList" :key="item.id" :index="item.path">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头像部分 -->
          <div class="account-picture">
            <i class="el-icon-message-solid" style="font-size: 2.8rem;"></i>
            <div class="user-actions">
              <div>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </div>
              <el-menu class="el-menu-demo" mode="horizontal">
                <el-submenu index="2">
                  <template slot="title">{{ userName }}</template>
                  <el-menu-item @click="quitLoginBtn">
                    <i class="el-icon-switch-button">退出登录</i>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </div>

          </div>

        </el-header>
        <el-main>
          <!-- 路由渲染地方 -->
          <Router-view></Router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import { routerAdminList, routerSurAdminList } from "@/router/modules/routers";

export default {
  data() {
    return {
      navList: [],
      userName:'',
      activeRouter: '/container/workHome'
    };
  },
  created() {
    // console.log(routerList)
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // this.navList = []
    //判断登陆者的权限
    if (userInfo == 0) {
      //超级管理员
      this.navList = routerSurAdminList

    } else {
      
      this.navList = routerAdminList
      console.log('导航',this.navList)
    }

  },
  computed: {
  },
  mounted() {
    this.activeRouter = this.$route.path
    // console.log(sessionStorage.getItem('userName'));
    let user=sessionStorage.getItem('userName')
     this.userName=user.slice(1,user.length-1)
  },
  methods: {

    //退出登录
    quitLoginBtn() {
      console.log('点击退出');
      this.$confirm('点击退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('userId')
        this.$router.push('/')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  // background-color: #B3C0D1;
  color: #333;
  text-align: right;
  // line-height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .account-picture {
    width: 30rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-actions {
    display: flex;
    justify-content: center;
    align-items: center;

  }
}

.el-aside {
  // background-color: #D3DCE6;
  color: #333;



  .login-box>img {
    width: 20rem;
    height: 12rem;
  }
}

.el-main {
  background-color: #fafafa;
  color: #333;
  padding: 0;
  // text-align: center;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-menu-item {
  text-align: left;
}


// .el-container:nth-child(5) .el-aside,
// .el-container:nth-child(6) .el-aside {
//   line-height: 260px;
// }

// .el-container:nth-child(7) .el-aside {
//   line-height: 320px;
// }
</style>
