<template>
    <div class="pt-7">111111</div>
</template>

<script>
    export default {
        name: "SList",
        data() {
          return {
              searchList: ''
          }
        },
        methods: {
            async fetchList() {
                const res = await this.$http.get(`home/search/${this.$route.params.id}`)
                this.searchList = res.data
            }
        },
        created() {
            this.fetchList()
        }

    }
</script>

<style scoped>

</style>