<template>
  <div class="room-info" v-wechat-title="$route.meta.title">
    <div class="room-header">
      <div class="wiper-container room-banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, key) in bannerList" :key="key">
            <img @click="golinks(item)" @click.stop :src="item['cover']">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="live-room-main">
      <!-- Swiper -->
      <div class="swiper-container gallery-thumbs">
        <div class="swiper-wrapper tabMenu">
          <div class="swiper-slide cur" @click="switchContent(0)">班级直播</div>
          <div class="swiper-slide" @click="switchContent(1)">班级视频</div>
          <div class="swiper-slide" @click="switchContent(2)">家庭视频</div>
        </div>
      </div>
      <div class="live-room-content">
        <div class="swiper-container gallery-top">
          <div class="swiper-wrapper tabCon">

            <!--课堂直播-->
            <div class="swiper-slide con">
              <div class="swiper-slide slidescroll room-detail-info">
                <!--滑动内容-->
                <h2 class="tit videoIcon">直播</h2>
                <!--第一个镜头-->
                <div class="lens-list">
                  <div class="videoList">
                    <div class="video" @click="imgCover">
                      <div class="prism-player " id="J_prismPlayer"></div>
                      <div v-bind:class=" (play_status == 1 && playing === false ) || playinit === true ? 'videoCover online_video' : 'videoCover outline_video'" >
                        <img :src="VideoCoverImg">
                      </div>
                      <!--<div class="logo"><img src="../../../static/images/logo.png"></div>-->
                    </div>
                    <dl class="live-1"  v-for="len in lens" @click="switchVideo(len, 1)">
                      <dt><img :src="len.cover_img"></dt>
                      <dd>{{len.name}}</dd>
                    </dl>
                  </div>
                </div>


                <div class="room_content" v-html="roomBasic.content">
                  {{roomBasic.content}}
                </div>
                <!--滑动内容-->
              </div>
            </div>
            <!--课堂直播-->
            <!--班级风采-->
            <div class="swiper-slide con">
              <div class="swiper-slide slidescroll room-video-list">
                <h2 class="tit videoIcon">短视频</h2>
                <div class="filmList">
                  <div class="video_info" v-for=" item in videoList" ref="videoStyle" v-if="item.sort_num <= 100">
                    <dl>
                      <dt class="video_title">
                        <div class="video_item">
                          <div class="prism-player-video"  :id="item.vno" @click="clickNum(item)" :style="{display: item.status == 1 ? 'none' : 'block', }"></div>
                        </div>
                        <img :src="item.pic" v-if="item.status == 1" @click="playervideo(item.vno, item.vurl, item)" >
                        <div v-if="item.status == 1" class="play-btn" @click="playervideo(item.vno, item.vurl, item)"></div>
                      </dt>
                      <dd>
                        <h3>{{item.name}}</h3>
                        <p>
                          <span>片长：{{item.vlength}}&nbsp;热度：{{item.click}}</span>
                          <span>
                          <a href="javascript:void(0);"   :class="[item.start ? 'zanIcon2' : 'zanIcon']">精选</a>
                            <!--<a href="javascript:void(0);" class="replyIcon">回复</a>-->
                      </span>
                        </p>
                      </dd>
                    </dl>
                  </div>
                </div>

              </div>
            </div>
            <!--班级风采-->

            <!--家庭时光-->
            <div class="swiper-slide con">
              <div class="swiper-slide slidescroll room-video-list">
                <h2 class="tit videoIcon">短视频</h2>
                <div class="filmList">
                  <div class="video_info" v-for=" item in videoList" ref="videoStyle" v-if="item.sort_num > 100">
                    <dl>
                      <dt class="video_title">
                        <div class="video_item">
                          <div class="prism-player-video"  :id="item.vno" @click="clickNum(item)" :style="{display: item.status == 1 ? 'none' : 'block', }"></div>
                        </div>
                        <img :src="item.pic" v-if="item.status == 1" @click="playervideo(item.vno, item.vurl, item)" >
                        <div v-if="item.status == 1" class="play-btn" @click="playervideo(item.vno, item.vurl, item)"></div>
                      </dt>
                      <dd>
                        <h3>{{item.name}}</h3>
                        <p>
                          <span>片长：{{item.vlength}}&nbsp;热度：{{item.click}}</span>
                          <span>
                          <a href="javascript:void(0);"   :class="[item.start ? 'zanIcon2' : 'zanIcon']">精选</a>
                            <!--<a href="javascript:void(0);" class="replyIcon">回复</a>-->
                      </span>
                        </p>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <!--家庭时光-->
          </div>
        </div>
      </div>
    </div>


    <div class="liveHome" v-if="showCover" @click="hideCoverImg"><img :src="roomBasic.cover_img"></div>
    <remote-script src="https://g.alicdn.com/de/prismplayer/2.7.1/aliplayer-min.js"></remote-script>
  </div>
