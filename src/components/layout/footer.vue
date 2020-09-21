<template>
  <div class="footer">
    <div>霍州煤电集团吕临能化有限公司智慧食堂超级管理系统</div>
    <div></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { UserModule } from "@/api/common";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {},
};
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
  width: 700px;
  transition: width 0.5s linear;
  img {
    height: 38px;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
}
.footer {
  border-top: 1px solid #eeeeee;
  text-align: center;
  color: #eeeeee;
  padding-top: 15px;
  margin: 15px;
}
</style>
