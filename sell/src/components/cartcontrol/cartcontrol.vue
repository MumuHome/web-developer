<!--购买控件-->
<template>
  <div class="cartcontrol">
    <!--当count为0时，不显示-->
    <transition name="move">
      <div class="decrease" v-show="food.count>0" @click.stop.prevent="decreaseFood">
        <!--这个元素的动画分为两步，因此需要把它拆开-->
        <span class="inner icon-remove_circle_outlin iconfont"></span>
      </div>
    </transition>
    <div class="count" v-show="food.count>0">{{ food.count }}</div>
    <div class="add icon-add_circle iconfont" @click.stop.prevent="addFood()"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
//      这个组件与购买数量有关，接受商品属性
      food: {
        type: Object
      }
    },
    methods:{
//      获得点击时事件的属性
      addFood(){
//        判断当前this.food.count是否存在
        if (!this.food.count)
        {
//          因为food.count是food新添加的一个属性，因此检测不到，所以需要利用vue的新增接口
//          如果不存在，则给他赋值为1
          Vue.set(this.food,'count',1);
        }else {
          this.food.count ++;
        }
//        把子组件的事件对象传递给父组件
//        this.$emit('cartadd',event.target);
      },
      decreaseFood(){
        if (this.food.count)
        {
          this.food.count--;
        }else {
          this.food.count = 0;
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size :0
    .decrease
      padding :3px
      display :inline-block
      /*添加动画*/
      /*进入和离开的过程*/
      &.move-enter-active, &.move-leave-active
        transition: all  0.3s linear
        .inner
          transition: all  0.3s linear
      /*进入式过渡(entering transition)的开始状态 离开式过渡的结束状态*/
      &.move-enter,&.move-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */
        opacity :0
        transform: translateX(24px)
        .inner
          transform: rotate(180deg)
      /*&.move-leave-to
        transform :translate3D(0,0,0)*/
      .inner
        display :inline-block
        font-size :24px
        line-height 24px
        color:rgb(0,160,220)
    .count
      display :inline-block
      vertical-align :top
      font-size :10px
      width :12px
      padding-top :3px
      text-align :center
      line-height :24px
      font-weight :normal
      color :rgb(147,153,159)
    .add
      padding :3px
      display :inline-block
      font-size :24px
      line-height 24px
      color:rgb(0,160,220)
</style>
