<template>
    <div class="address">
        <div class="editAddress">
            <dl>
                <dt>联系人：</dt>
                <dd><input type="text" v-model="addrInfo.name" placeholder="请填写收货人的姓名" name=""></dd>
            </dl>
            <dl>
                <dt></dt>
                <dd>
                    <a href="javascript:void(0);" :class="[addrInfo.sex != 2 ? 'cur wrongIcon' :'wrongIcon' ]" @click="setSex(addrInfo,1)">先生</a>
                    <a href="javascript:void(0);" :class="[addrInfo.sex == 2 ? 'cur wrongIcon' :'wrongIcon' ]"  @click="setSex(addrInfo,2)">女士</a>
                </dd>
            </dl>
            <dl>
                <dt>手机号：</dt>
                <dd><input type="text" v-model="addrInfo.mobile" placeholder="请填写收货人手机号" name=""></dd>
            </dl>
            <dl>
                <dt>收货地址：</dt>
                <dd><input type="text" v-model="addrInfo.addr" placeholder="请填写收货地址" name=""></dd>
            </dl>
            <dl>
                <dt>门牌号：</dt>
                <dd><input type="text" v-model="addrInfo.detail" placeholder="详细地址，例：16号楼5层301室"></dd>
            </dl>
            <button @click="updateAddr">保存地址</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "edit-address",
        data(){
            return {
                subStatus: 0,
                addrInfo: {
                    aid: 0,
                    name: "",
                    commmon: 0,
                    sex: 1,
                    mobile: "",
                    addr: "",
                    detail: "",
                },
            };
        },
        created(){
            var address = localStorage.getItem('address_edit');
            if(address){
                this.addrInfo = JSON.parse(address);
            }
        },
        methods:{
            setSex(item, type){
                item.sex = type;
            },

            updateAddr(){
                var that = this;
                var addrInfo = this.addrInfo;
                if(this.subStatus){
                    return false;
                }
                console.log(addrInfo);
                if(!addrInfo.name){
                    that.$vux.alert.show({
                        title: '温馨提示',
                        content: "请填写联系人姓名"});
                    return false;
                }

                if (!addrInfo.mobile || (!(/^[1][34578]\d{9}$/).test(addrInfo.mobile) || !(/^[1-9]\d*$/).test(addrInfo.mobile) || addrInfo.mobile.length !== 11)) {
                    that.$vux.alert.show({
                        title: '温馨提示',
                        content: "请填写有效手机号"});
                    return false;
                }


                if(!addrInfo.addr){
                    that.$vux.alert.show({
                        title: '温馨提示',
                        content: "请填写收货地址"});
                    return false;
                }

                if(!addrInfo.detail){
                    that.$vux.alert.show({
                        title: '温馨提示',
                        content: "请填写门牌号"});
                    return false;
                }

                var formdata = new FormData();
                if(addrInfo.aid){
                    formdata.append('aid', addrInfo.aid);
                }

                formdata.append('client_name', addrInfo.name);
                formdata.append('commmon', addrInfo.commmon);
                formdata.append('client_sex', addrInfo.sex);
                formdata.append('mobile', addrInfo.mobile);
                formdata.append('addr', addrInfo.addr);
                formdata.append('detail', addrInfo.detail);

                that.$vux.loading.show({
                    text: '加载中~'
                });

                this.subStatus = true;
                that.axiosPost("/client/addr-save", formdata).then((res) => {
                    that.subStatus = false;
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.$vux.alert.show({
                            title: '温馨提示',
                            content: "操作成功"});

                        that.$router.push({path:'/order'});
                    } else {
                        that.$vux.alert.show({
                            title: '温馨提示',
                            content: res.message});
                    }
                }, (err) => {
                    that.subStatus = false;
                    that.$vux.loading.hide();
                });
            },
        }
    }
</script>

<style scoped>

</style>