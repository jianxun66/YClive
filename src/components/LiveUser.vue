<template>
  <div class="live-index-container live-h100">
    <live-user-head></live-user-head>
    <div class="live-my-main">
      <div class="live-user-item">
        <ul>
          <li :class="uitem == 1 ? 'active' : ''" @click="goDetail(1)">
            <i class="live-my-icon live-icon-myorder"></i>
            我的订单
          </li>
          <li :class="uitem == 2 ? 'active' : ''" @click="goDetail(2)">
            <i class="live-my-icon live-icon-myaddr"></i>
            我的地址
          </li>
          <li :class="uitem == 3 ? 'active' : ''" @click="goDetail(3)">
            <i class="live-my-icon live-icon-mystart"></i>
            我的关注
          </li>
          <li :class="uitem == 4 ? 'active' : ''" @click="goDetail(4)" >
            <i class="live-my-icon live-icon-apply"></i>
            开通直播
          </li>
        </ul>
      </div>
      <div class="live-user-item live-sys-item">
        <ul>
          <li :class="uitem == 5 ? 'active' : ''" @click="goDetail(5)">
            <i class="live-my-icon live-icon-cooperate"></i>
            我要合作
          </li>
          <li :class="uitem == 6 ? 'active' : ''" @click="goDetail(6)">
            <i class="live-my-icon live-icon-service"></i>
            客服中心
          </li>
        </ul>
      </div>
    </div>
    <live-footer :findex="findex"></live-footer>
  </div>
</template>

<script>
  import LiveUserHead from './LiveUserHead'
  import LiveFooter from './LiveFooter'
    export default {
      name: "LiveUser",
      components: {LiveUserHead, LiveFooter},
      data(){
          return {
            'findex': 'user',
            'uitem': 0,
          }
      },
      created(){

      },
      methods:{
        goDetail(utype){
          this.uitem = utype;
          switch (utype) {
            case 1: //订单列表
              this.$router.push({path: '/orders'});
              break;
            case 2: //地址列表
              this.$router.push({path: '/addr'});
              break;
            case 3: //我的关注
              this.$router.push({path: '/mystart'});
              break;
            case 4: //开通直播
              break;
            case 5: //我要合作
              break;
            case 6: //客服中心
              break;
          }
        }
      }
    }
</script>

<style scoped>

</style>
