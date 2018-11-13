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
                <a href="index_live.html">返回主页</a>
                <a href="order.html">订单列表</a>
            </div>
        </div>
        <div class="orderList">
            <div class="tit">亚历亨生态茶园</div>
            <dl>
                <dt><img src="demo/4.png"></dt>
                <dd>
                    <h3>亚历亨有机绿茶 1斤装<span>¥2680</span></h3>
                    <p>亚历亨生态茶园位于广东省韶关市始兴县...</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="demo/4.png"></dt>
                <dd>
                    <h3>亚历亨有机绿茶 1斤装<span>¥2680</span></h3>
                    <p>亚历亨生态茶园位于广东省韶关市始兴县...</p>
                </dd>
            </dl>
            <div class="total">
                <p>配送费<span>顺丰包邮</span></p>
                <p>已优惠&yen;20<span>小计</span><span>&yen;4200</span></p>
            </div>
            <div class="total orderInfo">
                <p>订单信息</p>
                <ul>
                    <li>订单号码<span>2323 3232 3232</span></li>
                    <li>下单时间<span>2018-10-16 12:22:33</span></li>
                    <li>配送地址<span>李先生 1234423241<br>广东省深圳市南山区鑫海名城11号</span></li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "order-success"
    }
</script>

<style scoped>

</style>