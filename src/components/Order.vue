<template>
    <div class="order">
        <div class="orderHead">
            <div class="orderTabMenu">
                <a href="#">产地到家</a>
                <a href="tel:15013627372">联系园主</a>
            </div>
            <div class="orderAddress">
                <div class="addNewAddress">
                    <a href="editAddress.html">+新增收货地址</a>
                </div>
                <dl>
                    <dt>深圳市福田区下梅林</dt>
                    <dd>韦炯良&nbsp;先生&nbsp;15013627372</dd>
                </dl>
                <div class="orderTime">
                    立即打包<span>顺丰次日达</span>
                </div>
            </div>
        </div>
        <div class="orderList">
            <div class="tit">亚历亨生态茶园</div>
            <dl>
                <dt><img src="demo/4.png"></dt>
                <dd>
                    <h3>亚历亨有机绿茶 1斤装<span>¥2680</span></h3>
                    <p>亚历亨生态茶园位于广东省韶关市始兴县...</p>
                    <span class="num">
				<a href="javascript:void(0);">-</a>
				<i>0</i>
				<a href="javascript:void(0);">+</a>
			</span>
                </dd>
            </dl>
            <dl>
                <dt><img src="demo/4.png"></dt>
                <dd>
                    <h3>亚历亨有机绿茶 1斤装<span>¥2680</span></h3>
                    <p>亚历亨生态茶园位于广东省韶关市始兴县...</p>
                    <span class="num">
				<a href="javascript:void(0);">-</a>
				<i>0</i>
				<a href="javascript:void(0);">+</a>
			</span>
                </dd>
            </dl>
            <div class="total">
                <p>配送费<span>顺丰包邮</span></p>
                <p>已优惠&yen;20<span>小计</span><span>&yen;4200</span></p>
            </div>
        </div>
        <div class="payBtn">
            <a href="orderPaySuccess.html">微信支付&yen;4200<span>已优惠&yen;20</span></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "order"
    }
</script>

<style scoped>

</style>