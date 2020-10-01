<template>
    <div class="about">
        <el-card style="width: 80%;margin: 20px auto">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑':'新建'}}广告位</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                <el-form label-width="120px" @submit.native.prevent="save">
                    <el-row :gutter="20">
                        <el-col :span="16" :offset="3" style="margin-top: 4rem">
                            <el-form-item label="合辑名称">
                                <el-input v-model="model.name"></el-input>
                            </el-form-item>
                            <el-form-item label="合辑封面">
                                <el-upload
                                        class="avatar-uploader"
                                        :action="$http.defaults.baseURL + '/upload'"
                                        :show-file-list="false"
                                        :on-success="res => $set(model, 'CImg', res.url)"
                                >
                                    <img v-if="model.CImg" :src="model.CImg" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="合辑简介">
                                <el-input type="textarea" v-model="model.introduction"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16" :offset="3">
                            <el-form-item>
                                <el-upload
                                        class="upload-demo"
                                        drag
                                        :action="$http.defaults.baseURL + '/upload'"
                                        :on-success="Upload"
                                        :show-file-list="false"
                                        >
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <div class="el-upload__tip" slot="tip"></div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :offset="3">
                            <el-form-item v-for="(item,index) of this.model.songs" :key="index">
                                <el-row>
                                    <el-col :span="14">
                                        <aplayer :music="videoUpload[index].music" ></aplayer>
                                    </el-col>
                                    <el-col :span="5" :offset="2" style="margin-top: 1rem">
                                        <el-button class="son-del" size="small" type="danger" @click="model.songs.splice(index, 1)&&videoUpload.splice(index,1)">删除</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                        <el-col  :offset="10" style="margin-top: 2rem">
                            <el-form-item>
                                <el-button type="primary" native-type="submit">保存</el-button>
                            </el-form-item>
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
        name: "CategoriesEdit",
        props: {
            id: {}
        },
        components: {
            aplayer
        },
        data () {
            return {
                model: {
                    songs: []
                },
                videoUpload: []
            }
        },
        methods: {
            Upload(res) {
                console.log(res)
                this.model.songs.push({
                    name: res.originalname,
                    url: res.url,
                })
                this.videoUpload.push({
                    progress: false,
                    progressPercent: 0,
                    successPercent: 0,
                    music: {
                        title: res.originalname,
                        author: '11',
                        url: res.url,
                        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                    }
                })
            },
            // 修改和新建
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`rest/collections/${this.id}`, this.model)
                } else {
                    //新建
                    await this.$http.post('rest/collections', this.model)
                }
                this.$router.push('/collections/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/collections/${this.id}`)
                this.model = Object.assign({},this.model,res.data)
                console.log(this.model.songs)
                this.model.songs.forEach( item => {
                    this.videoUpload.push({
                        progress: false,
                        progressPercent: 0,
                        successPercent: 0,
                        music: {
                            title: item.name,
                            author: '11',
                            url: item.url,
                            lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                        }
                    })
                })
            },
        },
        created () {
            this.id && this.fetch()
        }
    }
</script>

<style scoped>
    .avatar-uploader,
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 260px;
        height: 130px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 260px;
        height: 130px;
        line-height: 130px;
        text-align: center;
    }
    .avatar {
        width: 260px;
        height: 130px;
        display: block;
    }
</style>