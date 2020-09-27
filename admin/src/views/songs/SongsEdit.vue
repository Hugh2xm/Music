<template>
    <div class="about">
        <el-card class="box-card" style="width: 85%;margin: 3rem auto">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑':'新建'}}歌曲</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item" >
                <el-form label-width="120px" @submit.native.prevent="save">
                    <el-row>

                        <el-col :span="15" :offset="3" style="text-align: center;" >
                            <el-form-item>
                                <el-upload
                                        class="upload-demo"
                                        drag
                                        :action="$http.defaults.baseURL + '/upload'"
                                        :multiple="false"
                                        :limit="1"
                                        :on-success="Upload"
                                        :file-list="fileList">
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <div class="el-upload__tip" slot="tip">一次只能上传一首</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" :offset="3" style="margin-bottom: 1.5rem">
                            <el-form-item>
                                <div style="width: 60%">
                                    <aplayer :music="videoUpload.music" ></aplayer>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="歌曲名">
                                <el-input v-model="model.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" >
                            <el-form-item label="歌曲类型">
                                <el-select  v-model="model.parent" placeholder="请选择" multiple>
                                    <el-option
                                            v-for="item of parents"
                                            :label="item.name"
                                            :value="item._id"
                                            :key="item._id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="下载次数">
                                <el-input :disabled="true" v-model="model.download"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="上传人">
                                <el-input :disabled="true" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" :offset="2">
                            <el-form-item label="歌曲介绍">
                                <el-input type="textarea" v-model="model.introduction"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :offset="21" style="margin-top: 2rem">
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
                model: {
                    name: '',
                    download: 0
                },
                fileList: [],
                parents: [],
                videoUpload: {
                    progress: false,
                    progressPercent: 0,
                    successPercent: 0,
                    music: {
                        title: ' ',
                        author: ' ',
                        url: ' ',
                        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                    }
                }
            }
        },
        methods: {
            Upload(filter,file) {
                console.log(file)
                this.model.name=file.name
                this.videoUpload.music = {
                    title : file.name,
                    author: '11',
                    url: file.response.url,
                    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                }
                this.model.url = file.response.url
            },
            // 修改和新建
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`rest/songs/${this.id}`, this.model)
                } else {
                    //新建
                    await this.$http.post('rest/songs', this.model)
                }
                this.$router.push('/songs/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/songs/${this.id}`)
                //因为原本定义中有scores这个属性，但是=res.data是覆盖的意思，所以找不到scores这个属性
                this.model = Object.assign({} ,this.model ,res.data)
                this.fileList = [{
                    name: this.model.name,
                    url: this.model.url
                }]
            },
            async fetchCategories() {
                //注意的是这里拿到的是所有的分类
                const res = await this.$http.get(`rest/categories`)
                this.parents = res.data
            },

        },
        created () {
            this.fetchCategories()
            this.id && this.fetch()
        }
    }
</script>