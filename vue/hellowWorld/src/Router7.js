import Vue from 'vue'
import VueRouter from 'vue-router'
import parent from './transition.vue'
// 导入VueRouter模块
Vue.use(VueRouter);

const home = {
  template:`
    <div>
     <h2>home</h2>
     <p>this is home {{ $route.query.a }}</p>
    </div>
  `
};
const test = {
  template:`
    <div>
     <h2>测试404页面是否能显示</h2>
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
    {path:'/test',component:test},
    // 404页面只能放在最后
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
    <!--给click绑定了一个back的方法-->
    <button v-on:click="back">后退</button>
    <button v-on:click="home">home</button>
    <button v-on:click="enter">前进</button>
    <button v-on:click="query">query传值</button>
        <h1>这是一个动画模板</h1>
        <ul>
        <!--路由-->
            <li><router-link to="/">/</router-link></li>
            <li><router-link to="/parent">parent</router-link></li>
            <li><router-link to="一个错误的地址">一个错误的地址</router-link></li>
            <li><router-link to="/test">test</router-link></li>
        </ul>
        <!--mode有两个值 out-in（先下后上）与in-out（先上后下）-->
        <!--定义一个name 也可以绑定变量-->
        <transition :name="aaa" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
  `,
  // 定义back方法
  methods:{
    back:function () {
      // -1为后退一个
      router.go(-1);
    },
    enter:function () {
      // 1为前进一个
      router.go(1);
    },
    home:function () {
      // 返回根目录 push
      router.push('/');
    },
    query:function () {
      // 给path为"/"的路径中 传值 只能传值 不能修改路由表
      router.push({path:'/',query:{a:1,b:2}});
    }
  }
}).$mount("#app");
