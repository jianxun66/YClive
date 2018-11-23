<template>
    <div class="order">
        <div class="orderHead">
            <div class="orderTabMenu">
                <a href="#">产地到家</a>
                <a :href="tel">联系园主</a>
            </div>
            <div class="orderAddress">
                <div class="addNewAddress">
                    <a href="javascript:void(0);" @click="addAddr">+新增收货地址</a>
                </div>
                <dl @click="addresList">
                    <dt>{{addr.addr}}{{addr.detail}}</dt>
                    <dd>{{addr.client_name}}&nbsp;{{addr.sex}}&nbsp;{{addr.mobile}}</dd>
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
            <a href="orderPaySuccess.html">微信支付&yen;{{totalPrice}}<span>已优惠&yen;20</span></a>
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
                tel:"",

            }
        },
        created(){
            var room_info = localStorage.getItem('buy_room');
            var buy_product = localStorage.getItem('buy_product');
            this.roomInfo = room_info ? JSON.parse(room_info) : '';
            this.totalPrice = localStorage.getItem('buy_total');
            this.product = buy_product ? JSON.parse(buy_product) : '';
            this.tel = "tel:"+this.roomInfo.room_tel;
            this.getAddr();
        },
        methods:{
            getAddr(){
                var that = this;
                var formdata = new FormData();
                formdata.append('ctype', 'video');
                that.axiosPost("/client/addr", formdata).then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.addr = res.data;
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: res.message});
                    }
                }, (err) => {
                    that.$vux.loading.hide();
                });
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
            addAddr(){
                this.$router.push({path:'/addr/edit'});
            },
            addresList(){
                this.$router.push({path:'/addr'});
            },
        }
    }
</script>

<style scoped>

</style>