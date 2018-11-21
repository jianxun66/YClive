<template>
    <div class="address">
        <div class="addressList">
            <dl v-for="item in addresList" class="cur">
                <dt></dt>
                <dd>
                    <h3>{{item.addr}}{{item.detail}}</h3>
                    <p>{{item.name}}</p>
                </dd>
            </dl>

        </div>
        <div class="newAddress">
            <a href="javascript:void(0);" @click="addAddr">+新增收货地址</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "address",
        data(){
            return {
                addresList: {},
            }
        },
        create(){
            this.getData();
        },
        methods:{
            getData(){
                var that = this;
                var formdata = new FormData();
                formdata.append('cid', item.id);
                formdata.append('ctype', 'video');
                that.axiosPost("/client/addr-list", formdata).then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.addresList = res.data;
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: res.message});
                    }
                }, (err) => {
                    that.$vux.loading.hide();
                });
            },
            addAddr(){
                this.$router.push({path:'/addr/edit'});
            },
            editAddr(item){

                this.$router.push({path:'/addr/edit'});
            },
        }
    }
</script>

<style scoped>

</style>