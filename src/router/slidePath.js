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
      title: '学校管理',
      icon: 'el-icon-user-solid'
    },
    component: contentMain,
    children: [
      {
        path: 'schoolList',
        name: 'schoolList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '学校列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/schoolManagement/schoolList'),
      },
      {
        path: 'gradeList',
        name: 'gradeList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '年级列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/schoolManagement/gradeList'),
      },
      {
        path: 'classList',
        name: 'classList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '班级列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/schoolManagement/classList'),
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
      },
      {
        path: 'schoolUserList',
        name: 'schoolUserList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '管理员列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/schoolManagement/schoolUserList'),
      }]
  },
  {
    path: '/kitchenManagement',
    name: 'kitchenManagement',
    role: ["user", "all"],
    sliderShow: true,
    meta: {
      title: '供应商管理',
      icon: 'el-icon-hot-water'
    },
    component: contentMain,
    children: [
      {
        path: 'kitchenList',
        name: 'kitchenList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '供应商列表',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/foodManagement/kitchenList'),
      },
      {
        path: "licenseList",
        name: "licenseList",
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: "供应商资质",
          icon: "el-icon-food" //el-icon-truck
        },
        component: () => import("@/page/foodManagement/licenseList"),
      },
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
          title: '管理员列表',
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
        path: 'menuList',
        name: 'menuList',
        role: ["user", "all"],
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
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '配餐管理',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/orderManagement/assignList'),
      },
      {
        path: 'stopList',
        name: 'stopList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '停餐管理',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/orderManagement/stopList'),
      },
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
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '评价管理',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/orderManagement/commentList'),
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
        path: 'withdrawList',
        name: 'withdrawList',
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: '提现申请',
          icon: 'el-icon-food', //el-icon-truck
        },
        component: () => import('@/page/financeManagement/withdrawList'),
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
    path: "/attachmentManagement",
    name: "attachmentManagement",
    role: ["user", "all"],
    sliderShow: true,
    meta: {
      title: "食品安全文件",
      icon: "el-icon-paperclip"
    },
    component: contentMain,
    children: [
      {
        path: "legalList",
        name: "legalList",
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: "法律法规",
          icon: "el-icon-food" //el-icon-truck
        },
        component: () => import("@/page/attachmentManagement/legalList"),
      },
      {
        path: "manageList",
        name: "manageList",
        role: ["user", "all"],
        sliderShow: true,
        meta: {
          title: "管理文档",
          icon: "el-icon-food" //el-icon-truck
        },
        component: () => import("@/page/attachmentManagement/manageList")
      },
    ]
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

