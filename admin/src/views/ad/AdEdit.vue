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
                            <el-form-item label="名称">
                            <el-input v-model="model.name"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="广告">
                            <el-button size="small" @click="model.items.push({})">
                                <i class="el-icon-plus"></i> 添加广告
                            </el-button>
                            <el-row>
                                <el-col  v-for="(item, i) in model.items" :key="i" style="margin-top: 3rem">
                                    <el-form-item label="跳转链接 (URL)">
                                        <el-input v-model="item.url"></el-input>
                                    </el-form-item>
                                    <el-form-item label="图片" style="margin-top: 0.5rem;">
                                        <el-upload
                                                class="avatar-uploader"
                                                :action="$http.defaults.baseURL + '/upload'"
                                                :show-file-list="false"
                                                :on-success="res => $set(item, 'image', res.url)"
                                        >
                                            <img v-if="item.image" :src="item.image" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-form-item>

                                    <el-form-item style="text-align: right;margin-right: 5rem">
                                        <el-button size="small" type="danger" @click="model.items.splice(i, 1)">删除</el-button>
                                    </el-form-item>
                                    <el-divider></el-divider>
                                </el-col>
                            </el-row>
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
                    items: []
                },
            }
        },
        methods: {
            // 修改和新建
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`rest/ads/${this.id}`, this.model)
                } else {
                    //新建
                    await this.$http.post('rest/ads', this.model)
                }
                this.$router.push('/ads/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/ads/${this.id}`)
                this.model = Object.assign({},this.model,res.data)
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