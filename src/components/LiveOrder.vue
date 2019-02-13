<template>
  <div class="live-index-container live-h100">
    <live-user-head></live-user-head>
    <div class="live-main">
      <div class="live-main-container">
        <div class="live-order-container">
          <div class="live-order-head">我的订单</div>

          <div class="myOrder live-order-list">
            <div class="orderBox live-order-item" v-for="item in orderList"  @click="orderDetails(item)">
              <h4 class="tit live-order-title" v-bind:style="{backgroundImage:'url(' + item.logo_img +')'}">{{item.room_name}}<span>订单号码：{{item.order_id}}</span></h4>
              <dl v-for="details in item.list">
                <dt>{{details.title}} X {{details.num}}</dt>
                <dd>{{details.title}}</dd>
              </dl>
              <p>合计<span>&yen;{{item.total_money}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <live-footer :findex="findex"></live-footer>
  </div>
</template>

<script>
  import LiveUserHead from './LiveUserHead'
  import LiveFooter from './LiveFooter'
    export default {
      name: "LiveOrder",
      components: {LiveUserHead, LiveFooter},
      data(){
          return {
            'findex': 'user',
            orderList: [],
          }
      },
      created(){
        this.getOrderList();
      },
      methods:{
        getOrderList () {
          var that = this
          var formdata = new FormData();
          that.axiosPost('/client/orders', formdata).then((res) => {
            that.orderList = res.data
          }, (err) => {
            console.log(err)
          })
        },
        orderDetails(item){
          this.$router.replace({path: '/orderDetail', query:{order_id:item.order_id}})
        },
      },

    }
</script>

<style scoped>

</style>
