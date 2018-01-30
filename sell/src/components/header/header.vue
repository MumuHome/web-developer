<template>
  <div class="header">
    <div class="header-content">
      <div class="img"><img width="64" height="64" :src="seller.avatar"></div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </div>
        <!--如果有seller.supports，则渲染这条标签 因为向后台请求数据是一个异步的过程，有微小时差
        本来seller里面没有任何元素，seller.supports为undefined，请求了数据才把他渲染出来-->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <!--点击事件触发detailShow，如果detailShow的值为true则为false，反之则为true-->
      <div v-if="seller.supports" class="support-count" @click="detailShow=detailShow?false:true">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="iconfont icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-bulletin" @click="detailShow=detailShow?false:true">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span><i
      class="iconfont icon-keyboard_arrow_right"></i>
    </div>
    <div class="header-bg">
      <img :src="seller.avatar">
    </div>
    <!--出现的浮层-->
    <!--Sticky footers：如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。-->
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{ item.description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <!--加一个关闭的动画-->
        <div class="detail-close" @click="detailShow=detailShow?false:true">
          <i class="close iconfont icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
//  引入star组件
  import star from '../star/star.vue'

  export default {
    props: {
//    接收父模板传入的数据
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    created() {
//    为了使seller.supports[0].type的数字能够与class对应
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
//    注册star组件
    components:{
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    color: white
    background: rgba(7, 17, 27, 0.5)
    overflow: hidden
    /*最终显示的class*/
    .header-content
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .img
        display: inline-block
        img
          border-radius: 2px
      .content
        vertical-align: top
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
            /*变成行内元素宽高才有效*/
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-img('brand')
            background-size: 100%
          .name
            display: inline-block
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          font-size: 12px
          line-height: 1
          margin-bottom: 10px
        .support
          font-size: 0
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 100%
            background-repeat: no-repeat
            /*把所有可能的图片都写出来*/
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            vertical-align: top
            font-size: 10px
            line-height: 12px
      .support-count
        position: absolute
        height: 10px
        right: 12px
        bottom: 18px
        background: rgba(0, 0, 0, 0.2)
        line-height: 10px
        border-radius: 14px
        padding: 7px 8px
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          font-size: 10px
          margin-left: 2px
          line-height: 10px
    .header-bulletin
      position: relative
      font-size: 10px
      line-height: 28px
      padding: 0 18px 0 12px
      height: 28px
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
      background: rgba(7, 17, 27, 0.1)
      .bulletin-title
        vertical-align: top
        margin-top: 8px
        display: inline-block
        width: 22px
        height: 12px
        bg-img('bulletin')
        background-size: 100%
      .bulletin-text
        vertical-align: top
        margin: 0 4px
      .icon-keyboard_arrow_right
        font-size: 10px
        position: absolute
        right: 12px
        top: 10px
        line-height: 1
    .header-bg
      position: absolute
      top: 0
      right: 0
      z-index: -1
      overflow: hidden
      width: 100%
      height: 100%
      /*加上10px模糊*/
      filter: blur(10px)
      img
        display: block
        width: 64%
        height: auto
        margin: 35px auto
    .detail
      position: fixed
      z-index: 99
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background :rgba(7,17,27,0.8)
      /*只有ios系统可以支持背景模糊属性*/
      backdrop-filter :blur(10px)
      /*添加动画*/
      /*进入和离开的过程*/
      &.fade-enter-active, &.fade-leave-active
        transition: opacity 0.3s;
      /*进入式过渡(entering transition)的开始状态 离开式过渡的结束状态*/
      &.fade-enter, &.fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */
        opacity: 0;
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          box-sizing: border-box
          padding: 64px 0
          .name
            text-align: center
            font-weight: 700
            font-size: 16px
            line-height: 16px
          .star-wrapper
            text-align :center
            margin-top:18px
            padding :2px 0
          .title
            display :flex
            width :80%
            margin:28px auto 24px auto
            .line
              flex:1
              position :relative
              top:-6px
              border-bottom :1px solid rgba(255,255,255,0.2)
            .text
              padding :0 12px
              font-size :14px
              font-weight :700
          .supports
            width :80%
            margin:0 auto
            .support-item
              padding :0 12px
              margin-bottom :12px
              font-size :0
              &:last-child
                margin-bottom :0
              .icon
                display :inline-block
                width :16px
                height :16px
                vertical-align :top
                margin-right :6px
                background-size :100%
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.invoice
                  bg-img('invoice_2')
                &.special
                  bg-img('special_2')
              .text
                font-size :12px
                line-height :16px

          .bulletin
            width :80%
            margin: 0 auto
            .content
              padding :0 12px
              line-height :24px
              font-size :12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
        .iconfont
          font-size: 32px
</style>
