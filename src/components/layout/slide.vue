<template>
  <el-aside :style="{width:sidebar.width}">
    <!-- <el-menu :default-openeds="['1']"  > -->

    <el-menu id="menuClass"
             router
             :default-openeds="defaultOpeneds"
             :collapse="isCollapse"
             @open="handleOpen"
             @close="handleClose">

      <template v-for="(item,index) in Routers">
        <el-menu-item v-if="item.noDropdown"
                      :key="index"
                      :index="item.name"
                      :route="item">

          <i :class="item.meta.icon"></i>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
        <el-submenu v-else-if="checkRole(item.role) && item.sliderShow == true"
                    :key="index"
                    :index="item.name">
          <div></div>
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <template v-for="(citem,cindex) in item.children">
            <el-menu-item :key="cindex"
                          :index="citem.name"
                          :route="citem"
                          v-if="checkRole(citem.role) && citem.sliderShow == true">
              <span>{{citem.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>

    </el-menu>
  </el-aside>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapGetters } from 'vuex'
import slide from '@/router/slidePath.js'
export default {
  //import引入的组件需要注入到对象中才能使用

  components: {},
  data () {
    //这里存放数据
    return {
      defaultOpeneds: [],
      Routers: slide,
      roleAction: this.getRoleAction(),
      // isCollapse:false
    };
  },
  //监听属性 类似于data概念
  computed: {
    noDropdownRouters: function () {
      return this.Routers.filter(function (Routers) {
        return Routers.noDropdown
      })
    },
    dropdownRouters: function () {
      return this.Routers.filter(function (Routers) {
        return !Routers.noDropdown
      })
    },
    ...mapGetters([
      //'permission_routers',
      'isCollapse',
      'sidebar',
      //'menuIndex'
    ]),
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
    handleOpen (key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      //console.log(key, keyPath);
    },
    getRoleAction () {
      let roleAction = localStorage.getItem('roleAction');
      let arr = [];
      if (roleAction) {
        arr = roleAction.split(",");
      }
      return arr;
    },
    checkRole (roleArr) {
      if (roleArr.length > 0) {
        for (let i = 0; i < roleArr.length; i++) {
          if (this.roleAction.indexOf(roleArr[i]) >= 0) {
            return true;
          }
        }
        return false;
      }
      return true;
    },
  },
}
</script>
<style lang='scss' scoped>
.el-aside {
  background: #333e4b;
  padding-top: 2px;
  font-size: 14px;
}
/deep/ .el-submenu__title,
.el-menu-item {
  padding: 0;
  background: #333e4b;
  color: #ffffff;
}
/deep/ .el-menu {
  height: 100%;
  background-color: #333e4b;
  color: #fff;
}
/deep/ .el-menu-item {
  padding: 0;
}
.el-menu .is-active {
  background: #273038;
  color: #ffffff;
}
/deep/ .el-menu--collapse {
  width: 59px;
}
/deep/ .el-submenu__title:hover,
.el-menu-item:hover {
  background: #273038;
  border-left: 3px solid #3c8dbc;
}
.el-submenu .el-menu-item {
  min-width: 178px !important;
  font-size: 14px;
}
</style>
