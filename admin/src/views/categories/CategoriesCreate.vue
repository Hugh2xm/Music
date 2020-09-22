<template>
    <div>
        <el-card class="box-card" shadow="hover" style="width: 45%;margin: 10rem auto 0 auto">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑':'新建'}}分类</span>
            </div>
            <div class="text item">
                <el-form label-width="100px" @submit.native.prevent="save">
                    <el-form-item label="上级分类" style="margin: 20px 50px">
                        <el-select v-model="model.parent">
                            <el-option
                                    v-for="item in parents"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" style="margin: 0 50px">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item style="float: right;margin: 20px 40px 50px 0">
                        <el-button type="primary" native-type="submit" >保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CategoriesCreate",
        props: {
            id: {}
        },
        data () {
            return {
                model: {},
                parents: []
            }
        },
        methods: {
            //添加/修改数据
            async save () {
                if ( this.id ) {
                    await this.$http.put(`categories/${this.id}`, this.model)
                } else {
                    await this.$http.post('categories',this.model)
                }
                this.$router.push('/categories/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`categories/${this.id}`)
                this.model = res.data
            },
            //获取父级选项
            async fetchParents () {
                const res = await this.$http.get(`categories`)
                this.parents = res.data
            }
        },
        created () {
            this.fetchParents()
            this.id && this.fetch()
        }
    }
</script>