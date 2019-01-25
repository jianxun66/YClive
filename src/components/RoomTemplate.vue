<template>
    <div>
      <educate v-if="room_template == 3"></educate>
      <room-old v-else></room-old>
    </div>
</template>

<script>
  import tea from './template/Tea';
  import educate from './template/Educate';
  import roomOld from './template/RoomOld';
    export default {
      name: "room_template",
      components:{tea, educate, roomOld},
      data(){
          return {
            'room_template': 1,
          }
      },
      created(){
        this.room_template = this.$route.query.room_id;
        this.getRoomTemplate();
      },
      methods:{
        getRoomTemplate(){
          var that = this;
          var formdata = new FormData();
          formdata.append('id', this.room_template);
          that.axiosPost("/room/template", formdata).then((res) => {
            that.room_template = res.data.template;
          });
        }
      }
    }
</script>

<style scoped>

</style>
