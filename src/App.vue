<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data:function(){
    return {
      options:{
        sectionsColor:["red","green","blue"],
        navigation:true
      },
      value:''
    }
  },
  mounted:function(){
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#test{
  background-color: brown;
}
@media screen and (max-width: 980px) {
  #test{
    background-color: blue;
  }
}
</style>
