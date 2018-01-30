<template>
  <div class="goods">
    <!--vue中获取元素的dom ref="menuWrapper"-->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul v-if="goods">
        <!--当计算属性中currentIndex===当前索引值时 则添加cuttent类  当前索引值2.0版本有改动-->
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="text border-1px">
            <span v-show=" item.type>0 " class="icon" :class="classMap[item.type]"></span><span>{{ item.name }}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <!--为了获得他的高度 定义一个class food-list-hook 表示是被js选择的样式，并没有实际样式-->
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <!--点选每个food层时，food被传入-->
            <li @click="selectFood(food)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="100%" height="100%">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p v-show="food.description" class="desc">{{ food.description }}</p>
                <!--销售情况-->
                <div class="extra">
                  <span>月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="new">¥{{ food.price }}</span>
                  <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cart-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--传入数据selectFood并在data中定义 selectFood中放置用click事件触发时点选的food对象-->
    <!--父组件调用子组件方法 先ref获取子组件dom-->
    <food :food="selectedFood" ref="fooditem"></food>
    <!--向子组件传入两个参数seller.deliveryPrice配送费及seller.minPrice起送费以及定义的函数selectFoods-->
    <shop-car :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" @cartadd="cartadd" rel="shopcart"></shop-car>
  </div>
</template>

<script type="text/ecmascript-6">
//  引入安装的better-scroll
  import BScroll from 'better-scroll';
//  引入购物车组件
  import shopCar from '../shopCar/shopCar.vue';
//  引入购物车控制按钮
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
//  引入食物组件
  import food from '../food/food.vue'
  const err_ok = 0;
//  导出组件
export default {
  props:{
//    传入seller
    seller:{
      type:Object
    }
  },
  data(){
//    后续可能会操作goods，一些状态要反映在dom上面，每一个元素被添加了getter和setter
//    一开始goods为空，后台通过vue-resource获取
    return {
      goods:[],
      listHeight:[],
      scrollY:0,
      selectedFood:{}
    }
  },
  computed:{
//    左侧本来应该在哪
    currentIndex(){
//      注意：当遍历到最后一个时，height2为undefined，不符合
      for (let i=0 ; i<this.listHeight.length-1 ; i++)
      {
//        获得了一个区间的范围
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];

        if ( this.scrollY>=height1 && this.scrollY<height2 )
        {
          return i;
        }
      }
//      当this.listHeight.length没有的时候，那么则返回0
      return 0;
    },
    selectFoods(){
      let foods = [];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
//          如果food.count>0说明被选过了
          if (food.count>0)
          {
//            把这一项加在foods数组中
            foods.push(food);
          }
        })
      });
      return foods;
    }
  },
  created(){
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then(response => {
      response = response.body;
      if (response.errno === err_ok)
      {
        this.goods = response.data;
//        因为它在计算高度的时候，当我们去初始化这个BScroll的时候，它的DOM在vue更改数据的时候会跟着做映射，
//        但实际上vue在更新这个DOM的时候是一个异步的，在回调里面更新，所以这里虽然改变了数据，但是DOM仍然没有变化
        this.$nextTick(() => {
           this._initScroll();
//           定义一个计算每个模块高度的方法
           this._calculateHeight();
        });
      }
    });
  },
  methods:{
    selectMenu(index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
//      滚动到el对应的数组的值上
      this.foodsScroll.scrollToElement(el,300);
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper,{
//        因为BScroll中给click事件阻止冒泡，因此需要在此声明 但是此时点击一次出现了两个点击
        click:true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
//        告诉我们滚动的位置
        click:true,
        probeType:3
      });
//      通过这个对象监听事件，传入参数pos（位置）
      this.foodsScroll.on('scroll',(pos)=>{
//      math.round()将一个整数四舍五入为最接近的数 math.abs将一个数取绝对值转化成正值
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight(){
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for ( let i=0 ; i<foodList.length ; i++ )
      {
        let item = foodList[i];
        height += item.clientHeight;
//        this.listHeight是一个区间数组，表示每个区间对应的高度为多少
        this.listHeight.push(height);
      }
    },
//    定义增加小球的动画逻辑
    cartadd(target){
//      this._drop(target);
//      访问购物车子组件，调用drop方法，同时把target传入
      this.$refs.shopcart.drop(target);
    },
//    点击选择了food模块之后
    selectFood(food){
      this.selectedFood = food;
//      获取子组件dom后，执行show函数
      this.$refs.fooditem.show();

    }
  },
  components:{
//    注册购物车组件
    shopCar:shopCar,
    cartControl:cartcontrol,
    food:food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    /*这个地方只能用absolute不用relative*/
    position:absolute
    width: 100%
    display :flex
    top :174px
    bottom :46px
    /*height :100%*/
    /*overflow :hidden*/
    .menu-wrapper
      flex:0 0 80px
      /*要写宽度，不然在安卓下有兼容性问题*/
      width :80px
      background :#f3f5f7
      height :100%
      overflow :hidden
      .menu-item
        height :56px
        width :100%
        display :table
        box-sizing :border-box
        font-size :0
        padding :0 12px
        &.current
          position :relative
          margin-top :-1px
          z-index :10
          background :white
          font-weight :normal
          .text
            border-none()
        .text
          vertical-align :middle
          display :table-cell
          width :100%
          font-size :12px
          line-height :14px
          color: rgb(24,20,20)
          border-1px(rgba(7,17,27,0.1))
          .icon
            display :inline-block
            width :14px
            height :14px
            vertical-align :top
            margin-right :2px
            background-size :100%
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
    .foods-wrapper
      flex :1
      box-sizing :box-sizing
      height :100%
      overflow :hidden
      .food-list
        .title
          padding-left :14px
          box-sizing :border-box
          height :26px
          border-left :2px solid #d9dde1
          line-height :26px
          font-size :12px
          color :rgb(147,153,159)
          background :#f3f5f7
        .food-item
          display :flex
          padding :18px 0
          margin: 0 18px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          /*左侧宽度固定，右侧自适应*/
          .icon
            flex: 0 0 57px
            width :57px
            height :57px
            margin-right :10px
          .content
            flex :1
            font-size :0
            .name
              margin:2px 0 8px 0
              height :14px
              line-height :14px
              font-weight :normal
              font-size :14px
              color :rgb(7,17,27)
            .desc,.extra
              margin-bottom :8px
              font-size :10px
              line-height :10px
              color :rgb(147,153,159)
              span
                margin-right :4px
            .desc
              line-height :12px
            .price
              font-weight :700
              line-height :14px
              .new
                margin-right :8px
                font-size :14px
                color :rgb(240,20,20)
              .old
                font-size :10px
                text-decoration :line-through
                color :rgb(147,153,159)
            .cart-wrapper
              position :absolute
              right: 0
              bottom :12px
</style>
