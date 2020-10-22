<template>
    <div>
        <div class="box">
            <el-container class="categories">
                <el-header>
                    <h2 class="mt-4 text-center text" style="">热门</h2>
                </el-header>
                <el-main>
                    <div>
                        <el-button @click="show2 = !show2" style="display: none" ref="pic">Click Me</el-button>
                        <div class="d-flex jc-between">
                            <div class="nav-item" v-for="item in 4" :key="item">
                                <transition name="el-zoom-in-center">
                                    <router-link tag="div" to="/test" v-show="show2" style="position: relative;overflow: hidden">
                                        <div>
                                            <el-image :src="src">
                                            </el-image>
                                        </div>
                                        <span class="img-title">1111111111111</span>
                                    </router-link>
                                </transition>
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="box">
            <el-container class="categories">
                <el-header>
                    <h2 class="mt-4 text-center text">常用音效</h2>
                </el-header>
                <el-main>
                    <div class="d-flex jc-between">
                        <el-card class="box-card" shadow="hover" v-for="i in 3" :key="i">
                            <div slot="header" class="clearfix" style="font-size: 1.2rem">
                                <span>环境</span>
                            </div>
                            <div class="px-2 py-1">
                                <span style="color: #8c939d">好吃的汉堡</span>
                                <div style="padding-left: 60%">
                                    <el-image
                                            style="width: 50px; height: 50px"
                                            class="mx-2"
                                            :src="url"
                                            v-for="i in 2"
                                            :key="i"
                                            ></el-image>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Content",
        data () {
            return {
                show2: false,
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.$refs.pic.$el.click()
            })
        }


    }
</script>

<style scoped>
.box {
    /*background-color: #791a15;*/
    padding: 50px 0 0 0;
}
.categories {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    /*background-color: #4b67af;*/
}

.nav-item {
    width: 20%;
    /*background-color: #791a15;*/
}

.img-title {
    position: absolute;
    top: 45%;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 1.3rem;
}
.box-card {
    width: 30%;
    border-radius: 1rem !important;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

</style>