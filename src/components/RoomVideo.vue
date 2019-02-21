<template>
    <div>

        <div class="video_info" v-for=" item in videoList" ref="videoStyle">
            <dl>
                <dt class="video_title">
                    <div class="video_item">
                        <div class="prism-player-video"  :id="item.vno" @click="clickNum(item)" :style="{display: item.status == 1 ? 'none' : 'block', }"></div>
                    </div>
                    <img :src="item.pic" v-if="item.status == 1" @click="playervideo(item.vno, item.vurl, item)" >
                </dt>
                <dd>
                    <h3>{{item.name}}</h3>
                    <p>
                        <span>片长：{{item.vlength}}&nbsp;热度：{{item.click}}</span>
                        <span>
                        <a href="javascript:void(0);"  @click="videoStart(item)" :class="[item.start ? 'zanIcon2' : 'zanIcon']">赞</a>
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
        props: ['room_id'],
        data(){
            return {
                openid: "",
                subStatus: false,
                videoList:[],
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
            var width = document.body.clientWidth - 30;
            var height = (width * 9 ) / 16;
            this.video_height = height+ "px";
            this.aliplayer_config.height = this.video_height;

            this.openid = localStorage.getItem('openid');
            this.getData();
        },
        mounted(){

            //this.aliplayer_config.height = this.video_height;
            //$(".prism-player").height(height);
            //$(".video_title").height(height);
            /*$('.video_item').height(height);
            $(".prism-player-video").each(function () {
                console.log('aaaa');
            });

            console.log($(".prism-player-video").length);*/

        },
        methods:{
            getData(){
                var that = this;

                that.$vux.loading.show({
                    text: '加载中~'
                })

                var formdata = new URLSearchParams();
                //formdata.append('openid', that.openid);
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
            playervideo(id, source, item){
                item.status = 0;
                if(this.player.length > 0){
                    this.player.dispose() //销毁
                }
                var that = this;
                that.aliplayer_config.source = source;
                that.aliplayer_config.id = id;
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

            }

        }
    }
</script>

<style scoped>

</style>
