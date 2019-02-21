<template>
  <div class="live-index-container live-h100">
    <div class="header" id="top">
      <live-head></live-head>
      <div class="live-menu-bar" id="nav">
        <span class="active">我的关注</span>
      </div>
      <div class="live-header-bg"></div>
    </div>

    <div class="live-main swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide slidescroll">
          <div class="live-video-list live-main-container"  id="live-video-container">
            <div class="live-video-items">
              <div class="live-video-item" v-for="(item, key) in roomList" @click="goRoom(item)">
                <div class="live-video-cover">
                  <img :src="item.online_cover"/>
                </div>
                <div class="live-room-info">
                  <span class="live-video-user"><img :src="item.logo_img"/></span>
                  <div class="live-video-names">
                    <div class="live-video-name-info">
                      <span class="live-video-name">{{item.title}}</span>
                    </div>
                  </div>
                  <span class="live-room-start">{{item.click_num}}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <live-footer :findex="findex"></live-footer>
  </div>
</template>

<script>
  import LiveHead from './LiveHead'
  import LiveFooter from './LiveFooter'
    export default {
      name: "LiveStart",
      components: {LiveHead, LiveFooter},
      data(){
        return {
          findex: 'user',
          roomList: [],
          loadding: false,
        }
      },
      created(){
        this.getRoomList();
      },
      methods:{
        getRoomList(){
          var that = this;
          if(that.loadding) {
            return false;
          }

          that.loadding = true;
          var formdata = new URLSearchParams();
          that.axiosPost("/client/room-start", formdata).then((res) => {
            that.loadding = false;
            if(res.status == 200){
              that.roomList = res.data;
            } else {
              that.$vux.alert.show({
                title: '温馨提示',
                content: res.message});
            }
          }, (err) => {
            that.$vux.loading.hide();
          });
        },
        goRoom(item) {
          if(this.DEBUG == 1){
            this.$router.replace({path: '/room', query:{room_id:item.room_id, from:"groupmessage", isappinstalled:0}})
          } else {
            window.location.replace(location.protocol + '//' + document.domain+'/front/#/room?room_id='+item.room_id)
          }
        },
      }
    }
</script>

<style scoped>
  .live-video-list .live-video-items{margin-top: 0; margin-bottom: 1rem;}
</style>
