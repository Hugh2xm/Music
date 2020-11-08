<template>
  <div id="app">
    <router-view  v-if="isRouterAlive"/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    provide (){
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
    watch: {
      '$route': function(to,from){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }
</script>
