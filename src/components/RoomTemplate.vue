<template>
  <div>
    <educate v-if="room_template == 8"></educate>
    <roomNew v-else-if="room_template == 2"></roomNew>
    <room-old v-else-if="room_template == 1"></room-old>
    <room-common v-else-if="room_template == 4"></room-common>
    <room-no-home v-else-if="room_template == 5"></room-no-home>
    <room-common-no-home v-else-if="room_template == 6"></room-common-no-home>
    <room-mini v-else-if="room_template == 9999"></room-mini>
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
  import wx from 'weixin-js-sdk'

  export default {
    name: "room_template",
    components: {roomMini, tea, educate, roomOld, roomNew, roomCommon, roomNoHome, roomCommonNoHome},
    data() {
      return {
        'room_template': 0,
        'room_id': 0
      }
    },
    created() {
      var that = this;
      this.room_template = this.$route.query.room_id;
      this.room_id = this.$route.query.room_id;

      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {    //判断是否是微信环境
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            // 小程序环境下逻辑
            if (that.room_id != 27 && that.room_id != 26 && that.room_id != 21) { // 排除教育定制版
              that.room_template = 9999;
            } else {
              that.getRoomTemplate();
            }
          } else {
            //非小程序环境下逻辑
            that.getRoomTemplate();
          }
        })
      } else {
        this.getRoomTemplate();
      }


    },
    methods: {

      getRoomTemplate() {
        var that = this;
        that.$vux.loading.show({
          text: '加载中~'
        })
        var formdata = new URLSearchParams();
        formdata.append('id', this.room_template);
        that.axiosPost("/room/template", formdata).then((res) => {
          that.$vux.loading.hide();
          that.room_template = res.data.template;
        });
      },

    }
  }
</script>

<style scoped>

</style>
