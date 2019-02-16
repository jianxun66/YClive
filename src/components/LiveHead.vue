<template>
    <div class="live-head-container">
      <div class="search-bar">
        <div class="user-head" v-if="headImg" :style="{backgroundImage:'url(' + headImg +')'}"></div>
        <div class="user-head" v-else ></div>
        <div class="live-search-box">
          <div class="search-box">
            <i class="live-search-icon"></i>
            <input class="search-input" placeholder="刘老头米店" v-model.trim="searchStr"/>
            <i class="live-search-next" @click="searchRoom"></i>
          </div>
        </div>
        <div class="yclive-home" @click="goHome"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "LiveHead",
      data(){
        return {
          searchStr: '',
          headImg: '',
        }
      },
      props:['room_name'],
      created(){
        if(this.room_name){
          this.searchStr = this.room_name;
        }
        var uimg = localStorage.getItem('uimg');
        if( uimg && typeof(uimg) != "undefined" ){
          this.headImg = uimg;
        }
      },
      methods:{
        searchRoom(){
          if(this.searchStr){
            this.$router.replace({path: '/', query:{room_name: this.searchStr}})
            this.$emit('searchRoom');
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '请填写直播间名称'
            });
          }
        },
        goHome(){
          this.$router.replace({path: '/'});
        },
      }
    }
</script>

<style scoped>

</style>
