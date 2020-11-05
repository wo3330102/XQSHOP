<template>
  <div>
    <transition name="fade" mode="out-in">
            <router-view 
              v-if="isRouterAlive"
            ></router-view>
          </transition>
  </div>
</template>
<script>
export default {
  name: "Main",
  watch: {
    "$store.state.url"(val) { 
      this.reload();
    },
    "$store.state.reflash"(val) {
      if(val){
        this.$store.commit("isReflash", false); 
        this.reload();
      }
    },
  },
  data() {
    return {
      isRouterAlive:true,
    }
  },
  methods:{
    reload() {
      console.log(123)
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>