<template>
    <div class="live-head-container">
      <div class="search-bar">
        <div class="user-head"></div>
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
        }
      },
      props:['room_name'],
      created(){
        if(this.room_name){
          this.searchStr = this.room_name;
        }
      },
      methods:{
        searchRoom(){
          if(this.searchStr){
            this.$router.push({path: '/indexNew', query:{room_name: this.searchStr}})
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: '请填写直播间名称'
            });
          }
        },
        goHome(){
          this.$router.push({path: '/indexNew'});
        },
      }
    }
</script>

<style scoped>

</style>
