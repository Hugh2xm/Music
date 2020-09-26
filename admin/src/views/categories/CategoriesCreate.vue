<template>
    <div>
        <el-card class="box-card" shadow="hover" style="margin: 5rem auto 0 auto">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑':'新建'}}分类</span>
            </div>
            <div class="text item">
                <el-form label-width="120px" @submit.native.prevent="save">
                    <el-row>
                        <el-col>
                            <el-form-item label="上级分类">
                                <el-select v-model="model.parent">
                                    <el-option
                                            v-for="item in parents"
                                            :key="item._id"
                                            :label="item.name"
                                            :value="item._id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item  label="分类名称">
                                <el-input v-model="model.name" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :offset="14">
                            <el-form-item >
                                <el-button type="primary" native-type="submit" >保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
            //移除
            handleClose(tag) {
                this.model.child.splice(this.model.child.indexOf(tag), 1);
            },
            //点击添加显示输入框
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            //添加数据
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.model.child.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //添加/修改数据
            async save () {
                if ( this.id ) {
                    await this.$http.put(`rest/categories/${this.id}`, this.model)
                } else {
                    await this.$http.post('rest/categories',this.model)
                }
                this.$router.push('/categories/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/categories/${this.id}`)
                this.model = res.data
            },
            //获取父级选项,下拉菜单
            async fetchParents () {
                const res = await this.$http.get(`rest/categories`)
                this.parents = res.data
            }
        },
        created () {
            this.fetchParents()
            this.id && this.fetch()
        }
    }
</script>


<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>