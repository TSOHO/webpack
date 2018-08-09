<template>
  <div class="screenfull loading">
    <div class="loading-text">{{loadingText}}</div>
  </div>
</template>

<script>
  import Imgpreload from "../libs/imgpreload"
  import Assets from "../assets/preloadassets"

  export default {
    name: "Loading",
    data() {
      return {
        loadingIndex: 0,
        loadingText: 0,
      }
    },
    mounted() {
      this.load(Assets).then(()=>{this.$emit("loadend")})
    },
    methods: {
      load(assets) {
        const vm = this;
        const len = assets.length;

        return new Promise((resolve, reject) => {
          new Imgpreload(assets, {
            thread: false,
            itemload() {
              vm.loadingIndex++;

              let progress = vm.loadingIndex / len * 100;
              vm.loadingText = Math.floor(progress > 100 ? 100 : progress) + "%";
            },
            allload: resolve
          });
        });
      }
    }
  }
</script>

<style scoped>

  .loading {
    position: fixed;
    z-index: 1000;
  }

  .loading-text{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    color: #32755a;
    font-size: .426667rem /* 32/75 */;
  }
</style>
