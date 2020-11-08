<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户列表</span>
            </div>
            <div class="text item">
                <el-table :data="items">
                    <el-table-column
                            prop="_id"
                            sortable
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="mask"
                            sortable
                            label="状态">
                        <template slot-scope="scope">
                            <el-tag type="info" close-transition v-if="scope.row.mask === 0">
                                等待处理
                            </el-tag>
                            <el-tag type="success" close-transition v-if="scope.row.mask === 1">
                                通过
                            </el-tag>
                            <el-tag type="danger" close-transition v-if="scope.row.mask === 2">
                                不通过
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="upload.username"
                            sortable
                            label="上传用户名称">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            sortable
                            label="歌曲名称">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope" v-if="scope.row.mask !== 1">
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="$router.push(`/check/particular/${scope.row._id}`)">
                                详细
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-card>

    </div>
</template>

<script>
    export default {
        name: "CheckList",
        data() {
          return {
              items: []
          }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('rest/UpSong')
                this.items = res.data
                console.log(this.items)
            },
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>
    .box-card {
        margin: 2rem;
    }
</style>