<template>
    <div class="comments">
        <!--<h3 class="tit allMessIcon">全部评论({{total}})</h3>-->
        <h3 class="tit">全部评论({{total}})</h3>
        <div class="messList">
            <dl v-for="(item, index) in commentList">
                <dt>
                    <span :style="{backgroundImage:'url(' + item.thumb_img + ')'}"></span>{{item.nickname}}
                </dt>
                <dd>
                    <p>{{item.content}}</p>
                    <p>
                        <span>第{{commentList.length - index}}楼&nbsp;{{item.date}}</span>
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
  import { cookie } from 'vux'
    export default {
        name: "comment",
        inject: ['reload'],
        props: ['room_id'],
        data(){
          return {
            commentList:[],
              total:0,
              roomid: 0,
              openid: "",

          };
        },
        created(){
            this.openid = localStorage.getItem('openid');
            this.getData();
        },
        methods:{
            getData(){
                var that = this;
                var formdata = new URLSearchParams();
                formdata.append('id', that.room_id);
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

                var formdata = new URLSearchParams();
                //formdata.append('openid', that.openid);
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
            setComment(content){
              // 检测是否登录
              if(!cookie.get('uid')){
                this.$vux.alert.show({
                  title: '温馨提示',
                  content: '请先登录'});

                cookie.set('refer', '/room?room_id='+this.room_id, {
                  path: '/',
                  expires: 7200
                });
                this.$router.replace({path: '/auth'});
                return false;
              }
                content = content.replace(/\s+/g,"");
                if(!content){
                    this.$vux.alert.show({
                        title: '温馨提示',
                        content: '请填写评论内容'});
                    return false;
                }

                var that = this;
                var formdata = new URLSearchParams();
                formdata.append('content', content);
                formdata.append('id', that.room_id);

                that.axiosPost("/client/comment", formdata).then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        content = "";
                        //that.commentList.push(res.data);
                        that.$emit('clearComment', '')
                        that.getData();
                    } else {
                        that.$vux.alert.show({
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
