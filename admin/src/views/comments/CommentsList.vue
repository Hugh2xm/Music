<template>
    <div>
        <el-card class="box-card">
            <h1>评论列表</h1>
            <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240"></el-table-column>
            <el-table-column prop="upload" label="评论用户" width="240"></el-table-column>
            <el-table-column prop="content" label="评论"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                <!-- 通过scope可以获得当前行的所有数据  -->
                    <el-button
                            type="text"
                            size="small"
                            @click="$router.push(`/comments/edit/${scope.row._id}`)">
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
                const res = await this.$http.get('rest/comments')
                this.items = res.data
            },
            async remove (row) {
                this.$confirm(`是否确定要删除"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`rest/comments/${row._id}`)
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