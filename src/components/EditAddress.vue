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
                <dd class="add-mobile">
                  <input type="text" oninput="if(value.length>11) value=value.slice(0,11)" v-model="addrInfo.mobile" placeholder="请填写收货人手机号" name="">
                  <span class="send-code" @click="sendSms" v-if="!smsStatus">{{smsModel}}</span>
                  <span class="send-code" v-else>重新发送({{smsModel}})</span>
                </dd>
            </dl>
            <dl>
              <dt>验证码：</dt>
              <dd>
                <input type="number" oninput="if(value.length>4) value=value.slice(0,4)" v-model="addrInfo.code" placeholder="请填写验证码" name="">
              </dd>
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
                room_id : 0,
                openid: "",
                subStatus: 0,
                addrInfo: {
                    aid: 0,
                    name: "",
                    commmon: 0,
                    sex: 1,
                    mobile: "",
                    addr: "",
                    detail: "",
                  code: '',
                },
              goBack: '',
              smsModel: '发送验证码',
              smsStatus: 0,
            };
        },
        created(){
            this.openid = localStorage.getItem('openid');
            var address = localStorage.getItem('address_edit');
            if(address){
                this.addrInfo = JSON.parse(address);
            }

          if (this.$route.query.from == 2) {
            this.goBack = "/addr";
          } else {
            this.goBack = "/order";
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
                formdata.append('code', addrInfo.code);
                //formdata.append('openid', that.openid);

                that.$vux.loading.show({
                    text: '加载中~'
                });

                this.subStatus = true;
                that.axiosPost("/client/addr-save", formdata).then((res) => {
                    that.subStatus = false;
                    that.$vux.loading.hide();
                    if(res.status == 200){
                        that.$router.replace({path: that.goBack});
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

          sendSms(){
              var that = this;
              if(this.smsStatus){
                return false;
              }

              if(!(/^1[34578]\d{9}$/.test(this.addrInfo.mobile))){
                this.$vux.alert.show({
                  title: '温馨提示',
                  content: '请输入正确的手机号码'});
                return false;
              }
              //发送短信
              var formdata = new FormData();
              formdata.append('mobile', this.addrInfo.mobile);
              that.axiosPost("/client/sms", formdata).then((res) => {
                that.$vux.loading.hide();
                if(res.status == 200){
                  that.smsModel = 60;
                  that.smsStatus = true;
                  that.countDown();
                } else {
                  that.smsStatus = 0;
                  that.$vux.alert.show({
                    title: '温馨提示',
                    content: res.message});
                }
              }, (err) => {
                that.smsStatus = 0;
                that.$vux.loading.hide();
              });


          },
          countDown(){
              if(this.smsModel == 0) {
                this.smsModel = "发送验证码";
                this.smsStatus = 0;
              } else {
                this.smsModel --;
                var that = this;
                setTimeout(function() {
                  that.countDown();
                },1000)
              }
          }


        }
    }
</script>

<style scoped>
  .add-mobile{position: relative}
  .send-code{position:absolute; right: 0.2rem; top:1rem; border: 1px solid #cccccc; display: inline-block; padding: 0.2rem 0.5rem}
</style>
