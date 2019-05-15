<template>
    <div class="room-info" v-wechat-title="$route.meta.title">
        <div class="room-deader">
          <div class="video" @click="imgCover">
            <div class="prism-player" id="J_prismPlayer"></div>
            <div v-bind:class=" (play_status == 1 && playing != 1 ) || playinit == 1 ? 'videoCover online_video' : 'videoCover outline_video'" >
              <img :src="VideoCoverImg">
            </div>
            <div class="logo"><img src="../../../static/images/logo.png"></div>
            <div class="live-music" v-if="currentVideo.live_music">
              <div :class="musicFlag ? 'live-music-icon active' : 'live-music-icon'" @click="playMusic"></div>
            </div>
            <div class="live-home-icon" @click="goHome" v-if="roomBasic.addr_url"></div>
            <div class="live-view-icon">热度 {{roomBasic.click_num}} 人</div>
            <!--<div class="live-title-roll">
              <marquee scrollamount="2" vspace="10">
                <span v-if="play_status == 1">欢迎来到 {{roomBasic.room_name}} 设备实时视频中... {{date}}</span>
                <span v-if="play_status == 2">欢迎来到 {{roomBasic.room_name}} 设备已离线，正在播放精彩回放...</span>
              </marquee>
            </div>-->
          </div>
          <div class="live-music-detail">
            <audio :src="currentVideo.lens_music" loop="loop"  id="lens-music" style="display: none"></audio>
            <audio :src="currentVideo.live_music" loop="loop"  id="live-music" style="display: none"></audio>
          </div>
        </div>

        <div class="live-room-main">
          <!-- Swiper -->
          <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper tabMenu">
              <div class="swiper-slide cur" @click="switchContent(0)">实时视频</div>
              <div class="swiper-slide" @click="switchContent(1)">生态商城</div>
              <div class="swiper-slide" @click="switchContent(2)">互动评论</div>
              <div class="swiper-slide" @click="switchContent(3)">精彩短片</div>
            </div>
          </div>
          <div class="live-room-content">
            <div class="swiper-container gallery-top">
              <div class="swiper-wrapper tabCon">
                <!--直播间信息-->
                <div class="swiper-slide con">
                  <div class="swiper-container scroll">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide slidescroll">
                        <!--滑动内容-->
                        <h2 class="tit videoIcon">溯源镜头</h2>
                        <div class="videoList swiper-no-swiping">
                          <dl class="live-1"  v-for="len in lens" @click="switchVideo(len, 1)">
                            <dt><img :src="len.cover_img"></dt>
                            <dd>{{len.name}}</dd>
                          </dl>
                        </div>
                        <h2 class="tit shopCarIcon">生态介绍</h2>
                        <div class="company">
                          <dl>
                            <dt>
                              <img :src="roomBasic.logo_img">
                            </dt>
                            <dd>
                              <h3><strong>{{roomBasic.title}}</strong>{{roomBasic.sub_title}}</h3>
                              <p>
                                <span>{{roomBasic.intro}}</span>
                              </p>
                            </dd>
                          </dl>
                          <div class="remarks">
                            <span>生态简介：</span>
                            <p class="hide" @click.native="showMoreInfo(this)">
                              {{roomBasic.introduce}}</p>
                          </div>
                        </div>


                        <div class="room_content" v-html="roomBasic.content">
                          {{roomBasic.content}}
                        </div>
                        <!--滑动内容-->
                      </div>
                    </div>
                  </div>
                </div>
                <!--商品信息-->
                <div class="swiper-slide con">
                  <div class="swiper-container scroll ">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide slidescroll">
                        <div class="my-order">
                          <router-link :to="{path:'orders'}"><span>我的订单></span></router-link>
                        </div>
                        <h2 class="tit shopCarIcon">生态商城</h2>
                        <div class="company">
                          <dl>
                            <dt>
                              <img :src="roomBasic.logo_img">
                            </dt>
                            <dd>
                              <h3><strong>{{roomBasic.title}}</strong>{{roomBasic.sub_title}}</h3>
                              <p>
                                <span>{{roomBasic.intro}}</span>
                              </p>
                            </dd>
                          </dl>
                          <div class="remarks">
                            <span>生态简介：</span>
                            <p class="hide" @click.native="showMoreInfo(this)">
                              {{roomBasic.introduce}}</p>
                          </div>
                        </div>
                        <div class="shopList">
                          <product  :room_id="room_id" ref="product" v-on:buy_price="countPrice"></product>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--评论-->
                <div class="swiper-slide con">
                  <div class="swiper-container scroll">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide slidescroll">
                        <h2 class="tit messIcon">互动评论</h2>
                        <comments :room_id="room_id" @clearComment="clearParent" ref="comment" v-if="showComment"></comments>
                      </div>
                    </div>
                  </div>
                </div>
                <!--短片-->
                <div class="swiper-slide con">
                  <div class="swiper-container scroll">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide slidescroll">
                        <h2 class="tit videoIcon">精彩短片</h2>
                        <div class="filmList">
                          <room-video :room_id="room_id"></room-video>
                        </div>
                        <div class="footerLogo">
                          <img src="../../../static/images/footerLogo.png">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="sendMessMenu" style="display: none">
            <div class="sendMessBox">
                <input type="text" value="" placeholder="输入评论内容..." v-on:input="checkLogin" v-model="comment">
                <button @click="subComment"></button>
            </div>
        </div>

        <div class="shoppingCarBox" style="display: none">
            <dl>
                <dt>
                    <h4>&yen;{{total_price}}</h4>
                    <p v-if="deliver == 0">基地到家，全场免运费</p>
                    <p v-else>满{{deliver}}元起送，基地包邮到家</p>
                </dt>
                <dd>
                    <a href="javascript:void(0)" @click="tobuy">去结算</a>
                </dd>
            </dl>
        </div>

        <div class="liveHome" v-if="showCover" @click="hideCoverImg"><img :src="roomBasic.cover_img"></div>
        <remote-script src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"></remote-script>
    </div>
