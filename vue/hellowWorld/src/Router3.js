import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入VueRouter模块
Vue.use(VueRouter);

// 定义一个路由表
const router = new VueRouter ({
  mode:'history',
  base:__dirname,
  routes:[
    { path:'/' },
    // :表示绑定
    { path:'/params/:aaa/:bbb' },
    // 正则表达 只绑定数字
    { path:'/parame-regex/:id(\\d+)' }
  ]
})

new Vue ({
  // router路由器
  router,
  template:`
<!--模板必须有且仅有一个根元素-->
    <div>
        <h1>早上好</h1>
        <ul>
        <!--链接用router-link，不用a标签-->
            <li><router-link to="/">/</router-link></li>
            <li><router-link to="/params/111/222">/params/111/222</router-link></li>
            <li><router-link to="/parame-regex/222">/parame-regex/222</router-link></li>
            <li><router-link to="/parame-regex/aaa">/parame-regex/aaa</router-link></li>
        </ul>
        <p>show</p>
        <!--stringify()用于从一个对象解析出字符串，如-->
        <!--var a = {a:1,b:2} 结果：JSON.stringify(a)  "{"a":1,"b":2}"-->
        <pre><code> {{ $route.params.aaa }} </code></pre>
        <pre><code> {{ JSON.stringify($route,null,2) }} </code></pre>
    </div>
  `
}).$mount("#app");
