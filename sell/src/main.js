// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入vue-resource
import VueResource from 'vue-resource'
import App from './App.vue'
// 导入组件
import goods from './components/goods/goods.vue'
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'
// 导入样式
import './common/stylus/index.styl'
// 全局注册
Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.config.productionTip = false

// 跳过这条规则的校验 此时new实例不一定非要赋值给某个变量
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })


// router.map方法定义路由 2.0已经不兼容了 换一种写法
const routes = [
  {path: '/goods',component:goods},
  {path: '/seller',component:seller},
  {path: '/ratings',component:ratings}
]

// 传入路由实例
const router = new VueRouter({
  // 定义点击时默认添加的样式名为active
  linkActiveClass: 'active',
  routes
})

// 让页面加载时直接导航到goods的内容
// router.push('/goods')

// 开始运行路由 路由创建一个app实例，并且挂载在#app匹配的元素上
const app = new Vue({
  router,
  // template，作为 Vue 实例的标识使用，模板将会替换挂载的元素
  // <App />他就是App.vue，template就是选择vue实例要加载哪个模板
  template: '<App/>',
  components: { App }
}).$mount('#app');
