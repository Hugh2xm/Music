<template>
    <el-container class="TList-box">
        <el-header class="border-bottom text-center mb-7" style="position: relative">
            <div class="courseLogo" >
                <div class="courseBefore">
                    {{this.titleName}}
                </div>
                <div class="courseAfter">
                    {{this.titleName}}
                </div>
            </div>
        </el-header>
        <el-main class="mt-7 px-7">
            <el-card class="box-card mb-7" v-for="(item,index) in info" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                    <div style="float:right; margin: -.6rem 0">
                        <el-button type="text"><router-link :to="`/list/${item._id}`">更多</router-link></el-button>
                    </div>
                </div>
                <div class="text item">
                    <VueAudio v-for="(items,index) in item.songList" :key="index" :url="items.url" :name="items.name.slice(0,-4)" :BNumber="items.download"></VueAudio>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import VueAudio from "./components/VueAudio";
    export default {
        name: "TList",
        components: {
            VueAudio
        },
        data() {
            return {
                titleID: this.$route.params.id,
                list: {},
                info: {},
                titleName: '',
            }
        },
        methods: {
            async fetchMusicTList() {
                const res = await this.$http.get(`music/tlist/${this.titleID}`)
                this.list = res.data
                this.info = res.data.slice(1)
                this.titleName = res.data.slice(0,1)[0].name
            },

        },
        mounted() {
            console.log(this.$route)
        },
        created() {
            this.fetchMusicTList()
        }
    }
</script>

<style scoped lang="scss">
.TList-box {
    width: 80%;
    /*background-color: black;*/
    margin: 10rem auto 0 auto;
}
.courseLogo{
    padding: 4rem;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    perspective: 800px;
}

.courseBefore{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center center;
    backface-visibility: hidden;
    transition: 1s;
    background-color: black;
    color: white;
    padding-top: 40%;
    font-size: 1.2rem;
    letter-spacing: .2rem;
}
.courseAfter{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background-color: white;
    color: black;
    transform: rotateY(-180deg);
    backface-visibility: hidden;
    transition: 1s;
    padding-top: 40%;
    font-size: 1rem;
    letter-spacing: .2rem;

}
.courseLogo:hover .courseBefore{
    transform: rotateY(180deg);
}
.courseLogo:hover .courseAfter{
    transform: rotateY(0deg);
}
</style>