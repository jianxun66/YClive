<template>
    <div class="room-info">
        <div class="video">
            <div class="prism-player " id="J_prismPlayer"></div>
            <div class="videoCover">
                <img src="http://24live.oss-cn-shanghai.aliyuncs.com/live-image/kr/wc001.jpg">
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
                    <span class="live"><i></i>正在直播</span>
                    <!-- <span class="playback"><i></i>晚间回放</span>  -->
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
                        <dl class="live-1"  v-for="len in lens" @click="switchVideo(len.pic, len.vurl)">
                            <dt><img :src="len.pic"></dt>
                            <dd>{{len.name}}</dd>
                        </dl>
                    </div>
                    <h2 class="tit shopCarIcon">生态介绍</h2>
                    <div class="company">
                        <dl>
                            <dt>
                                <img src="../../static/images/brandLogo-2.png">
                            </dt>
                            <dd>
                                <h3><strong>刘老头米店</strong>五常稻花香</h3>
                                <p>
                                    <span>淘宝月销1万件</span>
                                </p>
                            </dd>
                        </dl>
                        <div class="remarks">
                            <span>生态简介：</span>
                            <p class="hide" @click.native="showMoreInfo(this)">
                                寒地黑土，一年种植一次。生米清香，米饭香甜劲道，松软可口不可回生。店家自产自销纯正五常稻花香大米，原生态种植，稻田里养鸭。</p>
                        </div>
                    </div>


                    <div><img src="../../static/images/homewc001.png"></div>


                </div>
                <div class="swiper-slide con">
                    <h2 class="tit shopCarIcon">生态商城</h2>
                    <div class="company">
                        <dl>
                            <dt>
                                <img src="../../static/images/brandLogo-2.png">
                            </dt>
                            <dd>
                                <h3><strong>刘老头米店</strong>五常稻花香</h3>
                                <p>
                                    <span>淘宝月销1万件</span>
                                </p>
                            </dd>
                        </dl>
                        <div class="remarks">
                            <span>生态简介：</span>
                            <p class="hide" @click.native="showMoreInfo(this)">
                                寒地黑土，一年种植一次。生米清香，米饭香甜劲道，松软可口不可回生。店家自产自销纯正五常稻花香大米，原生态种植，稻田里养鸭。</p>
                        </div>
                    </div>
                    <div class="shopList">
                        <product  ref="product" v-on:buy_price="countPrice"></product>
                    </div>
                </div>
                <div class="swiper-slide con">
                    <h2 class="tit messIcon">互动评论</h2>
                    <h3 class="tit allMessIcon">全部评论(4)</h3>
                    <div class="messList">
                        <dl>
                            <dt>
                                <span></span>云霄守日
                            </dt>
                            <dd>
                                <p>风景真好看，生态真的好！</p>
                                <p>
                                    <span>第1楼&nbsp;昨日16:11</span>
                                    <span>
								<a href="javascript:void(0);" class="zanIcon">赞</a>
								<a href="javascript:void(0);" class="replyIcon">回复</a>
							</span>
                                </p>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <span></span>云霄守日
                            </dt>
                            <dd>
                                <p>风景真好看，生态真的好！</p>
                                <p>
                                    <span>第1楼&nbsp;昨日16:11</span>
                                    <span>
								<a href="javascript:void(0);" class="zanIcon">赞</a>
								<a href="javascript:void(0);" class="replyIcon">回复</a>
							</span>
                                </p>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <span></span>云霄守日
                            </dt>
                            <dd>
                                <p>风景真好看，生态真的好！</p>
                                <p>
                                    <span>第1楼&nbsp;昨日16:11</span>
                                    <span>
								<a href="javascript:void(0);" class="zanIcon">赞</a>
								<a href="javascript:void(0);" class="replyIcon">回复</a>
							</span>
                                </p>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <span></span>云霄守日
                            </dt>
                            <dd>
                                <p>风景真好看，生态真的好！</p>
                                <p>
                                    <span>第1楼&nbsp;昨日16:11</span>
                                    <span>
								<a href="javascript:void(0);" class="zanIcon">赞</a>
								<a href="javascript:void(0);" class="replyIcon">回复</a>
							</span>
                                </p>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="swiper-slide con">
                    <h2 class="tit videoIcon">精彩短片</h2>
                    <div class="filmList">
                        <room-video></room-video>
                    </div>
                    <div class="footerLogo">
                        <img src="../../static/images/footerLogo.png">
                    </div>
                </div>
            </div>
        </div>

        <div class="sendMessMenu" style="display: none">
            <div class="sendMessBox">
                <input type="text" value="" placeholder="输入评论内容...">
                <button></button>
            </div>
        </div>

        <div class="shoppingCarBox" style="display: none">
            <dl>
                <dt>
                    <h4>&yen;{{total_price}}</h4>
                    <p>满100元起送，包邮顺丰次日达</p>
                </dt>
                <dd>
                    <a href="javascript:void(0)" @click="tobuy">去结算</a>
                </dd>
            </dl>
        </div>


        <div class="liveHome"><img src="../../static/images/homewc001.png"></div>
        <remote-script src="http://g.alicdn.com/de/prismplayer/2.7.1/aliplayer-min.js"></remote-script>
    </div>
