import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入VueRouter模块
Vue.use(VueRouter);

const home = {
  template:`
    <div>
     <h2>home</h2>
     <p>this is home</p>
    </div>
  `
};

const parent = {
  template:`
    <div>
     <h2>parent</h2>
     <p>this is parent</p>
    </div>
  `
};

const router = new VueRouter({
  mode:'history',
  base:__dirname,
  routes:[
    {path:'/',component:home},
    {path:'/parent',component:parent}
  ]
});

new Vue({
  router,
  // 定义aaa的值
  data(){
    return {
      aaa:'fade'
    }
  },
  template:`
    <div id="app">
        <h1>这是一个动画模板</h1>
        <ul>
        <!--路由-->
            <li><router-link to="/">/</router-link></li>
            <li><router-link to="/parent">parent</router-link></li>
        </ul>
        <!--mode有两个值 out-in（先下后上）与in-out（先上后下）-->
        <!--定义一个name 也可以绑定变量-->
        <transition :name="aaa" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
  `,
  // 动画监听
  watch:{
    // 转换到哪里from 从哪个路径开始
    '$route'(to,from){
      if ( from.path == '/parent' )
      {
        this.aaa = 'fade1';
      }else {
        this.aaa = 'fade2';
      }
      // console.log()
    }
  }
}).$mount("#app");
