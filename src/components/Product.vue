<template>
    <div class="product-list">
        <dl v-for="product in productList">
            <dt><img :src="product.pic"></dt>
            <dd>
                <h3>{{product.title}}</h3>
                <p>{{product.desc}}</p>
                <span class="money">&yen;{{product.price}}</span>
                <span class="num">
							<a href="javascript:void(0);" @click="changeNum(1, product)">-</a>
							<i>{{product.buy_num}}</i>
							<a href="javascript:void(0);" @click="changeNum(2, product)">+</a>
						</span>
            </dd>
        </dl>


    </div>
</template>

<script>

    export default {
        name: "product",
        data(){
            return {
                productList:[],
                totalPrice: 0,
            };
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                let that = this;

                that.$vux.loading.show({
                    text: '加载中~'
                })

                that.axiosGet("/product/room?id=9").then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.productList = res.data;
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
                for(var i = 0 ; i < this.productList.length; i++){
                    buy_price+= this.productList[i].buy_num * this.productList[i].price;
                    if(buy_price ){
                        this.totalPrice = buy_price.toFixed(2);
                    }
                }

                this.$emit('buy_price', this.totalPrice);
            },

            buy_product(room_id, room_name, room_logo, room_tel){
                var buy_product = [];

                var total = 0;
                for(var i = 0 ; i < this.productList.length; i++){
                    if(this.productList[i].buy_num > 0){
                        total += this.productList[i].buy_num * this.productList[i].price;
                        buy_product.push(this.productList[i]);
                    }
                }
                total = total.toFixed(2);
                if(buy_product.length > 0){
                    var room_info = {
                        'room_id' : room_id,
                        'room_name' : room_name,
                        'room_logo' : room_logo,
                        'room_tel' : room_tel,
                    };
                    localStorage.setItem("buy_room", JSON.stringify(room_info));
                    localStorage.setItem('buy_total', total);
                    localStorage.setItem('buy_product', JSON.stringify(buy_product));
                    this.$router.push({path:'/order'});
                } else {
                    this.$vux.alert.show({
                        title: '温馨提示',
                        content: "请选择需要购买的商品"});

                    return false;
                }


            }

        }
    }
</script>

<style scoped>

</style>
