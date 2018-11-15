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
                        <span>刘老头米店 五常稻花香</span><span>1284</span></h1>
                    <p>黑龙江五常市向阳镇电力村</p>
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
                <div class="swiper-slide con" >
                    <h2 class="tit videoIcon">实时直播</h2>
                    <div class="videoList swiper-no-swiping">
                        <dl class="live-1" @click="switchVideo('live_1')">
                            <dt><img src="http://24live.oss-cn-shanghai.aliyuncs.com/live-image/kr/wc001.jpg"></dt>
                            <dd>实时全景1号</dd>
                        </dl>
                        <dl class="hf-1" @click="switchVideo('hf_1')">
                            <dt><img src="https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0001.jpg"></dt>
                            <dd>9月收割前</dd>
                        </dl>
                        <dl class="hf-2" @click="switchVideo('hf_2')">
                            <dt><img src="https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0002.jpg"></dt>
                            <dd>10月雪景</dd>
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
                            <p class="hide" @click.native="showMoreInfo(this)">寒地黑土，一年种植一次。生米清香，米饭香甜劲道，松软可口不可回生。店家自产自销纯正五常稻花香大米，原生态种植，稻田里养鸭。</p>
                        </div>
                    </div>


                    <div><img src="../../static/images/homewc001.png"></div>



                </div>
                <div class="swiper-slide con" >
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
                            <p class="hide" @click.native="showMoreInfo(this)">寒地黑土，一年种植一次。生米清香，米饭香甜劲道，松软可口不可回生。店家自产自销纯正五常稻花香大米，原生态种植，稻田里养鸭。</p>
                        </div>
                    </div>
                    <div class="shopList">
                        <dl>
                            <dt><img src="../../static/images/demo/6.png"></dt>
                            <dd>
                                <h3>正宗五常稻花香大米500g</h3>
                                <p>寒地黑土，一年种植一次。生米清香，米饭香甜劲道，松软可口不可回生。</p>
                                <span class="money">&yen;5.8</span>
                                <span class="num">
							<a href="javascript:void(0);">-</a>
							<i>0</i>
							<a href="javascript:void(0);">+</a>
						</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt><img src="../../static/images/demo/6.png"></dt>
                            <dd>
                                <h3>正宗五常稻花香大米5kg包邮简装</h3>
                                <p>寒地黑土，一年种植一次。生米清香，米饭香甜劲道，松软可口不可回生。</p>
                                <span class="money">&yen;55</span>
                                <span class="num">
							<a href="javascript:void(0);">-</a>
							<i>0</i>
							<a href="javascript:void(0);">+</a>
						</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt><img src="../../static/images/demo/6.png"></dt>
                            <dd>
                                <h3>正宗五常稻花香大米5kg包邮礼盒</h3>
                                <p>寒地黑土，一年种植一次。生米清香，米饭香甜劲道，松软可口不可回生。</p>
                                <span class="money">&yen;68</span>
                                <span class="num">
							<a href="javascript:void(0);">-</a>
							<i>0</i>
							<a href="javascript:void(0);">+</a>
						</span>
                            </dd>
                        </dl>

                    </div>
                </div>
                <div class="swiper-slide con" >
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
                <div class="swiper-slide con" >
                    <h2 class="tit videoIcon">精彩短片</h2>
                    <div class="filmList">
                        <dl>
                            <dt><img src="http://24live.oss-cn-shanghai.aliyuncs.com/live-image/kr/wc001.jpg"></dt>
                            <dd>
                                <h3>8月清晨云雾生态</h3>
                                <p>
                                    <span>片长：10秒&nbsp;热度：2,289</span>
                                    <span>
								<a href="javascript:void(0);" class="zanIcon">赞</a>
								<a href="javascript:void(0);" class="replyIcon">回复</a>
							</span>
                                </p>
                            </dd>
                        </dl>
                        <dl>
                            <dt><img src="http://24live.oss-cn-shanghai.aliyuncs.com/live-image/kr/wc001.jpg"></dt>
                            <dd>
                                <h3>8月清晨云雾生态</h3>
                                <p>
                                    <span>片长：10秒&nbsp;热度：2,289</span>
                                    <span>
								<a href="javascript:void(0);" class="zanIcon">赞</a>
								<a href="javascript:void(0);" class="replyIcon">回复</a>
							</span>
                                </p>
                            </dd>
                        </dl>
                        <dl>
                            <dt></dt>
                            <dd>
                                <h3>8月清晨云雾生态</h3>
                                <p>
                                    <span>片长：10秒&nbsp;热度：2,289</span>
                                    <span>
								<a href="javascript:void(0);" class="zanIcon">赞</a>
								<a href="javascript:void(0);" class="replyIcon">回复</a>
							</span>
                                </p>
                            </dd>
                        </dl>
                        <dl>
                            <dt></dt>
                            <dd>
                                <h3>8月清晨云雾生态</h3>
                                <p>
                                    <span>片长：10秒&nbsp;热度：2,289</span>
                                    <span>
								<a href="javascript:void(0);" class="zanIcon">赞</a>
								<a href="javascript:void(0);" class="replyIcon">回复</a>
							</span>
                                </p>
                            </dd>
                        </dl>
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

        <div class="shoppingCarBox"style="display: none">
            <dl>
                <dt>
                    <h4>&yen;0</h4>
                    <p>满100元起送，包邮顺丰次日达</p>
                </dt>
                <dd>
                    <a href="javascript:void(0)">去结算</a>
                </dd>
            </dl>
        </div>


        <div class="liveHome"><img src="../../static/images/homewc001.png"></div>
        <remote-script src="http://g.alicdn.com/de/prismplayer/2.7.1/aliplayer-min.js"></remote-script>
    </div>
