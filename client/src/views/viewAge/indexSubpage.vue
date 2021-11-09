<template>
  <div class="subpage">
    <!-- ai机器人 -->
    <div class="ai">
      <input type="text" v-model="val" />
      <el-button @click="ai" type="primary" round>发送</el-button>
    </div>
    <!-- 新闻 -->
    <!-- <el-carousel
      height="375px"
      direction="vertical"
      :autoplay="true"
      interval="3000"
    >
      <el-carousel-item v-for="item in newData" :key="item">
        <img :src="item.imgsrc" alt="" />
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>

<script>
export default {
  name: 'subpage',

  data() {
    return {
      val: '',
      newData: [],
    };
  },

  mounted() {
    // this.new();
  },

  methods: {
    ai() {
      if (!this.val == '' || !this.val == '/') {
        this.$axios
          .get(`/ai/api.php?key=free&appid=0&msg=${this.val}/`)
          .then((res) => {
            // console.log(res);
            const h = this.$createElement;
            this.$notify({
              offset: 250,
              iconClass: 'el-icon-bell',
              message: h(
                'span',
                { style: 'color: teal' },
                `${res.data.content}`
              ),
            });
          });
      } else {
        const h = this.$createElement;
        this.$notify({
          offset: 250,
          iconClass: 'el-icon-bell',
          message: h('span', { style: 'color: teal' }, `你想跟我说什么!`),
        });
      }
    },
    // new() {
    //   this.$axios.get('/new/BA8E6OEOwangning/0-10.html').then((res) => {
    //     // console.log(res.data.T1467284926140);
    //     this.newData = res.data.T1467284926140;
    //   });
    // },
  },
};
</script>

<style scoped>
.ai {
  width: 320px;
  float: right;
  display: flex;
  justify-content: space-between;
  border: 2px solid #c5c5c5;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
}
.ai > input {
  width: 238px;
  outline: none;
  border: none;
  padding-left: 12px;
  font-size: 18px;
  color: #5f6368;
  background-color: transparent;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>