<template>
    <div class="comments">
        <h3 class="tit allMessIcon">全部评论({{total}})</h3>
        <div class="messList">
            <dl v-for="(item, index) in commentList">
                <dt>
                    <span :style="{backgroundImage:'url(' + item.thumb_img + ')'}"></span>{{item.nickname}}
                </dt>
                <dd>
                    <p>{{item.content}}</p>
                    <p>
                        <span>第{{++index}}楼&nbsp;{{item.date}}</span>
                        <span>
                            <a href="javascript:void(0);" :class="[item.start ? 'zanIcon2' : 'zanIcon']" @click="setStart(item)" >赞</a>
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
        name: "comment",
        inject: ['reload'],
        data(){
          return {
            commentList:[],
              total:0,
              openid:"",
              roomid: 0,

          };
        },
        created(){
            this.openid = localStorage.getItem('openid');
            this.roomid = localStorage.getItem('roomid');
            this.getData();
        },
        methods:{
            getData(){
                var that = this;
                var formdata = new FormData();
                formdata.append('openid', that.openid);
                formdata.append('id', that.roomid);
                that.axiosPost("/room/comments", formdata).then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        if(res.data.length > 0){
                            that.commentList =  res.data;
                            that.total = res.data.length;
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

            setStart(item){
                var that = this;

                if(that.subStatus){
                    return false;
                }

                item.start = item.start == 1 ? 0 : 1;
                that.subStatus = true;

                var formdata = new FormData();
                formdata.append('id', item.id);
                formdata.append('stype', 2);


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
            },
            setComment($content){
                var that = this;
                var formdata = new FormData();
                formdata.append('content', $content);
                formdata.append('id', that.roomid);

                that.axiosPost("/client/comment", formdata).then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        //that.commentList.push(res.data);
                        that.reload();
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: res.message});
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