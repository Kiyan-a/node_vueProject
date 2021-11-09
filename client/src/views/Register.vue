<template>
  <div class="register">
    <section class="form_container">
      <div class="manage">
        <span class="logo"></span>
        <h2>后台管理系统</h2>
      </div>
      <div class="form">
        <h1>注册</h1>
        <el-form
          :model="registerUser"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerUser.email"
              placeholder="请输入email"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              type="password"
              v-model="registerUser.password2"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="选择身份" prop="resource">
            <el-radio-group v-model="registerUser.identity">
              <el-radio label="VIP" value="manager"></el-radio>
              <el-radio label="游客" value="employee"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              round
              class="submit_btn"
              @click="submitForm('registerForm')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 25,
            message: '长度在 3 到 25 个字符',
            trigger: 'blur',
          },
        ],
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
        password2: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 25,
            message: '长度在 6 到 25 个字符',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('api/users/register', this.registerUser)
            .then((res) => {
              console.log('registration success!' + res);
              this.$message({
                message: '注册成功!',
                type: 'success',
                center: true,
              });
            });
          setInterval(() => {
            this.$router.push('/login');
          }, 2000);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.register {
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
  top: 5%;
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
}
.el-form-item__content {
  margin-bottom: 15px;
}
.submit_btn {
  margin-left: 40px;
  box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
    -4px -4px 20px rgba(255, 255, 255, 1);
}
</style>