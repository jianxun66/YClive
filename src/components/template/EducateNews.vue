<template>
  <div class="room-info edu" v-wechat-title="$route.meta.title" id="edu">
    <div class="room-header edu-header">
      <div class="company-info">
        <div class="company">
          <div class="company-logo">
            <img :src="roomBasic.logo_img">
            <!--<img src="../../../static/images/edu.png"/>-->
          </div>
          <dl>
            <dd>
              <p>
                <span>{{roomBasic.intro}}</span>
              </p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="room-banner-container">
        <div class="swiper-container banner">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(bitem , bkey) in bannerList" :key="bkey">
              <a :href="bitem.links != '' ? bitem.links : 'javascript:void(0);' "><img  @click="goBanner(bitem)" @click.stop :src="bitem.cover"></a>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>

    <div class="live-room-main">
      <!-- Swiper -->
      <div class="gallery-thumbs" id="tabMenu">
        <div class="tabMenu">
          <div class="swiper-slide cur" @click="switchContent(0)">中心介绍</div>
          <div class="swiper-slide" @click="switchContent(1)">
            <span class="live-icon">现场直播</span>
          </div>
          <div class="swiper-slide" @click="switchContent(2)">精彩视频</div>
          <div class="swiper-slide" @click="switchContent(3)">精彩照片</div>
        </div>
      </div>
      <div class="live-room-content" id="live-room-content">
        <div class="swiper-container gallery-top" v-show="!showArticle">
          <div class="swiper-wrapper tabCon">
            <!--直播间信息-->
            <div class="swiper-slide con">
              <div class="swiper-container scroll ">
                <div class="swiper-wrapper">
                  <div class="swiper-slide slidescroll">
                    <div class="room_content" v-html="roomBasic.content">
                      {{roomBasic.content}}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--视频-->
            <div class="swiper-slide con">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                   <!--镜头-->
                    <div class="lens-list">
                      <div class="videoList">
                        <div class="video" @click="imgCover">
                          <div class="prism-player " id="J_prismPlayer"></div>
                          <div v-bind:class=" (play_status == 1 && playing != 1 ) || playinit == 1 ? 'videoCover online_video' : 'videoCover outline_video'" >
                            <img :src="VideoCoverImg">
                          </div>
                        </div>
                        <dl class="live-1"  v-for="len in lens" @click="switchVideo(len, 1)">
                          <dt><img :src="len.cover_img"></dt>
                          <dd>{{len.name}}</dd>
                        </dl>
                      </div>
                    </div>
                   <!--镜头-->
                  </div>
                </div>
              </div>
            </div>
            <!--短片-->
            <div class="swiper-slide con edu-video-slider" id="edu-video-slider">
              <div class="swiper-container scroll">
                <div class="swiper-wrapper">
                  <div class="swiper-slide slidescroll">
                    <div class="filmList">
                      <room-video :room_id="room_id"></room-video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--截图列表-->
            <div class="swiper-slide con edu-image-slider" id="edu-image-slider">
              <div class="swiper-container scroll">
                <div class="swiper-wrapper">
                  <div class="swiper-slide slidescroll image-container">
                    <div class="edu-intro-header">
                      <div class="title">图片留存瞬间的美好</div>
                      <div class="mark">长按图片，可下载保存</div>
                    </div>
                    <div class="image-list">
                      <div class="image-item" v-for="(sitem, sindex) in eduList">
                        <div class="image-content">
                          <img :preview="sindex" :preview-text="sitem.title" :src="sitem.cover"/>
                        </div>
                        <div class="image-intro">
                          <div class="image-title">{{sitem.title}}</div>
                          <div class="image-time">{{sitem.created_time}}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="article-list"  v-show="showArticle">
          <div class="article-item" v-for="(item, index) in articleList" @click="goArticle(item)">
            <div class="title">
              <p><span class="spot">·</span>{{item.title}}</p>
            </div>
            <div class="cover">
              <img :src="item.pic_path"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="item" v-for="(item, key) in footer" :key="key">
        <div :class="item.fclass">
          <div :class="findex == item.fname ? 'active' : ''" @click="changeIndex(item.fname)">
            <div class="item-icon"></div>
            <div class="item-text">{{item.ftext}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="liveHome" v-if="showCover" @click="hideCoverImg"><img :src="roomBasic.cover_img"></div>
    <remote-script src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"></remote-script>
  </div>
</template>


<script>
  import importJs from '../../../static/js/importJs'
  import { cookie, XDialog  } from 'vux'
  import { TransferDomDirective as TransferDom } from 'vux'
  import RoomVideo from "../RoomVideoNew"
  import Product from "../Product"
  import Comments from "../Comment"
  export default {
    name: 'educate-news',
    components:{
      "room-video": RoomVideo,
      "Product": Product,
      "Comments": Comments,
      XDialog,
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        bannerList: [],
        contabObj: {},
        contentSwiper: {},
        currentVideo : {},
        playing: 2,
        playinit: 2,
        VideoCoverImg: "",
        showCover: false,
        galleryTop: {},
        play_status : 1,
        room_id: 0,
        room_info: {},
        showComment: true,
        comment:"",
        total_price: 0,
        lens:{},
        player: {},
        deliver: 0, //起送金额
        aliplayer_config: {
          id: 'J_prismPlayer',
          autoplay: false,
          playsinline: true,
          showBuffer: true,
          isLive: true,
          useH5Prism: !0,
          useFlashPrism: !1,
          x5_video_position: "normal",
          x5_type: "video",
          source: '',
          cover: '',
          rePlay: false,
          preload: false,
          skinLayout: [
            {name: 'bigPlayButton', align: 'cc', x: 30, y: 80},
            {name: 'H5Loading', align: 'cc'},
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
        firstMusic: false,
        musicFlag: false,
        lensMusicObj: '',
        liveMusicObj: '',
        showMusic: true,
        isAndroid: false,
        date: new Date(),
        imageDialog: true,
        eduList: [],
        videoLensId: 0,
        page:1,
        roomEnd: false,
        showArticle: false,
        articleList:[],
        findex: 'live',
        footer: [
          {
            fname: 'live',
            fclass: 'live-foot-live',
            ftext: '现场直播',
            path: '/',
          },
          {
            fname: 'article',
            fclass: 'live-foot-video',
            ftext: '活动中心',
            path: '',
          },
          {
            fname: 'my',
            fclass: 'live-foot-user',
            ftext: '联系我们',
            path: ''
          },
        ],
      }
    },
    provide() {
      return {
        reload: this.reload
      }
    },
    created() {
      var u = navigator.userAgent;
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      this.room_id = this.$route.query.room_id;
      this.getBanner();
      this.getData();
      this.getLens();
      this.getSnaphot();
      this.getArticleList();
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
      if (!that.isAndroid) {
        that.playinit = 1;
      }

      $('#J_prismPlayer').click(function () {
        that.playinit = 2;
        that.checkVideoPlayer(that.currentVideo);
        that.musicFlag = true;
        that.playBgMusic();
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        }
      })

      $('.company .remarks p').click(function () {
        if ($(this).hasClass('hide')) {
          $(this).removeClass('hide')
        } else {
          $(this).addClass('hide')
        }
      })

      this.timer = setInterval(function() {
        that.getCurrentTime();//修改数据date
      }, 1000);


      document.addEventListener('visibilitychange', function(){
        if (document.visibilityState === 'hidden') {
          that.musicFlag = false;
          if (that.lensMusicObj && that.lensMusicObj.hasOwnProperty("pause")) {
			      that.lensMusicObj.currentTime = 0;
          }
          if (that.liveMusicObj && that.liveMusicObj.hasOwnProperty("pause")) {
            that.liveMusicObj.currentTime = 0;
          }
        }
      });

      $(function () {
        // 监听滑动高度
        var navH = $("#tabMenu").offset().top + 150;
        $(window).scroll(function(){
          var scroH = $(this).scrollTop();
          if(scroH >= navH){
            $("#tabMenu").addClass("fix-tab-menu");
          }else if(scroH < navH){
            $("#tabMenu").removeClass("fix-tab-menu");
          }

          // 加载更多视频
          var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
          var scrollHeight = $(document).height();   //当前页面的总高度
          var clientHeight = $(this).height();    //当前可视的页面高度
          if(scrollTop + clientHeight >= scrollHeight && !that.loadding && !that.roomEnd){
            that.getArticleList();
          }
        });

        that.switchContent(0); // 自适应高度
        setTimeout(function(){
          that.$previewRefresh(); // 图片预览
        }, 1000);
      });
      document.querySelector('body').setAttribute('style', 'background-color:#F3F4F6')
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
        var banner = new Swiper('.banner', {
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
      },
      switchVideo (item, isreplay) {
        this.playinit = 2;
        clearTimeout(this.contabObj);// 清除定时器
        $('.videoCover').fadeOut()
        this.player.dispose(); //销毁
        this.VideoCoverImg = '';
        $('#J_prismPlayer').empty() //id为html里指定的播放器的容器id
        this.play_status = 1;
        var that = this;

        if(isreplay == 2){ // 切流播放
          that.play_status = 2;
          that.aliplayer_config.autoplay = false;

          if (that.aliplayer_config.source != item.vurl_reback) {
            that.aliplayer_config.cover = item.reback_img; // 替换镜头回放封面地址
            that.aliplayer_config.source = item.vurl_reback; // 替换镜头回放地址
            that.VideoCoverImg = item.reback_img;
          } else { // 备用播放地址
            that.aliplayer_config.cover = item.spare_cover_url; // 替换镜头回放封面地址
            that.aliplayer_config.source = item.spare_url; // 替换镜头回放地址
            that.VideoCoverImg = item.spare_cover_url;
          }
        } else {
          that.VideoCoverImg = item.cover_img;
          that.aliplayer_config.cover = item.pic;
          that.aliplayer_config.source = item.vurl;
        }

        if(that.aliplayer_config.source.indexOf('.m3u8') != -1){ // 直播源
          that.aliplayer_config.isLive = true;
          that.aliplayer_config.autoplay = false;
          that.aliplayer_config.rePlay = false;
          that.play_status = 1;
        } else {
          that.aliplayer_config.isLive = false;
          that.aliplayer_config.autoplay = false;
          that.aliplayer_config.rePlay = true;
          that.play_status = 2;
        }

        that.currentVideo = item;
        that.aliplayer_config.id = 'J_prismPlayer';
        that.player = new Aliplayer(that.aliplayer_config)
        that.player.on('x5requestFullScreen', this.fullScreenHandle);
        that.player.on('x5cancelFullScreen', this.cancelFullScreenHandel);
        if (that.aliplayer_config.autoplay) {
          this.checkVideoPlayer(item);
        }
        that.currentVideo = item;
        that.initMusic();
      },
      switchContent (index) {
        this.showArticle = false;
        this.findex = 'live';
        $('.tabMenu .swiper-slide').each(function (item) {
          if(item == index) {
            $(this).addClass('cur');
          } else {
            $(this).removeClass('cur');
          }
        });

        $(".con").each(function (item) {
          if(item == index) {
            $(this).show();
          } else {
            $(this).hide();
          }
        })
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
          that.WxShare();
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
              that.firstMusic = true;
            } else {
              that.aliplayer_config.isLive = false;
              that.aliplayer_config.autoplay = false;
              that.aliplayer_config.rePlay = true;
              that.play_status = 2;
            }

            that.VideoCoverImg = that.lens[0].cover_img;
            that.aliplayer_config.source = that.lens[0].vurl;
            that.aliplayer_config.cover = that.lens[0].pic;
            that.aliplayer_config.id = 'J_prismPlayer';
            that.player = new Aliplayer(that.aliplayer_config);
            that.player.on('x5requestFullScreen', this.fullScreenHandle);
            that.player.on('x5cancelFullScreen', this.cancelFullScreenHandel);
            if ( that.aliplayer_config.autoplay) {
              that.checkVideoPlayer(that.lens[0]);
            }

            that.currentVideo = that.lens[0];
            that.initMusic();
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },

      subComment(){
        this.$refs.comment.setComment(this.comment);
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
          if(play_time <= 0){ // 直播
            //item.vurl = item.vurl_reback; // 替换镜头回放地址
            //item.pic = item.reback_img; // 替换镜头回放封面地址
            that.switchVideo(item, 2); //切换视频
            // that.checkVideoPlayer(item);
          }
        }, 3000)
      },
      imgCover() {
        this.playing = 1;
        $(".videoCover").css("z-index", "-1 !important");
      },
      hideCoverImg(){
        if(this.roomBasic.cover_img && this.showCover){
          this.showCover = false;
        }
      },
      WxShare(){
        var url = window.location.href;
        var that = this;
        var formdata = new URLSearchParams();
        formdata.append('open_id', this.openid);
        formdata.append('url', url);
        formdata.append('apis', "chooseWXPay,onMenuShareTimeline,onMenuShareAppMessage");

        that.axiosPost("/wechat/jssdk", formdata).then((res) => {
          that.$vux.loading.hide();
          if(res.status == 200){
            that.$wechat.config(JSON.parse(res.data));
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

            });
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: "微信参数错误"});
          }
        }, (err) => {
          that.$vux.loading.hide();
        });

      },
      initMusic(){
        this.musicFlag = this.firstMusic ? false: true;
        this.firstMusic = false;
        this.lensMusicObj = document.getElementById('lens-music');
        this.liveMusicObj = document.getElementById('live-music');

        if (this.lensMusicObj && this.lensMusicObj.hasOwnProperty("currentTime")) {
          this.lensMusicObj.currentTime = 0;
        }
        if (this.liveMusicObj && this.liveMusicObj.hasOwnProperty("currentTime")) {
          this.liveMusicObj.currentTime = 0;
        }

      },
      playBgMusic(){
        var that = this;
        that.musicFlag = true;
        setTimeout(function () {
          if(that.liveMusicObj && that.liveMusicObj.hasOwnProperty("play")){
            that.liveMusicObj.play();
          }
        }, 500)
      },
      playMusic(){
        if(this.musicFlag){ //暂停
          this.musicFlag = false;
          this.liveMusicObj.pause();
          this.lensMusicObj.play();
        } else { // 播放
          this.lensMusicObj.pause();
          this.liveMusicObj.play();
          this.musicFlag = true;
        }
      },
      getCurrentTime(){
        var date = new Date();
        var year=date.getFullYear();
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        this.date = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      },
      goHome(){
        this.$router.replace({path: '/'});
      },

      // 进入同层全屏事件
      fullScreenHandle(){
      },

      // 退出同层全屏事件
      cancelFullScreenHandel(){
      },
      stopMUisc(){
        this.musicFlag = false;
        if(this.liveMusicObj && this.liveMusicObj.hasOwnProperty('pause')){
          this.liveMusicObj.pause();
        }
        if (this.lensMusicObj &&  this.lensMusicObj.hasOwnProperty('pause')) {
          this.lensMusicObj.pause();
        }

        // 暂停视频
        if (this.player && this.player.hasOwnProperty('pause')){
          this.player.pause();
        }

      },
      checkLogin(){
        if(!cookie.get('uid')){
          this.$vux.alert.show({
            title: '温馨提示',
            content: '请先登录'});

          cookie.set('refer', '/room?room_id='+this.room_id, {
            path: '/',
            expires: 7200
          });
          this.$router.replace({path: '/auth'});
          console.log('请先登录');
          return false;
        }
      },
      // 获取截图列表
      getSnaphot(){
        var that = this;
        that.loadding = true;
        var formdata = new URLSearchParams();
        formdata.append('page', that.eduPage);
        formdata.append('id', that.room_id);
        that.axiosPost("/room/snapshot", formdata).then((res) => {
          that.loadding = false;
          that.$vux.loading.hide();
          if(res.status == 200){
            if(res.data.length > 0) {
              res.data.forEach((v, k) => {
                that.eduList.push(v);
              })
              that.eduPage++;
            } else {
              that.roomEnd = true;
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
      // 获取文章列表
      getArticleList(){
        var that = this;
        that.loadding = true;
        var formdata = new URLSearchParams();
        formdata.append('page', that.page);
        formdata.append('room_id', that.room_id);
        that.axiosPost("/room/article", formdata).then((res) => {
          that.loadding = false;
          that.$vux.loading.hide();
          if(res.status == 200){
            if(res.data.length > 0) {
              res.data.forEach((v, k) => {
                that.articleList.push(v);
              })
              that.page++;
            } else {
              that.roomEnd = true;
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
      changeIndex(item) {
        var that = this;
        that.switchContent(0); // 自适应高度
        switch (item) {
          case "live":
            that.showArticle = false;
            break;
          case "article":
            that.showArticle = true;
            break;
          case "my":
            //滑动底部
            var h = $(document).height()-$(window).height();
            $(document).scrollTop(h);
            that.showArticle = false;
            break;
        }
        that.findex = item;
      },
      goArticle(item){
        this.$router.push({path: '/article', query:{room_id:item.room_id, aid: item.id, from:"groupmessage", isappinstalled:0}})
        /*if(this.DEBUG == 1){
          this.$router.replace({path: '/article', query:{room_id:item.room_id, aid: item.id, from:"groupmessage", isappinstalled:0}})
        } else {
          window.location.replace(location.protocol + '//' + document.domain+'/front/#/article?room_id='+item.room_id+'&aid='+item.id);
        }*/
      }
    }

  }
</script>

<style>
  .edu .banner .live-banner-active{background: #E25029 !important;}
</style>
<style scoped>
  .room-info .gallery-top, .tabCon, .con{width: 100%; }
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
    border-width: 0;
    background-color: transparent;
    overflow: hidden;
    z-index: 2;
    top: 42px;
    right: 0;
    left: 0;}
  .prism-player video{object-fit: fill !important;}
  .edu{}

  .source-info{position: absolute; top: 20px; right: 10px; text-align: right; }
  .source-info p{color: #666; font-size: 13px}
  .edu .room-banner-container{padding: 0.5rem; }
  .edu .room-banner-container .room-banner{border-radius: 0.5rem; margin: 0.5rem; position: relative}
  .edu .room-banner-container .room-banner img{border-radius: 4px}
  .edu .live-room-main{position: inherit; height: auto;}
  .edu .fix-tab-menu{position: fixed; top: 0; z-index: 999; width: inherit;}
  .edu .tabMenu .cur:after{background: #E25029}
  .edu .videoList{ white-space: inherit;}
  .edu .videoList .video{height: auto;}
  .edu .swiper-wrapper tabCon{height: auto !important;}
  .edu .video-container .lens{padding: 0 0.5rem;}
  .edu .video-container .videoList{ padding: 0;  white-space: nowrap;}
  .edu .video-container .videoList dl{ background-color: #C8C8C8; margin: 0 10px;}
  .edu .video-container .videoList dl dd{color: white;}
  .edu .video-container .videoList .active{background-color: #68B735;}
  .online_video{display: block !important; z-index: 10}
  .outline_video{display: none !important;}
  .company dd h3{padding-bottom: 2px}
  .videoList dl dt{padding-bottom: 5px;}
  .videoList dl{padding: 5px 5px 0 5px;}
</style>
