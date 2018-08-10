<template>
  <div class="screenfull">
    <h1 v-if="fade.text">\{{text}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      fade:{
        text:true
      },
      text:"Hello World !"
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
