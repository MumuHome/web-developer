import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const home = { template:"<div>home内容</div>" };
const one = { template:"<div>one内容</div>" };
const about = { template:"<div>about内容</div>" };
const users = {
  template:`
  <div>
    <h2>users</h2>
    <router-view></router-view>
  </div>
  `
};
const user = {
  template:`
  <div>
    {{ $route.params.username }}
    {{ $route.query.aaa }}
  </div>
  `
}


const router = new VueRouter({
  mode:'history',
  // __dirname 是node.js中的语法 指当前路径
  base:__dirname,
  // 注意！多个地址时 要变成routes
  routes:[
    // component为组件 /表示当前路径
    {path:'/',name:'home',component:home},
    {path:'/users',component:users,
      children:[
        // {path:'/',component:user},
        {path:':username',name:'user',component:user},
        {path:'about',name:'about',component:about}
      ]
    }
  ]
});

new Vue({
  router,
  template:`
    <div id="r">
      <h1>导航</h1>
      <ol>
      <!--路径为/ 表示当前路径-->
          <li><router-link to="/">/</router-link></li>
          <li><router-link to="/first">first</router-link></li>
                <ol>
                  <!--<li><router-link to="/one">one</router-link></li>-->
                  <!--绑定参数 params与name是连用的 path与query连用-->
                  <li><router-link :to="{path:'/users/xuj',query:{aaa:'bbb'}}">xuj</router-link></li>
                  <!--添加一个li标签 tag与to连用-->
                  <!--<router-link tag="li" to="about">tag</router-link>-->
                  <!--append是在url后面无限延长-->
                  <li><router-link to="append" append>append</router-link></li>
                  <!--严谨模式下 跳转到about-->
                  <li><router-link to="about" exact>exact</router-link></li>
                  <li><router-link to="about">exact</router-link></li>
              </ol>
      </ol>
      <!--显示在这里-->
      <router-view ></router-view>
    </div>
`
  // 发布到id为app的标签中
}).$mount('#app');
