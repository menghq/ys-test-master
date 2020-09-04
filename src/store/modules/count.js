const count = {
    state:{
        count:1,
    },
    getters:{
        count:state=>state.count,
    },
    mutations:{
        INCREMENT(state) {
            state.count++
        },
        DECREMENT(state) {
            state.count--
        }
    },
    actions:{
        increment(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
            context.commit('INCREMENT');
        },
        decrement(context) {  //同上注释
            context.commit('DECREMENT');
        },
    }
}

export default count