<template>
    <div class="orderHead">
        <div class="orderTabMenu">
            <a href="#">我的订单</a>
            <!--<a href="tel:15013627372">联系客服</a>-->
        </div>
        <div class="myOrder ">
            <div class="orderBox">
                <h4 class="tit">亚历亨生态茶园<span>订单号码：2223 2322 2323</span></h4>
                <dl>
                    <dt>亚历亨有机茶 1斤装 x 1</dt>
                    <dd>一斤陶瓷礼盒装，三斤陶瓷礼盒装</dd>
                </dl>
                <dl>
                    <dt>亚历亨有机茶 1斤装 x 1</dt>
                    <dd>一斤陶瓷礼盒装，三斤陶瓷礼盒装</dd>
                </dl>
                <p>合计<span>&yen;4200</span></p>
            </div>
            <div class="orderBox">
                <h4 class="tit">亚历亨生态茶园<span>订单号码：2223 2322 2323</span></h4>
                <dl>
                    <dt>亚历亨有机茶 1斤装 x 1</dt>
                    <dd>一斤陶瓷礼盒装，三斤陶瓷礼盒装</dd>
                </dl>
                <dl>
                    <dt>亚历亨有机茶 1斤装 x 1</dt>
                    <dd>一斤陶瓷礼盒装，三斤陶瓷礼盒装</dd>
                </dl>
                <p>合计<span>&yen;4200</span></p>
            </div>
            <div class="orderBox">
                <h4 class="tit">亚历亨生态茶园<span>订单号码：2223 2322 2323</span></h4>
                <dl>
                    <dt>亚历亨有机茶 1斤装 x 1</dt>
                    <dd>一斤陶瓷礼盒装，三斤陶瓷礼盒装</dd>
                </dl>
                <dl>
                    <dt>亚历亨有机茶 1斤装 x 1</dt>
                    <dd>一斤陶瓷礼盒装，三斤陶瓷礼盒装</dd>
                </dl>
                <p>合计<span>&yen;4200</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'my-order',
        data () {
            return {}
        },
        methods: {
            getOrderList () {
                let that = this;
                that.axiosGet("/room/info?id=1").then((res) => {
                    
                    // that.roomBasic.room_name = res.data.room_name;
                    // that.roomBasic.logo_img = res.data.logo_img;
                    // that.roomBasic.click_num = res.data.click_num;
                    // that.roomBasic.addr_url = res.data.addr_url;
                    // that.roomBasic.addr = res.data.addr;
                    // that.roomBasic.coordinate = res.data.coordinate;
                    // that.roomBasic.cover_img = res.data.cover_img;
                    // that.roomBasic.introduce = res.data.introduce;
                    // that.roomBasic.content = res.data.content;
                    // that.roomBasic.logo_pic = res.data.logo_pic;
                }, (err) => {
                    console.log(err);
                });
            }
        }
    }
</script>
