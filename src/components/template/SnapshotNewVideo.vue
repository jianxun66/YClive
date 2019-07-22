<template>
  <div class="room-info snapshot" v-wechat-title="$route.meta.title" id="snapshot">
    <div class="room-header snapshot-header">
      <div class="company-info">
        <div class="company">
          <dl>
            <dt>
              <img :src="roomBasic.logo_img">
            </dt>
            <dd>
              <h3><strong>{{roomBasic.title}}</strong></h3>
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
              <a :href="bitem.links != '' ? bitem.links : 'javascript:void(0);' "><img @click="goBanner(bitem)"
                                                                                       @click.stop
                                                                                       :src="bitem.cover"></a>
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
          <div class="swiper-slide cur" @click="switchContent(0)">溯源直播</div>
          <div class="swiper-slide" @click="switchContent(1)">基地介绍</div>
          <div class="swiper-slide" @click="switchContent(2)">溯源回放</div>
          <div class="swiper-slide" @click="switchContent(3)">溯源查询</div>
        </div>
      </div>
      <div class="live-room-content" id="live-room-content">
        <div class="swiper-container gallery-top" v-show="!showExtContent">
          <div class="swiper-wrapper tabCon">
            <!--直播间信息-->
            <div class="swiper-slide con">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <!--镜头-->
                    <div class="lens-list">
                      <div class="videoList">
                        <div class="video" @click="imgCover">
                          <div class="prism-player " id="J_prismPlayer"></div>
                          <div
                            v-bind:class=" (play_status == 1 && playing != 1 ) || playinit == 1 ? 'videoCover online_video' : 'videoCover outline_video'">
                            <img :src="VideoCoverImg">
                          </div>
                        </div>
                        <dl class="live-1" v-for="len in lens" @click="switchVideo(len, 1)">
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
            <!--溯源视频-->
            <div class="swiper-slide con snapshot-video-slider" id="snapshot-video-slider">
              <div class="swiper-container scroll">
                <div class="swiper-wrapper">
                  <div class="swiper-slide slidescroll video-container">
                    <div class="snapshot-intro-header">
                      <div class="title">优质产品，24小时监督</div>
                      <div class="mark"></div>
                    </div>
                    <div class="lens">
                      <div class="videoList">
                        <dl v-for="(len, lindex) in lens" @click="changeVideo(len)"
                            :class='["live-1", len.aid == videoLensId ? "active" : ""]'
                            v-if="len.source_type == 'lens'">
                          <dd>{{len.name}}</dd>
                        </dl>
                      </div>
                    </div>
                    <div class="video-list">
                      <div class="video-header">
                        <div class="num">编号</div>
                        <div class="create-time">时间</div>
                        <div class="video-len">片长</div>
                        <div class="video-edit">操作</div>
                      </div>
                      <div class="video-main">
                        <div class="video-item" v-for="(vitem, vindex) in videoList"
                             @click="showVideoDialog(vitem.uri)">
                          <div class="num">{{vindex + 1}}</div>
                          <div class="create-time">{{vitem.start_time}}</div>
                          <div class="video-len">{{vitem.duration}}秒</div>
                          <div class="video-edit">点击播放</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--截图列表-->
            <div class="swiper-slide con snapshot-image-slider" id="snapshot-image-slider">
              <div class="swiper-container scroll">
                <div class="swiper-wrapper">
                  <div class="swiper-slide slidescroll image-container">
                    <div class="snapshot-intro-header">
                      <div class="title">优质产品，全过程追溯</div>
                      <div class="mark">长按图片，可下载保存</div>
                    </div>
                    <div class="image-list">
                      <div class="image-item" v-for="(sitem, sindex) in snapshotList">
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
        <div class="ext-content" v-show="showExtContent">
          <div class="ext-content-shop" v-show="findex == 'shop'">
            <div>
              <div class="snapshot-intro-header">
                <div class="title">全场满100元，基地包邮到家</div>
                <div class="mark">
                  <router-link :to="{path:'orders'}"><span style="color: #ccc">个人中心></span></router-link>
                </div>
              </div>

            </div>
            <div class="">
              <product :room_id="room_id" ref="product" v-on:buy_price="countPrice"></product>
            </div>

            <div class="footer-menu-fixed">
              <div class="footer-menu-fixed-container">
                <div class="container shop-cart">
                  已选订单金额&yen;{{total_price}}
                </div>
                <div class="button" @click="tobuy">结算</div>
              </div>
            </div>
          </div>
          <div class="ext-content-comment" v-show="findex == 'comment'">
            <comments :room_id="room_id" @clearComment="clearParent" ref="comment"></comments>
            <div class="footer-menu-fixed">
              <div class="footer-menu-fixed-container">
                <div class="container comment">
                  <div class="input-container">
                    <input type="text" placeholder="点击输入评论" v-on:input="checkLogin" v-model="comment"/>
                  </div>
                </div>
                <div class="button" @click="subComment">发送</div>
              </div>
            </div>
          </div>
          <div class="ext-content-article" v-show="findex == 'article'">
            <article-list :room_id="room_id"></article-list>
          </div>
        </div>
      </div>
    </div>

    <!--视频弹窗-->
    <div class="video-dialog">
      <div class="video-dialog-mask" @click="hideVideoDialog"></div>
      <div class="video-dialog-container">
        <div class="prism-player-video" id="player2">
        </div>
        <div class="play-btn" @click="playervideo()"></div>
      </div>

    </div>
    <!--视频弹窗-->

    <!--底部-->
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
    <!--底部-->
    <div class="liveHome" v-if="showCover" @click="hideCoverImg"><img :src="roomBasic.cover_img"></div>
    <remote-script src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"></remote-script>
  </div>
