import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入VueRouter模块
Vue.use(VueRouter);

// 主目录
const first = { template:"<div>first内容</div>" };
const second = { template:"<div>second内容</div>" };
const home = { template:"<div>home内容</div>" };
// 子目录
// 从内容中获取参数id
const firstFirst = { template:"<div>firstFirst内容{{ $route.params.id }}</div>" };
const firstSecond = { template:"<div>firstSecond内容{{ $route.params.id }}</div>" };

const child = {
  template:`
  <div class="child">
    <h2>组件</h2>
    <router-view class="main"></router-view>
  </div>
  `
}

const router = new VueRouter({
  mode:'history',
  // __dirname 是node.js中的语法 指当前路径
  base:__dirname,
  // 注意！多个地址时 要变成routes
  routes:[
    // component为组件
    {path:'/',name:'home',component:home},
    {path:'/first',name:'home-first',component:child,
      children:[
          {path:'/',name:'home-first',component:first},
          {path:'first',name:'home-first-first',component:firstFirst},
          {path:'second',name:'home-first-second',component:firstSecond}
        ]
    },
    {path:'/second',name:'home-second',component:second}
  ]
});

new Vue({
  router,
  template:`
    <div id="r">
      <h1>导航</h1>
      <!--定义一个导航目录 内容与模板的name保持一致 $route路线-->
      <p>{{ $route.name }}</p>
      <ol>
          <li><router-link to="/">/</router-link></li>
          <li><router-link to="/first">first</router-link></li>
                <ol>
                <!--绑定参数-->
                  <li><router-link :to="{ name:'home-first-first',params:{id:123} }">first</router-link></li>
                  <li><router-link :to="{ name:'home-first-second',params:{id:12345} }">second</router-link></li>
              </ol>
          <li><router-link to="/second">second</router-link></li>
      </ol>
      <!--显示在这里-->
      <router-view class="main"></router-view>
    </div>
`
  // 发布到id为app的标签中
}).$mount('#app');
