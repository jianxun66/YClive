<template>
    <div class="live-index-container live-h100">
      <div class="header" id="top">
        <live-head></live-head>
        <div class="live-menu-bar" id="nav">
          <!--<span @click="goHome">直播</span>-->
          <span class="active">精彩短片</span>
        </div>
        <div class="live-header-bg"></div>
      </div>
      <div class="live-main swiper-container">
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
                <div class="video_item">
                  <div class="prism-player-video"  :id="item.vno" @click="clickNum(item)" :style="{display: item.status == 1 ? 'none' : 'block', }"></div>
                </div>
                <img :src="item.cover_img" v-if="item.status == 1" @click="playervideo(item.vno, item.vurl, item)"/>
                <div v-if="item.status == 1" class="play-btn" @click="playervideo(item.vno, item.vurl, item)"></div>
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
      <live-footer :findex="findex"></live-footer>
      <remote-script src="https://g.alicdn.com/de/prismplayer/2.7.1/aliplayer-min.js"></remote-script>
    </div>
</template>

<script>
  import importJs from '../../static/js/importJs'
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
        player:{},
        video_height : 0,
        aliplayer_config:{
          id: '',
          width: '100%',
          height:'195px',
          autoplay: true,
          playsinline:true,
          showBuffer:true,
          isLive:true,
          x5_type: true,
          //支持播放地址播放,此播放优先级最高
          source : '',
          cover: "",
          skinLayout:[
            {name: "bigPlayButton", align: "cc", x: 30, y: 80},
            {name: "H5Loading", align: "cc"},
            //{name: "errorDisplay", align: "tlabs", x: 0, y: 0},
            //{name: "infoDisplay"},
            {name:"tooltip", align:"blabs",x: 0, y: 56},
            {name: "thumbnail"},
            {
              name: "controlBar", align: "blabs", x: 0, y: 0,
              children: [
                {name:"liveDisplay", align:"tlabs", x: 15, y:6},
                {name: "progress", align: "blabs", x: 0, y: 44},
                {name: "playButton", align: "tl", x: 15, y: 12},
                {name: "timeDisplay", align: "tl", x: 10, y: 7},
                {name: "fullScreenButton", align: "tr", x: 10, y: 12},
                //{name:"subtitle", align:"tr",x:15, y:12},
                //{name:"setting", align:"tr",x:15, y:12},
                {name: "volume", align: "tr", x: 5, y: 10}

              ]
            }
          ]
        },

      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleVideoScroll, true);
    },
    destroyed(){
      window.removeEventListener('scroll',this.handleVideoScroll, true)
    },
    created(){
      var width = document.body.clientWidth - 15;
      var height = (width * 9 ) / 16;
      this.video_height = height+ "px";
      this.aliplayer_config.height = this.video_height;

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
        var formdata = new URLSearchParams();
        formdata.append('page', that.pageSize);
        that.axiosPost("/live/video", formdata).then((res) => {
          that.loadding = false;
          that.$vux.loading.hide();
          if(res.status == 200){
            if(res.data.length > 0) {
              res.data.forEach((v, k) => {
                v.status = 1;
                v.vno = "J_prismPlayer"+v.id;
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
        this.$router.replace({path: '/'});
      },
      playervideo(id, source, item){
        item.status = 0;
        if(this.player.length > 0){
          this.player.dispose() //销毁
        }
        var that = this;
        that.aliplayer_config.source = source;
        that.aliplayer_config.id = id
        this.player =  new Aliplayer(that.aliplayer_config);
        this.clickNum(item);
      },

      clickNum(item){
        var that = this;
        item.click ++;

        if(that.subStatus){
          return false;
        }
        var formdata = new URLSearchParams();
        formdata.append('cid', item.id);
        formdata.append('ctype', 'video');

        that.subStatus = true;
        that.axiosPost("/room/click-num", formdata).then((res) => {
          that.subStatus = false;
          if(res.status == 200){

          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message
            });
          }
        }, (err) => {
          that.subStatus = false;
        });
      },
    }
  }
</script>

<style scoped>

</style>
