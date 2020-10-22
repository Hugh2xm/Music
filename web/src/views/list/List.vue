<template>
    <transition name="el-zoom-in-top">
    <div v-show="show2">
        <el-row>
            <el-col :span="24" class="list-img" v-bind:style="{backgroundImage:'url(' + this.icon.url + ')'}">
            </el-col>
        </el-row>
        <el-button @click="show2 = !show2"  style="display: none" ref="pic">Click Me</el-button>

            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                        <div class="bg-grey">
<!--                            <el-card class="box-card">-->
<!--                                <div class="clearfix text-center pb-5">-->
<!--                                    <h2>卡片名称</h2>-->
<!--                                </div>-->
<!--                            </el-card>-->
                            <div class="mixin-components-container">
                                <el-row>
                                    <el-card class="box-card" style="text-align:left">
                                        <div slot="header" class="clearfix title">
                                            <span>Vue框架中嵌入使用wavesurfer.js插件</span>
                                        </div>
                                        <div id="waveform" ref="waveform">
                                            <!-- Here be the waveform -->
                                        </div>
                                        <div id="wave-timeline" ref="wave-timeline">
                                            <!--时间轴 -->
                                        </div>
                                        <div>
                                            <el-button type="primary" @click="playMusic">
                                                <i class="el-icon-video-play"></i>
                                                播放 /
                                                <i class="el-icon-video-pausee"></i>
                                                暂停
                                            </el-button>
                                        </div>
                                    </el-card>
                                </el-row>
                            </div>

                        </div>
                </el-col>
            </el-row>

    </div>
    </transition>
</template>

<script>
    import WaveSurfer from 'wavesurfer.js'
    import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
    export default {
        name: "List",
        data() {
            return {
                icon: {
                        url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    },
                show2: false,
                wavesurfer: null,
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.$refs.pic.$el.click()
                console.log(WaveSurfer)
                this.wavesurfer = WaveSurfer.create({
                    container: this.$refs.waveform,
                    waveColor: '#409EFF',
                    progressColor: 'blue',
                    backend: 'MediaElement',
                    mediaControls: false,
                    audioRate: '1',
                    //使用时间轴插件
                    plugins: [
                        Timeline.create({
                            container: '#wave-timeline'
                        }),
                    ]

                });
                // 特别提醒：此处需要使用require(相对路径)，否则会报错
                // this.wavesurfer.load(require('./peaks/sample.mp3'));
                this.wavesurfer.load('http://downsc.chinaz.net/Files/DownLoad/sound1/202010/13497.mp3');
            })
        },
        methods: {
            playMusic() {
                //"播放/暂停"按钮的单击触发事件，暂停的话单击则播放，正在播放的话单击则暂停播放
                this.wavesurfer.playPause.bind(this.wavesurfer)()
            }
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
.mixin-components-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
}
</style>