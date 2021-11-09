<template>
  <header class="head_nav">
    <div class="logo-container">
      <img src="../assets/logo.png" alt="" />
      <h2>Fly 后台管理系统</h2>
    </div>

    <div class="user">
      <img :src="user.avatar" class="avatar" alt="" />
      <div class="welcome">
        <p class="name welcomename">welcome!</p>
        <p class="name avatarname">{{ user.name }}</p>
      </div>
      <div class="quanping">
        <i
          class="iconfont icon-quanping"
          title="全屏"
          @click="fullScreenFun"
        ></i>
      </div>
      <el-dropdown @command="setDialogInfo">
        <i class="el-icon-caret-bottom el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info"
            ><i class="fa fa-address-book-o"></i>个人信息</el-dropdown-item
          >
          <el-dropdown-item command="logout"
            ><i class="fa fa-sign-out"></i>退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'head_nav',

  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {},

  methods: {
    setDialogInfo(cmdItem) {
      //   console.log(cmdItem);
      switch (cmdItem) {
        case 'info':
          this.showInfo();
          break;
        case 'logout':
          this.logout();
          break;
      }
    },
    showInfo() {
      this.$router.push('/index/information');
    },
    logout() {
      // 清除 token
      localStorage.removeItem('eleToken');
      //清除Vuex 的用户状态和信息
      this.$store.dispatch('loginQuit');
      this.$router.push('/login');
    },
    // 全屏
    fullScreenFun() {
      let self = this;
      var fullscreenEnabled =
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled;

      if (fullscreenEnabled) {
        let de = document.documentElement;
        if (self.fullScreenInfo === '打开全屏') {
          if (de.requestFullscreen) {
            de.requestFullscreen();
          } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
          } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
          }
          self.fullScreenInfo = '退出全屏';
        } else {
          if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
          self.fullScreenInfo = '打开全屏';
        }
      } else {
        self.fullScreenInfo = '浏览器当前不能全屏';
      }
    },
  },
};
</script>

<style scoped>
.head_nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  margin-bottom: 8px;
  color: rgb(95, 99, 104);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head_nav > .logo-container {
  margin-left: 10px;
  display: flex;
  align-items: center;
  height: 60px;
}
.head_nav > .logo-container > img {
  width: 45px;
  margin-right: 10px;
}
.quanping > i {
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
}
.head_nav > .user {
  width: 220px;
  height: 50px;
  margin-right: 15px;
  padding: 0 12px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  background: linear-gradient(145deg, #ffffff, #f1f3f6);
  box-shadow: 6px 6px 18px #c6c7ca, -6px -6px 18px #ffffff;
}
.head_nav > .user > img {
  border-radius: 50%;
  border: 2px solid #ccc;
  width: 35px;
}
.head_nav > .user > .welcome {
  text-align: center;
  font-size: 14px;
  margin: 0 5px;
}
.head_nav > .user > .welcome > .avatarname {
  color: #272822;
  font-size: 16px;
  font-weight: bold;
}
.el-dropdown {
  color: rgb(95, 99, 104);
  font-size: 16px;
  cursor: pointer;
}
</style>