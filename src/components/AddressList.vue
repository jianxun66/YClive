<template>
    <div class="address_info">
        <div class="addressList">
            <dl v-for="item in addresList" :class="[ item.common == 1 ? 'cur' : '']" >
                <dt @click="selectAddr(item)"></dt>
                <dd @click="selectAddr(item)">
                    <h3>{{item.addr}}{{item.detail}}</h3>
                    <p>{{item.name}}</p>
                </dd>
                <dd class="edit" @click="editAddr(item)"><img src="../../static/images/editIcon.png"/></dd>
            </dl>

        </div>
        <div class="newAddress">
            <a href="javascript:void(0);" @click="addAddr">+新增收货地址</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "address-list",
        data(){
            return {
                addresList: {},
                openid: "",
            }
        },
        created(){
            this.openid = localStorage.getItem('openid');
            this.getData();
        },
        methods:{
            getData(){
                var that = this;
                var formdata = new FormData();
                formdata.append('open_id', this.openid);
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
                localStorage.setItem('address_edit', '');
                this.$router.replace({path:'/addr/edit'});
            },
            editAddr(item){
                localStorage.setItem('address_edit', JSON.stringify(item));
                this.$router.replace({path:'/addr/edit'});
            },
            selectAddr(item){
                var that = this;
                var formdata = new FormData();
                formdata.append('open_id', this.openid);
                formdata.append('aid', item.aid);
                that.axiosPost("/client/addr-default", formdata).then((res) => {
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.addresList = res.data;
                        that.$router.replace({path:'/order'});
                    } else {
                        this.$vux.alert.show({
                            title: '温馨提示',
                            content: res.message});
                    }
                }, (err) => {
                    that.$vux.loading.hide();
                });

            },
        }
    }
</script>

<style scoped>
    .addressList dl{position: relative;}
    .addressList .edit{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 20px;
        top: 20px;
    }
</style>
