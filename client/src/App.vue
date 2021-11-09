<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
/* 引入解析 token 的模块 */
import jwt_decode from 'jwt-decode';
export default {
  name: 'app',
  components: {},
  created() {
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decode));
      this.$store.dispatch('setUser', decode);
    }
  },
  methods: {
    // 判断数据 value 是否为空，返回 turn false
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim(value).length === 0)
      );
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background-color: #f3f6fa;
}
</style>