</template>


<script>
  import { cookie } from 'vux'
    import importJs from '../../../static/js/importJs'
    import RoomVideo from "../RoomVideoNew"
    import Product from "../Product"
    import Comments from "../Comment"
    export default {
        name: 'room',
        components:{
            "room-video": RoomVideo,
            "Product": Product,
            "Comments": Comments,
        },
        data () {
            return {
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
                    /*width: '100%',
                    height: '240px',*/
                    autoplay: false,
                    playsinline: true,
                    showBuffer: true,
                    isLive: true,
                    useH5Prism: !0,
                    useFlashPrism: !1,
                    x5_video_position: "normal",
                    x5_type: "h5",
                    //useH5Prism: 'h5',
                    //x5_video_position: top,
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
                                //{name: 'volume', align: 'tr', x: 5, y: 10}

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
          this.room_id = this.$route.query.room_id > 0 ? this.$route.query.room_id : 9;
            this.getData();
            this.getLens();
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
                //that.musicFlag = true;
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


          if (!that.isAndroid) {
            that.playinit = 1;
          }

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
        },
        watch: {
            "$route"(){
            },
        },
        methods: {
            showMoreInfo (obj) {
                if ($(obj).hasClass('hide')) {
                    $(obj).removeClass('hide')
                } else {
                    $(obj).addClass('hide')
                }
            },
            initSwiper(){
                var that = this;
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
                //that.player.on('requestFullScreen', this.requestFullScreenHandel);
                if (that.aliplayer_config.autoplay) {
                  this.checkVideoPlayer(item);
                }


                that.currentVideo = item;
                that.initMusic();
                if(that.play_status == 2){ // 自动播放背景音乐
                  that.playBgMusic();
                }
            },
            switchContent (index) {
              $('.swiper-slide').each(function (item) {
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

                if(index == 1) {
                  $('.shoppingCarBox').show()
                  $('.sendMessMenu').hide()
                } else if (index == 2) {
                  $('.sendMessMenu').show()
                  $('.shoppingCarBox').hide()
                } else {
                  $('.shoppingCarBox').hide()
                  $('.sendMessMenu').hide()
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
                        console.log(that.play_status);
                        that.player = new Aliplayer(that.aliplayer_config);
                        that.player.on('x5requestFullScreen', this.fullScreenHandle);
                        that.player.on('x5cancelFullScreen', this.cancelFullScreenHandel);
                        //that.player.on('requestFullScreen', this.requestFullScreenHandel);
                        if ( that.aliplayer_config.autoplay) {
                          that.checkVideoPlayer(that.lens[0]);
                        }

                        that.currentVideo = that.lens[0]
                        that.initMusic();
                        if(that.play_status == 2){ // 自动播放背景音乐
                          that.playBgMusic();
                        }
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: res.message});
                    }
                }, (err) => {
                    that.$vux.loading.hide();
                });
            },
            countPrice(price){
                this.total_price = price;
            },
            tobuy(){
                var that = this;
                // 检测金额 起送金额
                if(that.deliver > 0 && parseInt(that.total_price) < parseInt(that.deliver)){
                    this.$vux.alert.show({
                        title: '温馨提示',
                        content: "满"+that.deliver+"元起送，基地包邮到家"});
                    return false;
                }

                this.$refs.product.buy_product(that.roomBasic.id,
                    that.roomBasic.room_name,
                    that.roomBasic.logo_pic,
                    that.roomBasic.mobile,
                );
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

                        // ios 自动播放音乐
                        if(that.play_status == 2){ // 自动播放背景音乐
                          that.musicFlag = true;
                          that.playBgMusic();
                        }
                        // ios 自动播放音乐

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
            window.location.href = this.roomBasic.addr_url;
          },

          // 进入同层全屏事件
          fullScreenHandle(){
            // 1、 播放音乐
            /*if(this.firstMusic){
              this.musicFlag = true;
              this.playBgMusic();
            }*/
            this.musicFlag = true;
            this.liveMusicObj.play();
            this.player.tag.style.height = window.height;
            // 2、 调整高度
            /*$(this.player.el()).addClass('enter-x5-player');
            var screenHeight = document.body.clientHeight*(window.devicePixelRatio||1)+ "px";
            this.player.tag.style.height = screenHeight;
            let video=$(this.player.tag);
            setTimeout(()=>{
                video.removeClass('x5-top-left');
            });*/
          },

          // 退出同层全屏事件
          cancelFullScreenHandel(){
            //this.showMusic = false;
            //this.showMusic = true;
            //this.musicFlag = false;
            //this.firstMusic = true;

            /*this.liveMusicObj.reload();
            this.lensMusicObj.reload();*/

            /*this.liveMusicObj.pause();
            this.lensMusicObj.pause();
            this.liveMusicObj.style.display = "none";
            this.lensMusicObj.style.display = "none";*/

            //退出全屏
            console.log('stopMUisc');
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
          }

        }

    }


</script>


<style scoped>
  .room-info .gallery-top, .tabCon, .con{width: 100%; height: 100% !important;}
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
  .outline_video{display: none !important;}
  .prism-player video{object-fit: fill !important;}
</style>
