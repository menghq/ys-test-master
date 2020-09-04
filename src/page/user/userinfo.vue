<template>
  <div class="queryList">
    <el-form ref="form"
             :model="userForm"
             label-width="120px">
      <el-form-item label="账号：">
        {{userForm.userName}}
      </el-form-item>
      <el-form-item label="角色：">
        {{userForm.roleName}}
      </el-form-item>
      <el-form-item label="姓名：">
        {{userForm.fullName}}
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="userForm.mobilePhone"
                  size="small"
                  clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { UserModule } from "@/api/common";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      userForm: {
        userName: "",
        roleName: '',
        fullName: "",
        mobilePhone: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getUserInfo();
  },
  //方法集合
  methods: {
    getUserInfo () {

      UserModule.getUserInfo().then(res => {
        if (res.data) {

          let data = res.data.data;

          this.userForm.userName = data.userName;
          this.userForm.roleName = data.roleName;
          this.userForm.fullName = data.fullName;
          this.userForm.mobilePhone = data.mobilePhone;

        }
      });
    },
    updateUserInfo () {

      let data = {
        mobilePhone: this.userForm.mobilePhone,
      };
      UserModule.updateUserInfo(data).then(res => {
        if (res.data) {

          this.$message({
            type: 'success',
            message: '保存成功!'
          });

        }
      });
    },
    onSubmit () {
      this.updateUserInfo();
    }
  }
};
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
.el-textarea {
  width: 300px;
}
</style>