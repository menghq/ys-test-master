export const homeColumn = [
    {  // 需要展示的列开始
        prop: 'rank',
        label: '排名',
        align: 'center',
        isShow: true,
        // formatter: (row, column, cellValue) => {   //formatter重构
        //   return `返回参数`
        // }

    },
    {
        prop: 'mealName',
        label: '菜品名称',
        align: 'center',
        isShow: true
    },
    {
        prop: 'unitPrice',
        label: '单价',
        align: 'center',
        isShow:true
    },
    {
        prop: 'sellNum',
        label: '销售笔数',
        align: 'center',
        isShow:true
    },
    {
        prop: 'totalPrice',
        label: '销售金额',
        align: 'center',
        isShow:true
    },
]
export const mealListColumn = [
    {
        prop: 'mealImg',
        label: '菜品图',
        align: 'center',
        isShow:true
    },
    {
        width: 300,
        prop: 'mealName',
        label: '菜品名称',
        align: 'center',
        isShow:true
    },
    {
        prop: 'unitPrice',
        label: '价格',
        align: 'center',
        isShow:true
    },
    {
        prop: 'limitation',
        label: '限量',
        align: 'center',
        isShow:true
    },
    {
        prop: 'mealSection',
        label: '可供餐段',
        align: 'center',
        isShow:true
    },
    {
        prop: 'state',
        label: '状态',
        align: 'center',
        isShow:true
    },
    {
        prop: 'addDate',
        label: '添加时间',
        align: 'center',
        isShow:true
    }
]
// 账户设置
export const accountListColumn = [
    {
        prop: 'index',
        label: '序号',
        align: 'center',
        isShow:true,
        width: 80
    },
    {
        prop: 'accoutnum',
        label: '账号',
        align: 'center',
        isShow:true
    },
    {
        width: 300,
        prop: 'name',
        label: '姓名',
        align: 'center',
        isShow:true
    },
    {
        prop: 'role',
        label: '角色',
        align: 'center',
        isShow:true
    },
    {
        prop: 'addDate',
        label: '添加时间',
        align: 'center',
        isShow:true
    }
]

// 订单配送
export const orderDistributionColumn = [
    // {
    //     prop: 'index',
    //     label: '序号',
    //     align: 'center',
    //     isShow: true,
    //     width: 80
    // },
    {
        prop: 'distributionAddr',
        label: '配送地址',
        align: 'center',
        isShow: true
    },
    {
        width: 300,
        prop: 'mealName',
        label: '菜品名称',
        align: 'center',
        isShow: true
    },
    {
        prop: 'unitPrice',
        label: '单价',
        align: 'center',
        isShow: true
    },
    {
        prop: 'num',
        label: '数量',
        align: 'center',
        isShow: true
    },
    {
        prop: 'mealCode',
        label: '取餐码',
        align: 'center',
        isShow: true
    },
    {
        prop: 'mealTime',
        label: '用餐时间',
        align: 'center',
        isShow: true
    },
    {
        prop: 'deliveryStatus',
        label: '配送状态',
        align: 'center',
        isShow: true
    }
]

//订单明细
export const orderDetailColumn = [
    {
        prop: 'orderTime',
        label: '下单时间',
        align: 'center',
        isShow: true
    },
    {
        prop: 'mealSection',
        label: '餐段',
        align: 'center',
        isShow: true
    },
    {
        prop: 'deliveryAddress',
        label: '送餐地址',
        align: 'center',
        isShow: true
    },
    {
        prop: 'mealName',
        label: '菜品名称',
        align: 'center',
        isShow: true
    },
    {
        prop: 'unitPrice',
        label: '金额',
        align: 'center',
        isShow: true
    },
    {
        prop: 'mealCode',
        label: '取餐码',
        align: 'center',
        isShow: true
    },
    {
        prop: 'status',
        label: '订单状态',
        align: 'center',
        isShow: true
    }
]