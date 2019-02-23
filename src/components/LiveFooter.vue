<template>
  <div class="footer">
    <div class="item" v-for="(item, key) in footer" :key="key">
      <div :class="item.fclass">
        <div :class="findex == item.fname ? 'active' : ''" @click="changeIndex(item)">
          <div class="item-icon"></div>
          <div class="item-text">{{item.ftext}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: "LiveFooter",
      props:['findex'],
      data(){
        return {
          'footer': [
            {
              fname: 'live',
              fclass: 'live-foot-live',
              ftext: '现场直播',
              path: '/',
            },
            {
              fname: 'video',
              fclass: 'live-foot-video',
              ftext: '精彩短片',
              path: '/video',
            },
            {
              fname: 'user',
              fclass: 'live-foot-user',
              ftext: '个人中心',
              path: '/user'
            },
          ],
        }
      },
      methods:{
        changeIndex(item){
          this.$router.replace({path: item.path});
        }
      },
    }
</script>

<style scoped>

</style>
