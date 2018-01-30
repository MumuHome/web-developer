<!--这个组件通过good传入-->
<template>
  <transition name="move">
    <!--给这一层绑定bs-->
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="img-header">
          <!--因为图片是异步渲染，把image的大小写死，预留出图片的加载位置-->
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="iconfont icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h2 class="name">{{ food.name }}</h2>
          <p class="detail">
            <span class="sell-count">月售{{ food.sellCount }}</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </p>
          <div class="price">
            <span class="new">¥{{ food.price }}</span>
            <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cart-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0 ">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <!--有些商品没有介绍-->
        <div class="food-info" v-show="food.info">
          <h2 class="title">商品信息</h2>
          <p class="text">{{ food.info }}</p>
        </div>
        <split></split>
        <div class="food-rating">
          <h2 class="title">商品评价</h2>
          <rating-select
            @changetype="updateType"
            @changetcontent="updateContent"
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings">
          </rating-select>
          <div class="rating-wrapper">
            <!--评论存在时-->
            <ul v-show="food.ratings && food.ratings.length">
              <!--操作这个dom该怎么显示 v-show可以绑定函数-->
              <li v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img class="img" width="12" height="12" :src="rating.avatar">
                </div>
                <!--把事件转换格式-->
                <div class="time">{{ rating.rateTime | formatDate }}</div>
                <div class="text">
                  <span class="iconfont"
                        :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  <span class="con">{{ rating.text }}</span>
                </div>
              </li>
            </ul>
            <!--评论不存在时-->
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  //  引入formatDate方法
  import {formatDate} from '../../common/js/date';
  //  引入购物车控制按钮
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  //  引入分隔
  import split from '../split/split.vue';
  //  引入评价模板
  import ratingselect from '../ratingselect/ratingselect.vue';
  //  定义好评为0
  const POSITIVE = 0;
  //  差评为1
  const NEGATIVE = 1;
  //  所有评价为0
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
//        默认不展示
        showFlag: false,
//        定义筛选评价默认值
        selectType: ALL,
//        定义是否显示有内容的评价默认值
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
//      命名建议：如果定义的为本组件私有的，一般加_，如果有可能被外部调用，则不加
      show() {
        this.showFlag = true;
//        初始化评价模块的参数
//        this.selectType = ALL;
//        this.onlyContent = true;
//        添加bs方法
        this.$nextTick(() => {
//          这个组件也可能会被多次显示隐藏，因此需要判断
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
//              可以被点击（加入购物车等）
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.showFlag = false;
      },
      addFirst() {
//        给food设置一个count属性，并设置其初始值为1
        Vue.set(this.food, 'count', 1);
      },
//      改变这两个量时，重新计算高度
      updateType(type) {
        this.selectType = type;
//        异步更新dom
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      updateContent(onlycontent) {
        this.onlyContent = onlycontent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
//        如果只显示内容选中了并且没有内容 那么返回false
        if (this.onlyContent && !text) {
          return false
//          此时，如果当前的筛选条件为all，全部显示
        } else if (this.selectType === ALL) {
          return true
        } else {
//          否则，比较当前的type和筛选条件，如果想等则显示
          return type === this.selectType;
        }
      }
    },
//    处理时间
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartControl: cartcontrol,
      split: split,
      ratingSelect: ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    z-index: 0
    background: white
    overflow: hidden
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s
      transform: translateX(0)
    &.move-enter, &.move-leave-to
      transform: translateX(100%)
    .food-content
      .img-header
        position: relative
        width: 100%
        height: 0
        /*相对于盒子宽度的100%*/
        padding-bottom: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 10px
          background: rgba(7, 17, 27, 0.2)
          border-radius: 50%
          .icon-arrow_lift
            display: block
            padding: 6px
            font-size: 20px
            color: white
      .content
        position: relative
        padding: 18px
        .name
          font-size: 14px
          line-height: 14px
          margin-bottom: 8px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          height: 10px
          font-size: 0
          .sell-count, .rating
            font-size: 10px
            color: rgb(147, 153, 159)
          .sell-count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 14px
          .new
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            font-size: 10px
            text-decoration: line-through
            color: rgb(147, 153, 159)
        .cart-wrapper
          position: absolute
          right: 15px
          bottom: 10px
        .buy
          position: absolute
          box-sizing: border-box
          right: 18px
          bottom: 13px
          z-index: 10
          line-height: 24px
          height: 24px
          padding: 0 12px
          text-align: center
          font-size: 10px
          border-radius: 12px
          background: rgb(0, 160, 220)
          color: white
          &.fade-enter-active, &.fade-leave-active
            transition: all 0.2s
            opacity: 1
          &.fade-enter, &.fade-leave-to
            opacity: 0
      .food-info
        width: 100%
        box-sizing: border-box
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 6px
          font-size: 14px
          color: rgb(7, 17, 27)
          font-weight: normal
        .text
          font-size: 12px
          line-height: 2
          padding: 0 8px
          color: rgb(77, 85, 93)
      .food-rating
        padding-top: 18px
        .title
          margin-left: 18px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
          font-weight: normal
        .rating-wrapper
          padding: 0 18px
          .rating-item
            position: relative
            margin-top: 16px
            padding: 16px 0
            border-1px(rgba(7, 17, 27, 0.1))
            .user, .time
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 12px
            .user
              position: absolute
              right: 0
              top: 0
              .name
                margin-right: 6px
              .img
                display: inline-block
                vertical-align: middle
                border-radius: 50%
            .time
              position: absolute
              left: 0
              top: 0
            .text
              font-size: 0
              line-height: 16px
              .icon-thumb_up, .icon-thumb_down
                display: inline-block
                line-height: 16px
                margin-right: 4px
                font-size: 12px
              .icon-thumb_up
                color rgb(0, 160, 220)
              .icon-thumb_down
                color rgb(147, 153, 159)
              .con
                display: inline-block
                font-size: 12px
                line-height: 16px
                color: rgb(7, 17, 27)
          .no-rating
            padding: 16px 0
            font-size: 12px
            color: rgb(147, 153, 159)
</style>
