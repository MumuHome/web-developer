<!--定义一个星星的组件-->
<!--starType定义星星的尺寸-->
<template>
  <div class="star" :class="starType">
    <!--star-item定义星星的样式 全星 半星 没有星-->
    <!--items为星星的个数 item为每个星星的样式-->
    <span v-for="item in items" :class="item" class="star-item"></span>
  </div>
</template>

<script>
//  定义星星的长度
  const length = 5;
//  定义class的类型 全星 半星 没有星
  const cla_on = 'on';
  const cla_half = 'half';
  const cla_off = 'off';

  export default {
    props:{
//      接收size尺寸 24、36、48等
      size:{
        type:Number
      },
//      接收星星个数
      score:{
        type:Number
      }
    },
    computed:{
      starType() {
//        通过star-和数据类型拼出一个class
        return 'star-'+this.size;
      },
      items() {
        let result = [];
//        通过分数算出class
        let score = Math.floor(this.score * 2)/2;
//        结果对1取整 看看结果是不是0
        let hasDecimal = score % 1 !== 0;
//        取得整数部分
        let integer = Math.floor(score);
        for ( let i = 0 ; i<integer ; i++ )
        {
//          放多少个全星
          result.push(cla_on);
        }
        if (hasDecimal)
        {
//          放多少个半星
          result.push(cla_half);
        }
//        当result的长度小于length的话 补齐灰色的星星
//        while (条件) { 需要执行的代码 }
        while (result.length<length)
        {
          result.push(cla_off);
        }
        return result;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*引入2倍和3倍样式*/
  @import '../../common/stylus/mixin.styl'

  .star
    font-size :0
    .star-item
      display :inline-block
      background-repeat :no-repeat
    /*star有三个尺寸*/
    &.star-48
      .star-item
        width :20px
        height :20px
        margin-right :22px
        background-size :100%
        &:last-child
          margin-right :0
//        引入定义2倍和3倍
        &.on
          bg-img('star48_on')
        &.off
          bg-img('star48_off')
        &.half
          bg-img('star48_half')
    &.star-36
      .star-item
        width :15px
        height :15px
        margin-right :6px
        background-size :100%
        &:last-child
          margin-right :0
        &.on
          bg-img('star36_on')
        &.off
          bg-img('star36_off')
        &.half
          bg-img('star36_half')
    &.star-24
      .star-item
        width :10px
        height :10px
        margin-right :3px
        background-size :100%
        &:last-child
          margin-right :0
        &.on
          bg-img('star24_on')
        &.off
          bg-img('star24_off')
        &.half
          bg-img('star24_half')

</style>
