<template>
    <div>
        <div class="box">
            <el-container class="categories">
                <el-header>
                    <h2 class="mt-4 text-center text" style="">热 门</h2>
                </el-header>
                <el-main>
                    <div>
                        <el-button @click="show2 = !show2" style="display: none" ref="pic">Click Me</el-button>
                        <div class="d-flex jc-between">
<!--                            <transition name="el-zoom-in-center">-->
                            <div class="bg-black"
                                 v-for="item in 4" :key="item"
                                 style="width: 20%;position: relative;overflow: hidden">
                                <a href="javaScript:;" class="hot-image py-7" v-bind:style="{backgroundImage:'url(' + icon.url + ')'}"></a>
                                <div class="hot-body">
                                    <p>热门·水</p>
                                </div>
                            </div>
<!--                            </transition>-->
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="box">
            <el-container class="categories px-7">
                <el-header>
                    <h2 class="mt-4 text-center text">分 类</h2>
                </el-header>
                <el-main class="d-flex flex-wrap">
                    <div style="flex: 50%;position: relative" class="card-box" v-for="(item,index) in CList" :key="index">
                        <a class="card-image py-7" href="javascript:;" v-bind:style="{backgroundImage:'url(' + src + ')'}"></a>
                        <div class="card-body">
                            <router-link :to="`/tlist/${itemC._id}`" href="/" v-for="(itemC,indexC) in item.children" :key="indexC">| {{itemC.name}} </router-link>
                            <router-link :to="`/tlist/${item._id}`" ><h3>{{item.name}}</h3></router-link>
                        </div>
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
                icon: {
                    url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                },
                show2: false,
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                CList: []
            }
        },

        mounted() {
            this.$nextTick(function () {
                this.$refs.pic.$el.click()
            })
        },
        methods: {
            async fetchCategories() {
                const res = await this.$http.get('category/list')
                this.CList = res.data
            }
        },
        created() {
            this.fetchCategories()
        }
    }
</script>

<style scoped lang="scss">
.box {
    /*background-color: #791a15;*/
    padding: 5rem 0 0 0;
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
.bg-purple-light {
    background: #e5e9f2;
}
.hot-image {
    display: block;
    width: 100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.5s;
}
.hot-image:hover {
    /*background-size: 120% 120%;*/
    transform: scale(1.5);
}

.hot-image:hover + .hot-body>p {
    color: rgba(255,255,255,.6);
}

.hot-body {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 2;
    p {
        font-weight: 700;
        font-size: 1.3rem;
        color: white;
        letter-spacing: .2rem;
    }
}

.card-box:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}
.card-box:hover::after{
    background: rgba(255, 255, 255, .2);
}

.card-box:hover::after .card-body a {
    color: black;
}


.card-image {
    display: block;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
}
.card-body {
    position: absolute;
    left: 5%;
    bottom: 5%;
    z-index: 2;
    a {
        color: white;
        letter-spacing: .05rem;
    }
    a:hover {
        color: rgba(255,255,255,.4);
    }
}
</style>