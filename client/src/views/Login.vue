<template>
  <div class="login">
    <section class="form_container">
      <div class="manage">
        <span class="logo"></span>
        <h2>后台管理系统</h2>
      </div>
      <div class="form">
        <h1>登录</h1>
        <el-form
          :model="loginUser"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="60px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginUser.email"
              placeholder="请输入email"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              round
              class="submit_btn"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <p>
          还没有账号? 现在<router-link to="/register" tag="span"
            >注册</router-link
          >
        </p>
      </div>
    </section>
  </div>
</template>

<script>
/* 引入解析 token 的模块 */
import jwt_decode from 'jwt-decode';
export default {
  name: 'login',

  data() {
    return {
      loginUser: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 25,
            message: '长度在 6 到 25 个字符',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('api/users/login', this.loginUser).then((res) => {
            // console.log(res);
            this.$message({
              message: '登录成功!',
              type: 'success',
              center: true,
            });
            /* 拿到token */
            // 使用ES6语法解构
            const { token } = res.data;
            // 将token储存在localstorage中
            localStorage.setItem('eleToken', token);

            //解析 token
            const decode = jwt_decode(token);
            // console.log(decode);
            //token 储存到 Vuex 中
            // decode this.isEmpty(decode)判断是否为空传递过去
            this.$store.dispatch('setAuthenticated', !this.isEmpty(decode));
            this.$store.dispatch('setUser', decode);
            this.$router.push('/index/subpage');
          });
        }
      });
    },

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

<style scoped>
.login {
  position: relative;
  widows: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  /* -webkit-filter: blur(7px);
  -moz-filter: blur(7px);
  -o-filter: blur(7px);
  -ms-filter: blur(7px);
  filter: blur(7px); */
}
.form_container {
  position: absolute;
  z-index: 3000;
  width: 370px;
  /* height: 210px; */
  left: 0;
  right: 0;
  top: 10%;
  margin: 0 auto;
}
.manage {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.manage > .logo {
  width: 35px;
  height: 35px;
  background: url(../assets/logo.png) no-repeat center center;
  background-size: 100% 100%;
  margin: 15px 0;
}
.form {
  /* width: 400px; */
  /* height: 350px; */
  border: 8px solid rgba(248, 248, 242, 0.4);
  border-radius: 20px;
  padding: 0 30px;
  background-color: rgba(248, 248, 242, 0.7);
}
.form > h1 {
  border-bottom: slategray 5px solid;
  /* margin-bottom: 10px; */
}
.form > p {
  cursor: pointer;
  text-align: right;
  margin-bottom: 10px;
}
.form > p > span {
  color: steelblue;
}
.el-form-item__content {
  margin-bottom: 15px;
}
.submit_btn {
  margin-left: 50px;
  box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
    -4px -4px 20px rgba(255, 255, 255, 1);
}
</style>