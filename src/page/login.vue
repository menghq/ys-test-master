<template>
  <div class="login-wrap">
    <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#dedede"
      :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab"
      :clickEffect="true" clickMode="push">
    </vue-particles>
    <div class="ms-login">
      <div>
        <div class="ms-title">
          <div>霍州煤电集团吕临能化有限公司</div><div>智慧食堂超级管理系统</div></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名" maxlength="16">
              <template slot="prepend"><i class="el-icon-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" maxlength="32" v-model="ruleForm.password"
              @keyup.enter.native="submitForm('ruleForm')">
              <template slot="prepend"><i class="el-icon-key"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-col :span="12" style="padding-right:10px;">
              <el-input v-model="ruleForm.captcha" placeholder="验证码" maxlength="32">
                <template slot="prepend"><i class="el-icon-position"></i></template>
              </el-input>
            </el-col>
            <el-col :span="12" style="padding-left:10px;">
              <el-image @click="changeCaptcha" :src="captchaImg" style="height:42px; width:134px; cursor:pointer;"></el-image>
            </el-col>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
          </div>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { UserModule } from "@/api/common";
export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      captchaImg: process.env.API_HOST + '/captcha?random=' + Math.random()
    }
  },
  methods: {
    changeCaptcha () {
      this.captchaImg = process.env.API_HOST + '/captcha?random=' + Math.random();
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    login () {

      let datas = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        captcha: this.ruleForm.captcha,
      };
      UserModule.getUserLogin(datas).then(res => {
        if (res.data) {
          if (res.data.err == 1) {
            this.captchaImg = process.env.API_HOST + '/captcha?random=' + Math.random();
            this.$message({
              showClose: true,
              message: '用户名或密码错误',
              type: 'error'
            });
          } else if (res.data.err == 2) {
            this.$message({
              showClose: true,
              message: '验证码错误',
              type: 'error'
            });
          } else if (res.data.err == 3) {
            this.$message({
              showClose: true,
              message: '账号已停用，请联系管理员。',
              type: 'error'
            });
          } else {

            let authorization = res.headers.authorization;

            sessionStorage.setItem('userId', res.data.data.userId);
            sessionStorage.setItem('userName', res.data.data.userName);
            sessionStorage.setItem('roleId', res.data.data.roleId);
            sessionStorage.setItem('roleName', res.data.data.roleName);
            localStorage.setItem('roleAction', res.data.data.roleAction);
            localStorage.setItem('authorization', authorization);

            this.$message({
              type: 'success',
              message: '登陆成功!'
            });

            this.$router.push('/home');
          }
        }
      });
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/background.jpg) no-repeat;
  background-size: cover;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #000000;
  border-bottom: 1px solid #ddd;
}
.ms-logo {
  position: absolute;
  left: 30%;
  top: 40%;
  width: 350px;
  overflow: hidden;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.tiparea {
  text-align: left;
  font-size: 12px;
  color: #4cbb15;
  padding: 10px 0;
  .tip {
    margin-left: 54px;
  }
  .tips {
    color: red;
  }
}
</style>