<template>
  <div class="live-my-head">
    <div class="live-my-img" v-if="headImg" :style="{backgroundImage:'url(' + headImg +')'}" ></div>
    <div class="live-my-img"  v-else></div>
    <div class="live-my-info">
      <p class="user-name">{{userName}}</p>
      <p>
        <span>云窗会员</span>
        <span class="live-level">LV1</span>
      </p>
    </div>
    <!--<div class="live-setting"></div>-->
    <div class="live-my-head-bg"></div>
  </div>
</template>

<script>

    export default {
      name: "LiveUserHead",
      data(){
        return {
          userInfo: {},
          headImg:'../../static/images/defaultUser.png',
          userName: '云窗在线',
        };
      },
      created(){
        var uimg = localStorage.getItem('uimg');
        if( uimg && typeof(uimg) != "undefined" ){
          this.headImg = uimg;
        }

        var uname = localStorage.getItem('uname');
        if(uname && typeof(uname) != "undefined" ){
          this.userName = uname;
        }

        this.getData();
      },
      methods:{
        getData(){

        }
      }

    }
</script>

<style scoped>

</style>
