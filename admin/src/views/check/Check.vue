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
                            prop="username"
                            sortable
                            label="上传用户名称">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            sortable
                            label="歌曲名称">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="$router.push(`/users/edit/${scope.row._id}`)">
                                详细
                            </el-button>
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="remove(scope.row)">
                                通过
                            </el-button>
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="remove(scope.row)">
                                拒绝
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
        name: "Check"
    }
</script>

<style scoped>
    .box-card {
        margin: 2rem;
    }
</style>