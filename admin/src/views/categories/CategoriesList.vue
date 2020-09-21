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
                                    >
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
                const res = await this.$http.get('categories')
                this.items = res.data
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