<template>
    <div class="about">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item" >
                <el-form label-width="120px">
                    <el-row>
                        <el-col :span="24" :offset="6">
                            <el-form-item>
                                <el-upload
                                        class="upload-demo"
                                        drag
                                        :action="$http.defaults.baseURL + '/upload'"
                                        multiple>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <div class="el-upload__tip" slot="tip">一次只能上传一首</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" :offset="3">
                            <el-form-item>
                                <div style="width: 60%">
                                    <aplayer :music="videoUpload.music" ></aplayer>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="歌曲名">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="10" >
                            <el-form-item label="歌曲类型">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="下载次数">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="上传人">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" :offset="2">
                            <el-form-item label="歌曲介绍">
                                <el-input type="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :offset="22" style="margin-top: 2rem">
                            <el-button type="primary" native-type="submit">保存</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import aplayer from 'vue-aplayer'
    export default {
        name: "heroesEdit",
        props: {
            id: {},
        },
        components: {
            aplayer
        },
        data () {
            return {
                videoUpload: {
                    progress: false,
                    progressPercent: 0,
                    successPercent: 0,
                    music: {
                        title: '11',
                        author: '11',
                        url: 'https://s320.xiami.net/494/737375494/2037375495/1774518752_1515910813097.mp3?ccode=xiami_web_web&expire=86400&duration=208&psid=80daa5ec6a8db14e1a3d2d22b1ee4302&ups_client_netip=113.78.187.0&ups_ts=1600937202&ups_userid=0&utid=xh1QF6IatBsCAWVqer5tiZtN&vid=1774518752&fn=1774518752_1515910813097.mp3&vkey=Bdc0526e646d104322b426a3dc701bc20',
                        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                    }
                }
            }
        },
        methods: {}
    }
</script>