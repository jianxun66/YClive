<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide (){
    return {
      reloadPage:this.reloadPage
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reloadPage (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
