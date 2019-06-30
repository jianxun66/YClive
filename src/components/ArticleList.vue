<template>
  <div class="article-list">
    <div class="article-item" v-for="(item, index) in articleList" @click="goArticle(item)">
      <div class="title">
        <span class="spot">·</span>{{item.title}}
      </div>
      <div class="cover">
        <img :src="item.pic_path"/>
      </div>
      <div class="date">
        <span>{{item.created_at}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ArticleList",
    props: ['room_id'],
    data() {
      return {
        articleList: [],
        page:1,
      }
    },
    created() {
      this.getArticleList();
    },
    mounted() {
      var that = this;
      $(function () {
        // 监听滑动高度
        $(window).scroll(function () {

          // 加载更多文章
          var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
          var scrollHeight = $(document).height();   //当前页面的总高度
          var clientHeight = $(this).height();    //当前可视的页面高度
          if (scrollTop + clientHeight >= scrollHeight && !that.loadding && !that.roomEnd) {
            that.getArticleList();
          }
        });
      });
    },
    methods: {
      // 获取文章列表
      getArticleList() {
        var that = this;
        that.loadding = true;
        var formdata = new URLSearchParams();
        formdata.append('page', that.page);
        formdata.append('room_id', that.room_id);
        that.axiosPost("/room/article", formdata).then((res) => {
          that.loadding = false;
          that.$vux.loading.hide();
          if (res.status == 200) {
            if (res.data.length > 0) {
              res.data.forEach((v, k) => {
                that.articleList.push(v);
              })
              that.page++;
            } else {
              that.roomEnd = true;
            }
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message
            });
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },
      goArticle(item){
        this.$router.push({path: '/article', query:{room_id:item.room_id, aid: item.id, from:"groupmessage", isappinstalled:0}})
        /*if(this.DEBUG == 1){
          this.$router.replace({path: '/article', query:{room_id:item.room_id, aid: item.id, from:"groupmessage", isappinstalled:0}})
        } else {
          window.location.replace(location.protocol + '//' + document.domain+'/front/#/article?room_id='+item.room_id+'&aid='+item.id);
        }*/
      }
    }
  }
</script>

<style scoped>

</style>
