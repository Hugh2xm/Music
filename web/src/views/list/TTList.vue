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
        <el-main class="mt-5">
            <div class="d-flex jc-between">
                <router-link :to="`/tlist/${item._id}`" v-for="(item,index) in infoList" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 14px;" class="text-center">
                            <span>{{item.name}}</span>
                        </div>
                    </el-card>
                </router-link>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "TTList",
        data() {
          return {
              titleID: this.$route.params.id,
              children: '',
              titleName: '',
              infoList: ''


          }
        },
        methods: {
            async fetchChildren() {
                const res = await this.$http.get(`category/children/${this.titleID}`)
                this.children = res.data
                this.titleName = res.data[0].name
                this.infoList = res.data.slice(1)
            }
        },
        created() {
            this.fetchChildren()
        }
    }
</script>

<style scoped>
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