</template>


<script>
  import importJs from '../../../static/js/importJs'
  import {cookie, XDialog} from 'vux'
  import {TransferDomDirective as TransferDom} from 'vux'
  import RoomVideo from "../RoomVideoNew"
  import Product from "../Product"
  import Comments from "../Comment"
  import ArticleList from "../ArticleList"

  export default {
    name: 'snapshot',
    components: {
      "room-video": RoomVideo,
      "Product": Product,
      "Comments": Comments,
      XDialog,
      ArticleList,
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        bannerList: [],
        contabObj: {},
        contentSwiper: {},
        currentVideo: {},
        playing: 2,
        playinit: 2,
        VideoCoverImg: "",
        showCover: false,
        galleryTop: {},
        play_status: 1,
        room_id: 0,
        room_info: {},
        showComment: true,
        comment: "",
        total_price: 0,
        lens: {},
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
        dialogInfo: {
          link: '',
          type: 1, // 1 图片  2视频
          showDialog: false,
        },
        snapshotList: [],
        videoList: [],
        videoLensId: 0,
        videoPage: 1,
        player2: {},
        roomEnd: false,
        findex: '',
        showExtContent: false,
        footer: [
          {
            fname: 'shop',
            fclass: 'live-foot-shop',
            ftext: '基地商城',
            path: '',
          },
          {
            fname: 'comment',
            fclass: 'live-foot-video',
            ftext: '互动评论',
            path: '',
          },
          {
            fname: 'article',
            fclass: 'live-foot-user',
            ftext: '新闻中心',
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
      this.getSnapshot();
      localStorage.setItem('roomid', this.room_id); // 直播间ID
    },
    mounted() {
      var that = this;
      $('.prism-big-play-btn').click(function () {
        $('.videoCover').fadeOut()
      })


      setTimeout(that.initSwiper, 1000)
      var height = $('.prism-player').width();
      $('.prism-player').height(height / 16 * 9)
      if (!that.isAndroid) {
        that.playinit = 1;
      }

      $('#J_prismPlayer').click(function () {
        that.playinit = 2;
        that.checkVideoPlayer(that.currentVideo);
        that.musicFlag = true;
        that.playBgMusic();
        console.log(that.player);
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

      this.timer = setInterval(function () {
        that.getCurrentTime();//修改数据date
      }, 1000);


      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
          that.musicFlag = false;
          that.lensMusicObj.currentTime = 0;
          that.liveMusicObj.currentTime = 0;
        }
      });

      $(function () {
        // 监听滑动高度
        var navH = $("#tabMenu").offset().top + 150;
        $(window).scroll(function () {
          var scroH = $(this).scrollTop();
          if (scroH >= navH) {
            $("#tabMenu").addClass("fix-tab-menu");
          } else if (scroH < navH) {
            $("#tabMenu").removeClass("fix-tab-menu");
          }

          // 加载更多视频
          var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
          var scrollHeight = $(document).height();   //当前页面的总高度
          var clientHeight = $(this).height();    //当前可视的页面高度
          if (scrollTop + clientHeight >= scrollHeight && !that.loadding && !that.roomEnd) {
            that.getVideoList();
          }
        });

        that.switchContent(0); // 自适应高度
        setTimeout(function () {
          that.$previewRefresh(); // 图片预览
        }, 1000);
      });
      document.querySelector('body').setAttribute('style', 'background-color:#F3F4F6')
    },
    watch: {
      "$route"() {
      },
    },
    methods: {
      // 轮播图
      getBanner() {
        var that = this;
        var formdata = new URLSearchParams();
        formdata.append('id', this.room_id);
        that.axiosPost("/room/banner", formdata).then((res) => {
          that.bannerList = res.data.banner;
        });
      },

      showMoreInfo(obj) {
        if ($(obj).hasClass('hide')) {
          $(obj).removeClass('hide')
        } else {
          $(obj).addClass('hide')
        }
      },
      initSwiper() {
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
      switchVideo(item, isreplay) {
        this.playinit = 2;
        clearTimeout(this.contabObj);// 清除定时器
        $('.videoCover').fadeOut()
        this.player.dispose(); //销毁
        this.VideoCoverImg = '';
        $('#J_prismPlayer').empty() //id为html里指定的播放器的容器id
        this.play_status = 1;
        var that = this;

        if (isreplay == 2) { // 切流播放
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

        if (that.aliplayer_config.source.indexOf('.m3u8') != -1) { // 直播源
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
        that.stopMUisc(); //暂停音乐
        that.currentVideo = item;
        that.initMusic();
      },
      switchContent(index) {
        this.showExtContent = false;
        this.findex = ""
        $('.tabMenu .swiper-slide').each(function (item) {
          if (item == index) {
            $(this).addClass('cur');
          } else {
            $(this).removeClass('cur');
          }
        });

        $(".con").each(function (item) {
          if (item == index) {
            $(this).show();
          } else {
            $(this).hide();
          }
        })
      },
      getData() {
        var that = this;
        var formdata = new URLSearchParams();
        that.axiosPost("/room/info?id=" + this.room_id, formdata).then((res) => {
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
          if (that.roomBasic.cover_img) {
            that.showCover = true;
          }
          that.WxShare();
        }, (err) => {
          console.log(err);
        });
      },
      getLens() {
        var that = this;
        var formdata = new URLSearchParams();
        that.axiosPost("/room/lens?id=" + this.room_id, formdata).then((res) => {
          that.$vux.loading.hide();
          if (res.status == 200) {
            that.lens = res.data;
            if (that.lens[0].vurl.indexOf('.m3u8') != -1) { // 直播源
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
            if (that.aliplayer_config.autoplay) {
              that.checkVideoPlayer(that.lens[0]);
            }

            for (var sindex in that.lens) {
              if (that.lens[sindex].source_type == 'lens') {
                that.videoLensId = that.lens[sindex].aid;
                that.getVideoList();
                break;
              }
            }
            that.currentVideo = that.lens[0];
            that.initMusic();
          } else {
            this.$vux.alert.show({
              title: '温馨提示',
              content: res.message
            });
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },
      countPrice(price) {
        this.total_price = price;
      },
      tobuy() {
        var that = this;
        // 检测金额 起送金额
        if (that.deliver > 0 && parseInt(that.total_price) < parseInt(that.deliver)) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: "满" + that.deliver + "元起送，基地包邮到家"
          });
          return false;
        }

        this.$refs.product.buy_product(that.roomBasic.id,
          that.roomBasic.room_name,
          that.roomBasic.logo_pic,
          that.roomBasic.mobile,
        );
      },
      subComment() {
        this.$refs.comment.setComment(this.comment);
      },
      clearParent() {
        this.comment = "";
      },
      reload() {
        this.showComment = false;
        this.$nextTick(function () {
          this.showComment = true;

        })
      },
      checkVideoPlayer(item) { // 断流切换
        var that = this;
        that.contabObj = setTimeout(function () {
          var play_time = that.player.getCurrentTime();
          if (play_time <= 0) { // 直播
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
      hideCoverImg() {
        if (this.roomBasic.cover_img && this.showCover) {
          this.showCover = false;
        }
      },
      WxShare() {
        var url = window.location.href;
        var that = this;
        var formdata = new URLSearchParams();
        formdata.append('open_id', this.openid);
        formdata.append('url', url);
        formdata.append('apis', "chooseWXPay,onMenuShareTimeline,onMenuShareAppMessage");

        that.axiosPost("/wechat/jssdk", formdata).then((res) => {
          that.$vux.loading.hide();
          if (res.status == 200) {
            that.$wechat.config(JSON.parse(res.data));
            that.$wechat.ready(function () {
              var share_url = location.protocol + '//' + document.domain + '/front/#/room?room_id=' + that.room_id;
              that.$wechat.onMenuShareAppMessage({
                title: that.roomBasic.title + " " + that.roomBasic.sub_title,       // 分享标题
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
                title: that.roomBasic.title + " " + that.roomBasic.sub_title,       // 分享标题
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
              content: "微信参数错误"
            });
          }
        }, (err) => {
          that.$vux.loading.hide();
        });

      },
      initMusic() {
        this.musicFlag = this.firstMusic ? false : true;
        this.firstMusic = false;
        this.lensMusicObj = document.getElementById('lens-music');
        this.liveMusicObj = document.getElementById('live-music');
        if (this.lensMusicObj) {
          this.lensMusicObj.currentTime = 0;
        }
        if (this.liveMusicObj) {
          this.liveMusicObj.currentTime = 0;
        }
      },
      playBgMusic() {
        if (this.liveCommon.checkAndroid()) {
          return false;
        }
        var that = this;
        that.musicFlag = true;
        setTimeout(function () {
          if (that.liveMusicObj) {
            that.liveMusicObj.play();
          }
        }, 500)
      },
      playMusic() {
        if (this.liveCommon.checkAndroid()) {
          return false;
        }

        if (this.musicFlag) { //暂停
          this.musicFlag = false;
          this.liveMusicObj.pause();
          this.lensMusicObj.play();
        } else { // 播放
          this.lensMusicObj.pause();
          this.liveMusicObj.play();
          this.musicFlag = true;
        }
      },
      getCurrentTime() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        this.date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      },
      goHome() {
        this.$router.replace({path: '/'});
      },

      // 进入同层全屏事件
      fullScreenHandle() {
      },

      // 退出同层全屏事件
      cancelFullScreenHandel() {
      },
      stopMUisc() {
        this.musicFlag = false;
        this.liveMusicObj.pause();
        this.lensMusicObj.pause();

        // 暂停视频
        this.player.pause();
      },
      checkLogin() {
        if (!cookie.get('uid')) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '请先登录'
          });

          cookie.set('refer', '/room?room_id=' + this.room_id, {
            path: '/',
            expires: 7200
          });
          this.$router.replace({path: '/auth'});
          console.log('请先登录');
          return false;
        }
      },
      // 获取视频列表
      getVideoList() {
        var that = this;
        that.loadding = true;
        var formdata = new URLSearchParams();
        formdata.append('page', that.videoPage);
        formdata.append('id', that.room_id);
        formdata.append('sid', that.videoLensId);
        that.axiosPost("/room/source-video", formdata).then((res) => {
          that.loadding = false;
          that.$vux.loading.hide();
          if (res.status == 200) {
            if (res.data.length > 0) {
              res.data.forEach((v, k) => {
                that.videoList.push(v);
              })
              that.videoPage++;
            } else {
              that.roomEnd = true;
            }
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message
            });
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },
      changeVideo(item) {
        // 切换样式

        this.videoLensId = item.aid;
        this.videoList = []; // 置空
        this.videoPage = 1;
        this.getVideoList();
      },
      // 获取截图列表
      getSnapshot() {
        var that = this;
        that.loadding = true;
        var formdata = new URLSearchParams();
        formdata.append('page', that.snapshotPage);
        formdata.append('id', that.room_id);
        that.axiosPost("/room/snapshot", formdata).then((res) => {
          that.loadding = false;
          that.$vux.loading.hide();
          if (res.status == 200) {
            if (res.data.length > 0) {
              res.data.forEach((v, k) => {
                that.snapshotList.push(v);
              })
              that.snapshotPage++;
            } else {
              that.roomEnd = true;
            }
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message
            });
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },
      // 弹窗显示图片
      showDialog(item, type) {
        this.dialogInfo.link = item;
        this.dialogInfo.type = type; // 1 图片  2视频
        this.dialogInfo.showDialog = true;
      },
      hideDialog() {

      },
      showVideoDialog(item) {
        this.VideoCoverImg = '';
        $('#player2').empty() //id为html里指定的播放器的容器id
        var that = this;
        // 销毁之前播放器
        var video_config = {
          "id": "player2",
          "source": item,
          "cover": "https://yc.adaxiang.com/front/static/images/video_load.gif",
          //"cover": "https://ycycc-hb.oss-cn-beijing.aliyuncs.com/yc-ycc-images/live-hb/ycbdh003.jpg",
          "width": "100%",
          "height": "100%",
          "autoplay": false,
          "isLive": false,
          "rePlay": false,
          "playsinline": true,
          "preload": false,
          "controlBarVisibility": "hover",
          "useH5Prism": true,
          "x5_type": "video",
          "skinLayout": [
            {
              "name": "controlBar",
              "align": "blabs",
              "x": 0,
              "y": 0,
              "children": [
                {
                  "name": "progress",
                  "align": "blabs",
                  "x": 0,
                  "y": 44
                },
                {
                  "name": "playButton",
                  "align": "tl",
                  "x": 15,
                  "y": 12
                },
                {
                  "name": "timeDisplay",
                  "align": "tl",
                  "x": 10,
                  "y": 7
                },
                {
                  "name": "fullScreenButton",
                  "align": "tr",
                  "x": 10,
                  "y": 12
                },
                {
                  "name": "volume",
                  "align": "tr",
                  "x": 5,
                  "y": 10
                }
              ]
            }
          ]
        }
        that.player2 = new Aliplayer(video_config);
        $(".play-btn").show();
        $(".video-dialog").show();
      },
      playervideo() {
        $(".play-btn").hide();
        this.player2.play();
      },
      hideVideoDialog() {
        $(".video-dialog").hide();
        this.player2.stop();
        this.player2.dispose(); //销毁
        $('#player2').empty() //id为html里指定的播放器的容器id
      },
      changeIndex(item) {
        if ($(window).scrollTop() > 5) {
          $(document).scrollTop(0);
        }

        var that = this;
        that.switchContent(0); // 自适应高度
        that.showExtContent = true;
        that.findex = item;
      },

    }

  }


</script>


<style scoped>
  .room-info .gallery-top, .tabCon, .con {
    width: 100%;
  }

  .live-room-main {
    position: absolute;
    top: calc(100vw / (16 / 9));
    width: 100%;
    background-color: #fff;
    height: calc(100vh - 100vw / (16 / 9));
    z-index: 10 !important;
    overflow: hidden;
  }

  .live-room-content {
    border-width: 0;
    background-color: transparent;
    overflow: hidden;
    z-index: 2;
    top: 42px;
    right: 0;
    left: 0;
  }

  .prism-player video {
    object-fit: fill !important;
  }

  .snapshot .videoList dl {
    width: 33.333%;
    box-sizing: border-box;
  }

  .snapshot-header {
  }

  .company-info {
    position: relative;
    height: 5.8rem;
  }

  .company {
    background: white;
    padding: 10px 15px;
  }

  .source-info {
    position: absolute;
    top: 1.45rem;
    right: 10px;
    text-align: right;
  }

  .source-info p {
    color: #666;
    font-size: 13px
  }

  .snapshot .room-banner-container {
    padding: 0.5rem;
  }

  .snapshot .room-banner-container .room-banner {
    border-radius: 0.5rem;
    margin: 0.5rem;
    position: relative
  }

  .snapshot .room-banner-container .room-banner img {
    border-radius: 4px
  }

  .snapshot .live-room-main {
    position: inherit;
    height: auto;
  }

  .snapshot .fix-tab-menu {
    position: fixed;
    top: 0;
    z-index: 999;
    width: inherit;
  }

  .snapshot .videoList {
    white-space: inherit;
  }

  .snapshot .videoList .video {
    height: auto;
  }

  .snapshot .swiper-wrapper tabCon {
    height: auto !important;
  }

  .snapshot .video-container .lens {
    padding: 0 0.5rem;
  }

  .snapshot .video-container .videoList {
    padding: 0;
    white-space: nowrap;
  }

  .snapshot .video-container .videoList dl {
    background-color: #C8C8C8;
    margin: 0 10px;
  }

  .snapshot .video-container .videoList dl dd {
    color: white;
  }

  .snapshot .video-container .videoList .active {
    background-color: #68B735;
  }

  .online_video {
    display: block !important;
    z-index: 10
  }

  .outline_video {
    display: none !important;
  }

  .company dd h3 {
    padding-bottom: 2px
  }

  .videoList dl dt {
    padding-bottom: 5px;
  }
  
  .live-room-content{padding-bottom: 3.5rem; background-color: #F3F4F6;}
</style>
