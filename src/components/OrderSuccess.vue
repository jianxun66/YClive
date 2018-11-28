<template>
    <div class="order">
        <div class="orderHead">
            <div class="orderTabMenu">
                <a href="javascript:void(0);">我的订单</a>
                <a href="tel:15013627372">联系园主</a>
            </div>
            <div class="paySuccess">
                <h1>订单支付成功</h1>
                <p>感性您对我们的支持，期待再次光临。</p>
                <a @click="homePath">返回主页</a>
                <a @click="myOrderListPath">订单列表</a>
            </div>
        </div>
        <div class="orderList">
            <div class="tit">{{orders.room_name}}</div>
            <dl v-for="item in orders.list">
                <dt><img src="demo/4.png"></dt>
                <dd>
                    <h3>{{item.title}}<span>¥{{item.price}}</span></h3>
                    <p>{{item.title}}</p>
                </dd>
            </dl>
            <div class="total">
                <p>配送费&yen;{{orders.deliver_money}}<span>{{orders.express_name}}</span></p>
                <p>已优惠{{orders.discount_money}}<span>小计</span><span>&yen;{{orders.total_money}}</span></p>
            </div>
            <div class="total orderInfo">
                <p>订单信息</p>
                <ul>
                    <li>订单号码<span>{{orders.order_id}}</span></li>
                    <li>下单时间<span>{{orders.create_time}}</span></li>
                    <li>配送地址<span>{{orders.user_name}} {{orders.user_phone}}<br>{{orders.user_address}}</span></li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'order-success',
        data () {
            return {
                orders: {},
            }
        },
        created () {
            this.getOrderList()
        },
        methods: {
            myOrderListPath () {
                this.$router.push({path: '/order/mylist'})
            },
            homePath () {
                this.$router.push({path: '/'})
            },
            getOrderList () {
                let that = this
                that.axiosGet('/client/orders?last=1').then((res) => {
                    that.orders = res.data[0]
                    console.log(that.orders)
                }, (err) => {
                    console.log(err)
                })
            }
        }
    }
</script>
