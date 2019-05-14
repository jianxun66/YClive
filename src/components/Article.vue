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
              } else {
                this.$vux.alert.show({
                  title: '温馨提示',
                  content: res.message});
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