</template>


<script>
    import importJs from "../../static/js/importJs";
    export default {
        name: "index",
        data(){
            return {
                player_souce: {
                    live_1: {
                        source: "http://aliplay.adaxiang.com/kr/wc001.m3u8",
                        cover: "http://24live.oss-cn-shanghai.aliyuncs.com/live-image/kr/wc001.jpg",
                    },
                    hf_1: {
                        source: "https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0001.mp4",
                        cover: "https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0001.jpg",
                    },
                    hf_2: {
                        source: "https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0002.mp4",
                        cover: "https://24live.oss-cn-shanghai.aliyuncs.com/live-jingcai/wc001/wc0002.jpg",
                    },
                },
                player:{},
                aliplayer_config:{
                    id: 'J_prismPlayer',
                    width: '100%',
                    height:'240px',
                    autoplay: false,
                    playsinline:true,
                    showBuffer:true,
                    isLive:true,
                    x5_type:true,
                    //支持播放地址播放,此播放优先级最高
                    source : 'http://aliplay.adaxiang.com/kr/wc001.m3u8',
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
            $(".prism-big-play-btn").click(function(){
                $(".videoCover").fadeOut();
            });

            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            });

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
            });

            this.player = new Aliplayer(this.aliplayer_config);

            var height = $(".prism-player").width();
            $(".prism-player").height(height/16*9);

            $('.liveHome').click(function(){
                $(window).scrollTop(0);
                $(this).fadeOut(800);
            });

            $(".company .remarks p").click(function(){
                if($(this).hasClass('hide')){
                    $(this).removeClass('hide');
                }else{
                    $(this).addClass('hide');
                }
            });
        },
        methods:{
            showMoreInfo(obj){
                if($(obj).hasClass('hide')){
                    $(obj).removeClass('hide');
                }else{
                    $(obj).addClass('hide');
                }
            },
            switchVideo(target){
                $(".videoCover").fadeOut();
                this.player.dispose(); //销毁
                $('#J_prismPlayer').empty(); //id为html里指定的播放器的容器id
                var cover = this.player_souce[target].cover;
                var source = this.player_souce[target].source;
                this.aliplayer_config.cover = cover;
                this.aliplayer_config.source = source;

                this.player = new Aliplayer(this.aliplayer_config);
            },
            switchContent(index){
                switch (index) {
                    case 0:
                        $(".shoppingCarBox").hide();
                        $(".sendMessMenu").hide();
                        break;
                    case 1:
                        $(".shoppingCarBox").fadeIn();
                        $(".sendMessMenu").hide();
                        break;
                    case 2:
                        $(".sendMessMenu").fadeIn();
                        $(".shoppingCarBox").hide();
                        break;
                    case 3:
                        $(".shoppingCarBox").hide();
                        $(".sendMessMenu").hide();
                        break;
                    default:
                }
            }
        }



    }


</script>


<style scoped>

</style>