</template>


<script>
    import importJs from '../../static/js/importJs'
    import RoomVideo from "./RoomVideo"
    import Product from "./Product"
    export default {
        name: 'index',
        components:{
            "room-video": RoomVideo,
            "Product": Product,
        },
        data () {
            return {
                total_price: 0,
                lens:{},
                player_souce: {
                    live_1: {
                        source: 'http://aliplay.adaxiang.com/kr/wc001.m3u8',
                        cover: 'http://24live.oss-cn-shanghai.aliyuncs.com/live-image/kr/wc001.jpg',
                    },
                    hf_1: {
                        source: 'https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0001.mp4',
                        cover: 'https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0001.jpg',
                    },
                    hf_2: {
                        source: 'https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0002.mp4',
                        cover: 'https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0002.jpg',
                    },
                },
                player: {},
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
                    source: 'http://aliplay.adaxiang.com/kr/wc001.m3u8',
                    cover: '',
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
                    click_num: '',
                    introduce: '',
                    content: '',
                    cover_img: '',
                    coordinate: '',
                    addr_url: '',
                    addr: '',
                    logo_img: '',
                }
            }
        },
        created() {
            this.getData();
            this.getLens();
        },
        mounted () {
            $('.prism-big-play-btn').click(function () {
                $('.videoCover').fadeOut()
            })

            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            })

            var galleryTop = new Swiper('.gallery-top', {
                autoHeight: true, //enable auto height
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs
                }
            })


            var height = $('.prism-player').width()
            $('.prism-player').height(height / 16 * 9)

            $('.liveHome').click(function () {
                $(window).scrollTop(0)
                $(this).fadeOut(800)
            })

            $('.company .remarks p').click(function () {
                if ($(this).hasClass('hide')) {
                    $(this).removeClass('hide')
                } else {
                    $(this).addClass('hide')
                }
            })

            this.player = new Aliplayer(this.aliplayer_config);
        },
        methods: {
            showMoreInfo (obj) {
                if ($(obj).hasClass('hide')) {
                    $(obj).removeClass('hide')
                } else {
                    $(obj).addClass('hide')
                }
            },
            switchVideo (pic, url) {
                $('.videoCover').fadeOut()
                this.player.dispose() //销毁
                $('#J_prismPlayer').empty() //id为html里指定的播放器的容器id
                this.aliplayer_config.cover = pic
                this.aliplayer_config.source = url

                this.player = new Aliplayer(this.aliplayer_config)
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
                let that = this;
                that.axiosGet("/room/info?id=1").then((res) => {
                    that.roomBasic.room_name = res.data.room_name;
                    that.roomBasic.logo_img = res.data.logo_img;
                    that.roomBasic.click_num = res.data.click_num;
                    that.roomBasic.addr_url = res.data.addr_url;
                    that.roomBasic.addr = res.data.addr;
                    that.roomBasic.coordinate = res.data.coordinate;
                    that.roomBasic.cover_img = res.data.cover_img;
                    that.roomBasic.introduce = res.data.introduce;
                    that.roomBasic.content = res.data.content;
                    that.roomBasic.logo_pic = res.data.logo_pic;
                }, (err) => {
                    console.log(err);
                });
            },
            getLens(){
                var that = this;
                that.axiosGet("/room/lens?id=9").then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.lens = res.data;
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
                this.$refs.product.buy_product(that.roomBasic.id,
                    that.roomBasic.room_name,
                    that.roomBasic.logo_pic,
                    "13750509674",
                );
            }
        }

    }


</script>


<style scoped>

</style>
