import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 状态对象
const state = {
  count:44
};
// 触发状态
const mutations = {
  // 如果要传入第二个参数
  add(state,n){
    state.count +=n
  },
  cut(state){
    state.count --
  }
}
// 动态计算
const getters = {
  count:function (state) {
    return state.count +=99
  }
}

export default new Vuex.Store({
  // 引入
  state,
  mutations,
  getters
})
