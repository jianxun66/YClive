<template>
  <div class="live-index-container live-h100">
    <live-user-head></live-user-head>
    <div class="live-main">
      <div class="live-main-container">

        <div class="live-address-list">
          <div class="live-address-head">我的地址</div>

          <ul>
            <li v-for="(item, key) in addresList" :key="key">
              <i @click="selectAddr(item)" :class="[ item.common == 1 ? 'icon live-address-active' : check ? 'icon live-address-uncheck' : '']"></i>
              <div @click="editAddr(item)">
                <div class="live-address-detail">
                  {{item.addr}}{{item.detail}}
                </div>
                <div class="live-address-userinfo">
                  <span class="live-address-user">{{item.name}}</span>
                  <span class="live-address-umobile">{{item.mobile}}</span>
                </div>
              </div>
            </li>

          </ul>

          <div class="live-address-add live-color" @click="addAddr">+新增收获地址</div>
        </div>

      </div>
    </div>
    <live-footer :findex="findex"></live-footer>
  </div>
</template>

<script>
  import LiveUserHead from './LiveUserHead'
  import LiveFooter from './LiveFooter'
    export default {
      name: "LiveAddress",
      components: {LiveUserHead, LiveFooter},
      data(){
        return {
          changeCommon: false,
          findex: 'user',
          addresList: [],
          check: false,
        }
      },
      created(){
        if (this.$route.query.from) {
          this.check = true;
        }
        this.getData()
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
          this.$router.replace({path:'/addr/edit', query:{'from': 2}});
        },
        editAddr(item){
          localStorage.setItem('address_edit', JSON.stringify(item));
          this.$router.replace({path:'/addr/edit', query:{'from': 2}});
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
      },
    }
</script>

<style scoped>

</style>
