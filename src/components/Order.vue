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
            <div class="tit" v-bind:style="{backgroundImage:'url(' + roomInfo.room_logo +')'}">{{roomInfo.room_name}}</div>
            <dl v-for="item in product ">
                <dt><img :src="item.pic"></dt>
                <dd>
                    <h3>{{item.title}}<span>¥{{item.price}}</span></h3>
                    <p>{{item.desc}}</p>
                    <span class="num">
				<a href="javascript:void(0);" @click="changeNum(1, item)">-</a>
				<i>{{item.buy_num}}</i>
				<a href="javascript:void(0);" @click="changeNum(2, item)">+</a>
			</span>
                </dd>
            </dl>

        </div>
        <div class="payBtn">
            <a href="orderPaySuccess.html">微信支付&yen;{{total}}<span>已优惠&yen;20</span></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "order",
        data(){
            return {
                roomInfo : {},
                totalPrice: 0,
                product: {},
                addr:{},

            }
        },
        created(){
            this.roomInfo = localStorage.getItem('buy_room');
            this.totalPrice = localStorage.getItem('buy_total');
            this.product = localStorage.getItem('buy_product');

            this.getAddr();
        },
        methods:{
            getAddr(){

            },
            changeNum(type, item){

                if(type == 1){ // 减少
                    item.buy_num --;
                    if(item.buy_num < 0){
                        item.buy_num = 0;
                    }
                } else { // 增加
                    item.buy_num ++;
                }

                var buy_price = 0;
                for(var i = 0 ; i < this.product.length; i++){
                    buy_price+= this.product[i].buy_num * this.product[i].price;
                    if(buy_price ){
                        this.totalPrice = buy_price.toFixed(2);
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>