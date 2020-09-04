import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Home from "@/components/layout/home";
import contentMain from "@/components/layout/contentMain";
import index from "@/page/index";
import slidePath from "./slidePath.js";
import login from "@/page/login";
Vue.use(Router);

//默认不需要权限的页面
export const constantRouterMap = [
  {
    path: "/",
    name: "nologin",
    component: login,
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   redirect: '/home'
  // },

  {
    path: "/home",
    name: "home",
    component: Home,
    children: slidePath
  }
];
export default new Router({
  routes: constantRouterMap
  // [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   children:slidePath
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: login,
  // }
});
//异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: index,
    meta: {
      title: "系统首页",
      icon: "el-icon-s-home"
    },
    noDropdown: true
  },
  {
    path: "/user",
    name: "user",
    meta: {
      title: "用户信息",
      icon: "el-icon-user-solid"
    },
    component: contentMain,
    children: [
      {
        path: "userinfo",
        name: "userinfo",
        meta: {
          title: "个人信息",
          icon: "el-icon-user-solid"
        },
        //component:userinfo
        component: () => import("@/page/user/userinfo")
      },
      {
        path: "changePwd",
        name: "changePwd",
        meta: {
          title: "修改密码",
          icon: "el-icon-user-solid"
        },
        //component:changePwd
        component: () => import("@/page/user/changePwd")
      }
    ]
  },
];

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
