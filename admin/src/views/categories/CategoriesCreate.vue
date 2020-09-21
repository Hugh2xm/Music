<template>
    <div>
        <el-card class="box-card" shadow="hover" style="width: 45%;margin: 10rem auto 0 auto">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑':'新建'}}分类</span>
            </div>
            <div class="text item">
                <el-form label-width="100px" @submit.native.prevent="save">
                    <el-form-item label="名称" style="padding: 50px 50px 20px 50px">
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
            }
        },
        methods: {
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
            async fetch() {
                const res = await this.$http.get(`categories/${this.id}`)
                this.model = res.data
            },
        },
        created () {
            this.id && this.fetch()
        }
    }
</script>