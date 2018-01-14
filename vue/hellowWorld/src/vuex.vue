<template>
  <div id="app">
    <h1>hello Vuex</h1>
    <p>{{ $store.state.count }} - {{ count }}</p>
    <!--commit来访问 触发状态 -->
    <p><button @click="$store.commit('add',10)">+</button></p>
    <!--利用mapMutations来改变count的值-->
    <p><button @click="cut">-</button></p>
  </div>
</template>
<script>
//  从外部引入状态 与 状态改变
  import { mapState,mapMutations,mapGetters } from 'vuex'
  export default {
    name:'app',
//    data (){
//      return {
//        count:0
//      }
//    },
//    计算
//    computed:{
//      count(){
//        return this.$store.state.count +1;
//      }
//    }
    computed:{
      ...mapState([
        'count'
      ]),
//      count(){
//        return this.$store.getters.count
//      }
      ...mapGetters([
        'count'
      ])
    },
    methods:mapMutations([
      'add',
      'cut'
    ])

  }
</script>
