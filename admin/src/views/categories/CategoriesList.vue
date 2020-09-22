<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>分类列表</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                <el-table
                        :data="items"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="ID:">
                                    <span>{{ props.row._id }}</span>
                                </el-form-item>
                                <el-form-item label="分类名称:">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="子分类:">
                                    <span v-for="item of props.row.child" style="margin: 0 10px">{{item}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="ID" prop="_id">
                    </el-table-column>
                    <el-table-column label="名称" prop="name">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="$router.push(`/categories/create/${scope.row._id}`)">
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
                items: []
            }
        },
        methods: {
            //显示
            async fetch () {
                const res = await this.$http.get('categories')
                this.items = res.data
            },
            //删除
            async remove (row) {
                this.$confirm(`是否确定要删除分类"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`categories/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetch();
                });
            },
            load(tree, treeNode, resolve) {
                setTimeout(() => {
                    resolve([
                        {
                            id: 31,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            id: 32,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }
                    ])
                }, 1000)
            }
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
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>