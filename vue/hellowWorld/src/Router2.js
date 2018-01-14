import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入VueRouter模块
Vue.use(VueRouter);

// 主目录
const first = { template:"<div>first内容</div>" };
const second = { template:"<div>second内容</div>" };
const home = { template:"<div>home内容</div>" };
const haha = { template:"<div>haha里的内容</div>" };

const router = new VueRouter({
  mode:'history',
  // __dirname 是node.js中的语法 指当前路径
  base:__dirname,
  // 注意！多个地址时 要变成routes
  routes:[
    // component为组件 注意如果是多个组件则为components（加s）
    {path:'/',components:{
      default:home,
      left:first,
      right:second
    }},
    {path:'/first',components:{
      default:haha,
      left:first,
      right:second
    }}
  ]
});

new Vue({
  router,
  template:`
    <div id="r">
      <h1>导航</h1>
      <!--定义一个导航目录 内容与模板的name保持一致 $route路线-->
      <ol>
          <li><router-link to="/">/</router-link></li>
          <li><router-link to="/first">first</router-link></li>
      </ol>
      <!--显示在这里-->
      <router-view class="main"></router-view>
      <router-view class="main" name="left" style="float: left;width: 50%;height:200px;background: orange"></router-view>
      <router-view class="main" name="right" style="float: right;width: 50%;height:200px;background: palegreen"></router-view>
    </div>
`
  // 发布到id为app的标签中
}).$mount('#app');
