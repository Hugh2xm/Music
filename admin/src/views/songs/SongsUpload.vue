<template>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-row>
            <el-col :span="15" :offset="3" style="text-align: center;" >
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            drag
                            :action="$http.defaults.baseURL + '/uploadM'"
                            :headers="getAuthHeaders()"
                            :on-success="Upload"
                            :file-list="fileList"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :offset="21" style="margin-top: 2rem">
                <el-button type="primary" native-type="submit" ref="ok">保存</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "SongsUpload",
        data() {
          return {
              fileList: []
          }
        },
        methods: {
            Upload(filter,file) {
                this.fileList.push({
                    name: file.name,
                    url: file.response.url
                })
            },
            async save() {
                //新建
                await this.$http.post('rest/TSong', this.fileList)
                this.$router.push('/songs/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
        }
    }
</script>

<style scoped>

</style>