<template>
    <div>
        <div class="video_info" v-for="item in videoList">
            <dl>
                <dt>
                    <div class="prism-player " id="J_prismPlayer"></div>
                    <div class="videoCover">
                        <img :src="item.pic_path">
                    </div>
                </dt>
                <dd>
                    <h3>{{item.name}}</h3>
                    <p>
                        <span>片长：{{item.vlength}}&nbsp;热度：{{item.click}}</span>
                        <span>
                        <a href="javascript:void(0);" class="zanIcon">赞</a>
                            <!--<a href="javascript:void(0);" class="replyIcon">回复</a>-->
                    </span>
                    </p>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        name: "room-video",
        data(){
            return {
                videoList:[],
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
        created(){
            this.getData();
        },
        methods:{
            getData(){
                let that = this;

                that.$vux.loading.show({
                    text: '加载中~'
                })

                that.axiosGet("/room/videos?id=9").then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.videoList = res.data.videos;
                        if(that.videoList.length > 0){
                            for(var video in that.videoList){
                                //that.aliplayer_config.source = video.
                                //    new Aliplayer(that.aliplayer_config);
                            }
                        }
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: res.data.info});
                    }
                }, (err) => {
                    that.$vux.loading.hide();
                });
            }
        }
    }
</script>

<style scoped>

</style>