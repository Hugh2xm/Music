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
                        style="width: 100%"
                        row-key="id"
                        lazy
                        :load="load"
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column
                            prop="_id"
                            label="ID"
                            width="230">
                    </el-table-column>
                    <el-table-column
                            prop="parent.name"
                            label="上级分类">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="分类名称">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
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
</style>