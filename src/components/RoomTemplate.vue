<template>
    <div>
      <educate v-if="room_template == 3"></educate>
      <roomNew v-else-if="room_template == 2"></roomNew>
      <room-old v-else-if="room_template == 1"></room-old>
      <room-common v-else-if="room_template == 4"></room-common>
    </div>
</template>

<script>
  import tea from './template/Tea';
  import educate from './template/Educate';
  import roomOld from './template/RoomOld';
  import roomNew from './template/RoomNews';
  import roomCommon from './template/RoomCommon';
    export default {
      name: "room_template",
      components:{tea, educate, roomOld, roomNew, roomCommon},
      data(){
          return {
            'room_template': 0,
          }
      },
      created(){
        this.room_template = this.$route.query.room_id;
        this.getRoomTemplate();
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
        }
      }
    }
</script>

<style scoped>

</style>
