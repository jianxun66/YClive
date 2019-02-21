<template>
    <div class="room-info" v-wechat-title="$route.meta.title">
        <div class="video" @click="imgCover">
            <div class="prism-player " id="J_prismPlayer"></div>
            <div v-bind:class=" (play_status == 1 && playing === false ) || playinit === true ? 'videoCover online_video' : 'videoCover outline_video'" >
                <img :src="VideoCoverImg">
            </div>
            <div class="logo"><img src="../../static/images/logo.png"></div>
        </div>

        <div class="title">
            <dl>
                <dt>
                    <h1>
                        <span>{{roomBasic.room_name}}</span><span>{{roomBasic.click_num}}</span></h1>
                    <p>{{roomBasic.addr}}</p>
                </dt>
                <dd>
                    <span class="live" v-if="play_status == 1"><i></i>正在直播</span>
                     <span class="playback" v-if="play_status == 2"><i></i>精彩回放</span>
                    <!-- <span class="notPlay"><i></i>暂无直播</span>  -->
                </dd>
            </dl>
        </div>
        <div class="line"></div>
        <!-- Swiper -->
        <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper tabMenu">
                <div class="swiper-slide cur" @click="switchContent(0)">生态直播</div>
                <div class="swiper-slide" @click="switchContent(1)">生态商城</div>
                <div class="swiper-slide" @click="switchContent(2)">互动评论</div>
                <div class="swiper-slide" @click="switchContent(3)">精彩短片</div>
            </div>
        </div>

        <div class="swiper-container gallery-top">
            <div class="swiper-wrapper tabCon">
                <div class="swiper-slide con">
                    <h2 class="tit videoIcon">实时直播</h2>
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


                </div>
                <div class="swiper-slide con">
                    <div class="my-order">
                        <router-link :to="{path:'order/mylist'}"><span>我的订单></span></router-link>
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
                <div class="swiper-slide con">
                    <h2 class="tit messIcon">互动评论</h2>
                    <comments :room_id="room_id" @clearComment="clearParent" ref="comment" v-if="showComment"></comments>
                </div>
                <div class="swiper-slide con">
                    <h2 class="tit videoIcon">精彩短片</h2>
                    <div class="filmList">
                        <room-video :room_id="room_id"></room-video>
                    </div>
                    <div class="footerLogo">
                        <img src="../../static/images/footerLogo.png">
                    </div>
                </div>
            </div>
        </div>

        <div class="sendMessMenu" style="display: none">
            <div class="sendMessBox">
                <input type="text" value="" placeholder="输入评论内容..." v-model="comment">
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
        <remote-script src="https://g.alicdn.com/de/prismplayer/2.7.1/aliplayer-min.js"></remote-script>
    </div>
</template>


<script>
    import importJs from '../../static/js/importJs'
    import RoomVideo from "./RoomVideo"
    import Product from "./Product"
    import Comments from "./Comment"
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
                playing: false,
                playinit: false,
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
                }
            }
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        created() {
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
                // $(window).scrollTop(0)
                // $(this).fadeOut(800)
                that.playinit = false;
                that.checkVideoPlayer(that.currentVideo);
            })

            $('.company .remarks p').click(function () {
                if ($(this).hasClass('hide')) {
                    $(this).removeClass('hide')
                } else {
                    $(this).addClass('hide')
                }
            })


              if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                that.playinit = true;
              }

            //this.player = new Aliplayer(this.aliplayer_config);
        },
        watch: {
            "$route"(){
                /*if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
                    location.href = window.location.href + this.$route.path
                }*/
                /*if (window.location.href.indexOf('room') == -1) {
                    location.assign('/room?room_id='+this.$route.query.room_id);
                }*/
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
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
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
                    //item.vurl = item.vurl_reback;
                    //item.pic = item.reback_img;
                }

                that.currentVideo = item;
                that.player = new Aliplayer(that.aliplayer_config)
                // this.checkVideoPlayer(item);
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
                        } else {
                            that.aliplayer_config.isLive = false;
                            that.aliplayer_config.autoplay = true;
                            that.aliplayer_config.rePlay = true;
                            that.play_status = 2;
                        }

                        that.VideoCoverImg = that.lens[0].cover_img;
                        that.aliplayer_config.source = that.lens[0].vurl;
                        that.aliplayer_config.cover = that.lens[0].pic;
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
            countPrice(price){
                this.total_price = price;
            },
            tobuy(){
                var that = this;
                // 检测金额 起送金额
                if(that.deliver > 0 && that.total_price < that.deliver){
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
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: "微信参数错误"});
                    }
                }, (err) => {
                    that.$vux.loading.hide();
                });
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

            }
        }

    }


</script>


<style scoped>
    .online_video{display: block !important; z-index: 10}
    .outline_video{display: none;}
</style>
