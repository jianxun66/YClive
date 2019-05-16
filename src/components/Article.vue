<template>
    <div class="article-detail">
      <div class="title">{{articleInfo.title}}</div>
      <div class="room-name">{{articleInfo.name}}</div>
      <div class="content" v-html="articleInfo.content"></div>
      <div class="view-num" v-if="articleInfo.view_num > 0">阅读 {{articleInfo.view_num}}</div>
    </div>
</template>

<script>
    export default {
        name: "Article",
        data(){
          return {
            articleInfo: {
              title: '',
              name: '',
              content: '',
              view_num: 0,
              room_name:'',
              cover: '',
            },
            article_id: 0,
            room_id: 0,
          }
        },
        created() {
          this.room_id = this.$route.query.room_id > 0 ? this.$route.query.room_id : 0;
          this.article_id = this.$route.query.aid > 0 ? this.$route.query.aid : 0;
          this.getData();
        },
        methods:{
          getData(){
            var that = this;
            var formdata = new URLSearchParams();
            formdata.append('room_id', this.room_id);
            formdata.append('article_id', this.article_id);
            that.axiosPost("/room/article-detail", formdata).then((res) => {
              that.$vux.loading.hide();
              if(res.status == 200){
                that.articleInfo.content = res.data.content;
                that.articleInfo.title = res.data.title;
                that.articleInfo.name = res.data.room_name;
                that.articleInfo.view_num = res.data.click_num;
                that.articleInfo.cover = res.data.cover;

                that.WxShare(); //分享
              } else {
                this.$vux.alert.show({
                  title: '温馨提示',
                  content: res.message});
              }
            }, (err) => {
              that.$vux.loading.hide();
            });
          },
          WxShare() {
            var url = window.location.href;
            var that = this;
            var formdata = new URLSearchParams();
            formdata.append('open_id', this.openid);
            formdata.append('url', url);
            formdata.append('apis', "chooseWXPay,onMenuShareTimeline,onMenuShareAppMessage");

            that.axiosPost("/wechat/jssdk", formdata).then((res) => {
              that.$vux.loading.hide();
              if (res.status == 200) {
                that.$wechat.config(JSON.parse(res.data));
                that.$wechat.ready(function () {

                  var share_url = location.protocol + '//' + document.domain + '/front/#/article?room_id=' + that.room_id+'&aid='+that.article_id;
                  that.$wechat.onMenuShareAppMessage({
                    title: that.articleInfo.title,       // 分享标题
                    desc: that.articleInfo.name,   // 分享描述
                    link: share_url,       // 分享链接 默认以当前链接
                    imgUrl: that.articleInfo.cover,// 分享图标
                    // 用户确认分享后执行的回调函数
                    success: function () {

                    },
                    cancel: function () {
                      //console.log('分享到朋友取消');
                    }
                  });

                  that.$wechat.onMenuShareTimeline({
                    title: that.articleInfo.title,       // 分享标题
                    link: share_url,       // 分享链接 默认以当前链接
                    imgUrl: that.articleInfo.cover,// 分享图标
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
                  content: "微信参数错误"
                });
              }
            }, (err) => {
              that.$vux.loading.hide();
            });

          },
        }
    }
</script>

<style scoped>
  .article-detail{padding: 1rem 0.5rem;}
  .article-detail .title{font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;}
  .article-detail .room-name{color: #B4B4B4 !important; margin-bottom: 1rem;}
  .article-detail .content{margin-top: 0.5rem;}
  .article-detail .content img{max-width: 100%;}
  .article-detail .view-num{margin-top: 2rem; font-size: 0.9rem; color: #B1B1B1; margin-bottom: 1rem;}
</style>
