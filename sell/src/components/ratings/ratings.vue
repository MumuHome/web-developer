<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="ratings-wrapper">
        <rating-select
          @changetype="updateType"
          @changetcontent="updateContent"
          :select-type="selectType"
          :only-content="onlyContent"
          :desc="desc"
          :ratings="ratings">
        </rating-select>
        <div class="ratings-list">
          <ul>
            <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px">
              <div class="avatar">
                <img :src="rating.avatar" width="100%">
              </div>
              <div class="content">
                <h2 class="name">{{ rating.username }}</h2>
                <p class="time">{{ rating.rateTime | formatDate }}</p>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                </div>
                <p class="text">{{ rating.text }}</p>
                <div class="recomend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up iconfont" v-show="rating.rateType===0"></span>
                  <span class="item" v-for="item in rating.recommend">{{ item }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import BScroll from 'better-scroll'
  //  引入formatDate方法
  import {formatDate} from '../../common/js/date';
  const ALL = 2;
  const ERR_OK = 0;
  //  导出组件
  export default {
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return {
        ratings:[],
        showFlag:false,
        selectType:ALL,
        onlyContent:true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    methods:{
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
    created(){
//      通过get请求从后台拿到ratings数据
      this.$http.get('/api/ratings').then((response)=>{
        response = response.body;
        if (response.errno === ERR_OK)
        {
          this.ratings = response.data;
        };
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        })
      })
    },
    //    处理时间
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components:{
      star:star,
      split:split,
      ratingSelect:ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/base.styl";
  .ratings
    position :absolute
    top:174px
    bottom :0
    left: 0
    width :100%
    overflow :hidden
    .overview
      display :flex
      padding :18px 0
      .overview-left
        flex: 0 0 137px
        width :137px
        padding :6px 0
        text-align :center
        border-right:1px solid rgba(7,17,27,0.1)
        .score
          margin-bottom :6px
          line-height :28px
          font-size :24px
          color :rgb(255,153,0)
          font-weight :normal
        .title
          font-size :12px
          line-height :12px
          color :rgb(7,17,27)
          margin-bottom :8px
          font-weight :normal
        .rank
          line-height :10px
          font-size :10px
          color :rgb(147,153,159)
      .overview-right
        padding-top:6px
        flex:1
        padding-left :24px
        .score-wrapper
          margin-bottom :8px
          font-size :0
          font-weight :normal
          .title
            display :inline-block
            vertical-align :top
            font-size :12px
            color :rgb(7,17,27)
            line-height :18px
          .star
            display :inline-block
            vertical-align :middle
            margin:0 12px
          .score
            display :inline-block
            vertical-align :top
            color :rgb(255,153,0)
            line-height :18px
            font-size :12px
        .delivery-wrapper
          font-size :0
          line-height :18px
          .title
            font-size :12px
            color :rgb(7,17,27)
            font-weight :normal
          .delivery
            font-size :12px
            margin-left :12px
            color :rgb(147,153,159)
    .ratings-list
      /*padding-top :18px*/
      .rating-item
        display :flex
        padding :18px 0 14px 0
        margin:0 18px
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex :0 0 28px
          padding-right :12px
          img
            width :100%
            border-radius :50%
        .content
          .name
            font-size :10px
            line-height :12px
            color : rgb(7,17,27)
            font-weight :normal
          .time
            position :absolute
            font-size :10px
            top: 18px
            right:0
            color :rgb(147,153,159)
          .star-wrapper
            margin-top :4px
            font-size :0
            .star
              display :inline-block
              vertical-align :top
              margin-right :6px
            .delivery
              display :inline-block
              vertical-align :top
              font-size :10px
              line-height :12px
              color :rgb(147,153,159)
          .text
            margin-top :6px
            font-size :12px
            color :rgb(7,17,27)
            line-height :18px
            font-weight :normal
          .recomend
            margin-top :8px
            font-size :0
            .icon-thumb_up
              font-size :12px
              color :rgb(0,160,220)
              margin-right :8px
              line-height :16px
            .item
              display :inline-block
              font-size :9px
              line-height :16px
              color :rgb(147,153,159)
              padding :0 6px
              margin :0 8px 4px 0
              border-radius :2px
              border:1px solid rgba(7,17,27,0.1)
</style>
