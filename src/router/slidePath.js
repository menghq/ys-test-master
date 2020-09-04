import contentMain from '@/components/layout/contentMain'
import Home from '@/page/home'

export default [
  {
    path: '/',
    name: 'index',
    component: Home,
    role: [],
    sliderShow: true,
    meta: {
      title: '首页',
      icon: 'el-icon-house',
    },
    noDropdown: true,
  },
  {
    path: '/schoolManagement',
    name: 'schoolManagement',
    role: ["user", "all"],
    sliderShow: true,
    meta: {
      title: '用餐管理',
      icon: 'el-icon-user-solid'
    },
    component: contentMain,
    children: [
      {
        path: 'gradeList',
        name: 'gradeList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '部门列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/schoolManagement/gradeList'),
      },
      {
        path: 'dinerList',
        name: 'dinerList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '人员列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/schoolManagement/dinerList'),
      }]
  },
  {
    path: '/kitchenManagement',
    name: 'kitchenManagement',
    role: ["user", "all"],
    sliderShow: true,
    meta: {
      title: '食堂管理',
      icon: 'el-icon-hot-water'
    },
    component: contentMain,
    children: [
      {
        path: 'foodList',
        name: 'foodList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '菜品列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/foodManagement/foodList'),
      },
      {
        path: 'kitchenUserList',
        name: 'kitchenUserList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '后厨列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/foodManagement/kitchenUserList'),
      }]
  },
  {
    path: '/foodManagement',
    name: 'marketManagement',
    role: ["user", "all"],
    sliderShow: true,
    meta: {
      title: '经营管理',
      icon: 'el-icon-shopping-cart-full'
    },
    component: contentMain,
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '订单管理',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/orderManagement/orderList'),
      }]
  },
  {
    path: '/financeManagement',
    name: 'financeManagement',
    role: ["user", "all"],
    sliderShow: true,
    meta: {
      title: '财务管理',
      icon: 'el-icon-shopping-cart-full'
    },
    component: contentMain,
    children: [
      {
        path: 'transactionList',
        name: 'transactionList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '交易记录',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/financeManagement/transactionList'),
      },
      {
        path: 'statementList',
        name: 'statementList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '对账统计',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/financeManagement/statementList'),
      }]
  },
  {
    path: '/systemManagement',
    name: 'systemManagement',
    role: ["all"],
    sliderShow: true,
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    component: contentMain,
    children: [
      {
        path: 'adminList',
        name: 'adminList',
        role: ["all"],
        sliderShow: true,
        meta: {
          title: '管理员',
          icon: 'el-icon-user-solid'
        },
        noDropdown: true,
        component: () => import('@/page/systemManagement/adminList'),
      },
      {
        path: 'userinfo',
        name: 'userinfo',
        role: ["all"],
        sliderShow: false,
        meta: {
          title: '个人信息',
          icon: 'el-icon-date', //el-icon-truck
        },
        component: () => import('@/page/user/userinfo'),
      },
      {
        path: 'changePwd',
        name: 'changePwd',
        role: ["all"],
        sliderShow: false,
        meta: {
          title: '修改密码',
          icon: 'el-icon-date', //el-icon-truck
        },
        component: () => import('@/page/user/changePwd'),
      },
    ]
  },
]

