<template>
  <div class="live-my-head">
    <div class="live-my-img"></div>
    <div class="live-my-info">
      <p class="user-name">李伟坚</p>
      <p>
        <span>云窗会员</span>
        <span class="live-level">LV1</span>
      </p>
    </div>
    <div class="live-setting"></div>
    <div class="live-my-head-bg"></div>
  </div>
</template>

<script>

    export default {
      name: "LiveUserHead",
      data(){
        return {
          userInfo: {},
        };
      },
      created(){
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
