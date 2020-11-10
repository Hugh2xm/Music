<template>
    <div id="myChart" :style="{width: '800px', height: '800px'}"></div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                items: {}
            }
        },
        mounted(){
            this.DataDownload();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    series: {
                        type: 'sunburst',
                        data: this.items
                    }
                })
            },
            async DataDownload() {
                const res = await this.$http.get('/rest/dataShow')
                this.items = res.data
                this.drawLine()
            }
        }
    };
</script>

<style scoped>

</style>