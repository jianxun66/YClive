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
            <a href="javascript:void(0);" @click="subOrder">微信支付&yen;{{totalPrice}}<span>已优惠&yen;20</span></a>
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
                openid: "",
                roomid: "",
                wechatJssdk:{
                    debug: true,
                    appId: '',
                    timestamp: '',
                    nonceStr: '',
                    signature: '',
                    jsApiList: [
                        'chooseWXPay',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ],
                },

            }
        },
        created(){
            var room_info = localStorage.getItem('buy_room');
            var buy_product = localStorage.getItem('buy_product');
            this.roomInfo = room_info ? JSON.parse(room_info) : '';
            this.totalPrice = localStorage.getItem('buy_total');
            this.product = buy_product ? JSON.parse(buy_product) : '';
            this.tel = "tel:"+this.roomInfo.room_tel;
            this.openid = localStorage.getItem('openid');
            this.roomid = localStorage.getItem('roomid');
            this.wechatConfig();
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
                this.totalPrice = 0;
                for(var i = 0 ; i < this.product.length; i++){
                    if(this.product[i].buy_num > 0){
                        buy_price+= this.product[i].buy_num * this.product[i].price;
                        if(buy_price ){
                            this.totalPrice = buy_price.toFixed(2);
                        }
                    }

                }
            },
            addAddr(){
                this.$router.push({path:'/addr/edit'});
            },
            addresList(){
                this.$router.push({path:'/addr'});
            },
            subOrder(){
                var that = this;
                var buy_product = [];
                for(var i = 0 ; i < this.product.length; i++){
                    if(this.product[i].buy_num > 0){
                        buy_product.push({"product_id": this.product[i].id, "num" : this.product[i].buy_num});
                    }
                }

                if(that.totalPrice <= 0 || buy_product.length <= 0){
                    this.$vux.alert.show({
                        title: '温馨提示',
                        content: "请勾选需要购买的商品"});
                    return false;
                }

                if(!that.addr.client_name){
                    this.$vux.alert.show({
                        title: '温馨提示',
                        content: "请填写收件人信息"});
                    return false;
                }


                that.$vux.loading.show({
                    text: '提交中~'
                });

                var formdata = new FormData();
                formdata.append('open_id', that.openid);
                formdata.append('room_id', that.roomid);
                formdata.append('products', JSON.stringify(buy_product));
                formdata.append('user_name', that.addr.client_name);
                formdata.append('user_sex', that.addr.sex);
                formdata.append('user_phone', that.addr.mobile);
                formdata.append('address', that.addr.addr+that.addr.detail);

                that.axiosPost("/client/order-sub", formdata).then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.wechatPay(res.data.pay, res.data.order_no);
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: res.message});
                    }
                }, (err) => {
                    that.$vux.loading.hide();
                });
            },
            wechatConfig(){
                this.$vux.loading.show("加载中");
                var url = window.location.href.split('#')[0];
                var that = this;
                var formdata = new FormData();
                formdata.append('url', url);
                formdata.append('apis', "chooseWXPay,onMenuShareTimeline,onMenuShareAppMessage");
                that.axiosPost("/wechat/jssdk", formdata).then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.$wechat.config(JSON.parse(res.data));
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: "微信参数错误"});
                    }
                }, (err) => {
                    that.$vux.loading.hide();
                });
            },
            wechatPay(config, order_no){
                var that = this;
                that.$wechat.chooseWXPay({
                    timestamp: config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
                    package: config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: config.paySign, // 支付签名
                    success: function (response) {
                        // 支付成功后的回调函数
                        //window.localStorageclear()
                        that.$vux.toast.show('支付成功!')
                        //window.location.href = "/order/success"
                    },
                    cancel: function (re) {

                        that.$vux.toast.show({
                            text: '支付已取消',
                            type: 'cancel'
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>