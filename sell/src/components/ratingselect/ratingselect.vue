<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <!--设置样式 传入参数-->
      <span @click="select(2)" class="block positive" :class="{'active':this.type===2}">{{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active':this.type===0}">{{ desc.positive }}<span class="count">{{ positives.length }}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':this.type===1}">{{ desc.negative }}<span class="count">{{ negatives.length }}</span></span>
    </div>
    <!--点击时是相互切换的-->
    <div @click="toggleContent" class="switch" :class="{'active':onlycontent===true}">
      <span class="icon-check_circle iconfont"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //  定义好评为0
  const POSITIVE = 0;
  //  差评为1
  const NEGATIVE = 1;
  //  所有评价为0
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
//        默认定义为all 所有
        default: ALL
      },
//      选择有内容的评价？
      onlyContent: {
        type: Boolean,
        default: false
      },
//      评论选项卡描述
      desc:{
        type:Object,
        default() {
          return {
            all:'全部',
            positive:'满意',
            negative:'不满意'
          }
        }
      }
    },
    data(){
      return {
//        因为父组件传过来的值子组件不能直接修改，因此重新初始化
        type:2,
        onlycontent:false
      }
    },
    created(){
      this.type = this.selectType;
      this.onlycontent = this.onlyContent;
    },
    computed:{
      positives(){
//        所有好评
        return this.ratings.filter((rating)=>{
//          对所有的ratings过滤 返回rating.rateType为0的数组
          return rating.rateType===POSITIVE;
        })
      },
      negatives(){
//        所有差评
        return this.ratings.filter((rating)=>{
//          对所有的ratings过滤 返回rating.rateType为2的数组
          return rating.rateType===NEGATIVE;
        })
      },
    },
    methods:{
      select(type){
//        把他的筛选类型设置为传入的type
        this.type = type;
//        通知父组件type已经改变 用父组件中的自定义事件接收
        this.$emit('changetype',type);
      },
      toggleContent(){
        this.onlycontent = !this.onlycontent;
        this.$emit('changetcontent',this.onlycontent);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/base.styl";
  .ratingselect
    .rating-type
      padding :18px 0
      margin :0 18px
      border-1px(rgba(7,17,27,0.1))
      font-size :0
      .block
        display :inline-block
        font-size :12px
        padding :8px 12px
        border-radius :1px
        margin-right :8px
        color :rgb(77,85,93)
        .count
          margin-left :2px
          font-size :8px
        &.positive
          background :rgba(0,160,220,0.2)
          &.active
            color :white
            background :rgb(0,160,220)
        &.negative
          background :rgba(77,85,93,0.2)
          &.active
            color :white
            background :rgb(77,85,93)
    .switch
      padding :12px 18px
      line-height :24px
      color :rgb(147,157,159)
      border-1px(rgba(7,17,27,0.1))
      font-size :0
      &.active
        .icon-check_circle
          color :#00c850
      .icon-check_circle
        display :inline-block
        vertical-align :top
        font-size :24px
        line-height :24px
      .text
        display :inline-block
        line-height :24px
        font-size :12px
</style>
