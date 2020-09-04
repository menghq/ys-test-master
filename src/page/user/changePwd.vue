<template>
  <div class="queryList">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="120px"
             class="demo-ruleForm">
      <el-form-item label="旧密码："
                    prop="oldPassword">
        <el-input type="password"
                  size="small"
                  v-model="ruleForm.oldPassword"
                  autocomplete="off"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="新密码："
                    prop="newPassword">
        <el-input type="password"
                  v-model="ruleForm.newPassword"
                  size="small"
                  autocomplete="off"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="确认新密码："
                    prop="repeatPassword">
        <el-input type="password"
                  v-model="ruleForm.repeatPassword"
                  size="small"
                  autocomplete="off"
                  clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { OrderModule } from "@/api/common";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    var validateOldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value.length < 6) {
        callback(new Error('新密码长度必须为6位以上'));
      } else {
        if (this.ruleForm.repeatPassword !== '') {
          this.$refs.ruleForm.validateField('repeatPassword');
        }
        callback();
      }
    };
    var validateRepeatPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入新密码不一致!'));
      } else {
        callback();
      }
    };
    //这里存放数据
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      },
      rules: {
        oldPassword: [
          { validator: validateOldPassword, trigger: 'blur', required: 'true' }
        ],
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur', required: 'true' }
        ],
        repeatPassword: [
          { validator: validateRepeatPassword, trigger: 'blur', required: 'true' }
        ],
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  //方法集合
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let data = {
            oldPassword: this.ruleForm.oldPassword,
            newPassword: this.ruleForm.newPassword,
            repeatPassword: this.ruleForm.repeatPassword,
          };
          OrderModule.updateAdminPassword(data).then(res => {
            if (res.data) {
              if (res.data.err == 0) {
                this.$message({
                  type: 'success',
                  message: '修改密码成功，请重新登陆!'
                });
                this.$router.push('../login')
              } else {
                if (res.data.err == 1) {
                  this.$message({
                    type: 'error',
                    message: '请输入旧密码!'
                  });
                } else if (res.data.err == 2) {
                  this.$message({
                    type: 'error',
                    message: '旧密码错误!'
                  });
                } else if (res.data.err == 3) {
                  this.$message({
                    type: 'error',
                    message: '请输入新密码!'
                  });
                } else if (res.data.err == 3) {
                  this.$message({
                    type: 'error',
                    message: '新密码长度必须为6位字符以上!'
                  });
                } else if (res.data.err == 4) {
                  this.$message({
                    type: 'error',
                    message: '两次输入新密码不一致!'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: '保存失败!'
                  });
                }
              }
            }
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.queryList {
  border: 1px solid #eee;
  padding: 15px 15px 3px 15px;
}
.el-input {
  width: 300px;
}
</style>