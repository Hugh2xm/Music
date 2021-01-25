<template>
    <div>
        <div class="box">
            <el-container class="categories">
                <el-header>
                    <h2 class="mt-4 text-center text" style="">热 门</h2>
                </el-header>
                <el-main>
                    <div>
                        <div class="d-flex jc-between">
                            <div class="bg-black"
                                 v-for="(item,index) in hotList" :key="index"
                                 style="width: 20%;position: relative;overflow: hidden">
                                <router-link :to="`/list/${item._id}`" class="hot-image py-7" v-bind:style="{backgroundImage:'url(' + icon.url + ')'}"></router-link>
                                <div class="hot-body">
                                    <p>{{item.parent[0].name}}·{{item.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="box">
            <el-container class="categories">
                <el-header>
                    <h2 class="mt-4 text-center text" style="">冷 门</h2>
                </el-header>
                <el-main>
                    <div>
                        <div class="d-flex jc-between">
                            <div class="bg-black"
                                 v-for="(item,index) in hotList" :key="index"
                                 style="width: 20%;position: relative;overflow: hidden">
                                <router-link :to="`/list/${item._id}`" class="hot-image py-7" v-bind:style="{backgroundImage:'url(' + icon.url + ')'}"></router-link>
                                <div class="hot-body">
                                    <p>{{item.parent[0].name}}·{{item.name}}</p>
                                </div>
                            </div>
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
                            <router-link :to="`/ttlist/${item._id}`" ><h3>{{item.name}}</h3></router-link>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="box">
            <el-container class="categories">
                <div id="myChart" :style="{width: '100%', height: '500px'}">11</div>
            </el-container>
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    export default {
        name: "Content",
        data () {
            return {
                icon: {
                    url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                },
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                CList: [],
                hotList: ''
            }
        },
        methods: {
            async fetchCategories() {
                const res = await this.$http.get('category/list')
                this.CList = res.data
            },
            async fetchHostList() {
                const res = await this.$http.get('hot')
                this.hotList = res.data
            },
            drawLine() {
                let chartDom = document.getElementById('myChart');
                let myChart = echarts.init(chartDom);
                let option;

                let xAxisData = [];
                let data1 = [];
                let data=[10,20,30,40,50,100,140,2,5]
                for (let i = 0; i < data.length; i++) {
                    xAxisData.push('类目' + i);
                    data1.push(data[i]);
                }
                option ={
                    title: {
                        text: '柱状图动画延迟'
                    },
                    legend: {
                        data: ['bar']
                    },
                    tooltip: {},
                    xAxis: {
                        data: xAxisData,
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                    },
                    series: [{
                        name: 'bar',
                        type: 'bar',
                        data: data1,
                        emphasis: {
                            focus: 'series'
                        },
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }],
                    animationEasing: 'elasticOut',
                    animationDelayUpdate: function (idx) {
                        return idx * 5;
                    }
                };
                option && myChart.setOption(option);
            }
        },
        mounted(){
            this.drawLine();
        },
        created() {
            this.fetchCategories()
            this.fetchHostList()
        },
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