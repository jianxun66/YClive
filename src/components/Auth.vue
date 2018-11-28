<template>
    
</template>

<script>
    import { cookie } from 'vux'
    export default {
        name: "auth",
        created(){
            this.login();
        },
        methods:{
            login(){
                var that = this;
                var url= "https://yc.adaxiang.com/rest/v1/wechat/auth-login";
                var urld = window.location.href.split('#')[0];
                var refer = '';
                if(cookie.get('refer') != null ){
                    refer = urld +"#"+ cookie.get('refer');
                    refer = encodeURIComponent(refer);
                }
                url += "?refer="+refer;

                var auth_code = cookie.get('auth');
                if(auth_code){
                    localStorage.setItem('openid', auth_code);
                    that.$router.push({path:'/'});
                }else{
                    location.href = url;
                }
            }
        }
    }
</script>

<style scoped>

</style>