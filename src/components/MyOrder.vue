<template>
    <div class="orderHead">
        <div class="orderTabMenu">
            <a href="#">我的订单</a>
            <!--<a href="tel:15013627372">联系客服</a>-->
        </div>
        <div class="myOrder ">
            <div class="orderBox" v-for="item in orderList">
                <h4 class="tit">{{item.room_name}}<span>订单号码：{{item.order_id}}</span></h4>
                <dl v-for="details in item.list">
                    <dt>{{details.title}} X {{details.num}}</dt>
                    <dd>{{details.title}}</dd>
                </dl>
                <p>合计<span>&yen;{{item.total_money}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'my-order',
        data () {
            return {
                orderList: {}
            }
        },
        created () {
            this.getOrderList()
        },
        methods: {
            getOrderList () {
                let that = this
                var formdata = new FormData();
                that.axiosPost('/client/orders', formdata).then((res) => {
                    that.orderList = res.data
                }, (err) => {
                    console.log(err)
                })
            }
        }
    }
</script>
