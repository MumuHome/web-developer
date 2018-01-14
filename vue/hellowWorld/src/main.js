// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import vuex from './vuex.vue'
// import App from './App'
// import router from './router'
// import Router from './Router7'
// import transition from './transition.vue'


// Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

// new Vue ({
//   el:'#demo',
//   render:xx => xx(transition)
// })

// vuex入口
new Vue({
  el:'#app',
  store,
  render:xx=>xx(vuex)
})
