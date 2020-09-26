<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>分类列表</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                <el-table
                        :data="p"
                        style="width: 100%;margin-bottom: 20px;"
                        row-key="num"
                        default-expand-all
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column
                            prop="_id"
                            sortable
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            sortable
                            label="分类名称">
                    </el-table-column>
                    <el-table-column
                            label="操作">
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
    let parents = []
    let child = []
    export default {
        name: "CategoriesList",
        data () {
            return {
                items: [],
                p: []
            }
        },
        methods: {
            //显示
            async fetch () {
                const res = await this.$http.get('rest/categories')
                this.items = res.data
                this.group()
                this.p = parents
            },
            //删除
            async remove (row) {
                this.$confirm(`是否确定要删除分类"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`rest/categories/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetch();
                });
            },
            //分类
            group () {
                let i = 1
                this.items.forEach(value => {
                    if (value.parent === undefined) {
                        value['children'] = []
                        value['num'] = i++;
                        parents.push(value)
                    } else {
                        child.push(value)
                    }
                })
                parents.forEach(value => {
                    let i = 1
                    child.forEach( (value1) => {
                            let pa = value1.parent
                            if (pa.name === value.name) {
                                value1['num'] = value['num'] * 10 + i++
                                value.children.push(value1)
                            }
                    })
                })
                console.log(parents)
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