<template>
  <div id="app">
    <div class="tips-resize" v-show="resizeTips">
      <img src="./assets/images/tips-resize.png" alt="">
      <p>为了更好的体验，请使用竖屏观看</p>
    </div>
    {{#router}}
    <router-view/>
    {{else}}
    <Index v-if="loadEnd" />
    <Loading v-on:loadend="handleLoadEnd" v-if="loading" />
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import Loading from "./components/Loading"
import Index from './components/Index'
import axios from "axios";
import {
    isWeixin
  } from "./libs/tool.js";

{{/unless}}
export default {
  name: 'App'{{#router}}{{else}},
  components: {
    Index,
    Loading
  },
  data(){
    return {
      resizeTips: false,
      loadEnd: false,
      loading: true
    }
  },
  async mounted(){
    const vm = this;

    document.querySelector("#app").addEventListener("touchmove", function(e) {
      e.preventDefault();
    });

    document.addEventListener('WeixinJSBridgeReady', function() {
      // Music.play()
    })

    vm.orientationChange()

    if (isWeixin) {
      await vm.initWx();
      Weixin.ready().then(() => {
        Weixin.share({
          title: "分享标题",
          desc: "分享简介",
          imgUrl: "分享图片"
        });
      });
    }
  },
  methods:{
    orientationChange() {
      const vm = this

      window.addEventListener("orientationchange", function(e) {
        if (window.orientation == 90 || window.orientation == -90) {
          vm.resizeTips = true
        } else {
          vm.resizeTips = false
        }
      })
    },
    handleLoadEnd() {
      const vm = this

      vm.loadEnd = true

      vm.loading = false
    },
    async initWx() {
      const result = await axios
        .get("http://lining2.y-upsilon.com/api/wechat/jssdk", {
          params: {
            url: window.location.href
          }
        })

      if (result.status === 200) {
        Weixin.config({
          debug: false,
          appId: result.data.appId,
          timestamp: result.data.timestamp,
          nonceStr: result.data.nonceStr,
          signature: result.data.signature
        });
      }
    }
  }{{/router}}
}
</script>

<style>
@import url("./assets/base.css");
#app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>
