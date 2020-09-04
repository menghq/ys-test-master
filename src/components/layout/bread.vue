<template>
  <div class='bread_container'
       style="display:flex; justify-content:space-between;"
       id="bread_container">
    <div style="width: 80%;">
      <span @click="handleLefeMenu"
            class="bars">
        <i :class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold' "></i>
      </span>
      <el-breadcrumb class="breadcrumb"
                     separator="/">
        <el-breadcrumb-item v-for='(title,index) in matchedArr'
                            :key='index'>
          {{title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      isCollapse: false,
    };
  },
  //监听属性 类似于data概念
  computed: {
    matchedArr () {
      let temp = [], temps = [];
      this.$route.matched.filter((item, index, self) => {
        if (item.meta.title) {
          const title = item.meta.title;
          temp.push(title);
        }
      });
      temp.filter((item, index, self) => {
        if (!temps.includes(item)) {
          temps.push(item);
        }
      })
      return temps;
    }
  },
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
    handleLefeMenu () {
      this.$store.dispatch('setLeftCollapse');  // 折叠菜单
      this.$store.dispatch('handleLeftMenu');  // 改变菜单宽度 180->35/35-180
      this.isCollapse = !this.isCollapse;
    },

  },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.bread_container {
  background-color: rgb(229, 229, 229);
  width: 100%;
  display: flex;
  align-items: center;
  .bars {
    float: left;
    margin: 5px 10px;
    cursor: pointer;
  }
  .breadcrumb {
    height: 30px;
    line-height: 30px;
    .breadbutton {
      float: left;
      margin: 4px 5px 0 0;
    }
  }
  .el-button {
    padding: 4px 10px !important;
  }
}
</style>