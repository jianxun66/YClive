<template>
    <div>
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
</template>

<script>
    export default {
        name: "room-video",
        data(){
            return {
                videoList:[],
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                let that = this;
                that.subloading = true;
                that.axiosGet("/room/videos?id=9").then((res) => {
                    console.log(res);
                    that.subloading = false;
                    this.$nextTick(() => {
                        that.$refs.scrollerBottom.reset()
                    });
                    callBack(res.data);
                }, (err) => {
                    that.subloading = false;
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>

</style>