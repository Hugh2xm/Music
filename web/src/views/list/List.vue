<template>
    <div>
        <el-row>
            <transition name="el-zoom-in-top">
                <el-col :span="24" class="list-img" v-show="show2" v-bind:style="{backgroundImage:'url(' + this.icon.url + ')'}">
                </el-col>
            </transition>
        </el-row>
        <el-button @click="show2 = !show2"  style="display: none" ref="pic">Click Me</el-button>
        <el-row>
            <el-col :span="20" :offset="2">
                    <div>
                        <transition name="el-zoom-in-top">
                        <el-card class="box-card" v-show="show2">
                            <div class="clearfix text-center pb-5">
                                <h2>{{this.list.name}}</h2>
                            </div>
                            <div class="text item px-5 py-2">
                                <VueAudio v-for="(item,index) in list.songList" :key="index" :url="item.url" :name="item.name.slice(0,-4)" :BNumber="item.download"></VueAudio>
                            </div>
                        </el-card>
                        </transition>
                    </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import VueAudio from "./components/VueAudio";
    export default {
        name: "List",
        components: {
            VueAudio
        },
        data() {
            return {
                icon: {
                        url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    },
                show2: false,
                titleID: this.$route.params.id,
                list: {},
            }
        },
        methods: {
            async fetchMusicList() {
                const res = await this.$http.get(`music/list/${this.titleID}`)
                this.list = res.data[0]
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.$refs.pic.$el.click()
            })
        },
        created() {
            this.fetchMusicList()
        }
    }
</script>

<style scoped>
.list-img {
    width: 100%;
    height: 30rem;
    background: center 40%;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.box-card {
    position: relative;
    top: -8rem;
    left: 0;
    border-radius: 1.2rem;
}
</style>