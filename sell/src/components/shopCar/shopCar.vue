<!--新增购物车组件-->
<template>
  <div class="shopcar-wrapper">
    <div class="shopCar">
      <!--点击展开/收起购物车列表-->
      <div class="content" @click="toggleList">
        <!--左边自适应宽度，右边固定-->
        <div class="con-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'heightlight':totalCount>0}">
              <span class="iconfont icon-shopping_cart"></span>
            </div>
            <!--显示选择了多少个商品-->
            <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{'heightlight':totalPrice>0}">¥{{ totalPrice }}</div>
          <div class="desc">另需配送费¥{{ deliveryPrice }}</div>
        </div>
        <!--点击去结算跳转结算页面，而不是购物车页面-->
        <!--阻止在这个点击事件上的冒泡-->
        <div class="con-right" @click.stop.prevent="pay">
          <!--根据选择的商品改变样式-->
          <div class="pay" :class="{'not-enough':this.totalPrice < this.minPrice,'enough':this.totalPrice >= this.minPrice}">{{ payDesc }}</div>
        </div>
      </div>
      <!--定义添加时飞入的小球-->
      <div class="ball-wrapper">
        <!--小球有两个方向的改变，因此需要分两层-->
        <div v-for="ball in balls" v-show="ball.show" class="ball">
          <transition name="drop">
            <div class="inner"></div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h2 class="title">购物车</h2>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="food in selectFoods" class="food border-1px">
                <span class="name">{{ food.name }}</span>
                <div class="price">¥{{food.count*food.price}}</div>
                <div class="cart-control-wrapper">
                  <!--传入food参数-->
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!--定义购物车组件背后的半透明背景-->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
//  引用购物车控制按钮
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  export default {
    props: {
//      定义选择了的商品数组
      selectFoods: {
        type: Array,
//        在vue.js里面，如果props是一个Array或者Object，default就需要是一个函数
        default() {
          return [
            {
              price:0,
              count:0
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    data(){
      return {
        balls:[
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          }
        ],
//        用一个变量表示购物车列表是否展开 默认为不展开
//        展开的条件为：1、选择的商品个数>0，2、点击了购物车
        fold:false
      }
    },
    computed: {
//      所有商品的总价
      totalPrice() {
        let total = 0;
//        forEach方法中的function回调有三个参数：
//        第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
        this.selectFoods.forEach((food)=> {
//          food.count定义商品的数量
          total += food.price * food.count;
        });
        return total;
      },
//      定义所有商品的总和
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food)=> {
//          value.count定义商品的数量 得到count的总和
          count += food.count;
        });
        return count;
      },
//      根据现有价格和起送价来定义右边按钮的文字
      payDesc(){
        if ( this.totalPrice === 0 )
        {
          return '¥'+this.minPrice+'起送';
        }else if (this.totalPrice < this.minPrice)
        {
          let diff = this.minPrice-this.totalPrice;
          return '还差'+diff+'元起送';
        }else {
          return '去结算';
        }
      },
      listShow(){
//        如果选择的商品个数为0
        if (this.selectFoods.length ===0)
        {
          this.fold = true;
          return false;
        }else {
          let show = !this.fold;
//          当列表展示的时候需要调用Bscroll初始化
          if (show)
          {
            this.$nextTick(()=>{
//              并不是每次都需要重新new一个，存在时则调用它的refresh接口，不存在则new
              if (!this.scroll)
              {
                this.scroll = new Bscroll(this.$refs.listContent,{
                  click:true
                })
              }else {
//                重新计算外层与内层的高度差，决定是否能够滚动
                this.scroll.refresh();
              }
            })
          }
          return show;
        }
      }
    },
    methods:{
      drop(el){
        console.log(el);
      },
      toggleList(){
//        如果购物车里没东西
        if (this.selectFoods.length===0)
        {
          return;
        }else {
          this.fold = !this.fold;
        }
      },
//      点击透明遮罩隐藏
      hideList(){
        this.fold = !this.fold;
      },
      empty(){
        this.selectFoods.forEach((food)=>{
          food.count = 0;
        })
      },
      pay(){
        if (this.totalPrice < this.minPrice)
        {
          return;
        }
        window.alert('需要支付'+this.totalPrice+'元');
      }
    },
    components:{
      cartControl:cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/base.styl";
  .shopCar
    position: fixed
    left: 0
    bottom: 0
    z-index: 10
    width: 100%
    height: 48px
    background: yellow
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .con-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          box-sizing: border-box
          height: 56px
          width: 56px
          border-radius: 50%
          top: -10px
          margin: 0 12px
          padding: 6px
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            vertical-align: top
            background: #2b343c
            text-align: center
            .icon-shopping_cart
              font-size: 24px
              color: #80858a
              line-height: 44px
            &.heightlight
              background :rgb(0,160,220)
              .icon-shopping_cart
                color :white
          .num
            position :absolute
            top: 0
            right: 0
            width :24px
            height :16px
            line-height :16px
            text-align :center
            border-radius :16px
            font-size :9px
            font-weight :700
            color :white
            background :rgb(240,20,20)
            box-shadow :0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display: inline-block
          vertical-align: top
          line-height: 24px
          box-sizing: border-box
          padding-right: 12px
          margin-top: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.heightlight
            color :white
        .desc
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin: 12px 0 0 12px
          font-size: 12px
      .con-right
        flex: 0 0 105px
        width: 105px
        .pay
          line-height: 48px
          font-size: 12px
          font-weight: bold
          text-align: center
          &.not-enough
            background: #2b333b
          &.enough
            background :green
            color :white
    .ball-wrapper
      .ball
        position :fixed
        left:32px
        bottom :22px
        z-index :100
        &.drop-enter-active
          transition : all 0.4s
          .inner
            width :16px
            height :16px
            border-radius :50%
            background :rgb(0,160,220)
            transition : all 0.4s
    .shopcart-list
      position :absolute
      left: 0
      top:0
      z-index :-1
      width :100%
      transform :translateY(-100%)
      &.fold-enter-active,&.fold-leave-active
        transition :all 0.3s
        transform :translateY(-100%)
      &.fold-enter,&.fold-leave-to
        transform :translateY(0)
      .list-header
        height :40px
        background :#f3f5f7
        line-height :40px
        padding :0 18px
        color :rgb(7,17,27)
        border-bottom:1px solid rgba(7,17,27,0.1)
        .title
          float :left
          font-size :14px
          font-weight :normal
        .empty
          float :right
          font-size :12px
          color :rgb(0,120,220)
      .list-content
        width :100%
        max-height :217px
        padding :0 18px
        box-sizing :border-box
        background :white
        overflow :hidden
        .food
          position :relative
          padding :12px 0
          box-sizing :border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height :24px
            font-size :14px
            color :rgb(7,17,27)
          .price
            position :absolute
            right:90px
            bottom:12px
            line-height :24px
            font-size :14px
            font-weight :700
            color :rgb(240,20,20)
          .cart-control-wrapper
            position :absolute
            bottom :8px
            right:0
  .list-mask
    position :fixed
    top: 0
    left: 0
    width :100%
    height :100%
    z-index :1
    background :rgba(7,17,27,0.6)
    filter:blur(10px)
    &.fade-enter-active,&.fade-leave-active
      transition :all 0.3s
      opacity :0
      background :rgba(7,17,27,0)
    &.fade-enter,&.fade-enter-to
      opacity :1
      background :rgba(7,17,27,0.6)
</style>
