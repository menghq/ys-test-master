<template>
  <div class="home">
    <my-header></my-header>
    <el-container>
      <my-slide></my-slide>
      <el-main>
        <bread></bread>
        <content-main></content-main>
        <!-- <router-view></router-view> -->
        <my-footer></my-footer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import myHeader from "@/components/layout/header";
import myFooter from "@/components/layout/footer";
import mySlide from "@/components/layout/slide";
import contentMain from "@/components/layout/contentMain";
import bread from "@/components/layout/bread";
import slide from "@/router/slidePath.js";

import Loading from "@/components/loading";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    myHeader,
    myFooter,
    mySlide,
    contentMain,
    bread,
    Loading,
  },

  data() {
    return {
      header: [],
    };
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
.home {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
/deep/.el-container {
  height: calc(100% - 60px);
  //height: 100%;
  width: 100%;
}
.el-main {
  //height: calc(100% - 60px);
  height: 100%;
  // overflow:hidden;
  // padding-bottom: 80px;
  // padding: 10px 0 0 0;
  padding: 0;
}
.contentMain {
  height: calc(100% - 60px);
  padding: 15px;
  // margin-top:10px;
  background: #fff; // f0f0f0
}
</style>
