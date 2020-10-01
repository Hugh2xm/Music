<template>
    <div class="about">
        <el-card style="width: 80%;margin: 20px auto">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑':'新建'}}评论</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                <el-form label-width="120px" @submit.native.prevent="save">
                    <el-row :gutter="20">
                        <el-col :span="16" :offset="3" style="margin-top: 4rem">
                            <el-form-item label="评论歌曲">
                                <el-select v-model="model.songs" placeholder="请选择">
                                    <el-option
                                            v-for="item of song"
                                            :label="item.name"
                                            :value="item._id"
                                            :key="item._id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="3">
                            <el-form-item label="评论用户">
                                <el-input v-model="model.upload" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="评论内容">
                                <el-input type="textarea" v-model="model.content"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16" :offset="15">
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
    export default {
        name: "CategoriesEdit",
        props: {
            id: {}
        },
        data () {
            return {
                model: {
                    upload: '11'
                },
                song: []
            }
        },
        methods: {
            // 修改和新建
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`rest/comments/${this.id}`, this.model)
                } else {
                    //新建
                    await this.$http.post('rest/comments', this.model)
                }
                this.$router.push('/comments/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //显示歌曲的下拉列表
            async fetchSongs() {
                const res = await this.$http.get(`rest/song/name`)
                this.song = res.data
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/comments/${this.id}`)
                this.model = Object.assign({},this.model,res.data)
            },
        },
        created () {
            this.fetchSongs()
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