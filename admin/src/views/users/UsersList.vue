<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户列表</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                <el-table :data="items">
                    <el-table-column
                            prop="_id"
                            sortable
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            sortable
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="$router.push(`/users/edit/${scope.row._id}`)">
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
        name: "AdminUsersList",
        data () {
            return {
                items: [],
            }
        },
        methods: {
            //显示
            async fetch () {
                const res = await this.$http.get('rest/users')
                this.items = res.data
            },
            //删除
            async remove (row) {
                this.$confirm(`是否确定要删除分类"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`rest/users/${row._id}`)
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

<style scoped>
    .box-card {
        margin: 2rem;
    }
</style>