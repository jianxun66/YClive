<template>
    <div>
        <div class="swiper-slide">
            <div class="home_bg">
                <div class="logo"><img src="images/logo.png"></div>
            </div>
            <div class="homeBox">
                <p><img src="images/brandLogo.png"></p>
                <p>亚历亨生态茶园<br>
                    原生态有机种植基地</p>
                <p>全程有机栽培，不使用任何化肥、农药和除草剂，<br>采用花生麸，发酵6个月以上施肥！</p>
                <p>——24小时生态直播——<br>全程可视溯源</p>
                <button>进入生态直播</button>
                <div class="nextPage">
                    下拉全景生态介绍<br>
                    <img src="images/nextPageIcon.png">
                </div>
            </div>
        </div>
        <div class="swiper-slide" style="display: none">
            <div class="homeBottom">
                <img src="images/home1.png" >
                <div class="video">
                    <div class="logo"><img src="images/logo.png"></div>
                    <div class="prism-player " id="J_prismPlayer"></div>
                </div>



            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "home"
    }
</script>


<style scoped>

</style>