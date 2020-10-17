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
    role: [],
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
        role: [],
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
        role: [],
        sliderShow: true,
        meta: {
          title: '人员列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/schoolManagement/dinerList'),
      },
      {
        path: 'cardList',
        name: 'cardList',
        role: [],
        sliderShow: true,
        meta: {
          title: '餐卡列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/schoolManagement/cardList'),
      }]
  },
  {
    path: '/kitchenManagement',
    name: 'kitchenManagement',
    role: [],
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
        role: [],
        sliderShow: true,
        meta: {
          title: '菜品列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/foodManagement/foodList'),
      },
      {
        path: 'menuList',
        name: 'menuList',
        role: [],
        sliderShow: true,
        meta: {
          title: '菜单列表',
          icon: 'el-icon-s-custom', //el-icon-truck
        },
        component: () => import('@/page/foodManagement/menuList'),
      },
      {
        path: 'assignList',
        name: 'assignList',
        role: [],
        sliderShow: true,
        meta: {
          title: '配餐管理',
          icon: 'el-icon-fork-spoon', //el-icon-truck
        },
        noDropdown: true,
        component: () => import('@/page/orderManagement/assignList'),
      },
      {
        path: 'orderList',
        name: 'orderList',
        role: [],
        sliderShow: true,
        meta: {
          title: '订单管理',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/orderManagement/orderList'),
      },]
  },
  {
    path: '/financeManagement',
    name: 'financeManagement',
    role: [],
    sliderShow: true,
    meta: {
      title: '财务管理',
      icon: 'el-icon-shopping-cart-full'
    },
    component: contentMain,
    children: [
      {
        path: 'rechargeList',
        name: 'rechargeList',
        role: [],
        sliderShow: true,
        meta: {
          title: '充值记录',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/financeManagement/rechargeList'),
      },
      {
        path: 'consumeList',
        name: 'consumeList',
        role: [],
        sliderShow: true,
        meta: {
          title: '消费记录',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/financeManagement/consumeList'),
      },
      {
        path: 'statementList',
        name: 'statementList',
        role: [],
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
    role: [],
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
        path: 'schoolList',
        name: 'schoolList',
        role: [],
        sliderShow: true,
        meta: {
          title: '系统设置',
          icon: 'el-icon-user-solid'
        },
        noDropdown: true,
        component: () => import('@/page/schoolManagement/schoolList'),
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

