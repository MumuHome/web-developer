<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <hello></hello>
  </div>
</template>

<script>
//  引入hello模块
import hello from './components/HelloWorld.vue'
export default {
  name: 'app',
  components:{hello}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
