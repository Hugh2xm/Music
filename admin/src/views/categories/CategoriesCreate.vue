<template>
    <div>
        <el-card class="box-card" shadow="hover" style="margin: 5rem auto 0 auto">
            <div slot="header" class="clearfix">
                <span>{{id ? '编辑':'新建'}}分类</span>
            </div>
            <div class="text item">
                <el-form label-width="100px" @submit.native.prevent="save">
                    <el-form-item  label="分类名称" style="margin: 40px 0 20px 0">
                        <el-input v-model="model.name" style="width: 65%;" ></el-input>
                    </el-form-item>
                    <el-form-item label="子类名称">
                        <el-tag
                                :key="tag"
                                v-for="tag in model.child"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

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
                model: {
                    child: []
                },
                inputVisible: false,
                inputValue: ''
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
                this.model = Object.assign({},this.model,res.data)
            }
        },
        created () {
            this.id && this.fetch()
        }
    }
</script>


<style scoped>
    .el-input {
        padding-left: 10px;
    }
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