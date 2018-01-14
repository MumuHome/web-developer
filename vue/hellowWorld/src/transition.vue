<!--模板-->
<template>
  <div>
    <button v-on:click="show = !show">show/hide</button>
    <transition name="fade">
      <!--谁要做动画 就把谁放进来-->
      <p v-if="show">hello world</p>
    </transition>
  </div>
</template>
<!--脚本-->
<script>
  export default {
    name:'demo',
//    data直接就是个函数
    data () {
      return{
        show:true
      }
    }
  }
</script>
<!--样式表 scoped作用域仅在这个文件 不是全局-->
<style scoped>
  /*动画准备载入时*/
  /*动画载入完成时*/
  /*动画准备移除*/
  /*动画移除时*/
  /*fade对应的是 之前定义的name*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active{
    opacity: 0;
  }
</style>
