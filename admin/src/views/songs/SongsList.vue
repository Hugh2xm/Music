<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>歌曲列表</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="parent" label="类别">
                <div></div>
            </el-table-column>
            <el-table-column prop="introduction" label="简介"></el-table-column>
            <el-table-column prop="download" label="下载次数"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            size="small"
                            @click="$router.push(`/songs/edit/${scope.row._id}`)">
                        编辑
                    </el-button>
                    <el-button
                            type="text"
                            size="small"
                            @click="remove(scope.row)">
                        删除
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
        name: "CategoriesList",
        data () {
            return {
                items: [],
            }
        },
        methods: {
            async fetch () {
                const res = await this.$http.get('rest/songs')
                this.items = res.data
                console.log(this.items)
            },
            async remove (row) {
                this.$confirm(`是否确定要删除分类"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`rest/songs/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetch();
                });
            },
        },
        created () {
            this.fetch()
        }
    }
</script>