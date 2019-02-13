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
                console.log('auth');
                var that = this;
                var url= "https://yc.adaxiang.com/rest/v1/wechat/auth-login";
                var urld = window.location.href.split('#')[0];
                var refer = '';
                if(cookie.get('refer') != null ){
                    refer = urld +"#"+ cookie.get('refer');
                    refer = encodeURIComponent(refer);
                }
                url += "?refer="+refer;

                var auth_code = cookie.get('uid');
                if(auth_code){
                    localStorage.setItem('uid', auth_code);
                    localStorage.setItem('uname', cookie.get('uname'));
                    localStorage.setItem('uimg', cookie.get('uimg'));
                    refer_url = cookie.get('refer') ? cookie.get('refer') : "front/";
                    that.$router.replace({path:refer_url});
                }else{
                    location.href = url;
                }
            }
        }
    }
</script>

<style scoped>

</style>
