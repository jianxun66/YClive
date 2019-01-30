<template>
    <div class="live-index-container live-h100">
      <div class="header" id="top">
        <live-head></live-head>
        <div class="live-menu-bar" id="nav">
          <span @click="goHome">直播</span>
          <span class="active">精彩短片</span>
        </div>
        <div class="live-header-bg"></div>
      </div>
      <div class="live-main swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide slidescroll">
            <div class="live-video-list live-main-container"  id="live-video-container">
              <div class="live-video-head">
                <div class="live-video-menu">
                  <span class="active">短片</span>
                  <span>精彩截图</span>
                </div>
              </div>
              <div class="live-video-times">
                <span>实时更新</span>
              </div>
              <div class="live-video-items">
                <div class="live-video-item" v-for="(item, key) in videoList" :key="key">
                  <div class="live-video-cover">
                    <img :src="item.cover_img"/>
                  </div>
                  <div class="live-room-info">
                    <span class="live-video-user">
                      <img :src="item.logo_img"/>
                    </span>
                    <div class="live-video-names">
                      <div class="live-video-name-info">
                        <span class="live-video-name">{{item.title}}</span>
                      </div>
                    </div>
                    <span class="live-video-start">{{item.click_num}}</span>
                    <span class="live-video-len">{{item.video_length}}</span>
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
    name: "LiveVideo",
    components: {LiveHead, LiveFooter},
    data(){
      return {
        pageSize: 1,
        findex: 'video',
        videoList:[],
        loadding: false,
        videoEnd: false,
      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleVideoScroll, true);
    },
    destroyed(){
      window.removeEventListener('scroll',this.handleVideoScroll, true)
    },
    created(){
      this.getVideo();
    },
    methods:{
      getVideo(){
        var that = this;
        if(that.loadding) {
          return false;
        }

        that.$vux.loading.show({
          text: '加载中~'
        })

        that.loadding = true;
        var formdata = new FormData();
        formdata.append('page', that.pageSize);
        that.axiosPost("/live/video", formdata).then((res) => {
          that.loadding = false;
          that.$vux.loading.hide();
          if(res.status == 200){
            if(res.data.length > 0) {
              res.data.forEach((v, k) => {
                that.videoList.push(v);
              })
              that.pageSize++;
            } else {
              that.videoEnd = true;
            }
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },
      // 滑动监听
      handleVideoScroll(){
        var that = this;
        if (document.getElementById("live-video-container")) {
          var clientHeight = document.getElementById("live-video-container").clientHeight;
          // 设备/屏幕高度
          var scrollObj = document.getElementById("live-video-container"); // 滚动区域
          var scrollTop = scrollObj.scrollTop; // div 到头部的距离
          var scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
          if((clientHeight + scrollTop + 1) >= scrollHeight && !that.loadding && !that.roomEnd){
            this.getVideo();
          }
        }

      },
      goHome(){
        this.$router.push({path: '/indexNew'});
      }
    }
  }
</script>

<style scoped>

</style>
