<template>
    <div id="myChart" :style="{width: '800px', height: '800px'}" style="margin: 0 auto"></div>
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
                    title: {
                        text: '各分类音频下载数量',
                        textStyle: {
                            fontSize: 20,
                            align: 'center'
                        },
                        subtextStyle: {
                            align: 'center'
                        },
                    },
                    series: {
                        type: 'sunburst',
                        data: this.items,
                        radius: [0, '95%'],
                        levels: [{}, {
                            r0: '15%',
                            r: '35%',
                            itemStyle: {
                                borderWidth: 2
                            },
                            label: {
                                rotate: 'tangential'
                            }
                        }, {
                            r0: '35%',
                            r: '70%',
                            label: {
                                align: 'right'
                            }
                        }, {
                            r0: '70%',
                            r: '72%',
                            label: {
                                position: 'outside',
                                padding: 3,
                                silent: false
                            },
                            itemStyle: {
                                borderWidth: 3
                            }
                        }]
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