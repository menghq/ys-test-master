<template>
  <el-header>
    <div :class="isCollapse ? 'logo min-logo':'logo' "
      style="float:left;height: 59px;line-height:59px;overflow: hidden;font-size:24px;padding-left:20px;">
      <span>{{pageTitle}}</span>
    </div>

    <div class="userInfo">
      <div class="user-avator"><i class="el-icon-user-solid"></i></div>
      <div style="margin-left: 10px;cursor: pointer;" @click="toUserinfo">您好,{{username}}</div>
      <div style="margin-left: 10px;cursor: pointer;">|</div>
      <div style="margin-left: 10px;cursor: pointer;" @click="toChangePwd">修改密码</div>
      <div style="margin-left: 10px;cursor: pointer;">|</div>
      <div style="margin-left: 10px;cursor: pointer;" @click="loginOut">退出</div>
    </div>
  </el-header>

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
      username: sessionStorage.getItem('userName'),
      roleName: sessionStorage.getItem('roleName'),
      pageTitle: "中央厨房总管理系统",
      isCollapse: false,
      changeBarDirection: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  //方法集合
  methods: {
    toUserinfo () {
      this.$router.push('/systemManagement/userinfo')
    },
    toChangePwd () {
      this.$router.push('/systemManagement/changePwd')
    },
    loginOut () {

      UserModule.getUserLogout().then(res => {
        if (res.data) {

          sessionStorage.setItem('userId', '');
          sessionStorage.setItem('userName', '');
          sessionStorage.setItem('roleId', '');
          sessionStorage.setItem('roleName', '');
          sessionStorage.setItem('kitchenId', '');
          sessionStorage.setItem('kitchenName', '');
          localStorage.setItem('roleAction', '');
          localStorage.setItem('authorization', '');

          this.$router.push('../login');
        }
      });
    }
  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.userInfo {
  float: right;
  margin-right: 20px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 400px;
  transition: width 0.5s linear;
  img {
    height: 58px;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
}
.min-logo {
  width: 60px;
  transition: width 0.3s;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-header {
  width: 100%;
  height: 60px;
  padding: 0;
  margin: 0;
  color: #666666;
  text-align: left;
}
</style>
