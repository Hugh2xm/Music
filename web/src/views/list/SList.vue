<template>
    <el-container class="TList-box">
        <el-header class="border-bottom mb-4">
        </el-header>
        <div class="search-title pl-4 pb-1 border-bottom mb-5" style="width: 20rem;">
            <h3><i class="el-icon-search pr-2"></i>搜索结果 : {{this.$route.params.id}}</h3>
        </div>
        <el-main>
            <el-card class="box-card mb-4">
                <div class="text item" >
                    <VueAudio v-for="(items,index) in searchList.data"
                              :key="index"
                              :url="items.url"
                              :name="items.name"
                              :BNumber="items.download">
                    </VueAudio>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import VueAudio from "./components/VueAudio";
    export default {
        name: "SList",
        components: {
            VueAudio
        },
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
.TList-box {
    width: 80%;
    /*background-color: black;*/
    margin: 5rem auto 0 auto;
}
</style>