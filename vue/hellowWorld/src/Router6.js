import Vue from 'vue'
import VueRouter from 'vue-router'
import parent from './transition.vue'
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
const page404 = {
  template:`
    <div>
        <h1>error:404</h1>
        <p>请检查网络</p>
    </div>
  `,
  beforeRouteEnter:(to,from,next) => {
    console.log(to);
    console.log(from);
    next();
  },
  beforeRouteEnter:(to,from,next) => {
    console.log(to);
    console.log(from);
    next();
  },
}

const router = new VueRouter({
  // mode里面两个属性 history与hash 一般用history
  mode:'history',
  base:__dirname,
  routes:[
    {path:'/',component:home},
    {path:'/parent',component:parent,
      // 钩子
      beforeEnter:(to,from,next) => {
        console.log(to);
        console.log(from);
        console.log(next);
        // 有了next之后 表示可以跳转 next(false)表示不可以 还可以改变路由地址
        next({ path:'/' });
      }
    },
    {path:'*',component:page404}
  ]
});

// 这个模板跟路由表平齐
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
            <li><router-link to="一个错误的地址">一个错误的地址</router-link></li>
        </ul>
        <!--mode有两个值 out-in（先下后上）与in-out（先上后下）-->
        <!--定义一个name 也可以绑定变量-->
        <transition :name="aaa" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
  `
}).$mount("#app");
