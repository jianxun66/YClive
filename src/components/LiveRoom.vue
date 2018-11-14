<template>
    <div class="room_info">
        <div class="swiper-slide">
            <div class="home_bg">
                <div class="logo"><img src="../../static/images/logo.png"></div>
            </div>
            <div class="homeBox">
                <p><img src="../../static/images/brandLogo.png"></p>
                <p>亚历亨生态茶园<br>
                    原生态有机种植基地</p>
                <p>全程有机栽培，不使用任何化肥、农药和除草剂，<br>采用花生麸，发酵6个月以上施肥！</p>
                <p>——24小时生态直播——<br>全程可视溯源</p>
                <button>进入生态直播</button>
                <div class="nextPage">
                    下拉全景生态介绍<br>
                    <img src="../../static/images/nextPageIcon.png">
                </div>
            </div>
        </div>
        <div class="swiper-slide" style="display: none">
            <div class="homeBottom">
                <img src="../../static/images/home1.png" >
                <div class="video">
                    <div class="logo"><img src="../../static/images/logo.png"></div>
                    <div class="prism-player " id="J_prismPlayer1"></div>
                </div>

                <a href="index_live.html"><img src="../../static/images/upIcon.png">点击进入生态直播间</a>
                <img src="../../static/images/home2.png" >
                <div class="video">
                    <div class="logo"><img src="../../static/images/logo.png"></div>
                    <div class="prism-player " id="J_prismPlayer2"></div>
                </div>

                <a href="index_live.html"><img src="../../static/images/upIcon.png">点击进入生态直播间</a>
                <img src="../../static/images/home3.png">
            </div>
        </div>
        <remote-script src="http://g.alicdn.com/de/prismplayer/2.7.1/aliplayer-min.js"></remote-script>
    </div>
</template>

<script>
    import importJs from "../../static/js/importJs";
    export default {
        name: "live-room",
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

        },

        methods:{

        }
    }
</script>

<style scoped>

</style>