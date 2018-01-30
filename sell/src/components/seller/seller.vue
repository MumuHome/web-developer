<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="m-title">起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="m-title">商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="m-title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="iconfont icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{ favoriteText }}</span>
        </div>
      </div>
      <split></split>
      <div class="detail">
        <h2 class="title">公告与活动</h2>
        <p class="bulletin border-1px">{{ seller.bulletin }}</p>
        <ul v-show="seller.supports && seller.supports.length>0">
          <li class="support border-1px" v-for="support in seller.supports">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="text">{{ support.description }}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="view">
        <h2 class="title">商家实景</h2>
        <div class="pic-wrapper" ref="picwrapper">
          <ul class="pic-list" ref="pic">
            <li v-for="pic in seller.pics" class="pic-item">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h2 class="title">商家信息</h2>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import BScroll from 'better-scroll'
  //  导出组件
  export default {
    props: {
      seller: {
        type: Object
      },
    },
    data() {
      return {
        favorite: false
      }
    },
    computed: {
      favoriteText() {
        if (this.favorite) {
          return '已收藏'
        }
        return '收藏'
      }
    },
//  监测seller的变化
    watch: {
      'seller'() {
        this._initScroll();
      }
    },
    ready() {
      this._initScroll();
    },
    created() {
      //    为了使seller.supports[0].type的数字能够与class对应
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      });
    },
    methods: {
//    图片滚动方法
      _initScroll() {
        if (this.seller.pics) {
//      计算ul的宽度
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.pic.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picscroll) {
              this.picscroll = new BScroll(this.$refs.picwrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picscroll.refresh();
            }
          })
        }
      },
      toggleFavorite() {
        this.favorite = !this.favorite
      }
    },
    components: {
      star: star,
      split: split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .title
        font-size: 14px
        line-height: 14px
        margin-bottom: 8px
        font-weight: normal
        color: rgb(7, 17, 27)
      .desc
        padding-bottom: 18px
        font-size: 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px
        .text
          line-height: 18px
          display: inline-block
          vertical-align: top
          font-size: 10px
          margin-right: 12px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right: none
          .m-title
            font-size: 10px
            color: rgb(147, 153, 159)
            margin-bottom: 10px
            font-weight: normal
            line-height: 10px
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px
      .favorite
        position: absolute
        right: 18px
        top: 18px
        text-align: center
        width :36px
        .icon-favorite
          display: block
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          margin-top: 4px
          display: block
          font-size: 10px
          line-height: 10px
          color: rgb(77, 85, 93)
    .detail
      padding: 18px 18px 0 18px
      .title
        font-size: 14px
        line-height: 14px
        margin-bottom: 8px
        font-weight: normal
        color: rgb(7, 17, 27)
      .bulletin
        margin-top: 8px
        padding: 0 12px 16px 12px
        font-size: 12px
        color: rgb(240, 20, 20)
        line-height: 24px
        border-1px(rgba(7, 17, 27, 0.1))
      .support
        padding: 16px 12px
        line-height: 16px
        font-size: 0
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 16px
          height: 16px
          margin-right: 6px
          background-size: 100%
          &.decrease
            bg-img('decrease_4')
          &.discount
            bg-img('discount_4')
          &.guarantee
            bg-img('guarantee_4')
          &.invoice
            bg-img('invoice_4')
          &.special
            bg-img('special_4')
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 16px
          color: rgb(7, 17, 27)
    .view
      padding: 18px
      .title
        font-size: 14px
        line-height: 14px
        margin-bottom: 12px
        font-weight: normal
        color: rgb(7, 17, 27)
      .pic-wrapper
        position: relative
        height: 90px
        top: 0
        left: 0
        width: 100%
        overflow: hidden
        /*当宽度超过屏幕宽度时，不折行*/
        white-space: nowrap
        .pic-list
          position: absolute
          top: 0
          left: 0
          height: 90px
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            &:last-child
              margin-right: 0
            img
              display: inline-block
              width: 120px
              height: 90px
    .info
      padding: 18px 18px 0 18px
      .title
        font-size: 14px
        line-height: 14px
        padding-bottom: 12px
        font-weight: normal
        border-1px(rgba(7, 17, 27, 0.1))
        color: rgb(7, 17, 27)
      .info-item
        font-size: 12px
        padding: 16px 12px
        line-height: 16px
        color: rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
</style>
