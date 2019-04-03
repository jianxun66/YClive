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
  import importJs from '../../static/js/importJs'
  import tea from './template/Tea';
  import educate from './template/Educate';
  import roomOld from './template/RoomOld';
  import roomNew from './template/RoomNews';
  import roomCommon from './template/RoomCommon';
  import roomNoHome from './template/RoomNoHome';
  import roomCommonNoHome from './template/RoomCommonNoHome';
  import roomMini from "./template/RoomMini"
    export default {
      name: "room_template",
      components:{roomMini, tea, educate, roomOld, roomNew, roomCommon, roomNoHome, roomCommonNoHome},
      data(){
          return {
            'room_template': 0,
            'room_id': 0
          }
      },
      created(){
        var that = this;
        this.room_template = this.$route.query.room_id;
        this.room_id = this.$route.query.room_id;
		
		if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
			//document.addEventListener('WeixinJSBridgeReady', this.ready, false)
			this.getRoomTemplate();
		  } else {
			
			if (this.room_id != 27 && this.room_id != 26 && this.room_id != 21) { // 排除教育定制版
				this.ready()
			} else { // 获取配置模板信息
			  this.getRoomTemplate();
			}
		  }
		  
        

      },
      methods:{

        getRoomTemplate(){
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
        ready() {
          if (window.__wxjs_environment === 'miniprogram') {
            this.room_template = 9999;
          } else {
            this.getRoomTemplate();
          }
        }
      }
    }
</script>

<style scoped>

</style>
