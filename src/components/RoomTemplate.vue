<template>
  <div>
    <!--秘钥授权界面-->
    <div class="secret-input" v-if="check_secret">
      <div class="secret-input-box">
        <div>
          <input type="text" class="secret-key" id="secret-input" v-model="secret_key" placeholder="请输入密码或手机号"/>
        </div>
        <div class="secret-input-btn">
          <x-button type="primary" @click.native="checkSecretKey">提交</x-button>
        </div>
      </div>
    </div>
    <div v-else>
      <!--秘钥授权界面-->
      <educate v-if="room_template == 8"></educate>
      <room-old v-else-if="room_template == 1"></room-old>
      <roomNew v-else-if="room_template == 2"></roomNew>
      <room-common v-else-if="room_template == 4"></room-common>
      <room-no-home v-else-if="room_template == 5"></room-no-home>
      <room-common-no-home v-else-if="room_template == 6"></room-common-no-home>
      <snapshot v-else-if="room_template == 9"></snapshot>
      <educate-news v-else-if="room_template == 10"></educate-news>
      <room-mini v-else-if="room_template == 9999 && showPage"></room-mini>

    </div>

  </div>
</template>

<script>
  import tea from './template/Tea';
  import educate from './template/Educate';
  import roomOld from './template/RoomOld';
  import roomNew from './template/RoomNews';
  import roomCommon from './template/RoomCommon';
  import roomNoHome from './template/RoomNoHome';
  import roomCommonNoHome from './template/RoomCommonNoHome';
  import roomMini from "./template/RoomMini"
  import snapshot from "./template/Snapshot"
  import educateNews from "./template/EducateNews"
  import wx from 'weixin-js-sdk'
  import { XButton } from 'vux'

  export default {
    name: "room_template",
    components: {roomMini, tea, educate, roomOld, roomNew, roomCommon,
      roomNoHome, roomCommonNoHome, XButton, snapshot, educateNews},
    data() {
      return {
        'room_template': 0,
        'room_id': 0,
        'check_secret': 0,
        'secret_key': '',
        'showPage': false,
      }
    },
    mounted () {
      if (document.getElementById('secret-input')){
          document.getElementById('secret-input').addEventListener('blur',function(){
            window.scrollTo(0,0)   //页面滚动到顶部
          },
          false
        )
      }
    },
    created() {
      var that = this;
      //this.room_template = this.$route.query.room_id;
      this.room_id = this.$route.query.room_id;
      this.getRoomTemplate();
    },
    methods: {

      getRoomTemplate() {
        var that = this;
        that.$vux.loading.show({
          text: '加载中~'
        })
        that.showPage = true;
        var formdata = new URLSearchParams();
        formdata.append('id', this.room_id);
        that.axiosPost("/room/template", formdata).then((res) => {
          that.$vux.loading.hide();
          that.room_template = res.data.template;
          that.check_secret = res.data.secret;
          var ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {    //判断是否是微信环境
            wx.miniProgram.getEnv(function (resMini) {
              if (resMini.miniprogram) {
                // 小程序环境下逻辑
                if (that.room_id != 27 && that.room_id != 26 && that.room_id != 21) { // 排除教育定制版
                  that.room_template = 9999;
                }
              }
            })
          }


        });
      },
      checkSecretKey() {
        var that = this;
        if(! this.secret_key){
          this.$vux.alert.show({
            title: '温馨提示',
            content: '请填写密钥'});
          return false;
        }

        that.$vux.loading.show({
          text: '加载中~'
        })
        var formdata = new URLSearchParams();
        formdata.append('id', this.room_id);
        formdata.append('secretKey', this.secret_key);
        that.axiosPost("/room/check-secret", formdata).then((res) => {
          that.$vux.loading.hide();
          if(res.status == 200){
            //that.commentList.push(res.data);
            if (res.data.check) {
              that.check_secret = false;
              window.scrollTo(0,0)   //页面滚动到顶部
            } else {
              that.$vux.alert.show({
                title: '温馨提示',
                content: '请输入正确密钥'});
            }

          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        });
      },

    }
  }
</script>

<style scoped>
  .secret-input{width: 100%; height: 100%; background: white; position: absolute}
  .secret-input-box{position: absolute; top:42%; width: 80%; text-align: center; left: 10%;}
  .secret-input-box .secret-key{width: 100%; padding: 0.8rem; box-sizing: border-box; font-size: 1rem; border: 1px solid #DAD9DD}
  .secret-input-box .secret-input-btn{margin-top: 1rem; text-align: center}
</style>