</template>


<script>
  import importJs from '../../../static/js/importJs'
  import RoomVideo from "../RoomVideo"
  import Product from "../Product"
  import Comments from "../Comment"
  export default {
    name: 'educate',
    components:{
      "room-video": RoomVideo,
      "Product": Product,
      "Comments": Comments,
    },
    data () {
      return {
        bannerList: [],
        contabObj: {},
        contentSwiper: {},
        currentVideo : {},
        playing: false,
        playinit: false,
        VideoCoverImg: "",
        showCover: false,
        galleryTop: {},
        play_status : 1,
        room_id: 0,
        room_info: {},
        lens:{},
        player: {},
        player2: {},
        aliplayer_config: {
          id: 'J_prismPlayer',
          width: '100%',
          height: '240px',
          autoplay: false,
          playsinline: true,
          showBuffer: true,
          isLive: true,
          x5_type: true,
          //支持播放地址播放,此播放优先级最高
          source: '',
          cover: '',
          rePlay: false,
          preload: false,
          skinLayout: [
            {name: 'bigPlayButton', align: 'cc', x: 30, y: 80},
            {name: 'H5Loading', align: 'cc'},
            //{name: "errorDisplay", align: "tlabs", x: 0, y: 0},
            //{name: "infoDisplay"},
            {name: 'tooltip', align: 'blabs', x: 0, y: 56},
            {name: 'thumbnail'},
            {
              name: 'controlBar', align: 'blabs', x: 0, y: 0,
              children: [
                {name: 'liveDisplay', align: 'tlabs', x: 15, y: 6},
                {name: 'progress', align: 'blabs', x: 0, y: 44},
                {name: 'playButton', align: 'tl', x: 15, y: 12},
                {name: 'timeDisplay', align: 'tl', x: 10, y: 7},
                {name: 'fullScreenButton', align: 'tr', x: 10, y: 12},
                //{name:"subtitle", align:"tr",x:15, y:12},
                //{name:"setting", align:"tr",x:15, y:12},
                {name: 'volume', align: 'tr', x: 5, y: 10}

              ]
            }
          ]
        },
        roomBasic: {
          room_name: '',
          start_num: '',
          title: '',
          sub_title: '',
          intro: '',
          click_num: '',
          introduce: '',
          content: '',
          cover_img: '',
          coordinate: '',
          addr_url: '',
          addr: '',
          logo_img: '',
          online_url: '',
          online_cover: '',
          mobile: '',
        },
        videoList:[],
      }
    },
    provide() {
      return {
        reload: this.reload
      }
    },
    created() {
      this.room_id = this.$route.query.room_id > 0 ? this.$route.query.room_id : 0;
      this.getVideoList();
      this.getBanner();
      this.getData();
      this.getLens();
      this.WxShare();
      localStorage.setItem('roomid', this.room_id); // 直播间ID
    },
    mounted () {
      var that = this;
      $('.prism-big-play-btn').click(function () {
        $('.videoCover').fadeOut()
      })


      setTimeout(that.initSwiper, 1000)
      var height = $('.prism-player').width() ;
      $('.prism-player').height(height / 16 * 9)

      $('#J_prismPlayer').click(function () {
        // $(window).scrollTop(0)
        // $(this).fadeOut(800)
        that.playinit = false;
        that.checkVideoPlayer(that.currentVideo);
      })


      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        that.playinit = true;
      }

      if(this.player2.length > 0){
        this.player2.on('pause', function () {
          this.player2.dispose() //销毁
        });

      }


    },
    watch: {
      "$route"(){
      },
    },
    methods: {
      // 轮播图
      getBanner(){
        var that = this;
        var formdata = new URLSearchParams();
        formdata.append('id', this.room_id);
        that.axiosPost("/room/banner", formdata).then((res) => {
          that.bannerList = res.data.banner;
        });
      },
      showMoreInfo (obj) {
        if ($(obj).hasClass('hide')) {
          $(obj).removeClass('hide')
        } else {
          $(obj).addClass('hide')
        }
      },
      initSwiper(){
        var that = this;
        // 轮播图
        var banner = new Swiper('.room-banner', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            bulletActiveClass: 'live-banner-active',
          },
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
        })


        var galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 10,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
        })

        that.galleryTop = new Swiper('.gallery-top', {
          autoHeight: true, //enable auto height
          spaceBetween: 10,
          observer: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          thumbs: {
            swiper: galleryThumbs
          },
          on: {
            slideChangeTransitionStart: function(){
              that.switchContent(this.activeIndex);
            },
          },
        })

        //内容滚动
        /*var scrollSwiper = new Swiper('.scroll', {
          slidesOffsetBefore: 0,
          direction: 'vertical',
          freeMode: true,
          slidesPerView: 'auto',

          mousewheel: {
            releaseOnEdges: true,
          },

        });*/
      },
      switchVideo (item, isreplay) {
        this.playinit = false;
        clearTimeout(this.contabObj);// 清除定时器
        $('.videoCover').fadeOut()
        this.player.dispose(); //销毁
        this.VideoCoverImg = '';
        $('#J_prismPlayer').empty() //id为html里指定的播放器的容器id
        this.play_status = 1;
        var that = this;

        if(item.vurl.indexOf('.m3u8') != -1){ // 直播源
          that.aliplayer_config.isLive = true;
          that.aliplayer_config.autoplay = false;
          that.aliplayer_config.rePlay = false;
          that.play_status = 1;
        } else {
          that.aliplayer_config.isLive = false;
          that.aliplayer_config.autoplay = true;
          that.aliplayer_config.rePlay = true;
          that.play_status = 2;
        }

        that.VideoCoverImg = item.cover_img;
        that.aliplayer_config.cover = item.pic;
        that.aliplayer_config.source = item.vurl;
        if(isreplay == 2){ // 切流播放
          that.play_status = 2;
          that.aliplayer_config.autoplay = false;
          that.aliplayer_config.cover = item.reback_img; // 替换镜头回放封面地址
          that.aliplayer_config.source = item.vurl_reback; // 替换镜头回放地址
        }

        that.currentVideo = item;
        that.aliplayer_config.id = 'J_prismPlayer';
        that.player = new Aliplayer(that.aliplayer_config)
      },
      switchContent (index) {
        switch (index) {
          case 0:
            $('.shoppingCarBox').hide()
            $('.sendMessMenu').hide()
            break
          case 1:
            $('.shoppingCarBox').fadeIn()
            $('.sendMessMenu').hide()
            break
          case 2:
            $('.sendMessMenu').fadeIn()
            $('.shoppingCarBox').hide()
            break
          case 3:
            $('.shoppingCarBox').hide()
            $('.sendMessMenu').hide()
            break
          default:
        }
      },
      getData(){
        var that = this;
        var formdata = new URLSearchParams();
        that.axiosPost("/room/info?id="+this.room_id, formdata).then((res) => {
          that.roomBasic.room_name = res.data.room_name;
          that.roomBasic.logo_img = res.data.logo_img;
          that.roomBasic.click_num = res.data.click_num;
          that.roomBasic.addr_url = res.data.addr_url;
          that.roomBasic.addr = res.data.addr;
          that.roomBasic.coordinate = res.data.coordinate;
          that.roomBasic.cover_img = res.data.cover_img;
          that.roomBasic.introduce = res.data.introduce;
          that.roomBasic.content = res.data.content;
          that.roomBasic.logo_pic = res.data.logo_img;
          that.roomBasic.title = res.data.title;
          that.roomBasic.sub_title = res.data.sub_title;
          that.roomBasic.intro = res.data.intro;
          that.roomBasic.start_num = res.data.start_num;
          that.roomBasic.online_url = res.data.online_url;
          that.roomBasic.online_cover = res.data.online_cover;
          that.roomBasic.mobile = res.data.mobile;

          that.$route.meta.title = res.data.room_name;
          that.deliver = res.data.deliver;
          if(that.roomBasic.cover_img ){
            that.showCover = true;
          }

          that.$nextTick(function() {
            //that.galleryTop.slideTo(0, 0);
            //that.galleryTop.update();
            //alert(that.galleryTop.height);
          })
        }, (err) => {
          console.log(err);
        });
      },
      getLens(){
        var that = this;
        var formdata = new URLSearchParams();
        that.axiosPost("/room/lens?id="+this.room_id, formdata).then((res) => {
          that.$vux.loading.hide();
          if(res.status == 200){
            that.lens = res.data;

            if(that.lens[0].vurl.indexOf('.m3u8') != -1){ // 直播源
              that.aliplayer_config.isLive = true;
              that.aliplayer_config.autoplay = false;
              that.aliplayer_config.rePlay = false;
              that.play_status = 1;
            } else {
              that.aliplayer_config.isLive = false;
              that.aliplayer_config.autoplay = true;
              that.aliplayer_config.rePlay = true;
              that.play_status = 2;
            }

            that.VideoCoverImg = that.lens[0].cover_img;
            that.aliplayer_config.source = that.lens[0].vurl;
            that.aliplayer_config.cover = that.lens[0].pic;
            that.aliplayer_config.id = 'J_prismPlayer';
            that.player = new Aliplayer(that.aliplayer_config);

            // that.checkVideoPlayer(that.lens[0]);
            that.currentVideo = that.lens[0]
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },

      clearParent(){
        this.comment = "";
      },
      reload() {
        this.showComment = false;
        this.$nextTick(function(){
          this.showComment = true;

        })
      },
      checkVideoPlayer(item){ // 断流切换
        var that = this;
        that.contabObj = setTimeout(function () {
          var play_time = that.player.getCurrentTime();
          if(that.aliplayer_config.isLive && play_time <= 0){ // 直播
            //item.vurl = item.vurl_reback; // 替换镜头回放地址
            //item.pic = item.reback_img; // 替换镜头回放封面地址
            that.switchVideo(item, 2); //切换视频
            // that.checkVideoPlayer(item);
          }
        }, 3000)
      },
      imgCover() {
        this.playing = true;
        $(".videoCover").css("z-index", "-1 !important");
      },
      hideCoverImg(){
        if(this.roomBasic.cover_img && this.showCover){
          this.showCover = false;
        }
      },
      // 直播视频
      getVideoList(){
        var that = this;
        that.$vux.loading.show({
          text: '加载中~'
        })

        var formdata = new URLSearchParams();
        that.axiosPost("/room/videos?id="+this.room_id, formdata).then((res) => {
          that.$vux.loading.hide();
          if(res.status == 200){
            that.videoList = res.data.videos;

            if(that.videoList.length > 0){
              var player_list = [];
              for(var i = 0; i < that.videoList.length; i++){
                that.videoList[i].status = 1;
                that.videoList[i].vno = "J_prismPlayer"+(i+1);
                that.aliplayer_config.source = that.videoList[i].vurl;
                that.aliplayer_config.id = "J_prismPlayer"+(i+1);
                //player_list['player_'+i] =  new Aliplayer(that.aliplayer_config);
              }
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
      // 播放视频
      playervideo(id, source, item){
        var width = document.body.clientWidth - 30;
        var height = (width * 9 ) / 16;
        this.video_height = height+ "px";
        this.aliplayer_config.autoplay = true;
        this.aliplayer_config.height = this.video_height;

        item.status = 0;
        if(this.player2.length > 0){
          this.player2.dispose() //销毁
        }
        var that = this;
        that.aliplayer_config.source = source;
        that.aliplayer_config.id = id;
        that.aliplayer_config.isLive = false;
        that.aliplayer_config.useH5Prism = true;
        this.player2 =  new Aliplayer(that.aliplayer_config);
        this.clickNum(item);

      },
      // 点击数
      clickNum(item){
        var that = this;
        item.click ++;

        if(that.subStatus){
          return false;
        }

        var formdata = new URLSearchParams();
        //formdata.append('openid', that.openid);
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
      // 视频收藏
      videoStart(item){
        var that = this;

        if(that.subStatus){
          return false;
        }

        item.start = item.start == 1 ? 0 : 1;
        that.subStatus = true;

        var formdata = new URLSearchParams();
        //formdata.append('openid', that.openid);
        formdata.append('id', item.id);
        formdata.append('stype', 1);

        that.axiosPost("/client/user-start", formdata).then((res) => {
          that.subStatus = false;
          if(res.status == 200){

          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        }, (err) => {
          that.subStatus = false;
        });

      },
      // 分享
      golinks(item){
        if(item.links){
          window.location.replace(item.links);
        }
      },
      WxShare(){
        var url = window.location.href;
        var that = this;
        var formdata = new URLSearchParams();
        formdata.append('open_id', this.openid);
        formdata.append('url', url);
        formdata.append('apis', "chooseWXPay,onMenuShareTimeline,onMenuShareAppMessage,hideMenuItems");
        that.axiosPost("/wechat/jssdk", formdata).then((res) => {
          that.$vux.loading.hide();
          if(res.status == 200){
            that.$wechat.config(JSON.parse(res.data));
            console.log(that.$wechat);
            that.$wechat.ready(function () {
              var share_url = location.protocol + '//' + document.domain+'/front/#/room?room_id='+that.room_id;
              that.$wechat.onMenuShareAppMessage({
                title: that.roomBasic.title+" "+that.roomBasic.sub_title,       // 分享标题
                desc: that.roomBasic.introduce,   // 分享描述
                link: share_url,       // 分享链接 默认以当前链接
                imgUrl: that.roomBasic.logo_img,// 分享图标
                // 用户确认分享后执行的回调函数
                success: function () {

                },
                cancel: function () {
                  //console.log('分享到朋友取消');
                }
              });

              that.$wechat.onMenuShareTimeline({
                title: that.roomBasic.title+" "+that.roomBasic.sub_title,       // 分享标题
                link: share_url,       // 分享链接 默认以当前链接
                imgUrl: that.roomBasic.logo_img,// 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                  //alert('分享成功');
                },

                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });

              that.$wechat.hideMenuItems({// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                menuList: ['menuItem:share:appMessage', 'menuItem:copyUrl', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:favorite', 'menuItem:share:QZone','menuItem:openWithSafari']
              });
            });
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: "微信参数错误"});
          }
        }, (err) => {
          that.$vux.loading.hide();
        });


      }
    }

  }


</script>

<style>
  .scroll{-webkit-overflow-scrolling: touch; overflow-y: scroll;}
  .room-banner .swiper-pagination { color:#fff;}
  .live-room-content .room-video-list, .live-room-content .room-detail-info{height: 100%; overflow-y: auto; -webkit-overflow-scrolling: touch;}
  .room-banner .swiper-pagination-bullet{background: white; opacity: 1; }
  .room-banner .live-banner-active{opacity: 1; background: #58C220 !important;}
  .room-banner{width: 100%; height: calc(100vw/(16/9)); position: relative}
</style>
<style scoped>
  .room-info .gallery-top, .tabCon, .con{width: 100%; height: 100% !important;}
  .videoList dl dd{overflow: hidden; height: 22px}
  .room-video-list{margin-bottom: 3rem;}
  .room-detail-info{margin-bottom: 0.5rem;}
  .videoList{white-space: normal;}
  .live-room-main{
    position: absolute;
    top: calc(100vw/(16/9));
    width: 100%;
    background-color: #fff;
    height: calc(100vh - 100vw/(16/9));
    z-index: 10 !important;
    overflow: hidden;
  }

  .live-room-content{
    height: calc(100vh - 100vw/(16/9));
    border-width: 0;
    background-color: transparent;
    overflow: hidden;
    z-index: 2;
    top: 42px;
    right: 0;
    /* bottom: 0px; */
    left: 0;}
  .online_video{display: block !important; z-index: 10}
  .outline_video{display: none;}
  .video_info{position: relative}
  .play-btn{
    border: 7px solid rgba(255,255,255,.51);
    width: 64px;
    height: 64px;
    border-radius: 100%;
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    margin-left: -32px;
    margin-top: -64px;
    background: url(../../../static/images/videoBtn.png) no-repeat center center;
    background-size: 64px;}
  .videoList dl {padding: 5px 2.5px; box-sizing: border-box; width: 33.333333333333333%;}
  .room-header{z-index: 99999999999999999 !important; }
  video{object-fit: contain  !important; z-index: 1 !important;}
</style>
