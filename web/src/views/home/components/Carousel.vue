<template>
    <div class="box-carousel">
        <el-row>
            <el-col :span="12">
                <div class="left">
                    <div class="left-title">
                        <div>查找免版税声音效果</div>
                        <div>300，000+ 声音效果库。每周更新。无限下载。</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="right">
                    <div class="block">
                        <el-carousel height="500px">
                            <el-carousel-item v-for="(item,index) in pic" :key="index">
                                <el-image
                                        style="width: 100%; height: 100%"
                                        :src="item.img"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import '../../../assets/scss/home.scss'
    export default {
        name: "Carousel",
        data() {
            return {
                pic: [
                    {
                        img:'https://gratisography.com/wp-content/uploads/2019/10/gratisography-mountain-cloud-landscape-1170x780.jpg',
                    },{
                        img:'https://gratisography.com/wp-content/uploads/2019/09/gratisography-rocky-cliff-view-1170x780.jpg'
                    }]
            }
        }
    }
</script>

<style scoped lang="scss">
.left {
    height: 500px;
    background-color: black;
    .left-title {
        padding-top: 19%;
        padding-left: 20%;
        color: white;
    }
    .left-title div:first-child{
        font-size: 2rem;
        margin-bottom: 3rem;
    }
    .left-title div:last-child{
        font-size: 1.2rem;
    }
}
.right {
    height: 500px;
}
</style>