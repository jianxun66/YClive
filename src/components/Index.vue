<template>
    <div class="order">
        <div class="roomTitle"><h1>直播间列表</h1></div>
        <div class="swiper-slide con" v-for="item in roomList">
            <h2 class="tit videoIcon">{{item.room_name}}</h2>
            <div class="filmList">
                <!--<room-video :room_id="room_id"></room-video>-->
            </div>
            <div class="roomFooter">
                    <img :src="item.online_cover" @click="roomPath(item.id)"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        props: ['room_id'],
        data () {
            return {
                roomList: {},
                order_id : '',
                openid : '',
            }
        },
        created () {
            this.getRoomList()
        },
        methods: {
            roomPath (id) {

                if(this.DEBUG == 1){
                    this.$router.push({path: '/room', query:{room_id:id, from:"groupmessage", isappinstalled:0}})
                } else {
                    window.location.href= location.protocol + '//' + document.domain+'/front/#/room?room_id='+id;
                }
            },
          getRoomList () {
                let that = this;
                var formdata = new FormData();
                // formdata.append('order_id', that.order_id);
                // formdata.append('open_id', localStorage.getItem('openid'));
                that.axiosPost('/room/list', formdata).then((res) => {
                    that.roomList = res.data
                    //console.log(that.roomList)
                }, (err) => {
                    console.log(err)
                })
            }
        }
    }
</script>
