<template>
  <div class="index">
    <headNav></headNav>
    <el-container>
      <!-- 测导航栏 -->
      <el-aside width="150px">
        <el-menu
          :router="bool"
          class="el-menu-vertical-demo"
          background-color="#ffffff"
          text-color="#5f6368"
          active-text-color="#3474d5"
        >
          <el-menu-item index="/index/subpage">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/index/dataman">
            <i class="el-icon-coin"></i>
            <span slot="title">数据管理</span>
          </el-menu-item>
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">信息管理</span>
            </template>
            <el-menu-item index="/index/information">个人信息</el-menu-item>
          </el-submenu>
          <el-menu-item index="/index/setup">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import headNav from '../components/HeadNavBar.vue';
export default {
  name: 'index',
  components: { headNav },
  data() {
    return {
      bool: true,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.el-aside {
  margin: 10px;
  border-radius: 25px;
  /* text-align: center; */
  overflow: hidden;
  /* line-height: 200px; */
  background: #f1f3f6;
  box-shadow: 8px 8px 30px #dee0e2, -8px -8px 30px #ffffff;
}
.el-container {
  width: 98.5%;
  height: 88vh;
  border-radius: 25px;
  overflow: hidden;
  /* background-color: #f3f6fa; */
  margin: 0 auto;
  border: 2px solid #c5c5c5;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-menu {
  border: none;
  height: 100%;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave {
  opacity: 0;
  transform: translateX(-50%);
}
.v-enter-to,
.v-leave-to {
  opacity: 1;
  transform: none;
}
.v-enter-active {
  transition: all 1s;
}
.v-leave-active {
  transition: all 0.2s;
}
</style>