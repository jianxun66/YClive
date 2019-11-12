<template>
    <div class="live-index-container live-h100">
      <div class="header" id="top">
        <live-head :room_name="roomName" @searchRoom="searchRoom"></live-head>
        <div class="live-menu-bar">
          <div class="swiper-container" id="nav">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, key) in menuList" :key="key">
                <span :class="key == 0 ? 'active' : 0 " :category="item.id">{{item.title}}</span>
              </div>

            </div>
          </div>
        </div>
        <div class="live-header-bg"></div>
      </div>
      <div class="live-main swiper-container" id="page">
          <div class="swiper-wrapper">
            <div class="swiper-slide slidepage swiper-no-swiping">
              <div class="live-main-container" id="live-main-container1">
              <!--轮播图-->
              <div class="swiper-container banner">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(bitem , bkey) in bannerList" :key="bkey">
                    <img  @click="goBanner(bitem)" @click.stop :src="bitem.cover">
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
              <!--轮播图-->

              <!--活动通知-->
              <div class="live-activity" v-if="activity &&activity.hasOwnProperty('title') && activity.title">
                <div class="live-activity-head">活动</div>
                <div class="live-activity-box">
                  <div class="live-activity-content">
                    <div class="live-activity-title">
                      {{activity.title}}
                    </div>
                    <div>
                      <span class="live-activity-date">{{activity.activity_time}}</span>
                      <span class="live-color">开始热播</span>
                    </div>
                  </div>
                </div>
                <div class="live-activity-btn" @click="goActivity(activity)">围观</div>
              </div>
              <!--活动通知-->

              <!--列表标题-->
              <div class="live-lists-head">
                热点推荐
              </div>
              <!--列表标题-->

              <!--直播列表-->
              <div class="live-lists-content">
                <ul class="live-items">
                  <li class="live-item" v-for="(roomItem, roomKey) in roomList" :key="roomKey" @click="goRoom(roomItem)">
                    <div class="live-item-show">
                      <img :src="roomItem.online_cover"/>
                    </div>
                    <div class="live-item-des">
                      <div class="live-item-info">
                        <div class="live-item-title">
                          {{roomItem.title}}
                        </div>
                        <div class="live-item-intro">
                          {{roomItem.intro}}
                        </div>
                      </div>
                      <span class="live-item-view">{{roomItem.click_num}}</span>
                    </div>
                  </li>

                </ul>

              </div>
              <!--直播列表-->
              </div>
            </div>
            <!--第二页面-->
            <div class="swiper-slide slidepage swiper-no-swiping"
                 v-for="(item, key) in menuList" :key="key"  v-if="key > 0">
              <div class="live-lists-content live-main-container" :id="'live-main-container'+item.id">
                <ul class="live-items live-items-all">
                  <li class="live-item" v-for="(roomItem, roomKey) in roomList" :key="roomKey" @click="goRoom(roomItem)">
                    <div class="live-item-show">
                      <img :src="roomItem.online_cover"/>
                    </div>
                    <div class="live-item-des">
                      <div class="live-item-info">
                        <div class="live-item-title">
                          {{roomItem.title}}
                        </div>
                        <div class="live-item-intro">
                          {{roomItem.intro}}
                        </div>
                      </div>
                      <span class="live-item-view">{{roomItem.click_num}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

      </div>
      <live-footer :findex="findex"></live-footer>
    </div>
</template>

<script>
  import LiveHead from './LiveHead'
  import LiveFooter from './LiveFooter'
  import { LoadMore } from 'vux'
  export default {
    name: "IndexNew",
    components: {LiveHead, LiveFooter, LoadMore},
    data(){
      return {
        pageSize: 1,
        findex: 'live',
        activity:{},
        bannerList:[],
        menuList: [],
        roomList: [],
        bannerSwiper: {},
        pageSwiper:{},
        navSwiper: {},
        loadding: false,
        roomEnd: false,
        roomType: 2, // 1 列表 2 推荐
        categoryId: 1,
        roomName: '',
        containerId: "live-main-container1",
        currentSwiperId: 0,
      }
    },
    watch:{
      $route(){
        /*this.roomType = 1;
        this.roomName = this.$route.query.room_name;
        this.getRoomList();
        this.pageSwiper.slideTo(1, 300);*/
      }
    },
    created(){
      this.getHeader();
      this.getBanner();
      this.getActivity();

      if(this.$route.query.room_name){ // 带搜索内容
        this.roomType = 1;
        this.roomName = this.$route.query.room_name;
      }
      this.getRoomList();
    },
    mounted(){
      var that = this;
      window.addEventListener('scroll', this.handleScroll, true);

      setTimeout(function () {
        if(that.$route.query.room_name){ // 带搜索内容
          that.pageSwiper.slideTo(1, 300);
        }
      }, 1500);

    },
    destroyed(){
      window.removeEventListener('scroll',this.handleScroll, false)
    },
    methods:{
      initSwiperMenu(){
        var that = this;
        var tSpeed = 300;
        var navSum, progress, slideProgress, activeIndex, activeSlidePosition,navActiveSlideLeft;
        var clientWidth, navWidth, navSlideWidth, bar, clickIndex, clickSlide;

        // 菜单轮播
        that.navSwiper = new Swiper('#nav', {
          slidesPerView: 5,
          freeMode: true,
          observer:true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          on: {
            init: function() {
              navSlideWidth = this.slides.eq(0).css('width'); //导航字数需要统一,每个导航宽度一致
              bar = this.$el.find('.bar')
              bar.css('width', navSlideWidth)
              bar.transition(tSpeed);
              navSum = this.slides.length > 0 ? this.slides[this.slides.length - 1].offsetLeft  : 0//最后一个slide的位置

              clientWidth = parseInt(this.$wrapperEl.css('width')) //Nav的可视宽度
              navWidth = 0
              for (var i = 0; i < this.slides.length; i++) {
                navWidth += parseInt(this.slides.eq(i).css('width'))
              }

            },
          },
        });

        that.navSwiper.$el.on('touchstart', function(e) {
          e.preventDefault() //去掉按压阴影
        })

        that.navSwiper.on('tap', function(e) {
          clickIndex = this.clickedIndex
          clickSlide = this.slides.eq(clickIndex)
          that.pageSwiper.slideTo(clickIndex, 0);
          this.slides.find('span').css('font-size', '1rem');
          clickSlide.find('span').css('font-size', '1.2rem');
          that.categoryId = clickSlide.find('span').attr('category');
          // 初始化页面列表数据
          that.changeRoomList(clickIndex);
          that.currentSwiperId = this.clickedIndex;
        });

        // 内容左右滑动
        that.pageSwiper = new Swiper('#page', {
          watchSlidesProgress: true,
          resistanceRatio: 0,
          noSwiping : true,
          observer:true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          on: {
            touchMove: function() {
              progress = this.progress
              bar.transition(0)
              bar.transform('translateX(' + navSum * progress + 'px)')
              //粉色255,72,145灰色51,51,51
              for (var i = 0; i < this.slides.length; i++) {
                slideProgress = this.slides[i].progress
                if (Math.abs(slideProgress) < 1) {
                  //navSwiper.slides.eq(i).find('span').css('color', 'rgba(' + r + ',' + g + ',' + b + ',1)')
                  that.navSwiper.slides.eq(i).find('span').css('font-size', '1.2rem')
                }
              }
            },
            transitionStart: function() {
              activeIndex = this.activeIndex
              activeSlidePosition = that.navSwiper.slides[activeIndex].offsetLeft
              //释放时导航粉色条移动过渡
              bar.transition(tSpeed)
              bar.transform('translateX(' + activeSlidePosition + 'px)')
              //释放时文字变色过渡
              that.navSwiper.slides.eq(activeIndex).find('span').transition(tSpeed)
              that.navSwiper.slides.eq(activeIndex).find('span').css('font-size', '1.2rem')
              if (activeIndex > 0) {
                that.navSwiper.slides.eq(activeIndex - 1).find('span').transition(tSpeed)
                that.navSwiper.slides.eq(activeIndex - 1).find('span').css('font-size', '1rem')
              }
              if (activeIndex < this.slides.length) {
                that.navSwiper.slides.eq(activeIndex + 1).find('span').transition(tSpeed)
                that.navSwiper.slides.eq(activeIndex + 1).find('span').css('font-size', '1rem')
              }
              //导航居中
              navActiveSlideLeft = that.navSwiper.slides[activeIndex].offsetLeft //activeSlide距左边的距离
              that.navSwiper.setTransition(tSpeed)
              navSlideWidth = that.navSwiper.slides.eq(0).css('width')
              navWidth = 0;
              for (var i = 0; i < that.navSwiper.slides.length; i++) {
                navWidth += parseInt(that.navSwiper.slides.eq(i).css('width'))
              }

              if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
                that.navSwiper.setTranslate(0)
              } else if (navActiveSlideLeft > (navWidth - ((parseInt(navSlideWidth) + clientWidth) / 2) )) {
                that.navSwiper.setTranslate(clientWidth - navWidth)
              } else {
                that.navSwiper.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
              }
              // 初始化页面列表数据
              that.categoryId = that.navSwiper.slides.eq(activeIndex).find('span').attr('category');
              that.changeRoomList(activeIndex);
            },

          }

        });
      },
      initSwiperBanner(){
        //轮播图
        this.bannerSwiper = new Swiper('.banner', {
          loop: true,
          observer:true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            bulletActiveClass: 'live-banner-active',
          },
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
        });
      },
      getHeader(){
        var that = this;
        var formdata = new URLSearchParams();

        that.axiosPost("/live/category", formdata).then((res) => {
          if(res.status == 200){
            that.menuList = res.data;
            //that.initSwiperMenu();
            setTimeout(that.initSwiperMenu(), 1500);
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },
      getRoomList(){
        var that = this;
        if(that.loadding) {
          return false;
        }

        that.$vux.loading.show({
          text: '加载中~'
        })

        that.loadding = true;
        var formdata = new URLSearchParams();
        formdata.append('room_type', that.roomType);
        formdata.append('room_name', that.roomName);
        formdata.append('page', that.pageSize);
        formdata.append('category', that.categoryId);
        that.axiosPost("/live/room", formdata).then((res) => {
          that.loadding = false;
          that.$vux.loading.hide();
          if(res.status == 200){
            if(res.data.length > 0) {
              res.data.forEach((v, k) => {
                that.roomList.push(v);
              })
              that.pageSize++;
            } else {
              that.roomEnd = true;
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

      // 切换列表数据
      changeRoomList(index){
        this.pageSize = 1;
        this.roomList = [];
        this.roomEnd = false;
        if(index == 0) { // 首页
          this.roomType = 2;
        } else { // 分类页面
          this.roomType = 1;
        }
        this.getRoomList();
      },
      // 获取最新活动
      getActivity(){
        var that = this;
        var formdata = new URLSearchParams();

        that.axiosPost("/live/activity", formdata).then((res) => {
          if(res.status == 200){
            that.activity = res.data;
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },
      // 获取轮播图
      getBanner(){
        var that = this;
        var formdata = new URLSearchParams();

        that.axiosPost("/live/banner", formdata).then((res) => {
          if(res.status == 200){
            that.bannerList = res.data;
			that.initSwiperBanner();
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        }, (err) => {
          that.$vux.loading.hide();
        });
      },

      // 活动详情
      goActivity(item){
        if(item.activity_url){
          this.goUrl(item.activity_url);
        }
      },

      // 轮播图跳转
      goBanner(item){
        if(item.links){
          this.goUrl(item.links);
        }
      },

      goUrl(url) {
        //window.location.replace(url);
        window.location.href = url;
      },

      goRoom(item) {
        if(this.DEBUG == 1){
          this.$router.replace({path: '/room', query:{room_id:item.room_id, from:"groupmessage", isappinstalled:0}})
        } else {
          window.location.replace(location.protocol + '//' + document.domain+'/front/#/room?room_id='+item.room_id)
        }
      },
      // 滑动监听
      handleScroll(){
        var that = this;
        if (document.getElementById("live-main-container"+that.categoryId)) {
          var clientHeight = document.getElementById("live-main-container"+that.categoryId).clientHeight;
          // 设备/屏幕高度
          var scrollObj = document.getElementById("live-main-container"+that.categoryId); // 滚动区域
          var scrollTop = scrollObj.scrollTop; // div 到头部的距离
          var scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
          if((clientHeight + scrollTop + 1) >= scrollHeight && !that.loadding && !that.roomEnd){
            this.getRoomList();
          }
        }

      },
      searchRoom(){
        if(this.$route.query.room_name){ // 带搜索内容
          this.roomList = [];
          this.pageSize = 1;
          this.roomType = 1;
          this.roomName = this.$route.query.room_name;
          this.pageSwiper.slideTo(1, 300);
          this.getRoomList();
        }
      },
    }
  }
</script>
<style>
</style>
<style scoped>

</style>
