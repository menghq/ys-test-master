<template>
  <div :class="theme">
    <router-view></router-view>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      theme: "contentMain light",
    };
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
  methods: {
    setTheme(theme) {
      console.log(theme);
      if (theme == "dark") {
        this.theme = "contentMain dark";
      } else {
        this.theme = "contentMain light";
      }
    },
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
// .contentMain {
// height:100%;
//overflow: auto;
// }
.contentMain {
  padding-bottom: 20px;
  height: auto;
}

.light {
  background: #ffffff;
}

.dark {
  background: #122845;
}
</style>