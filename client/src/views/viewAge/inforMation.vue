<template>
  <div class="inforMation">
    <el-row type="flex" justify="space-around" align="middle">
      <el-col :span="10"
        ><div class="grid-content bg-purple">
          <img :src="user.avatar" alt="" /></div
      ></el-col>
      <el-col :span="10"
        ><div class="grid-content bg-purple user-right">
          <div class="name">
            <i class="iconfont icon-wode"></i> 名称:
            <span>{{ user.name }}</span>
          </div>
          <div class="email">
            <i class="iconfont icon-youxiang"></i> 邮箱:
            <span>{{ user.email }}</span>
          </div>
          <div class="identity">
            <i class="iconfont icon-shenfenshibierenzheng"></i> 身份:
            <span>{{ user.identity }}</span>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Information',

  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {},

  methods: {},
};
</script>

<style scoped>
.bg-purple {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
}
.bg-purple > img {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.bg-purple > div {
  margin: 8px 0;
  color: #5f6368;
  font-weight: 600;
}
.bg-purple > div > span {
  color: #272822;
}
</style>