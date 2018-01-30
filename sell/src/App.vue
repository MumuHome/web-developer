<template>
  <div>
    <!--通过v-on传递给seller组件-->
    <sell-header :seller="seller"></sell-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <!--刷新的界面-->
    <!--这里需要把seller传过来 才能在子模板中使用-->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import {urlParse} from './common/js/util';
  //  引用header组件
  import header from './components/header/header.vue'

  const err_ok = 0;
  //  注册组件 组件中规定data是函数
  export default {
    data() {
      return {
        seller: {
//        定义一个id 运行这个函数
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id
          })()
        }
      }
    },
//  created 钩子可以用来在一个实例被创建之后调用ajax获取页面初始化所需的数据
    created() {
      this.$http.get('/api/seller?id='+this.seller.id).then(response => {
//      成功时执行
        response = response.body;
        if (response.errno === err_ok) {
//          this.seller = response.data;
//          var o1 = {a: 1};var o2 = {b: 2};var o3 = {c: 3};
//          var obj = Object.assign(o1, o2, o3);
//          console.log(obj); //{a: 1, b: 2, c: 3}
//          console.log(o1); //{a: 1, b: 2, c: 3}, 目标对象被改变了
//          Object.assign()方法把三个对象合并为一个
          this.seller = Object.assign({},this.seller,response.data);
        }
      })
    },
    components: {
      //  注册header 定义的标签不要与原有的html标签重复
      'sell-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*vue-loader里面有一个postcss插件 自动添加兼容写法（厉害了）*/
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    line-height: 40px
    height: 40px
    text-align: center
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      font-size: 14px
      color: rgb(77, 85, 93)
      &.active
        color: rgb(240, 20, 20)
        right: 0
</style>
