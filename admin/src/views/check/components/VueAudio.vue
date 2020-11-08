<template>
    <div>
        <div>
            <div style="display: flex; align-items: center; justify-content:space-between;margin-top: 2rem">
                <el-button @click="startPlayOrPause" type="info" plain ref="PlayPause">{{audio.playing | transPlayPause}}<i class="el-icon--right" :class="`el-icon-${icon}`"></i></el-button>
                <audio ref="audio"
                       :src="url"
                       @pause="onPause"
                       @play="onPlay"
                       @timeupdate="onTimeupdate"
                       @loadedmetadata="onLoadedmetadata"
                       @ended="onended">
                </audio>
                <av-waveform
                        ref-link="audio"
                        played-line-color="#00ffaf"
                        noplayed-line-color="#999999"
                        playtime-slider-color="#999999"
                        playtime-text-bottom
                ></av-waveform>
                <p>{{ audio.currentTime | formatSecond}}/{{ audio.maxTime | formatSecond}}</p>
            </div>
            <div style="letter-spacing: .2rem;padding: 2rem">
                <el-row :gutter="20" style="margin-bottom:2rem;">
                    <el-col :span="4"><div class="grid-content bg-purple">歌曲名称:</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">{{name.slice(0,-4)}}</div></el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom:2rem;">
                    <el-col :span="4"><div class="grid-content bg-purple">歌曲类型:</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">{{categories}}</div></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="4"><div class="grid-content bg-purple">上传人:</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">{{upload}}</div></el-col>
                </el-row>

            </div>
        </div>
    </div>
</template>

<script>
    // 将整数转换成 时：分：秒的格式
    function realFormatSecond(second) {
        let secondType = typeof second

        if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)

            let hours = Math.floor(second / 3600)
            second = second - hours * 3600
            let mimute = Math.floor(second / 60)
            second = second - mimute * 60

            return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
            return '0:00:00'
        }
    }
    export default {
        name: "VueAudio",
        data () {
            return {
                audio: {
                    // 该字段是音频是否处于播放状态的属性
                    playing: false,
                    // 音频当前播放时长
                    currentTime: 0,
                    // 音频最大播放时长
                    maxTime: 0,
                },
                icon: 'bell',
            }
        },
        props: {
            url: String,
            name: String,
            id: String,
            upload: String,
            categories: String
        },
        methods: {
            // 控制音频的播放与暂停
            startPlayOrPause () {
                return this.audio.playing ? this.pause() : this.play()
            },
            // 播放音频
            play () {
                this.$refs.audio.play()
                this.icon= 'minus'
            },
            // 暂停音频
            pause () {
                this.$refs.audio.pause()
                this.icon= 'bell'
            },
            // 当音频播放
            onPlay () {
                this.audio.playing = true
            },
            // 当音频暂停
            onPause () {
                this.audio.playing = false
            },
            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            onTimeupdate(res) {
                console.log('timeupdate')
                console.log(res)
                this.audio.currentTime = res.target.currentTime
            },
            // 当加载语音流元数据完成后，会触发该事件的回调函数
            // 语音元数据主要是语音的长度之类的数据
            onLoadedmetadata(res) {
                console.log('loadedmetadata')
                console.log(res)
                this.audio.maxTime = parseInt(res.target.duration)
            },
            //播放结束事件
            onended() {
                console.log('audio end');
                this.icon= 'bell'
                this.$refs.audio.load()
            }
        },
        filters: {
            // 使用组件过滤器来动态改变按钮的显示
            transPlayPause(value) {
                return value ? '暂停' : '播放'
            },
            // 将整数转化成时分秒
            formatSecond(second = 0) {
                return realFormatSecond(second)
            }
        },
        mounted() {
            this.$refs.PlayPause.class='el-button is-plain'
        }
    }
</script>

<style scoped>
    .btn-download {
        border: 1px solid #d3d4d6;
        background-color: #f4f4f5;
        border-radius: .3rem;
        padding: .6rem 1rem;
        color: #909399;
        font-size: 14px;
    }

    .btn-download:hover {
        background-color: #909399;
        color: #fff;
        border: #909399;
    }

    .grid-content {
        border-radius: 4px;
        padding: .2rem 0 .2rem 2rem;
    }
    .bg-purple {
        background: #d3dce6;
    }
</style>