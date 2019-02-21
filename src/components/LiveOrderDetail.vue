<template>
  <div class="live-index-container live-h100">
    <live-user-head></live-user-head>
    <div class="live-main">
      <div class="live-main-container">
        <div class="live-order-container">
          <div class="live-order-head">我的订单</div>
          <div class="myOrder live-order-info">

            <div class="orderList">
              <div class="tit" :style="{backgroundImage:'url('+orders.logo_img+')'}">{{orders.room_name}}</div>
              <dl v-for="item in orders.list">
                <dt><img :src="item.cover_img"></dt>
                <dd>
                  <h3>{{item.title}}<span>¥{{item.price}} × {{item.num}}</span></h3>
                  <p>{{item.title}}</p>
                </dd>
              </dl>
              <div class="total">
                <p>配送费&yen;{{orders.deliver_money}}<span class="express-no live-color">{{orders.express_no}}</span><span>{{orders.express_name}}</span></p>
                <p><span>小计</span><span>&yen;{{orders.total_money}}</span></p>
              </div>
              <div class="total orderInfo">
                <ul>
                  <li>订单号码<span>{{orders.order_id}}</span></li>
                  <li>下单时间<span>{{orders.create_time}}</span></li>
                  <li>
                    配送地址
                    <span>{{orders.user_name}} {{orders.user_phone}}
                      <br>{{orders.user_address}}</span>
                  </li>
                </ul>
              </div>
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
      name: "LiveOrderDetail",
      components: {LiveUserHead, LiveFooter},
      created(){
        this.order_id = this.$route.query.order_id;
        this.getOrderDetail()
      },
      data(){
          return {
            findex: 'user',
            order_id: '',
            orders: {},
          }
      },
      methods:{
        getOrderDetail () {
          var that = this;
          if(!that.order_id){
            this.$vux.alert.show({
              title: '温馨提示',
              content: "无效订单号"});
            return false;
          }

          var formdata = new URLSearchParams();
          formdata.append('order_id', that.order_id);
          that.axiosPost('/client/orders', formdata).then((res) => {
            if(res.status == 200) {
              that.orders = res.data[0]
            } else {
              that.$vux.alert.show({
                title: '温馨提示',
                content: res.message
              });
            }

          }, (err) => {
            console.log(err)
          })
        }
      }
    }
</script>



<style scoped>

</style>
