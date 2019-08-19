<template>
  <div>
    <!--秘钥授权界面-->
    <div :class="auth_template == 1 ? 'secret-input auth_bg auth_bg_education':'secret-input auth_bg auth_bg_pets'" v-if="!localMobile && check_secret && !check_pass">
      <div class="auth_education">{{auth_template == 1 ? '家长远程观看' : '主人远程观看'}}</div>
      <div class="secret-input-box">
        <div class="input-container">
          <input type="text" oninput="if(value.length>11) value=value.slice(0,11)" class="input-box auth_mobile" name="auth_mobile" v-model="auth_mobile" placeholder="请输入手机号码">
        </div>
        <div class="input-container">
          <input type="text" oninput="if(value.length>4) value=value.slice(0,4)" class="input-box mobile_code" name="mobile-code" v-model="mobile_code" placeholder="请输入验证码">
          <div class="send_message auth_bg_color">
            <span class="send-code" @click="checkSecretKey" v-if="!smsStatus">{{smsModel}}</span>
            <span class="send-code" v-else>{{smsModel}}</span>
          </div>
          <!--<input type="text" class="secret-key" id="secret-input" v-model="secret_key" placeholder="请输入密码或手机号"/>-->
        </div>
        <div class="input-container tip-message" v-if="tip_message">
        {{tip_message}}
        </div>
        <div class="secret-input-btn">
          <x-button type="primary" class="auth_bg_color" @click.native="checkAuth">登录</x-button>
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
      <educate-news v-else-if="room_template == 10 || room_template == 13"></educate-news>
      <snapshot-new v-else-if="room_template == 11"></snapshot-new>
	  <snapshot-new-video v-else-if="room_template == 12"></snapshot-new-video>
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
  import snapshotNew from "./template/SnapshotNew"
  import snapshotNewVideo from "./template/SnapshotNewVideo"
  import educateNews from "./template/EducateNews"
  import wx from 'weixin-js-sdk'
  import { XButton } from 'vux'

  export default {
    name: "room_template",
    components: {roomMini, tea, educate, roomOld, roomNew, roomCommon,
      roomNoHome, roomCommonNoHome, XButton, snapshot, educateNews, snapshotNew, snapshotNewVideo},
    data() {
      return {
        'room_template': 0,
        'room_id': 0,
        'check_secret': 0,
        'secret_key': '',
        'showPage': false,
        'auth_mobile': '',
        'mobile_code': '',
        'smsModel': '获取验证码',
        'smsStatus': 0,
        'tip_message': '',
        'check_pass': false,
        'localMobile': "",
		auth_template: 1
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
      this.localMobile = localStorage.getItem("auth:room:"+this.room_id)
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
		  that.auth_template = res.data.auth_template;
          that.check_secret = res.data.secret;
          if (res.data.secret) {
            that.checkLocalStoreMobile();
          }
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
      checkLocalStoreMobile(){
        var that = this;
        var localStoreMobile = localStorage.getItem("auth:room:"+this.room_id);
        if (localStoreMobile) {
          var formdata = new URLSearchParams();
          formdata.append('id', this.room_id);
          formdata.append('secretKey', localStoreMobile);
          that.axiosPost("/room/check-secret", formdata).then((res) => {
            if(res.status == 200){
              if (res.data.check === true) {
                that.check_pass = true;
              } else {
				that.check_pass = false;
				localStorage.removeItem("auth:room:"+this.room_id, )
			  }
            }
          },(err) => {
            that.$vux.loading.hide();
          });
        }
      },
      checkSecretKey() {
        var that = this;
        if(! this.auth_mobile){
          this.tip_message = '请填写手机号码';
          return false;
        }else {
          this.tip_message = '';
        }

        that.$vux.loading.show({
          text: '加载中~'
        })
        var formdata = new URLSearchParams();
        formdata.append('id', this.room_id);
        formdata.append('secretKey', this.auth_mobile);
        that.axiosPost("/room/check-secret", formdata).then((res) => {
          that.$vux.loading.hide();
          if(res.status == 200){
            if (res.data.check) {
              that.sendSms();
            } else {
              that.tip_message = '无效手机号码';
            }
          } else {
            that.tip_message = res.message;
          }
        },(err) => {
          that.$vux.loading.hide();
        });
      },
      // 检测验证码 手机号码
      checkAuth() {
        var that = this;
        if(! this.auth_mobile || !this.mobile_code){
          this.$vux.alert.show({
            title: '温馨提示',
            content: "请填写手机号码、验证码"});
          return false;
        }

        that.$vux.loading.show({
          text: '加载中~'
        })
        var formdata = new URLSearchParams();
        formdata.append('id', this.room_id);
        formdata.append('mobile', this.auth_mobile);
        formdata.append('sms', this.mobile_code);
        that.axiosPost("/room/auth-room", formdata).then((res) => {
          that.$vux.loading.hide();
          if(res.status == 200){
            if (res.data.check) {
              localStorage.setItem("auth:room:"+that.room_id, that.auth_mobile);
              that.check_secret = false;
              window.scrollTo(0,0)   //页面滚动到顶部

            } else {
              that.$vux.alert.show({
                title: '温馨提示',
                content: res.message});
            }
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: res.message});
          }
        },(err) => {
          that.$vux.loading.hide();
        });
      },
      sendSms(){
        var that = this;
        if(this.smsStatus){
          return false;
        }

        if(!(/^1[34578]\d{9}$/.test(this.auth_mobile))){
          this.tip_message = "请输入正确的手机号码";
          return false;
        }
        //发送短信
        var formdata = new URLSearchParams();
        formdata.append('mobile', this.auth_mobile);
        that.axiosPost("/client/sms", formdata).then((res) => {
          that.$vux.loading.hide();
          if(res.status == 200){
            that.smsModel = 60;
            that.smsStatus = true;
            that.countDown();
          } else {
            that.smsStatus = 0;
            that.tip_message = res.message;
          }
        }, (err) => {
          that.smsStatus = 0;
          that.$vux.loading.hide();
        });


      },
      countDown(){
        if(this.smsModel == 1) {
          this.smsModel = "获取验证码";
          this.smsStatus = 0;
        } else {
          this.smsModel --;
          var that = this;
          setTimeout(function() {
            that.countDown();
          },1000)
        }
      }

    }
  }
</script>

<style scoped>

</style>
